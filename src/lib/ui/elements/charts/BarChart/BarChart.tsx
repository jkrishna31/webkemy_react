"use client";

import * as d3 from "d3";
import { FC, HTMLProps, useCallback, useEffect, useRef } from "react";

import { cc4 } from "@/data/dummy/chartColors";
import ccStyles from "@/lib/ui/styles/classes/chart.module.scss";
import { addAxis, addAxisTitle, addBasicFocus, getTooltipAnchor, IAxes, IMargins, updateBasicFocus } from "@/lib/utils/chart.utils";

import styles from "./BarChart.module.scss";

export interface IBarChartProps extends HTMLProps<HTMLElement> {
  width?: number
  height?: number
  margin?: IMargins
  orient?: "h" | "v"
  variant?: "group" | "stack"
  axes?: IAxes
  axisLabels?: string[]
  fit?: boolean
  payload: any[]
}

const BarChart: FC<IBarChartProps> = ({
  width = 360, height = 360,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  payload,
  orient = "v",
  variant = "group",
  fit,
  axes = {
    x: { pos: "bottom", dir: "ltr" },
    y: { pos: "left", dir: "btt" },
  },
  ...props
}: IBarChartProps) => {
  const ref = useRef<HTMLElement | null>(null);

  const horizontal = useCallback((
    svg: d3.Selection<SVGGElement, unknown, null, undefined>,
    cw: number, ch: number
  ) => {
    const fy = d3.scaleBand()
      .domain(new Set(payload.map(d => d.month)))
      .rangeRound([0, ch]);
    // .paddingInner(0.1);

    const users = new Set(payload.map(d => d.user));

    const xMin = d3.min(payload, d => Math.min(d.value, d.min ?? 0)) ?? 0;
    const xMax = d3.max(payload, d => Math.max(d.value, d.max ?? 0)) ?? 0;

    const x = d3.scaleLinear().domain([xMin, xMax]).nice().range([0, cw]);
    const y = d3.scaleBand().range([0, fy.bandwidth()]).domain(users).padding(.2);

    const xAxis = d3.axisBottom(x).tickSize(-ch).tickPadding(4);
    const yAxis = d3.axisLeft(fy).tickSizeOuter(0);

    const xAxisTop = d3.axisTop(x).tickSize(-ch).tickPadding(4);
    addAxis(xAxisTop, svg, [cw, ch], "top", [ccStyles.tick, ccStyles.label], false);

    const xDraw = addAxis(xAxis, svg, [cw, ch], "bottom", [ccStyles.tick, ccStyles.label]);
    xDraw?.selectAll("text").attr("transform", "rotate(-25)");

    addAxis(yAxis, svg, [cw, ch], "left", [ccStyles.tick, ccStyles.label]);

    svg
      .selectAll("mybar")
      .data(d3.group(payload, d => d.month))
      .join("g")
      .attr("transform", ([month]) => `translate(0, ${fy(month)})`)
      .each(function () {
        d3.select(this)
          .append("rect")
          .attr("width", cw)
          .attr("height", fy.bandwidth())
          .attr("fill", "transparent")
          .lower();
      })
      .selectAll()
      .data(([, d]) => d)
      .join("g")
      .attr("class", `g_bar_${props.id}`)
      .each(function (d, i) {
        const diff = d.value - (d.min ?? 0);
        const dir = d.value < (d.min ?? 0) ? -1 : 1;

        const elem = d3.select(this);

        // elem
        //   .attr("pointer-events", "none");

        elem
          .append("rect")
          .attr("y", y(d.user) ?? 0)
          // .attr("x", x(diff / 2))
          .attr("x", x(0))
          .attr("height", y.bandwidth())
          .attr("width", 0)
          .attr("rx", 2)
          .attr("ry", 2)
          .attr("stroke-width", "1px")
          .attr("stroke", cc4[i])
          .attr("fill", cc4[i])
          .attr("class", `bar_${props.id} bar_${i} ${styles.bar}`)
          .transition()
          .ease(d3.easePolyOut)
          .duration(800)
          .delay(300)
          .attr("x", x(Math.min(d.min ?? 0, d.value)))
          .attr("width", Math.abs(x(d.min ? d.min : 0) - x(d.value)));

        elem
          .append("text")
          .attr("pointer-events", "none")
          .attr("text-anchor", "end")
          .attr("dy", ".35em")
          .attr("class", `${styles.bv} ${diff < 20 ? (dir === -1 ? styles.dark : styles.light) : (dir === -1 ? styles.light : styles.dark)}`)
          .text(d.value)
          .attr("x", x(d.value) + (diff < 20 ? -6 : 6))
          .attr("y", (y(d.user) ?? 0) + y.bandwidth() / 2)
          .style("opacity", 0)
          .transition()
          .delay(1100)
          .ease(d3.easePolyOut)
          .duration(300)
          .attr("x", x(d.value) + (diff < 20 ? 20 : -4))
          .style("opacity", 1);

        if (d.min) {
          elem
            .append("text")
            .attr("pointer-events", "none")
            .attr("text-anchor", diff < 10 ? "end" : "start")
            .attr("dy", ".35em")
            .attr("class", `${styles.bv} ${diff < 10 ? styles.light : styles.dark}`)
            .text(d.min)
            .attr("x", x(d.min) + (diff < 10 ? 6 : -6))
            .attr("y", (y(d.user) ?? 0) + y.bandwidth() / 2)
            .style("opacity", 0)
            .transition()
            .delay(1100)
            .ease(d3.easePolyOut)
            .duration(300)
            .attr("x", x(d.min) + (diff < 10 ? -4 : 4))
            .style("opacity", 1);
        }
      });

    const focus = addBasicFocus(svg, styles.focus);

    const groupRect = svg
      .append("rect")
      .attr("width", cw)
      .attr("height", fy.bandwidth())
      .attr("opacity", 0)
      .attr("class", `group_rect ${styles.group_rect}`);

    svg
      .on("pointerenter", function () {
        focus.attr("display", null).raise();
      })
      .on("pointermove click", function (e) {
        const [xp, yp] = d3.pointer(e);
        const data = e.target.__data__;
        if (data) {
          const textAnchor = getTooltipAnchor([xp, yp], [cw, ch]);
          if (Array.isArray(data)) {
            updateBasicFocus(focus, `${data[0]}`, [xp, yp], [textAnchor[0], textAnchor[1] === "end" ? 24 : -12]);
            groupRect
              .attr("opacity", 1)
              .attr("transform", `translate(0, ${fy(data[1][0].month)})`)
              .lower();
            d3.selectAll(`.g_bar_${props.id}`)
              .attr("opacity", 1);
          } else if (data.month) {
            updateBasicFocus(focus, `${data.user}`, [xp, yp], [textAnchor[0], textAnchor[1] === "end" ? 24 : -12]);
            groupRect
              .attr("opacity", 1)
              .attr("transform", `translate(0, ${fy(data.month)})`)
              .lower();
            d3.selectAll(`.g_bar_${props.id}`)
              .each(function (d: any) {
                if (d.user !== data.user) {
                  d3.select(this).attr("opacity", .15);
                } else {
                  d3.select(this).attr("opacity", 1);
                }
              });
          }
        }
      })
      .on("pointerleave", function () {
        focus.attr("display", "none");
        groupRect.attr("opacity", 0);
        d3.selectAll(`.g_bar_${props.id}`).interrupt().attr("opacity", 1);
      });
  }, [payload, props.id]);

  const vertical = useCallback((
    svg: d3.Selection<SVGGElement, unknown, null, undefined>,
    cw: number, ch: number
  ) => {
    const fx = d3.scaleBand()
      .domain(new Set(payload.map(d => d.month)))
      .rangeRound([0, cw]);
    // .paddingInner(0.1);

    const users = new Set(payload.map(d => d.user));

    const categories = d3.group(payload, d => d.month);
    const series = d3.stack()
      .keys(d3.union(payload.map(d => d.user)));

    const yMin = d3.min(payload, d => Math.min(d.value, d.min ?? 0)) ?? 0;
    const yMax = d3.max(payload, d => Math.max(d.value, d.max ?? 0)) ?? 0;

    const x = d3.scaleBand().range([0, fx.bandwidth()]).domain(users).padding(.2);
    const y = d3.scaleLinear().domain([yMin, yMax]).nice().range([ch, 0]);

    const xAxis = d3.axisBottom(fx).tickSizeOuter(0);
    const yAxis = d3.axisLeft(y).tickSize(-cw).tickPadding(4);

    addAxis(xAxis, svg, [cw, ch], "bottom", [ccStyles.tick, ccStyles.label]);
    addAxis(yAxis, svg, [cw, ch], "left", [ccStyles.tick, ccStyles.label]);

    const yAxisRight = d3.axisRight(y).tickSize(-cw).tickPadding(4);
    addAxis(yAxisRight, svg, [cw, ch], "right", [ccStyles.tick, ccStyles.label], false);

    // const bgGrad = svg
    //   .append("defs")
    //   .append("linearGradient")
    //   .attr("id", "bg_grad_v")
    //   .attr("gradientTransform", "rotate(90)");

    // bgGrad
    //   .append("stop")
    //   .attr("class", styles.stop_start)
    //   .attr("offset", '0%');
    // bgGrad
    //   .append("stop")
    //   .attr("class", styles.stop_end)
    //   .attr("offset", "50%");

    // const defs = svg.append("defs");
    // const filter = defs.append("filter").attr("id", "glow");
    // filter
    //   .append("feGaussianBlur")
    //   .attr("stdDeviation", "10")
    //   .attr("result", "coloredBlur");
    // const feMerge = filter.append("feMerge");
    // feMerge
    //   .append("feMergeNode")
    //   .attr("in", "coloredBlur");
    // feMerge
    //   .append("feMergeNode")
    //   .attr("in", "SourceGraphic");

    // const tooltip = d3.select(`#tooltip_${props.id}`);

    svg
      .selectAll("mybar")
      .data(d3.group(payload, d => d.month))
      .join("g")
      .attr("transform", ([month]) => `translate(${fx(month)}, 0)`)
      .each(function () {
        d3.select(this)
          .append("rect")
          .attr("width", fx.bandwidth())
          .attr("height", ch)
          .attr("fill", "transparent")
          .lower();
      })
      .selectAll()
      .data(([, d]) => d)
      .join("g")
      .attr("class", `g_bar_${props.id}`)
      .each(function (d, i) {
        const diff = Math.min(d.value - (d.min ?? 0));
        const dir = d.value < (d.min ?? 0) ? -1 : 1;

        const elem = d3.select(this);

        // elem
        //   .attr("pointer-events", "none");

        elem
          .append("rect")
          .attr("x", x(d.user) ?? 0)
          .attr("y", y(0))
          .attr("width", x.bandwidth())
          .attr("height", 0)
          .attr("rx", 2)
          .attr("ry", 2)
          // .attr("stroke-width", "1px")
          // .attr("stroke", cc4[i])
          // .attr("fill", "url(#bg_grad_v)")
          // .style("filter", "url(#glow)")
          .attr("fill", cc4[i])
          .attr("class", `bar_${props.id} bar_${i} ${styles.bar}`)
          .transition()
          .ease(d3.easePolyOut)
          .duration(800)
          .delay(300)
          .attr("y", y(Math.max(d.min ?? 0, d.value)))
          .attr("height", Math.abs(y(d.min ? d.min : 0) - y(d.value)));

        // TODO(issue) - height is very small and is present on either edge - then none of the value can be placed inside and both values on outside

        elem
          .append("text")
          .attr("pointer-events", "none")
          .attr("x", (x(d.user) ?? 0) + x.bandwidth() / 2)
          .attr("y", y(d.value) + (diff < 20 ? 6 : -6))
          .attr("text-anchor", "middle")
          .attr("class", `${styles.bv} ${diff < 20 ? (dir === -1 ? styles.dark : styles.light) : (dir === -1 ? styles.light : styles.dark)}`)
          .text(d.value)
          .style("opacity", 0)
          .transition()
          .delay(1100)
          .ease(d3.easePolyOut)
          .duration(300)
          .style("opacity", 1)
          .attr("y", y(d.value) + (diff < 20 ? -6 : 16));

        if (d.min) {
          elem
            .append("text")
            .attr("pointer-events", "none")
            .attr("x", (x(d.user) ?? 0) + x.bandwidth() / 2)
            .attr("y", y(d.min) + (diff < 10 ? -6 : 6))
            .attr("text-anchor", "middle")
            .attr("class", `${styles.bv} ${diff < 10 ? styles.light : styles.dark}`)
            .text(d.min)
            .style("opacity", 0)
            .transition()
            .delay(1100)
            .ease(d3.easePolyOut)
            .duration(300)
            .style("opacity", 1)
            .attr("y", y(d.min) + (diff < 10 ? 18 : -6));
        }
      });

    const focus = addBasicFocus(svg, styles.focus);

    const groupRect = svg
      .append("rect")
      .attr("width", fx.bandwidth())
      .attr("height", ch)
      .attr("opacity", 0)
      .attr("class", `group_rect ${styles.group_rect}`);

    svg
      .on("pointerenter", function () {
        focus.attr("display", null).raise();
      })
      .on("pointermove click", function (e) {
        const [xp, yp] = d3.pointer(e);
        const data = e.target.__data__;
        if (data) {
          // tooltip
          //   .style("display", "")
          //   .style("transform", `translate(${e.clientX}px, ${e.clientY}px)`);
          const textAnchor = getTooltipAnchor([xp, yp], [cw, ch]);
          if (Array.isArray(data)) {
            updateBasicFocus(focus, `${data[0]}`, [xp, yp], [textAnchor[0], textAnchor[1] === "end" ? 24 : -12]);
            groupRect
              .attr("opacity", 1)
              .attr("transform", `translate(${fx(data[1][0].month)}, 0)`)
              .lower();
            d3.selectAll(`.g_bar_${props.id}`)
              // .transition().duration(150).ease(d3.easeSinOut)
              .attr("opacity", 1);
          } else if (data.month) {
            updateBasicFocus(focus, `${data.user}`, [xp, yp], [textAnchor[0], textAnchor[1] === "end" ? 24 : -12]);
            groupRect
              .attr("opacity", 1)
              .attr("transform", `translate(${fx(data.month)}, 0)`)
              .lower();
            d3.selectAll(`.g_bar_${props.id}`)
              .each(function (d: any) {
                if (d.user !== data.user) {
                  d3.select(this).attr("opacity", .15);
                } else {
                  d3.select(this).attr("opacity", 1);
                }
              });
          }
        }
      })
      .on("pointerleave", function () {
        focus.attr("display", "none");
        // tooltip.style("display", "none");
        groupRect.attr("opacity", 0);
        d3.selectAll(`.g_bar_${props.id}`).interrupt().attr("opacity", 1);
      });
  }, [payload, props.id]);

  const renderGraph = useCallback(() => {
    const refCurr = ref.current;

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("class", `${fit ? ccStyles.fit : ""} ${ccStyles.svg}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    if (axes.x?.title) {
      addAxisTitle(axes.x.title, svg, "bc", [chartWidth, chartHeight], margin.bottom, ccStyles.axis_title);
    }
    if (axes.y?.title) {
      addAxisTitle(axes.y.title, svg, "lc", [chartWidth, chartHeight], margin.left, ccStyles.axis_title);
    }

    if (orient === "v") {
      vertical(svg, chartWidth, chartHeight);
    } else if (orient === "h") {
      horizontal(svg, chartWidth, chartHeight);
    }

    return () => {
      d3.select(refCurr).selectAll("*").remove();
    };
  }, [
    height, width,
    horizontal, vertical,
    margin.left, margin.bottom, margin.right, margin.top,
    axes.x?.title, axes.y?.title,
    orient,
    fit,
  ]);

  useEffect(() => {
    return renderGraph();
  }, [renderGraph]);

  return (
    <>
      <figure className={ccStyles.fig} ref={ref} {...props} />
      <div id={`tooltip_${props.id}`} className={styles.tooltip}>
        <div className={styles.legend_item}>
          <div className={styles.left}>
            <div className={styles.legend_badge}></div>
            <span className={styles.legend_label}>{"Legend One"}</span>
          </div>
          <div className={styles.right}>
            <span>{"354.78"}</span>
          </div>
        </div>
        <div className={styles.legend_item}>
          <div className={styles.left}>
            <div className={styles.legend_badge}></div>
            <span className={styles.legend_label}>{"Legend Three"}</span>
          </div>
          <div className={styles.right}>
            <span>{"82.99"}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarChart;

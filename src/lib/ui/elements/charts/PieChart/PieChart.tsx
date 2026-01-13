"use client";

import * as d3 from "d3";
import { FC, HTMLProps, useCallback, useEffect, useRef } from "react";

import { cc1 } from "@/data/dummy/chartColors";
import ccStyles from "@/lib/ui/styles/classes/chart.module.scss";
import { formatNumber } from "@/lib/utils/format.utils";
import { debounce } from "@/lib/utils/general.utils";

import styles from "./PieChart.module.scss";

export interface IPieChartProps extends HTMLProps<HTMLElement> {
  width?: number
  height?: number
  margin?: {
    top: number
    right: number
    bottom: number
    left: number
  }
  startAngle?: number
  endAngle?: number
  pixelRadius?: number
  percentRadius?: number
  padAngle?: number
  cornerRadius?: number
  axisLabels?: string[]
  fit?: boolean
  payload: any[]
}

const PieChart: FC<IPieChartProps> = ({
  width = 320, height = 320,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  payload,
  startAngle = 0,
  endAngle = - 2 * Math.PI,   // -(Math.PI + Math.PI / 2)
  percentRadius = 30,
  pixelRadius,
  padAngle = 0,
  cornerRadius = 4,
  fit = false,
  ...props
}: IPieChartProps) => {
  const ref = useRef<HTMLElement | null>(null);

  const renderChart = useCallback(() => {
    const refCurr = ref.current;

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const center = [
      (width / 2 + (margin.right - margin.left)),
      (height / 2 + (margin.bottom - margin.top)),
    ];

    const radius = Math.min(chartWidth, chartHeight) / 2;

    const outerRadius = radius;
    const innerRadius = pixelRadius ? (radius - pixelRadius) : (radius * (100 - percentRadius) / 100);

    const total = d3.sum(payload.map(item => item.max ?? item.value));

    const colorGen =
      // d3.scaleOrdinal().domain(payload).range(d3.schemeSet2);
      d3.scaleOrdinal().domain(payload.map(d => d.name)).range(cc1);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius);

    const arcActive = d3.arc()
      .outerRadius(outerRadius + 10)
      .innerRadius(innerRadius - 10)
      .cornerRadius(cornerRadius);

    const pie = d3.pie()
      .padAngle(3 / radius)
      .sort(null)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .value((d: any) => d.max ?? d.value);

    const svg = d3.select(ref.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("class", `${fit ? ccStyles.fit : ""} ${ccStyles.svg}`)
      .append("g")
      .attr("transform", `translate(${center[0]},${center[1]})`);

    svg
      .append("rect")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("transform", `translate(${-center[0] + margin.left},${-center[1] + margin.top})`)
      .style("fill", "transparent")
      .style("pointer-events", "all");

    const dot = svg
      .append("g")
      .attr("class", `focus_dot ${styles.focus_elem}`);

    dot
      .append("text")
      .attr("class", "total")
      .attr("text-anchor", "middle")
      .attr("dy", 14)
      .style("pointer-events", "none");

    dot
      .append("text")
      .attr("class", `active ${styles.active}`)
      .attr("text-anchor", "middle")
      .attr("dy", 14)
      .style("pointer-events", "none");

    dot
      .select(".active")
      .append("tspan")
      .attr("class", `value ${styles.value}`);

    dot
      .select(".active")
      .append("tspan")
      .attr("class", `percent ${styles.percent}`);

    const updateFocus = debounce((() => {
      let oldVal: number | undefined | null = null;
      return function (val?: number) {
        if (val === oldVal) return;
        if (val) {
          dot
            .select(".total")
            .text(total)
            .interrupt()
            .transition()
            .duration(200)
            // .ease(d3.easePolyOut)
            .attr("dy", -26)
            .attr("transform", "scale(.5)")
            .attr("opacity", .5);
          dot
            .select(".active")
            .interrupt()
            .transition()
            .duration(200)
            .attr("opacity", 0)
            .attr("dy", 36)
            .on("end", () => {
              dot
                .select(".value")
                .text(`${val} : `);
              dot
                .select(".percent")
                .text(`${formatNumber((val / total) * 100, 1)}%`);
              dot
                .select(".active")
                .transition()
                .duration(200)
                .ease(d3.easePolyOut)
                .attr("dy", 26)
                .attr("opacity", 1);
            });
        } else {
          dot
            .select(".total")
            .interrupt()
            .transition()
            .duration(200)
            .attr("opacity", 0)
            .attr("dy", 28)
            .transition()
            .duration(200)
            .ease(d3.easePolyOut)
            .attr("dy", 14)
            .attr("opacity", 1)
            .attr("transform", "none")
            .text(total);
          dot
            .select(".active")
            .interrupt()
            .transition()
            .duration(200)
            .attr("opacity", 0)
            .attr("dy", 36);
        }
        oldVal = val;
      };
    })(), 100);
    updateFocus();

    function getEndAngle(d: any) {
      const data = d.data;
      const actualVal = data.value;
      const maxVal = data.max ?? data.value;
      return d.startAngle + (d.endAngle - d.startAngle) * (actualVal / maxVal);
    }

    const activatePath = (path: SVGPathElement | null) => {
      d3.select(path)
        .interrupt()
        .transition()
        .duration(300)
        .ease(d3.easePolyInOut)
        // @ts-ignore
        .attr("d", arcActive);
    };

    const paths2 = svg
      .selectAll()
      .data(pie(payload))
      .join("path")
      .attr("data-key", (d: any, i) => i)
      // @ts-ignore
      .attr("fill", (d: any) => colorGen(d.data.name))
      .attr("opacity", .3)
      .attr("d", (d: any) => arc(d));

    paths2
      .style("pointer-events", "none");

    const paths = svg
      .selectAll()
      .data(pie(payload))
      .join("path")
      .attr("data-key", (d: any, i) => i)
      // @ts-ignore
      .attr("fill", (d: any) => colorGen(d.data.name))
      .attr("d", (d: any) => {
        return arc({ ...d, endAngle: getEndAngle(d) });
      });

    paths
      .style("pointer-events", "none")
      .transition()
      .duration(1000)
      .ease(d3.easePolyInOut)
      // @ts-ignore
      .attrTween("d", function (d: any) {
        const i = d3.interpolate(d.startAngle, getEndAngle(d));
        return function (t: any) {
          d.endAngle = i(t);
          return arc(d);
        };
      }).on("end", function () {
        d3.select(this).style("pointer-events", "all");
        paths2.style("pointer-events", "all");
      });

    if (false) {
      svg
        .selectAll()
        .data(pie(payload))
        .enter()
        .append("text")
        // .append("textPath")
        .transition()
        .duration(200)
        .delay(1000)
        .ease(d3.easePolyOut)
        // .attr("xlink:href", function (d, i) {
        //   return `#id-${i}`
        // })
        // .attr("x", 10)
        // .attr("dy", "50%")
        // .attr("startOffset", 25)
        .attr("class", styles.arc_label)
        .attr("opacity", 0)
        .text(function (d: any) {
          return `${d.data.name} : ${d.data.value}`;
        })
        .attr("transform", function (d: any) {
          const angle = (d.startAngle + d.endAngle) / 2;
          // rotate(${angle * 180 / Math.PI - 90})
          return `translate(${arc.centroid(d)})`;
        })
        .attr("opacity", 1)
        .attr("text-anchor", "middle")
        .attr("pointer-events", "none");
    }

    paths
      .on("pointerenter click", function (e, d) {
        const pathKey = e.target.getAttribute("data-key");
        updateFocus(d.value);
        activatePath(this);
        activatePath(paths2.nodes()[pathKey]);
      })
      .on("pointerleave", function (e, d) {
        const pathKey = e.target.getAttribute("data-key");
        resetPath(this);
        resetPath(paths2.nodes()[pathKey]);
        updateFocus();
      });

    paths2
      .on("pointerenter click", function (e, d) {
        const pathKey = e.target.getAttribute("data-key");
        updateFocus(d.value);
        activatePath(this);
        activatePath(paths.nodes()[pathKey]);
      })
      .on("pointerleave", function (e, d) {
        const pathKey = e.target.getAttribute("data-key");
        resetPath(this);
        resetPath(paths.nodes()[pathKey]);
        updateFocus();
      });

    svg
      .on("click", function (e) {
        const pathKey = e.target.getAttribute("data-key");
        if (pathKey === undefined || pathKey === null) {
          paths
            .each(function () {
              resetPath(this);
            });
          paths2
            .each(function () {
              resetPath(this);
            });
          updateFocus();
        }
      })
      .on("dblclick", function (e) {
        paths
          .each(function () {
            resetPath(this);
          });
        paths2
          .each(function () {
            resetPath(this);
          });
        updateFocus();
      });

    function resetPath(ps: any) {
      d3.select(ps)
        .transition()
        .duration(200)
        .ease(d3.easePolyOut)
        // @ts-ignore
        .attr("d", arc);
    }

    return () => {
      d3.select(refCurr).selectAll("*").remove();
    };
  }, [
    cornerRadius, endAngle, height, margin.bottom, margin.left, margin.right, margin.top, payload, percentRadius, pixelRadius, startAngle, width, fit,
  ]);

  useEffect(() => {
    return renderChart();
  }, [renderChart]);

  return (
    <figure className={styles.fig} ref={ref} style={{ width, height }} {...props} />
  );
};

export default PieChart;

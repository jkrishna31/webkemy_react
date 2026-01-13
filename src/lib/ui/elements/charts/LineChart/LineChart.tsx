"use client";

import * as d3 from "d3";
import { HTMLProps, useCallback, useEffect, useRef } from "react";

import { cc2 } from "@/data/dummy/chartColors";
import ccStyles from "@/lib/ui/styles/classes/chart.module.scss";
import { addAxis, addAxisTitle, addBasicFocus, getTooltipAnchor, IAxes, IMargins, updateBasicFocus } from "@/lib/utils/chart.utils";

import styles from "./LineChart.module.scss";

export interface ILineChartProps extends HTMLProps<HTMLElement> {
  width?: number
  height?: number
  margin?: IMargins
  orient?: "h" | "v"
  variant?: "line" | "area"
  line?: "step" | "linear" | "curve"
  axes?: IAxes
  axisLabels?: string[]
  fit?: boolean
  payload: { division: string, date: string, unemployment: number }[]
}

const LineChart = ({
  width = 360, height = 360,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  payload,
  variant = "line",
  axes = {
    x: { pos: "bottom", dir: "ltr" },
    y: { pos: "left", dir: "btt" },
  },
  fit,
  ...props
}: ILineChartProps) => {
  const ref = useRef<HTMLElement | null>(null);

  const renderChart = useCallback(() => {
    const refCurr = ref.current;

    const finalPayload: { division: string, date: Date, unemployment: number }[] = payload.map(
      item => ({ ...item, date: new Date(item.date) })
    ).sort((a: any, b: any) => a.date - b.date);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const brush = d3.brush().extent([[0, 0], [chartWidth, chartHeight]])
      .on("start", () => {
        if (d3.selectAll(".selection")) {
          d3.selectAll(".selection")
            .classed(ccStyles.selection, true);
        }
      })
      .on("end", e => {
        if (e && e.selection) {
          if (e.selection[0] > 0 || e.selection[1] < chartWidth) {
            // console.log("---- selection ----", e.selection);
          }
          x.domain([x.invert(e.selection[0][0]), x.invert(e.selection[1][0])]);
          y.domain([y.invert(e.selection[1][1]), y.invert(e.selection[0][1])]);
          addAxis(xAxis, svg, [chartWidth, chartHeight], "bottom", [ccStyles.tick, ccStyles.label]);
          addAxis(yAxis, svg, [chartWidth, chartHeight], "left", [ccStyles.tick, ccStyles.label]);
          plot();
          d3.brush().clear(svg);
        }
      });

    const zoom = d3.zoom().scaleExtent([1, 1])
      .extent([[0, 0], [chartWidth, chartHeight]])
      .on("zoom", updateChart);

    function addBrush(
      area: d3.Selection<SVGGElement, unknown, null, undefined>,
      b: d3.BrushBehavior<unknown>
    ) {
      area.call(b).raise();
    }

    function addZoom(
      area: d3.Selection<SVGGElement, unknown, null, undefined>,
      z: d3.ZoomBehavior<Element, unknown>,
    ) {
      // @ts-ignore
      area.call(z);
    }

    // chart svg
    const svg = d3.select(ref.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("class", `${fit ? ccStyles.fit : ""} ${ccStyles.svg}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("rect")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .style("fill", "transparent")
      .style("pointer-events", "all");

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip_chart")
      .append("rect")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    if (axes.x?.title) {
      addAxisTitle(axes.x.title, svg, "bc", [chartWidth, chartHeight], margin.bottom, ccStyles.axis_title);
    }
    if (axes.y?.title) {
      addAxisTitle(axes.y.title, svg, "lc", [chartWidth, chartHeight], margin.left, ccStyles.axis_title);
    }

    const x = d3
      .scaleUtc()
      // @ts-ignore
      .domain(d3.extent(finalPayload, d => d.date))
      .range([0, chartWidth]);
    const y = d3
      .scaleLinear()
      // @ts-ignore
      .domain([d3.min(finalPayload, d => d.unemployment), d3.max(finalPayload, d => d.unemployment)])
      .nice()
      .range([chartHeight, 0]);

    const xAxis = d3.axisBottom(x).tickSizeOuter(0);
    const yAxis = d3.axisLeft(y).tickSize(-chartWidth).tickPadding(4);

    addAxis(xAxis, svg, [chartWidth, chartHeight], "bottom", [ccStyles.tick, ccStyles.label]);
    addAxis(yAxis, svg, [chartWidth, chartHeight], "left", [ccStyles.tick, ccStyles.label]);

    let points: any;
    let groups: any;
    let color: any;

    function structureData(xGen: any, yGen: any) {
      points = finalPayload.map(d => [xGen(d.date), yGen(d.unemployment), d.division]);
      groups = d3.rollup(points, (v: any) => Object.assign(v, { z: v[0][2] }), (d: any) => d[2]);
      color = d3
        .scaleOrdinal()
        .domain(Array.from(groups.keys()) as string[])
        .range(cc2);
    }

    let path: any;

    function plot(xGen: any = x, yGen: any = y) {
      svg.selectAll(".paths").remove();
      structureData(xGen, yGen);
      path = svg.append("g")
        .attr("clip-path", "url(#clip_chart)")
        .attr("pointer-events", "none")
        .attr("class", "paths")
        .attr("fill", "transparent")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .selectAll("path")
        .data(groups.values())
        .join("path")
        .attr("stroke", d => color(d))
        .attr("class", `line ${styles.line}`)
        // @ts-ignore
        .attr("d", d3.line().curve(d3.curveCardinal.tension(.7))
          // .defined(d => {
          //   return y.invert(d[1]) > 0;
          // })
        )
        .lower();
    }
    plot();

    const dot = addBasicFocus(svg, styles.active_point);

    svg
      .on("pointerenter", function () {
        dot.attr("display", null).raise();
      })
      .on("pointermove click", activateNearPoint)
      .on("pointerleave", function () {
        svg.selectAll(".line").style("opacity", "100%");
        dot.attr("display", "none");
      });

    function resetAxes() {
      // @ts-ignore
      x.domain(d3.extent(finalPayload, d => d.date));
      // @ts-ignore
      y.domain([d3.min(finalPayload, d => d.unemployment), d3.max(finalPayload, d => d.unemployment)]).nice();
      addAxis(xAxis, svg, [chartWidth, chartHeight], "bottom", [ccStyles.tick, ccStyles.label]);
      addAxis(yAxis, svg, [chartWidth, chartHeight], "left", [ccStyles.tick, ccStyles.label]);
    }

    addBrush(svg, brush);
    // addZoom(svg, zoom);

    svg.on("dblclick", function (e) {
      resetAxes();
      plot();
      dot.attr("display", "none");
    });

    function updateChart(e: any) {
      const newx = e.transform.rescaleX(x);
      const newy = e.transform.rescaleY(y);
      addAxis(d3.axisBottom(newx).tickSizeOuter(0), svg, [chartWidth, chartHeight], "bottom", [ccStyles.tick, ccStyles.label]);
      addAxis(d3.axisLeft(newy).tickSize(-chartWidth).tickPadding(4), svg, [chartWidth, chartHeight], "left", [ccStyles.tick, ccStyles.label]);
      plot(newx, newy);
    }

    function activateNearPoint(e: any) {
      const [xm, ym] = d3.pointer(e);
      const i = d3.leastIndex(points, ([x, y]: [number, number]) => Math.hypot(x - xm, y - ym));
      if (i) {
        const [xp, yp, k] = points[i];
        const textAnchor = getTooltipAnchor([xp, yp], [chartWidth, chartHeight]);
        path.lower().style("opacity", ({ z }: { z: any }) => z === k ? "100%" : "15%");
        updateBasicFocus(
          dot,
          `${k} | ${finalPayload[i].unemployment} | ${finalPayload[i].date.toLocaleDateString()}`,
          [xp, yp],
          [textAnchor[0], textAnchor[1] === "end" ? 24 : -12],
        );
      }
    }

    return () => {
      d3.select(refCurr).selectAll("*").remove();
    };
  }, [
    height, width, fit,
    margin.bottom, margin.top, margin.left, margin.right,
    axes.x?.title, axes.y?.title,
    payload
  ]);

  useEffect(() => {
    return renderChart();
  }, [renderChart]);

  // handle all 4 quadrants automatically
  // type - line, area
  return (
    <figure className={ccStyles.fig} ref={ref} {...props} />
  );
};

export default LineChart;

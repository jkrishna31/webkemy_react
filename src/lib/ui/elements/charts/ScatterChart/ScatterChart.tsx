"use client";

import * as d3 from "d3";
import React, { FC, HTMLProps, useCallback, useEffect, useRef } from "react";

import ccStyles from "@/lib/ui/styles/classes/chart.module.scss";
import { addAxis, addAxisTitle, addBasicFocus, getTooltipAnchor, IAxes, IMargins, updateBasicFocus } from "@/lib/utils/chart.utils";
import { debounce } from "@/lib/utils/general.utils";

import styles from "./ScatterChart.module.scss";

export interface IScatterChart extends HTMLProps<HTMLElement> {
  width?: number
  height?: number
  margin?: IMargins
  orient?: "h" | "v"
  variant?: "line" | "area"
  line?: "step" | "linear" | "curve"
  axes?: IAxes
  axisLabels?: string[]
  fit?: boolean
  payload: any[]
}

const ScatterChart: FC<IScatterChart> = ({
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
}: IScatterChart) => {
  const ref = useRef<HTMLElement | null>(null);

  const renderChart = useCallback(() => {
    const refCurr = ref.current;

    // chart dimension
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    let finalPayload = payload;
    let delaunay: any;

    function updateDelaunay(d: any) {
      delaunay = d3.Delaunay.from(d, (d: any) => x(d.GrLivArea), d => y(d.SalePrice));
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
      .attr("id", "clip")
      .append("rect")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    // axis titles
    if (axes.x?.title) {
      addAxisTitle(axes.x.title, svg, "bc", [chartWidth, chartHeight], margin.bottom, ccStyles.axis_title);
    }
    if (axes.y?.title) {
      addAxisTitle(axes.y.title, svg, "lc", [chartWidth, chartHeight], margin.left, ccStyles.axis_title);
    }

    const x = d3
      .scaleLinear()
      // @ts-ignore
      .domain(d3.extent(payload, d => Number(d.GrLivArea)))
      .nice()
      .range([0, chartWidth]);
    const y = d3
      .scaleLinear()
      // @ts-ignore
      .domain(d3.extent(payload, d => Number(d.SalePrice)))
      .nice()
      .range([chartHeight, 0]);

    const xAxis = d3.axisBottom(x).tickSizeOuter(0);
    const yAxis = d3.axisLeft(y).tickSize(-chartWidth).tickPadding(4);

    addAxis(xAxis, svg, [chartWidth, chartHeight], "bottom", [ccStyles.tick, ccStyles.label]);
    addAxis(yAxis, svg, [chartWidth, chartHeight], "left", [ccStyles.tick, ccStyles.label]);

    let points: any;

    function updateplotData(selection: [[number, number], [number, number]]) {
      finalPayload = payload.filter(d => {
        return x(d.GrLivArea) >= selection[0][0] && x(d.GrLivArea) <= selection[1][0] && y(d.SalePrice) >= selection[0][1] && y(d.SalePrice) <= selection[1][1];
      });
    }

    function plot(xGen: any = x, yGen: any = y) {
      updateDelaunay(finalPayload);
      svg.selectAll(".scatter").remove();
      points = svg
        .append("g")
        .attr("pointer-events", "none")
        .attr("clip-path", "url(#clip)")
        .attr("class", "scatter")
        .selectAll(".dot")
        .data(finalPayload)
        .join("circle")
        .attr("cx", d => xGen(d.GrLivArea))
        .attr("cy", d => yGen(d.SalePrice))
        .attr("r", 2)
        .attr("class", styles.data_point)
        .lower();
    }
    plot();

    const dot = addBasicFocus(svg, styles.active_point);

    function resetAxes() {
      finalPayload = payload;
      // @ts-ignore
      x.domain(d3.extent(payload, d => Number(d.GrLivArea))).nice();
      // @ts-ignore
      y.domain(d3.extent(payload, d => Number(d.SalePrice))).nice();
      addAxis(xAxis, svg, [chartWidth, chartHeight], "bottom", [ccStyles.tick, ccStyles.label]);
      addAxis(yAxis, svg, [chartWidth, chartHeight], "left", [ccStyles.tick, ccStyles.label]);
    }

    const brush = d3.brush().extent([[0, 0], [chartWidth, chartHeight]])
      .on("start", () => {
        d3.selectAll(".selection")
          .classed(ccStyles.selection, true);
      })
      .on("end", function (e) {
        if (e && e.selection) {
          updateplotData(e.selection);
          x.domain([x.invert(e.selection[0][0]), x.invert(e.selection[1][0])]).nice();
          y.domain([y.invert(e.selection[1][1]), y.invert(e.selection[0][1])]).nice();
          addAxis(xAxis, svg, [chartWidth, chartHeight], "bottom", [ccStyles.tick, ccStyles.label]);
          addAxis(yAxis, svg, [chartWidth, chartHeight], "left", [ccStyles.tick, ccStyles.label]);
        }
        d3.brush().clear(svg);
        plot();
      });

    const zoom = d3.zoom().scaleExtent([1, 1])
      .extent([[0, 0], [chartWidth, chartHeight]])
      .on("zoom", debounce(updateChart, 5));

    svg.call(brush).raise();
    // svg.call(zoom);

    svg
      .on("pointerenter", function () {
        dot.attr("display", null);
      })
      .on("pointermove click", function (e) {
        const [xp, yp] = d3.pointer(e);
        const i = delaunay.find(xp, yp);
        const [xd, yd] = [x(finalPayload[i].GrLivArea), y(finalPayload[i].SalePrice)];
        points.classed(styles.highlighted, (_: any, j: number) => j === i);
        d3.select(points.nodes()[i]).raise();
        const textAnchor = getTooltipAnchor([xd, yd], [chartWidth, chartHeight]);
        updateBasicFocus(
          dot,
          `${finalPayload[i].SalePrice} | ${finalPayload[i].GrLivArea}`,
          [xd, yd],
          [textAnchor[0], textAnchor[1] === "end" ? 24 : -12],
        );
      })
      .on("pointerleave", function () {
        points.classed(styles.highlighted, false);
        dot.attr("display", "none");
      })
      .on("dblclick", function (e) {
        resetAxes();
        plot();
      });

    function updateChart(e: any) {
      // update data with transforms (x,y) ans scale(k)
      // updateplotData();
      const newx = e.transform.rescaleX(x);
      const newy = e.transform.rescaleY(y);
      addAxis(d3.axisBottom(newx).tickSizeOuter(0), svg, [chartWidth, chartHeight], "bottom", [ccStyles.tick, ccStyles.label]);
      addAxis(d3.axisLeft(newy).tickSize(-chartWidth).tickPadding(4), svg, [chartWidth, chartHeight], "left", [ccStyles.tick, ccStyles.label]);
      plot(newx, newy);
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

  return (
    <figure className={ccStyles.fig} ref={ref} {...props} />
  );
};

export default ScatterChart;

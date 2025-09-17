"use client";

import * as d3 from "d3";
import React, { FC, HTMLProps, useCallback, useEffect, useRef } from "react";

import { cc2, cc3 } from "@/data/dummy/chartColors";
import ccStyles from "@/lib/ui/styles/classes/chart.module.scss";
import { addAxis, addAxisTitle, addBasicFocus, getTooltipAnchor, IAxes, IMargins, updateBasicFocus } from "@/lib/utils/chart.utils";

import styles from "./HeatMap.module.scss";

export interface IHeatMapProps extends HTMLProps<HTMLElement> {
  width?: number
  height?: number
  margin?: IMargins
  axes?: IAxes
  axisLabels?: string[]
  fit?: boolean
  payload: any[]
}

const HeatMap: FC<IHeatMapProps> = ({
  width = 360, height = 360,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  payload,
  axes = {
    x: { pos: "bottom", dir: "ltr" },
    y: { pos: "left", dir: "btt" },
  },
  fit,
  ...props
}: IHeatMapProps) => {
  const ref = useRef<HTMLElement | null>(null);

  const renderGraph = useCallback(() => {
    const refCurr = ref.current;

    // chart dimension
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // chart svg
    const svg = d3.select(ref.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("class", `${fit ? ccStyles.fit : ""} ${ccStyles.svg}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // axis labels
    if (axes.x?.title) {
      addAxisTitle(axes.x.title, svg, "bc", [chartWidth, chartHeight], margin.bottom, ccStyles.axis_title);
    }
    if (axes.y?.title) {
      addAxisTitle(axes.y.title, svg, "lc", [chartWidth, chartHeight], margin.left, ccStyles.axis_title);
    }

    const groups = new Set(d3.map(payload, (d) => d.group).values());
    const vars = new Set(d3.map(payload, (d) => d.variable).values());

    const x = d3.scaleBand().range([0, chartWidth]).domain(groups).padding(0.2);
    const y = d3.scaleBand().range([chartHeight, 0]).domain(vars).padding(0.2);

    const xAxis = d3.axisBottom(x).tickSizeOuter(0);
    const yAxis = d3.axisLeft(y).tickSize(-chartWidth).tickPadding(4);

    addAxis(xAxis, svg, [chartWidth, chartHeight], "bottom", [ccStyles.tick, ccStyles.label]);
    addAxis(yAxis, svg, [chartWidth, chartHeight], "left", [ccStyles.tick, ccStyles.label]);

    // const colorGen = d3.scaleSequential().interpolator(d3.interpolateBlues).domain([1, 100]);
    // @ts-ignore
    const colorGen = d3.scaleLinear().domain([0, 400]).range([cc3[0], cc3[1]]);

    const focus = addBasicFocus(svg, styles.focus_elem);

    svg.selectAll()
      .data(payload, (d) => `${d.group}:${d.variable}`)
      .enter()
      .append("rect")
      .attr("class", `cell ${styles.cell}`)
      // @ts-ignore
      .attr("x", (d: any) => x(d.group))
      // @ts-ignore
      .attr("y", (d: any) => y(d.variable))
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", (d) => colorGen(d.value));

    svg
      .on("pointerenter", function () {
        focus.attr("display", null).raise();
      })
      .on("pointermove click", function (e) {
        const data = e.target.__data__;
        if (data && data.value) {
          const [xp, yp] = d3.pointer(e);
          const textAnchor = getTooltipAnchor([xp, yp], [chartWidth, chartHeight]);
          updateBasicFocus(
            focus,
            `${data.value}`,
            [xp, yp],
            [textAnchor[0], textAnchor[1] === "end" ? 24 : -12],
          );
        }
      })
      .on("pointerleave", function () {
        focus.attr("display", "none");
      });

    return () => {
      d3.select(refCurr).selectAll("*").remove();
    };
  }, [
    height, width,
    margin.left, margin.bottom, margin.right, margin.top,
    axes.x?.title, axes.y?.title,
    payload, fit,
  ]);

  useEffect(() => {
    return renderGraph();
  }, [renderGraph]);

  return (
    <figure className={ccStyles.fig} ref={ref} {...props} />
  );
};

export default HeatMap;

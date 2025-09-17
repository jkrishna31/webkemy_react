"use client";

import * as d3 from "d3";
import React, { FC, HTMLProps, useCallback, useEffect, useRef } from "react";

import { cc5 } from "@/data/dummy/chartColors";
import ccStyles from "@/lib/ui/styles/classes/chart.module.scss";
import { addBasicFocus, getTooltipAnchor, IMargins, updateBasicFocus } from "@/lib/utils/chart.utils";

import styles from "./PackedCircles.module.scss";

export interface IPackedCirclesProps extends HTMLProps<HTMLElement> {
  width?: number
  height?: number
  margin?: IMargins
  orient?: "h" | "v"
  variant?: "group" | "stack"
  axisLabels?: string[]
  fit?: boolean
  payload: any[]
}

const PackedCircles: FC<IPackedCirclesProps> = ({
  width = 360, height = 360,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  payload,
  fit,
  ...props
}: IPackedCirclesProps) => {
  const ref = useRef<HTMLElement | null>(null);

  const renderGraph = useCallback(() => {
    const refCurr = ref.current;

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const sizeDivisor = 150, nodePadding = 2.5;

    const svg = d3.select(ref.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      // .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", width)
      .attr("height", height)
      .attr("class", `${fit ? ccStyles.fit : ""} ${ccStyles.svg}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const simulation = d3.forceSimulation()
      .force("x", d3.forceX().strength(.1).x(width * .5))
      .force("y", d3.forceY().strength(.1).y(height * .5))
      .force("center", d3.forceCenter().x(width * .5 + margin.left).y(height * .5 + margin.top))
      .force("charge", d3.forceManyBody().strength(-20));

    const graph = d3.map(payload, d => {
      d.gdp = +d.gdp;
      d.size = +d.gdp / sizeDivisor;
      d.radius = d.size < 3 ? 3 : d.size;
      return d;
    }).sort((a, b) => b.size - a.size);

    const color = d3.scaleOrdinal(
      // ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]
      cc5
    );

    function ticked() {
      node
        .attr("cx", function (d) {
          // return Math.max(d.radius, Math.min(chartWidth - d.radius, d.x));
          return d.x;
        })
        .attr("cy", function (d) {
          // return Math.max(d.radius, Math.min(chartHeight - d.radius, d.y));
          return d.y;
        });
    }

    const node = svg.append("g")
      .attr("class", "node")
      .selectAll("circle")
      .data(graph)
      .enter().append("circle")
      .attr("r", function (d) { return d.radius; })
      .attr("fill", function (d) { return color(d.continent); })
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; });

    simulation
      .nodes(graph)
      .force("collide", d3.forceCollide().strength(1).radius(function (d: any) { return d.radius + nodePadding; }).iterations(1))
      .on("tick", ticked);

    const focus = addBasicFocus(svg, styles.focus);

    svg
      .on("pointerenter", function () {
        focus.attr("display", null).raise();
      })
      .on("pointermove click", function (e) {
        const [xp, yp] = d3.pointer(e);
        const data = e.target.__data__;
        const textAnchor = getTooltipAnchor([xp, yp], [chartWidth, chartHeight]);
        updateBasicFocus(
          focus,
          `${data.country} | ${data.gdp}`,
          [xp, yp],
          [textAnchor[0], textAnchor[1] === "end" ? 24 : -12]
        );
      })
      .on("pointerleave", function () {
        focus.attr("display", "none").lower();
      });

    return () => {
      d3.select(refCurr).selectAll("*").remove();
    };
  }, [
    height, width, fit, payload,
    margin.top, margin.bottom, margin.left, margin.right,
  ]);

  useEffect(() => {
    return renderGraph();
  }, [renderGraph]);

  return (
    <figure className={ccStyles.fig} ref={ref} {...props} />
  );
};

export default PackedCircles;

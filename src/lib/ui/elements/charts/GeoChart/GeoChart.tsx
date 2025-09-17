"use client";

import * as d3 from "d3";
import React, { FC, HTMLProps, useCallback, useEffect, useRef } from "react";

import ccStyles from "@/lib/ui/styles/classes/chart.module.scss";
import { IAxes, IMargins } from "@/lib/utils/chart.utils";

import styles from "./GeoChart.module.scss";

export type Projections = "mercator" | "orthographic" | "natural"

export interface IGeoChartProps extends HTMLProps<HTMLElement> {
  width?: number
  height?: number
  variant?: Projections
  margin?: IMargins
  axes?: IAxes
  axisLabels?: string[]
  fit?: boolean
  payload?: any
}

const GeoChart: FC<IGeoChartProps> = ({
  width = 360, height = 360,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  variant = "natural",
  payload,
  axes = {
    x: { pos: "bottom", dir: "ltr" },
    y: { pos: "left", dir: "btt" },
  },
  fit,
  ...props
}: IGeoChartProps) => {
  const ref = useRef<HTMLElement | null>(null);

  const renderGraph = useCallback(() => {
    const refCurr = ref.current;

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const projection = variant === "orthographic" ?
      d3.geoOrthographic() :
      d3.geoNaturalEarth1();

    projection
      .fitExtent([[0, 0], [chartWidth, chartHeight]], payload);

    const geoGenerator = d3.geoPath().pointRadius(5).projection(projection);

    const svg = d3.select(ref.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("class", `${fit ? ccStyles.fit : ""} ${ccStyles.svg}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add a white sphere with a black border.
    // svg.append("path")
    //   .datum({ type: "Sphere" })
    //   .attr("fill", "white")
    //   .attr("stroke", "red")
    //   // @ts-ignore
    //   .attr("d", geoGenerator);

    const countries = svg
      .selectAll("path")
      .data(payload.features)
      .join("path")
      .attr("class", styles.path)
      .attr("data-id", (d: any) => d.id)
      // @ts-ignore
      .attr("d", geoGenerator);

    svg
      .on("mousemove", function (e) {
        const [xp, yp] = d3.pointer(e);
        // let country = null;
        // countries
        //   .each(function (d: any) {
        //     if (geoGenerator(d) && d3.select(this).node()?.getBoundingClientRect()?.contains(xp, yp)) {
        //       country = d;
        //     }
        //   });
        // if (country) {
        //   countries.attr('fill', '#69b3a2');  // Reset all countries to the default color
        //   d3.select(this).attr('fill', '#ff6347');
        // }
      })
      .on("mouseout", function (e) {
        const [xp, yp] = d3.pointer(e);
      });

    return () => {
      d3.select(refCurr).selectAll("*").remove();
    };
  }, [
    height, width, variant, payload, fit,
    margin.left, margin.bottom, margin.right, margin.top,
  ]);

  useEffect(() => {
    return renderGraph();
  }, [renderGraph]);

  return (
    <figure className={ccStyles.fig} ref={ref} {...props} />
  );
};

export default GeoChart;

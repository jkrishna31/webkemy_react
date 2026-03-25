import * as d3 from "d3";

export interface IMargins {
  top: number
  right: number
  bottom: number
  left: number
}

export interface IAxes {
  x?: {
    pos?: "top" | "bottom" | "both"
    dir?: "ltr" | "rtl"
    title?: string
  }
  y?: {
    pos?: "left" | "right" | "both"
    dir?: "btt" | "ttb"
    title?: string
  }
}

export const addAxis = (
  fn: any,
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  [chartWidth, chartHeight]: [number, number],
  pos: "left" | "right" | "top" | "bottom",
  [tickClass, labelClass]: [string, string],
  gridLine = true,
) => {
  let bar;
  if (pos === "bottom") {
    svg.selectAll(".x_axis_group").remove();
    bar = svg
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .attr("class", "axis_group x_axis_group")
      .call(fn);
    bar
      .selectAll(".tick")
      .attr("class", tickClass);
    bar
      .selectAll("text")
      .attr("transform", "translate(-8,0)rotate(-45)")
      .style("text-anchor", "end")
      .attr("class", labelClass);
  } else if (pos === "top") {
    svg.selectAll(".x_axis_t_group").remove();
    bar = svg
      .append("g")
      .attr("class", "axis_group x_axis_t_group")
      .call(fn);
    bar
      .selectAll(".tick")
      .attr("class", tickClass);
    bar
      .selectAll("text")
      // .attr("transform", "translate(-2,0)rotate(-45)")
      // .style("text-anchor", "start")
      .attr("transform", "translate(-2,0)rotate(45)")
      .style("text-anchor", "end")
      .attr("class", labelClass);
  } else if (pos === "left") {
    svg.selectAll(".y_axis_group").remove();
    bar = svg
      .append("g")
      .attr("class", "axis_group y_axis_group")
      .call(fn);
    bar
      .selectAll("text")
      .attr("class", labelClass);
    bar
      .selectAll(".tick line")
      .attr("class", tickClass);
  } else if (pos === "right") {
    svg.selectAll(".y_axis_r_group").remove();
    bar = svg
      .append("g")
      .attr("class", "axis_group y_axis_r_group")
      .attr("transform", `translate(${chartWidth}, 0)`)
      .call(fn);
    bar
      .selectAll("text")
      .attr("class", labelClass);
    bar
      .selectAll(".tick line")
      .attr("class", tickClass);
  }
  if (!gridLine) {
    bar?.selectAll("line").remove();
  }
  svg
    .selectAll(".domain")
    .remove();
  return bar?.attr("pointer-events", "none").lower();
};

export const addAxisTitle = (
  payload: string,
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  pos: "lc" | "bc" | "tc" | "rc",
  [chartWidth, chartHeight]: [number, number],
  margin: number,
  className: string = "axis_title"
) => {
  let x = 0;
  let y = 0;

  if (pos === "bc") {
    x = chartWidth / 2;
    y = chartHeight + margin - 8;
  } else if (pos === "lc") {
    x = -chartHeight / 2;
    y = -margin;
  }

  const title = svg.append("text");

  if (pos === "lc") {
    title
      .attr("transform", "rotate(-90)");
  }

  const positionedTitle = title
    .attr("x", x)
    .attr("y", y);

  if (pos === "lc") {
    positionedTitle
      .attr("dy", "1em");
  }

  positionedTitle
    .attr("pointer-events", "none")
    .style("text-anchor", "middle")
    .text(payload)
    .attr("class", className);

  if (pos === "bc") {
    positionedTitle
      .attr("transform", function (d) {
        return `translate(${-this.getBBox().width / 2},0)`;
      });
  }
};

export const addCrossHairs = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  dim: "x" | "y" | "both" = "both",
  classNames?: [string, string],
) => {
  if (dim === "both" || dim === "x") {
    svg
      .append("line")
      .attr("id", "ch_x")
      .attr("class", `focusLine ${classNames?.[0]}`);
  }
  if (dim === "both" || dim === "y") {
    svg
      .append("line")
      .attr("id", "ch_y")
      .attr("class", `focusLine ${classNames?.[1]}`);
  }
};

export const addBasicFocus = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  className: string,
  size = 3,
) => {
  const dot = svg.append("g")
    .style("pointer-events", "none")
    .attr("class", `focus_dot ${className}`)
    .attr("display", "none");

  dot.append("circle")
    .attr("r", size);

  dot.append("text")
    .attr("text-anchor", "middle")
    .attr("y", -8);

  return dot.raise();
};

export const updateBasicFocus = (
  dot: d3.Selection<SVGGElement, unknown, null, undefined>,
  text: string,
  [x, y]: [number, number],
  anchor: [string, number] = ["middle", -8],
) => {
  dot
    .attr("transform", `translate(${x},${y})`)
    .attr("display", null)
    .raise()
    .select("text")
    .attr("y", anchor[1])
    .attr("text-anchor", anchor[0])
    .text(text);
};

export const getTooltipAnchor = (
  [x, y]: [number, number],
  [width, height]: [number, number],
  [xPad, yPad] = [75, 24],
) => {
  const anchor = ["middle", "start"];
  const hMid = width / 2;
  const midRange = [hMid - xPad, hMid + xPad];
  if (x <= midRange[0]) {
    anchor[0] = "start";
  } else if (x > midRange[0] && x < midRange[1]) {
    anchor[0] = "middle";
  } else {
    anchor[0] = "end";
  }
  if (Math.abs(y - 0) < yPad) {
    anchor[1] = "end";
  }
  return anchor;
};

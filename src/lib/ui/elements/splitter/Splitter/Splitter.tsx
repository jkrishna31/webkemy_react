"use client";

import React, { ComponentProps } from "react";

import styles from "./Splitter.module.scss";

export interface SplitterProps extends ComponentProps<"div"> {
  layout?: "v" | "h";
}

const Splitter = ({
  layout = "h",
  className, children,
  ...props
}: SplitterProps) => {
  return (
    <div
      className={`${styles.splitter} ${className}`}
      data-layout={layout}
      onPointerDown={() => console.log("==== pointer down ====",)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Splitter;

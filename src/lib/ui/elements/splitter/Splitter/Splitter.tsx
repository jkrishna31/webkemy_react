"use client";

import React, { ComponentProps } from "react";

import styles from "./Splitter.module.scss";

export interface SplitterProps extends ComponentProps<"div"> {
  layout?: "v" | "h";
  value?: number;
}

const Splitter = ({
  layout = "h", value = 100,
  className, children, style,
  ...props
}: SplitterProps) => {
  return (
    <div
      data-splitter
      data-layout={layout}
      className={`${styles.splitter} ${className}`}
      style={{
        flex: value / 100,
        ...(style ?? {}),
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Splitter;

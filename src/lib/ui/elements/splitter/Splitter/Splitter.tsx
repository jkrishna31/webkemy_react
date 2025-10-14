"use client";

import React, { ComponentProps, useRef, useState } from "react";

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
  const ref = useRef<HTMLElement>(null);

  const [sizes, setSizes] = useState<number[]>();

  // pass to split handle
  const handleResize = () => {
    // get all the immediate split-section child
  };

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

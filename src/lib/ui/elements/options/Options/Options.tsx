"use client";

import React, { ComponentProps, useRef } from "react";

import { useFocusTrap } from "@/lib/hooks";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Options.module.scss";

export interface OptionsProps extends ComponentProps<"div"> {

}

const Options = ({
  children, className,
  ...props
}: OptionsProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // useFocusTrap(ref);

  const handleMouseMove = (e: React.MouseEvent) => {
    // 
    if ("onpointermove" in e.target) {

    }
  };

  return (
    <div
      ref={ref}
      className={classes(styles.wrapper)}
      onMouseMove={handleMouseMove}
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  );
};

export default Options;

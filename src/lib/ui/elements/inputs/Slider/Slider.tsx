import React, { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Slider.module.scss";

export interface SliderProps extends ComponentProps<"input"> {
  orientation?: "vertical" | "horizontal"
  variant?: "tube" | "rod"
  wrapperClass?: string
  asProgress?: boolean
}

const Slider = ({
  min, max, value, style,
  orientation = "horizontal",
  variant = "tube",
  className, wrapperClass,
  asProgress,
  ...props
}: SliderProps) => {
  // todo: start range
  return (
    <div
      className={classes(styles.wrapper, wrapperClass)}
      data-variant={variant}
      data-is-progress={asProgress}
      aria-orientation={props["aria-orientation"] || orientation}
      style={
        {
          "--value": `${max ? (((value as number) / (max as number)) * 100) : 0}%`,
          ...style,
        } as React.CSSProperties
      }
    >
      <input
        type="range"
        className={classes(styles.input, className)}
        min={min} max={max} value={value}
        {...props}
        aria-orientation={props["aria-orientation"] || orientation}
      />
    </div>
  );
};

export default Slider;

import React, { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Slider.module.scss";

export interface SliderProps extends ComponentProps<"input"> {
  orientation?: "vertical" | "horizontal"
  variant?: "tube" | "rod"
  wrapperClass?: string
  showFill?: boolean
}

const Slider = ({
  min, max, value, style,
  orientation = "horizontal",
  variant = "tube",
  className, wrapperClass,
  showFill,
  ...props
}: SliderProps) => {
  // todo: start range
  return (
    <div
      className={classes(styles.wrapper, showFill && styles.filled, wrapperClass)}
      data-variant={variant}
      data-is-progress={showFill}
      aria-orientation={props["aria-orientation"] || orientation}
      style={
        {
          "--value": `${max ? (((value as number) / (max as number)) * 100) : 0}%`,
          ...style,
        } as React.CSSProperties
      }
      {...(props.dir ? { dir: props.dir } : {})}
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

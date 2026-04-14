import { ComponentProps } from "react";

import { TOrientation } from "@/lib/types/general";
import { classes } from "@/lib/utils/style";

import styles from "./Slider.module.scss";

export interface SliderProps extends ComponentProps<"input"> {
  orientation?: TOrientation;
  variant?: "tube" | "rod";
  wrapperClass?: string;
  showFill?: boolean;
}

const Slider = ({
  min = 0, max = 100, value, style,
  orientation = "horizontal",
  variant = "tube",
  className, wrapperClass,
  showFill,
  ...props
}: SliderProps) => {
  // todo: start range
  return (
    <div
      className={classes(styles.slider, showFill && styles.filled, wrapperClass)}
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
        min={min} max={max} value={value}
        className={classes(styles.slider_input, className)}
        {...props}
        aria-orientation={props["aria-orientation"] || orientation}
      />
    </div>
  );
};

export default Slider;

import { ComponentProps, CSSProperties } from "react";

import CircularProgress from "@/lib/components/elements/Progress/CircularProgress";
import { classes } from "@/lib/utils/style";

import styles from "./Progress.module.scss";

export interface ProgressProps extends ComponentProps<"progress"> {
  variant?: "linear" | "circular";
  value?: number;
  useSvg?: boolean;
  indeterminate?: boolean;
  thickness?: number;
}

const Progress = ({
  variant = "linear", useSvg = true, indeterminate, thickness,
  className, children, value, onChange, onInput, onInputCapture, onChangeCapture,
  ...props
}: ProgressProps) => {
  const isIndeterminate = value == undefined || indeterminate;

  // todo: start & end angle

  return (
    <div
      className={classes(styles.wrapper, styles[variant], className)}
      style={{ "--value": `${value}%` } as CSSProperties}
      data-svg={useSvg}
      data-indeterminate={isIndeterminate}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {(variant === "circular" && useSvg) && (
        <CircularProgress value={value ?? 0} indeterminate={isIndeterminate} thickness={thickness} />
      )}
      <div className={styles.progress}></div>
      {!!(onChange || onInput || onInputCapture || onChangeCapture) && (
        <progress value={value} {...props}></progress>
      )}
      {children}
    </div>
  );
};

export default Progress;

import { ComponentProps, CSSProperties } from "react";

import CircularProgress from "@/lib/ui/elements/Progress/CircularProgress";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Progress.module.scss";

export interface ProgressProps extends ComponentProps<"progress"> {
  variant?: "linear" | "circular";
  value?: number;
  useSvg?: boolean;
  indeterminate?: boolean;
}

const Progress = ({
  variant = "linear", useSvg = true, indeterminate,
  className, children, value,
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
        <CircularProgress value={value ?? 0} indeterminate={isIndeterminate} />
      )}
      <div className={styles.progress}></div>
      <progress value={value} {...props}></progress>
      {children}
    </div>
  );
};

export default Progress;

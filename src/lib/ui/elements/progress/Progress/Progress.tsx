import React, { ComponentProps, CSSProperties } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Progress.module.scss";

export interface ProgressProps extends ComponentProps<"progress"> {
  variant?: "linear" | "circular"
}

const Progress = ({
  variant = "linear",
  className, children, value,
  ...props
}: ProgressProps) => {
  return (
    <div
      className={classes(styles.wrapper, styles[variant], className)}
      style={{ "--value": `${value}%` } as CSSProperties}
      data-value={value ?? true}
    >
      <div className={styles.progress}></div>
      <progress value={value} {...props}></progress>
      {children}
    </div>
  );
};

export default Progress;

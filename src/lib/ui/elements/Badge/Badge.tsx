import React, { ComponentProps } from "react";

import { Color } from "@/lib/types/general.types";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Badge.module.scss";

export interface BadgeProps extends ComponentProps<"div"> {
  color?: Color;
  animate?: "ripple";
  float?: "tl" | "tr" | "bl" | "br" | null;
}

const Badge = ({
  color, animate, float = "tr",
  className, children,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={classes(styles.badge, float && styles.float, float && styles[float], className)}
      data-variant={children ? "text" : "dot"}
      data-color={color}
      data-animate={animate}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;

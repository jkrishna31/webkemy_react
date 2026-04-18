import { ComponentProps } from "react";

import { TColor } from "@/lib/types/general";
import { classes } from "@/lib/utils/style";

import styles from "./Badge.module.scss";

export interface BadgeProps extends ComponentProps<"div"> {
  color?: TColor;
  animate?: "ripple";
  float?: "tl" | "tr" | "bl" | "br" | null;
}

export const Badge = ({
  color, animate, float = "tr",
  className, children,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={classes(styles.badge, float && styles.float, float && styles[float], className)}
      data-variant={children != undefined ? "text" : "dot"}
      data-color={color}
      data-animate={animate}
      {...props}
    >
      {children}
    </div>
  );
};

import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style";

import styles from "./Marquee.module.scss";

export interface MarqueeProps extends ComponentProps<"div"> {
  repeat?: number;
  direction?: "left" | "right" | "up" | "down";
}

export const Marquee = ({
  repeat = 2, direction = "left",
  children, className,
  ...props
}: MarqueeProps) => {
  return (
    <div
      data-direction={direction}
      className={classes(styles.wrapper, "scroll_thin", className)}
      {...props}
    >
      <div className={classes(styles.track, "track")}>
        {Array.from({ length: repeat }).map(() => children)}
      </div>
    </div>
  );
};

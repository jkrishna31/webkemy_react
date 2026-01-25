import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./InfiniteScrollBanner.module.scss";

export interface InfiniteScrollBannerProps extends ComponentProps<"div"> {
  repeat?: number;
  direction?: "left" | "right" | "up" | "down";
}

const InfiniteScrollBanner = ({
  repeat = 2, direction = "left",
  children, className,
  ...props
}: InfiniteScrollBannerProps) => {
  return (
    <div
      data-direction={direction}
      className={classes(styles.wrapper, "scroll_thin", "className")}
      {...props}
    >
      <div className={styles.track}>
        {Array.from({ length: repeat }).map(() => children)}
      </div>
    </div>
  );
};

export default InfiniteScrollBanner;

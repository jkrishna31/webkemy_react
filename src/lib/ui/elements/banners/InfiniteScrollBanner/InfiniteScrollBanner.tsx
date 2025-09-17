import React, { ComponentProps } from "react";

import styles from "./InfiniteScrollBanner.module.scss";

export interface InfiniteScrollBannerProps extends ComponentProps<"div"> {
  repeat?: number
}

const InfiniteScrollBanner = ({
  children, className, repeat = 2,
  ...props
}: InfiniteScrollBannerProps) => {
  return (
    <div className={`${styles.wrapper} scroll_thin ${className}`} {...props}>
      {
        Array.from({ length: repeat }).map((_, idx) => (
          <ul key={idx} aria-hidden={!!idx}>
            {children}
          </ul>
        ))
      }
    </div>
  );
};

export default InfiniteScrollBanner;

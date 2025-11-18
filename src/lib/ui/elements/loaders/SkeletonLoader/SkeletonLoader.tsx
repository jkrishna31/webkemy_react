import React, { ComponentProps, ElementType } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./SkeletonLoader.module.scss";

export type SkeletonLoaderProps<T extends ElementType> = {
  as?: T;
  loading?: boolean;
} & ComponentProps<T>;

const SkeletonLoader = <T extends ElementType = "div">({
  as = "div",
  loading,
  className, children,
  ...props
}: SkeletonLoaderProps<T>) => {
  const Element = as;

  return (
    <Element
      className={classes("skeleton", styles.loader, className)}
      data-loading={loading}
      {...props}
    >
      {children}
    </Element>
  );
};

export default SkeletonLoader;

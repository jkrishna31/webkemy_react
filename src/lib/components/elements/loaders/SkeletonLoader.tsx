import { ComponentProps, ElementType } from "react";

import { classes } from "@/lib/utils/style";

export type SkeletonLoaderProps<T extends ElementType> = {
  as?: T;
  loading?: boolean;
} & ComponentProps<T>;

export const SkeletonLoader = <T extends ElementType = "div">({
  as = "div",
  loading = true,
  className, children,
  ...props
}: SkeletonLoaderProps<T>) => {
  const Element = as;

  return (
    <Element
      className={classes("skeleton", className)}
      data-loading={loading}
      {...props}
    >
      {children}
    </Element>
  );
};

import { ComponentProps, ElementType, ReactNode } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Text.module.scss";

type TextTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "label" | "legend";

export type TextProps<T extends ElementType> = {
  as?: T;
  inline?: boolean;
  normal?: boolean;
  children?: ReactNode;
  disabled?: boolean;
} & ComponentProps<T>;

const Text = <T extends ElementType = "p">({
  as = "p", inline, normal, disabled,
  children, className,
  ...props
}: TextProps<T>) => {
  const Element = as;

  return (
    <Element
      className={classes(styles[as], className)}
      data-inline={inline} data-normal={normal}
      aria-disabled={props["aria-disabled"] || disabled}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Text;

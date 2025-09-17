import Link from "next/link";
import React, { ComponentProps, ElementType } from "react";

import styles from "./Avatar.module.scss";

export type AvatarType = "div" | "button" | "a";

export type AvatarProps<T extends ElementType> = {
  as?: T;
} & ComponentProps<T>;

const Avatar = <T extends ElementType = "div">({
  as = "div",
  className,
  children,
  ...props
}: AvatarProps<T>) => {
  const Element = as !== "a" ? as : Link;

  return (
    <Element className={`${styles.avatar} ${className}`} data-avatar {...props}>
      {children}
    </Element>
  );
};

export default Avatar;

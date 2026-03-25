import Image from "next/image";
import Link from "next/link";
import { ComponentProps, ElementType } from "react";

import { classes } from "@/lib/utils/style";

import styles from "./Avatar.module.scss";

export type AvatarType = "div" | "button" | "a";

export type AvatarProps<T extends ElementType> = {
  as?: T;
  src?: string;
  alt?: string;
} & ComponentProps<T>;

const Avatar = <T extends ElementType = "div">({
  as = "div", src, alt,
  className,
  children,
  ...props
}: AvatarProps<T>) => {
  const Element = as !== "a" ? as : Link;

  return (
    <Element
      className={classes(styles.avatar, className)}
      data-avatar
      {...props}
    >
      {!!src && <Image src={src} alt={alt} width={40} height={40} />}
      {children}
    </Element>
  );
};

export default Avatar;

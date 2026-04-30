import Image from "next/image";
import Link from "next/link";
import { ComponentProps, ElementType } from "react";

import UserIcon from "@/lib/svgs/icons/UserIcon";
import { classes } from "@/lib/utils/style";

import styles from "./Avatar.module.scss";

export type AvatarType = "div" | "button" | "a";

export type AvatarProps<T extends ElementType> = {
  as?: T;
  src?: string;
  alt?: string;
} & ComponentProps<T>;

export const Avatar = <T extends ElementType = "div">({
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
      {!src && !children && <UserIcon className={styles.placeholder} />}
      {children}
    </Element>
  );
};

export interface AvatarsListProps<T extends ElementType> extends ComponentProps<"div"> {
  avatars?: AvatarProps<T>[];
  expandable?: boolean;
}

const List = <T extends ElementType>({
  avatars, className, expandable = true,
  ...props
}: AvatarsListProps<T>) => {
  return (
    <div className={classes(styles.list, expandable && styles.expandable, className)} {...props}>
      {
        avatars?.map((avatar) => {
          return (
            <Avatar key={avatar.id || avatar.alt} {...avatar} />
          );
        })
      }
    </div>
  );
};

Avatar.List = List;

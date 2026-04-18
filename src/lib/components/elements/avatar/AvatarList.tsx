import { ComponentProps, ElementType } from "react";

import { Avatar, type AvatarProps } from "@/lib/components/elements/avatar";
import { classes } from "@/lib/utils/style";

import styles from "./AvatarList.module.scss";

export interface AvatarsListProps<T extends ElementType> extends ComponentProps<"div"> {
  avatars?: AvatarProps<T>[];
  expandable?: boolean;
}

export const AvatarList = <T extends ElementType>({
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

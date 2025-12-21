import React, { ComponentProps, ElementType } from "react";

import { Avatar, type AvatarProps } from "@/lib/ui/elements/Avatar";
import { classes } from "@/lib/utils/style.utils";

import styles from "./AvatarList.module.scss";

export interface AvatarsListProps<T extends ElementType> extends ComponentProps<"div"> {
  avatars?: AvatarProps<T>[];
  expandable?: boolean;
}

const AvatarList = <T extends ElementType>({
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

export default AvatarList;

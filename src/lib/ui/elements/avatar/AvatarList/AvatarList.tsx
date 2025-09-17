import React, { ComponentProps, ElementType } from "react";

import { Avatar, AvatarProps } from "..";
import styles from "./AvatarList.module.scss";

export interface AvatarsListProps<T extends ElementType> extends ComponentProps<"div"> {
  avatars?: AvatarProps<T>[]
}

const AvatarList = <T extends ElementType>({
  avatars, className,
  ...props
}: AvatarsListProps<T>) => {
  return (
    <div className={`${styles.list} ${className}`} {...props}>
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

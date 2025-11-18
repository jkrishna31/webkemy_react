import React, { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./MenuGroup.module.scss";

export interface MenuGroupProps extends ComponentProps<"div"> {
  collapsible?: boolean
  headerClass?: string
}

const MenuGroup = ({
  collapsible, headerClass,
  className, children,
  title,
  ...props
}: MenuGroupProps) => {
  // todo: collapsible
  return (
    <div className={classes(styles.group, className)} {...props}>
      <div className={classes(styles.header, headerClass)}>
        <p>{title}</p>
      </div>
      <div className={classes(styles.body, "body")}>
        {children}
      </div>
    </div>
  );
};

export default MenuGroup;

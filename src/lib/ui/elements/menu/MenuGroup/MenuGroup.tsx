import React, { ComponentProps } from "react";

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
    <div className={`${styles.group} ${className}`} {...props}>
      <div className={`${styles.header} ${headerClass}`}>
        <p>{title}</p>
      </div>
      <div className={`${styles.body} body`}>
        {children}
      </div>
    </div>
  );
};

export default MenuGroup;

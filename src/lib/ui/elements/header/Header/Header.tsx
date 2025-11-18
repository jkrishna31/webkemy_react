import React, { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Header.module.scss";

export interface HeaderProps extends ComponentProps<"header"> {
  visible?: boolean
}

const Header = ({
  children, className,
  visible,
  ...props
}: HeaderProps) => {
  return (
    <header
      className={classes(styles.header, className)}
      data-invisible={!visible}
      {...props}
    >
      {children}
    </header>
  );
};

export default Header;

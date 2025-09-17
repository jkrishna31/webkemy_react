import React, { ComponentProps } from "react";

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
      className={`${styles.header} ${className}`}
      data-invisible={!visible}
      {...props}
    >
      {children}
    </header>
  );
};

export default Header;

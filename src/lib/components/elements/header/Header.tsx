import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style";

import styles from "./Header.module.scss";

export interface HeaderProps extends ComponentProps<"header"> {
  visible?: boolean
}

export const Header = ({
  children, className,
  visible,
  ...props
}: HeaderProps) => {
  return (
    <header
      className={classes(styles.header, !visible && styles.hide, className)}
      data-invisible={!visible}
      {...props}
    >
      {children}
    </header>
  );
};

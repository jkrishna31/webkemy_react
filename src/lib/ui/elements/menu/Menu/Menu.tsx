import React, { ComponentProps } from "react";

import styles from "./Menu.module.scss";

export interface MenuProps extends ComponentProps<"div"> {
  minimized?: boolean;
}

const Menu = ({
  minimized,
  children, className,
  ...props
}: MenuProps) => {
  // on pointer enter/leave
  // use one popper component
  // if there is a closest menuitem then add to the reference 

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      data-minimized={minimized}
      {...props}
    >
      {children}
    </div>
  );
};

export default Menu;

import React, { ComponentProps } from "react";

import styles from "./FloatBox.module.scss";

export interface FloatBoxProps extends ComponentProps<"div"> {

}

const FloatBox = ({
  children, className, style,
}: FloatBoxProps) => {
  return (
    <div tabIndex={0} role="toolbar" className={`${styles.wrapper} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default FloatBox;

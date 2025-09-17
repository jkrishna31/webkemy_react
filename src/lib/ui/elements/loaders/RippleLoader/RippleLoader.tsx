import React, { ComponentProps } from "react";

import styles from "./RippleLoader.module.scss";

export interface CircularLoaderProps extends ComponentProps<"div"> {

}

const RippleLoader = ({ className, ...props }: CircularLoaderProps) => {
  return (
    <div className={`${styles.loader} ${className}`} {...props}></div>
  );
};

export default RippleLoader;

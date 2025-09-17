import React, { ComponentProps } from "react";

import styles from "./SkeletonLoader.module.scss";

interface Props extends ComponentProps<"div"> { }

const SkeletonLoader = ({ className, children }: Props) => {
  return (
    <div className={`${styles.loader} ${className}`}>
      {children}
    </div>
  );
};

export default SkeletonLoader;

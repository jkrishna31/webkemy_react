import React, { ComponentProps } from "react";

import styles from "./BannerItem.module.scss";

export interface BannerItemProps extends ComponentProps<"li"> {

}

const BannerItem = ({
  children, className,
  ...props
}: BannerItemProps) => {
  return (
    <li className={`${styles.wrapper} ${className}`} {...props}>
      {children}
    </li>
  );
};

export default BannerItem;

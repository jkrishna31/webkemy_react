import React, { ComponentProps } from "react";

import styles from "./CarouselItem.module.scss";

export interface CarouselItemProps extends ComponentProps<"div"> {

}

const CarouselItem = ({
  children, className,
  ...props
}: CarouselItemProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {children}
    </div>
  );
};

export default CarouselItem;

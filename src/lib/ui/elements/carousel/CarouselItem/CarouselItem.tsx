import React, { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./CarouselItem.module.scss";

export interface CarouselItemProps extends ComponentProps<"div"> {

}

const CarouselItem = ({
  children, className,
  ...props
}: CarouselItemProps) => {
  return (
    <div className={classes(styles.wrapper, className)}>
      {children}
    </div>
  );
};

export default CarouselItem;

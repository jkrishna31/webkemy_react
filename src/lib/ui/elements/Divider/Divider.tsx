import React, { ComponentProps } from "react";

import { Orientation } from "@/lib/types/general.types";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Divider.module.scss";

export interface DividerProps extends ComponentProps<"hr"> {
  orientation?: Orientation;
}

const Divider = ({
  orientation,
  className, children,
  ...restProps
}: DividerProps) => {
  return (
    <div className={classes(styles.divider, className)} {...restProps}>{children}</div>
  );
};

export default Divider;

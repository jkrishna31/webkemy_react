import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./ComparatorItem.module.scss";

export interface ComparatorItemProps extends ComponentProps<"div"> {
  position: "top_left" | "top_right" | "bottom_left" | "bottom_right";
  use?: "clip" | "mask";
}

const ComparatorItem = ({
  position, use = "clip",
  className, children,
  ...restProps
}: ComparatorItemProps) => {
  return (
    <div
      className={classes(styles.wrapper, styles[use], styles[position], className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default ComparatorItem;

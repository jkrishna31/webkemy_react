import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./GridItem.module.scss";

export interface GridItemProps extends ComponentProps<"div"> {

}

const GridItem = ({
  className, children,
  ...restProps
}: GridItemProps) => {
  return (
    <div className={classes(styles.grid_item, className)} {...restProps}>

    </div>
  );
};

export default GridItem;

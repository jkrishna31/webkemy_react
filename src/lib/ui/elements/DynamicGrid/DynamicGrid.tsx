import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./DynamicGrid.module.scss";

export interface DynamicGridProps extends ComponentProps<"div"> {
  rows?: number;
  cols?: number;
  showGrid?: boolean;
}

const DynamicGrid = ({
  rows, cols, showGrid,
  className, children,
  ...restProps
}: DynamicGridProps) => {
  // jobs:
  // show grid (when dragging, resizing)

  return (
    <div
      className={classes(styles.dynamic_grid, className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default DynamicGrid;

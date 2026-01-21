import { ComponentProps } from "react";

import { Resizable, Resizers } from "@/lib/ui/elements/Resizable";
import { classes } from "@/lib/utils/style.utils";

import styles from "./GridItem.module.scss";

export interface GridItemProps extends ComponentProps<"div"> {
  position?: { row?: [number, number]; col?: [number, number]; };
  resizers?: Resizers[];
}

const GridItem = ({
  position, resizers,
  className, children, style,
  ...restProps
}: GridItemProps) => {
  const { row, col } = position ?? {};
  const [rowStart, rowEnd] = row ?? ["auto", "auto"];
  const [colStart, colEnd] = col ?? ["auto", "auto"];

  return (
    <Resizable
      resizers={resizers}
      className={classes(styles.grid_item)}
      contentClass={className}
      style={{ ...style, gridArea: `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}` }}
      {...restProps}
    >
      {children}
    </Resizable>
  );
};

export default GridItem;

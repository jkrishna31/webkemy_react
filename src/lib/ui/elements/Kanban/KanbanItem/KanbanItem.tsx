import { ComponentProps } from "react";

import { Resizable } from "@/lib/ui/elements/Resizable";
import { classes } from "@/lib/utils/style.utils";

import styles from "./KanbanItem.module.scss";

const resizers = ["b"];

export interface KanbanItemProps extends ComponentProps<"div"> {
  itemKey?: string | number;
}

const KanbanItem = ({
  itemKey,
  className, children,
  ...restProps
}: KanbanItemProps) => {
  // todo: resizable, draggable

  return (
    <Resizable
      className={classes(styles.item, className)}
      // resizers={resizers}
      draggable
    >
      {children}
    </Resizable>
  );
};

export default KanbanItem;

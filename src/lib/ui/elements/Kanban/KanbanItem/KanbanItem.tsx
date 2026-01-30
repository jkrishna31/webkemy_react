import { ComponentProps } from "react";

import { Resizable } from "@/lib/ui/elements/Resizable";
import { classes } from "@/lib/utils/style.utils";

import styles from "./KanbanItem.module.scss";

const resizers = ["b"];

export interface KanbanItemProps extends ComponentProps<"div"> {
  itemKey?: string | number;
  isDraggingOver?: boolean;
  layout?: "horizontal" | "vertical";
}

const KanbanItem = ({
  itemKey, isDraggingOver, layout = "horizontal",
  className, children,
  ...restProps
}: KanbanItemProps) => {
  return (
    <Resizable
      data-item-key={itemKey}
      data-dragging-over={isDraggingOver}
      data-layout={layout}
      className={classes(styles.item, className)}
      // resizers={resizers}
      draggable
      {...restProps}
    >
      {children}
    </Resizable>
  );
};

export default KanbanItem;

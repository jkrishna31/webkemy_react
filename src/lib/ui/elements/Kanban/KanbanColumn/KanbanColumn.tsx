import { ComponentProps, ReactNode, useState } from "react";

import { Color } from "@/lib/types/general.types";
import { Button } from "@/lib/ui/elements/butttons";
import { Chip } from "@/lib/ui/elements/Chip";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./KanbanColumn.module.scss";

export interface KanbanColProps extends ComponentProps<"div"> {
  colKey?: string;
  layout?: "horizontal" | "vertical";
  color?: Color;
  name?: ReactNode;
  count?: number;
  header?: ReactNode | null;
  footer?: ReactNode | null;
  collapsed?: boolean;
  onCollapseChange?: (value: boolean) => void;
  isDraggingOver?: boolean;
}

const KanbanColumn = ({
  colKey, layout = "horizontal", color, name, count, header, footer, collapsed, onCollapseChange, isDraggingOver,
  children, className,
  ...restProps
}: KanbanColProps) => {

  const [openActionMenu, setOpenActionMenu] = useState(false);

  return (
    <div
      data-col-key={colKey}
      data-layout={layout}
      data-collapsed={collapsed}
      data-dragging-over={isDraggingOver}
      className={classes(styles.column, layout && styles[layout], className)}
      {...restProps}
    >
      {header !== null && (header ?? (
        <div
          className={styles.header}
          draggable
        >
          <p className={styles.name}>{name}</p>
          <Chip className={styles.chip} color={color}>{count}</Chip>

          <Button
            variant="quaternary"
            className={styles.collapse_btn}
            onClick={() => onCollapseChange?.(!collapsed)}
          >
            <ChevronLeftIcon />
          </Button>
        </div>
      ))}

      {!collapsed && !!children && (
        <div className={styles.body}>
          <div className={styles.inner}>
            {children}
          </div>
        </div>
      )}

      {footer}
    </div>
  );
};

export default KanbanColumn;

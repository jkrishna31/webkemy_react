import { ComponentProps, ReactNode, useState } from "react";

import { Button } from "@/lib/components/elements/butttons";
import { Chip } from "@/lib/components/elements/chip";
import ChevronLeftIcon from "@/lib/svgs/icons/ChevronLeftIcon";
import { TColor } from "@/lib/types/general";
import { classes } from "@/lib/utils/style";

import styles from "./KanbanColumn.module.scss";

export interface KanbanColProps extends ComponentProps<"div"> {
  colKey?: string;
  layout?: "horizontal" | "vertical";
  color?: TColor;
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
            variant="muted"
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

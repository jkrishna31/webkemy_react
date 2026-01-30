import { ComponentProps, ReactNode, useState } from "react";

import { useElementRef } from "@/lib/hooks/useElementRef";
import { Color } from "@/lib/types/general.types";
import { Button } from "@/lib/ui/elements/butttons";
import { Chip } from "@/lib/ui/elements/Chip";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Popover } from "@/lib/ui/elements/Popover";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import MenuCollapseIcon from "@/lib/ui/svgs/icons/MenuCollapseIcon";
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
  const { element: actionTriggerElem, ref: actionTriggerElemRef } = useElementRef<HTMLButtonElement>();

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

          <Button
            ref={actionTriggerElemRef}
            variant="quaternary"
            className={styles.action_btn}
            onClick={() => setOpenActionMenu(!openActionMenu)}
          >
            <EllipsisHIcon />
          </Button>

          {(openActionMenu && !!actionTriggerElem) && (
            <Popover
              anchor={actionTriggerElem}
              onClose={() => setOpenActionMenu(!openActionMenu)}
              animation="slide"
              className={styles.action_popover}
            >
              <ItemList>
                <Item
                  primary={collapsed ? "Expand" : "Collapse"}
                  icon={<MenuCollapseIcon />}
                  scope="list"
                  onClick={() => {
                    onCollapseChange?.(!collapsed);
                    setOpenActionMenu(false);
                  }}
                />
                {/* <Item primary="Move Left" icon={<ChevronLeftIcon />} scope="list" />
                <Item primary="Move Right" icon={<ChevronRightIcon />} scope="list" />
                <Item primary="Move to Start" icon={<ChevronsLeftIcon />} scope="list" />
                <Item primary="Move to End" icon={<ChevronsRightIcon />} scope="list" />
                <Item primary="Add Col Left" icon={<ColAddLeftIcon />} scope="list" />
                <Item primary="Add Col Right" icon={<ColAddRightIcon />} scope="list" /> */}
              </ItemList>
            </Popover>
          )}
        </div>
      ))}

      {!collapsed && (
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

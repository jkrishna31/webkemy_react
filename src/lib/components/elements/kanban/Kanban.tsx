import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style";

import styles from "./Kanban.module.scss";

export interface KanbanProps extends ComponentProps<"div"> {
  mode?: "combined" | "separate";
  layout?: "horizontal" | "vertical";
}

export const Kanban = ({
  mode, layout = "horizontal",
  className, children,
  ...restProps
}: KanbanProps) => {
  return (
    <div
      className={classes(styles.kanban, layout && styles[layout], className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

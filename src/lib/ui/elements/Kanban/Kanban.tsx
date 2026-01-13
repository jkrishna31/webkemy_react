import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./Kanban.module.scss";

export interface KanbanProps extends ComponentProps<"div"> {

}

const Kanban = ({
  className, children,
  ...restProps
}: KanbanProps) => {
  // columns

  return (
    <div
      className={classes(styles.wrapper, className)}
    >
    </div>
  );
};

export default Kanban;

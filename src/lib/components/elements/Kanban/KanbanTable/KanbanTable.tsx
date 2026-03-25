import { ComponentProps, useRef } from "react";

import styles from "./KanbanTable.module.scss";

export interface KanbanTableProps extends ComponentProps<"table"> {

}

const KanbanTable = ({
  className, children,
  ...restProps
}: KanbanTableProps) => {
  const isDropped = useRef<boolean>(false);
  const tableRef = useRef<HTMLTableElement>(null);

  return (
    <table
      ref={tableRef}
      className={styles.table}
    >
      <thead>

      </thead>
      <tbody>

      </tbody>
    </table>
  );
};

export default KanbanTable;

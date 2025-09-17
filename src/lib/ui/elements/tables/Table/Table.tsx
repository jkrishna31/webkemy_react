"use client";

import React, { ComponentProps, ReactNode } from "react";

import { SortBtn } from "@/lib/ui/elements/butttons";

import styles from "./Table.module.scss";

export type DragType = "reorder" | "transfer";
export type StickType = "left" | "right" | "both";
export interface TableCol<T> {
  key: string;
  accessor?: string | number;
  renderHeadLeft?: ReactNode;
  renderHeadRight?: ReactNode;
  renderBodyCell: (record: T) => ReactNode;
  sticky?: StickType;
  allowSort?: boolean;
  draggable?: boolean;
}

export interface TableProps<T> extends ComponentProps<"div"> {
  data: Array<T>;
  columns: Array<TableCol<T>>;
  stickyHeader?: boolean;
  sort?: string;
  onSort?: (key: string) => void;
  rootClass?: string;
  colDrag?: boolean;
  rowDrag?: boolean;
}

const getSort = (columnKey: string, sort?: string): "+" | "-" | undefined => {
  if (!sort) return;
  if (!sort.includes(columnKey)) return;

  if (sort.startsWith("-")) return "-";
  return "+";
};

const getStickyClasses = (sticky?: StickType) => {
  switch (sticky) {
    case "left":
      return styles.sc_left;
    case "right":
      return styles.sc_right;
    case "both":
      return `${styles.sc_left} ${styles.sc_right}`;
    default:
      return "";
  }
};

const getCellStyle = (
  totalCols: number, index: number, stick?: StickType,
): React.CSSProperties => {
  const style: React.CSSProperties = {};
  if (stick === "left" || stick === "both") style.zIndex = totalCols - index;
  if (stick === "right") style.zIndex = index;
  return style;
};

const Table = <T extends { id: string }>({
  data,
  columns,
  stickyHeader,
  sort, onSort,
  className, rootClass,
  colDrag, rowDrag,
  ...props
}: TableProps<T>) => {

  // if drag type is REORDER -- show the line on left/right side of the cells for the candidate position

  // if drag type is TRANSFER -- highlight the on hover cells

  // disable the row/column being dragged by reducing opacity of tr for row or individual cell for the column
  // how to highlight the candidate position for reorder in column
  // can use border since default is 1px otherwise will always have to give the transparent parent or higher width
  // use pseudo element

  // useTable hook
  // sort
  // column order

  const handleSort = (columnKey: string) => {
    let newSort = "";
    if (!sort || !sort.includes(columnKey)) {
      newSort = columnKey;
    } else if (sort === columnKey) {
      newSort = `-${columnKey}`;
    } else {
      newSort = "";
    }
    onSort?.(newSort);
  };

  return (
    <div className={`${styles.wrapper} ${rootClass}`}>
      <table className={`${styles.table} ${className}`}>
        <thead>
          <tr>
            {
              columns?.map((column, index) => {
                return (
                  <th
                    data-column={column.key}
                    draggable={column?.draggable}
                    key={column.key}
                    className={`${styles.cell} ${styles.header_cell} ${stickyHeader ? styles.sc_th : ""} ${getStickyClasses(column.sticky)}`}
                    style={getCellStyle(columns.length, index, column.sticky)}
                  >
                    <div>
                      {column.renderHeadLeft}
                      {
                        column.allowSort ? (
                          <SortBtn
                            sort={getSort(column.key, sort)}
                            onClick={() => handleSort(column.key)}
                            className={styles.sort_btn}
                          />
                        ) : null
                      }
                      {column.renderHeadRight}
                    </div>
                  </th>
                );
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            data?.map((row) => {
              return (
                <tr key={row.id}>
                  {
                    columns?.map((column, index) => {
                      return (
                        <td
                          key={row.id + column.key}
                          className={`${styles.cell} ${column.sticky ? styles.sc_td : ""} ${getStickyClasses(column.sticky)}`}
                          style={getCellStyle(columns.length, index, column.sticky)}
                        >
                          {column.renderBodyCell(row)}
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;

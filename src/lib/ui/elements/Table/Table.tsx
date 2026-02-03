"use client";

import { ComponentProps, ElementType, Fragment, ReactNode } from "react";

import { SortBtn } from "@/lib/ui/elements/butttons";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Table.module.scss";

export type StickType = "left" | "right" | "both";

export interface TableLayout {
  id: string;
  rowSpan?: number;
  colSpan?: number;
  width?: number;
  children?: TableLayout[];
}

export interface TableProps extends ComponentProps<"div"> {
  rootClass?: string;
}

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

const Table = ({
  className, rootClass, children,
  ...restProps
}: TableProps) => {
  return (
    <div
      className={classes(styles.wrapper, rootClass)}
      {...restProps}
    >
      <table
        className={classes(styles.table, className)}
      >
        {children}
      </table>
    </div>
  );
};


type TableCellProps<T extends ElementType> = {
  as?: ElementType;
  colKey?: string;
  isDragging?: boolean;
  draggingOver?: "before" | "after" | "in";
  resizable?: boolean;
  sortable?: boolean;
  sticky?: StickType;
  sort?: "+" | "-";
  onSort?: (key: string) => void;
  width?: number;
  zIndex?: number;
} & ComponentProps<T>

const TableCell = <T extends ElementType = "th">({
  as = "th",
  colKey, isDragging, draggingOver, resizable, sortable, sticky, onSort, sort, width, zIndex,
  className, style, children, draggable,
  ...restProps
}: TableCellProps<T>) => {
  const Element = as;

  return (
    <Element
      {...restProps}
      {...(as === "th" ? {
        "data-column": colKey,
        "data-dragging": isDragging,
        "data-drag-over": draggingOver,
      } : {})}
      className={classes(styles.cell, as === "th" && styles.hcell, sticky && styles.sc, getStickyClasses(sticky), className)}
      style={{
        ...style,
        // ...getCellStyle(rootCols.length, hcIdx, sticky, true),
        "--col-width": width ? `${width}px` : "inherit",
        zIndex: zIndex,
      }}
      draggable={draggable || sortable}
      tabIndex={draggable ? 0 : undefined}
    >
      <div className={classes(as === "th" && styles.hcell_container)}>
        {children}
        {
          sortable ? (
            <SortBtn
              sort={sort}
              onClick={() => onSort?.(colKey)}
              className={styles.sort_btn}
            />
          ) : null
        }
        {resizable && (
          <button
            aria-label="Resize Column"
            title="Resize Column"
            data-resize={colKey}
            className={styles.resize_handle}
          // style={{ "--zi-resize-handle": rootCols.length * 2 } as React.CSSProperties}
          >
          </button>
        )}
      </div>
    </Element>
  );
};


interface TableHeaderProps extends ComponentProps<"thead"> {
  isSticky?: boolean;
}

const TableHeader = ({
  isSticky,
  className, children,
  ...restProps
}: TableHeaderProps) => {
  return (
    <thead
      className={classes(styles.thead, isSticky && styles.sticky_header, className)}
      {...restProps}
    >
      {children}
    </thead>
  );
};


export interface TableBody<T> extends ComponentProps<"tbody"> {
  renderRow?: (row: T, parent?: string, depth?: number) => ReactNode;
  data?: T[];
}

const TableBody = <T extends { id: string; children?: T[] }>({
  renderRow, data,
  className, children,
  ...restProps
}: TableBody<T>) => {
  const renderRows = (rows?: T[], parent?: string, depth = 0) => {
    return rows?.map(row => {
      return (
        <Fragment key={row.id}>
          {renderRow?.(row, parent, depth)}
          {renderRows(row.children, row.id, depth + 1)}
        </Fragment>
      );
    });
  };

  return (
    <tbody
      className={classes(styles.tbody, className)}
      {...restProps}
    >
      {renderRows(data)}
      {children}
    </tbody>
  );
};


export interface TableFooterProps extends ComponentProps<"tfoot"> {
  isSticky?: boolean;
}

const TableFooter = ({
  isSticky,
  className, children,
  ...restProps
}: TableFooterProps) => {
  return (
    <tfoot
      className={classes(styles.tfoot, isSticky && styles.sticky_footer, className)}
      {...restProps}
    >
      {children}
    </tfoot>
  );
};


Table.Header = TableHeader;
Table.Cell = TableCell;
Table.Body = TableBody;
Table.Footer = TableFooter;

export default Table;

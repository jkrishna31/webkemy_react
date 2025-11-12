import React, { ComponentProps, ComponentPropsWithoutRef, Fragment, ReactNode, useMemo, useState } from "react";

import { SortBtn } from "@/lib/ui/elements/butttons";
import { CollapsibleContainer } from "@/lib/ui/elements/collapsible";

import styles from "./Table.module.scss";

export type DragType = "reorder" | "transfer";
export type StickType = "left" | "right" | "both";

export interface TableLayout {
  key: string;
  rowSpan?: number;
  colSpan?: number;
  width?: number;
  children?: TableLayout[];
}

export interface RootCellItem {
  as?: "th" | "td";
  sticky?: StickType;
  sortable?: boolean;
  resizable?: boolean;
}

export interface CellItem<T> extends ComponentPropsWithoutRef<"td"> {
  as?: "th" | "td";
}

export interface HeaderItem<T> extends RootCellItem, ComponentPropsWithoutRef<"th"> {
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
}

export interface BodyCellItem<T> extends CellItem<T> {
  render?: (row: T) => ReactNode;
}

export interface FooterCellItem<T> extends RootCellItem, CellItem<T> {
  render?: ReactNode;
}

export interface TableProps<T> extends ComponentProps<"div"> {
  layout?: TableLayout[];
  header?: {
    [key: string]: HeaderItem<T>;
  };
  body?: {
    [key: string]: BodyCellItem<T>;
  };
  footer?: {
    [key: string]: FooterCellItem<T>;
  };
  data: Array<T>;
  expandedRows?: string[];
  sort?: string;
  onSort?: (key: string) => void;
  onColResize?: (key: string, width: number) => void;
  onColDrop?: (payload: any) => void;
  onRowDrop?: () => void;
  isRowCollapsible?: (record: T) => boolean;
  renderDetails?: (record: T) => ReactNode;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  renderWhileCollapsed?: boolean;
  colResizeDefer?: boolean;
  rootClass?: string;
}

const generateLayoutRows = (rows: any[], layout?: TableLayout[], depth = 0) => {
  if (!layout) return;
  for (const item of layout) {
    const children = item.children;
    delete item.children;
    if (!rows[depth]) rows[depth] = [];
    rows[depth].push({ ...item });
    generateLayoutRows(rows, children, depth + (item.rowSpan ?? 1));
  }
};

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
  totalCols: number, index: number, stick?: StickType, headerOrFooter?: boolean,
): React.CSSProperties => {
  const style: React.CSSProperties = {};
  if (stick) style.position = "sticky";
  if (stick === "left") style.zIndex = totalCols + (headerOrFooter ? 1 : 0);
  if (stick === "right" || stick === "both") style.zIndex = totalCols + (stick === "both" ? (totalCols - index) : 0) + (headerOrFooter ? 1 : 0);
  return style;
};

const Table = <T extends { id: string }>({
  data,
  layout, header, body, footer,
  sort, onSort,
  onColDrop, onRowDrop, onColResize,
  isRowCollapsible, renderDetails, expandedRows,
  stickyHeader, stickyFooter, colResizeDefer, renderWhileCollapsed = true,
  className, rootClass,
  ...props
}: TableProps<T>) => {
  const [resizingData, setResizingData] = useState<{ x: number; y: number; col: string; ogWidth?: number; }>();
  const [draggingData, setDraggingData] = useState<{ col?: string; over?: string; to?: "left" | "right"; }>();

  const headerRows: {
    key: string; rowSpan?: number; colSpan?: number; width?: number;
  }[][] = useMemo(() => {
    const rows: any[] = [];
    generateLayoutRows(rows, layout, 0);
    return rows;
  }, [layout]);

  const totalCols = headerRows.reduce((res, row) => Math.max(res, row.length), 0);

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

  const handleResize = (e: React.PointerEvent) => {
    if (!resizingData || !onColResize) return;
    if (!colResizeDefer) {
      onColResize(resizingData.col, (resizingData.ogWidth ?? 0) + (e.pageX - resizingData.x));
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!onColResize) return;
    const elem = e.target as HTMLElement;
    elem.setPointerCapture(e.pointerId);
    const resizeHandle = elem?.closest("[data-resize]");
    if (!resizeHandle) return;
    e.preventDefault();
    const colToResize = resizeHandle.closest("[data-column]") as HTMLElement;
    setResizingData({ x: e.pageX, y: e.pageY, col: colToResize.getAttribute("data-column") ?? "", ogWidth: colToResize.clientWidth });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (colResizeDefer && onColResize && resizingData) {
      onColResize(resizingData.col, (resizingData.ogWidth ?? 0) + (e.pageX - resizingData.x));
    }
    setResizingData(undefined);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== "ArrowLeft" && e.code !== "ArrowRight") return;
    if (!onColResize) return;
    const resizeHandle = (e.target as HTMLElement)?.closest("[data-resize]");
    if (!resizeHandle) return;
    const colToResize = resizeHandle.closest("[data-column]") as HTMLElement;
    e.preventDefault();
    onColResize(colToResize.getAttribute("data-column") ?? "", colToResize.clientWidth + (e.code === "ArrowLeft" ? -5 : 5));
  };

  const handleDragStart = (e: React.DragEvent) => {
    const elem = e.target as HTMLElement;
    const draggingCol = elem?.closest("[data-column]");
    const colKey = draggingCol?.getAttribute("data-column");
    if (!colKey) return;
    setDraggingData(currData => ({ ...currData, col: colKey }));
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggingData(undefined);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (e.dataTransfer.dropEffect !== "none") {
      e.preventDefault();
      onColDrop?.(draggingData);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    const elem = e.target as HTMLElement;
    const dragOverCol = elem?.closest("[data-column]");
    const colKey = dragOverCol?.getAttribute("data-column");
    const isDraggable = dragOverCol?.getAttribute("draggable");
    if (!dragOverCol || !colKey || !isDraggable) return;
    e.preventDefault();
    const colRect = dragOverCol.getBoundingClientRect();
    const toLeft = (e.pageX - colRect.x) < colRect.width / 2;
    setDraggingData(currData => ({ ...currData, over: colKey, to: toLeft ? "left" : "right" }));
  };

  return (
    <div className={`${styles.wrapper} ${rootClass}`}>
      <table className={`${styles.table} ${className}`}>
        <thead
          className={stickyHeader ? styles.sticky_header : ""}
          style={stickyHeader ? { zIndex: totalCols * 2 } : {}}
          onPointerDown={onColResize ? handlePointerDown : undefined}
          onPointerMove={(onColResize && resizingData && !colResizeDefer) ? handleResize : undefined}
          onPointerUp={onColResize ? handlePointerUp : undefined}
          onKeyDown={onColResize ? handleKeyDown : undefined}
          onDragStart={onColDrop ? handleDragStart : undefined}
          onDragEnd={onColDrop ? handleDragEnd : undefined}
          onDragOver={onColDrop ? handleDragOver : undefined}
          onDrop={onColDrop ? handleDrop : undefined}
        >
          {
            headerRows.map((hRow, hrIdx) => (
              <tr key={hrIdx}>
                {
                  hRow.map((hCell, hcIdx) => {
                    const { key, colSpan, rowSpan, width } = hCell;
                    const {
                      as, renderLeft, renderRight, sortable: sortableCol, resizable, sticky, className, style,
                      ...restProps
                    } = header?.[hCell.key] ?? {};
                    const Element = as ?? "th";
                    return (
                      <Element
                        key={key}
                        data-column={key}
                        colSpan={colSpan}
                        rowSpan={rowSpan}
                        {...restProps}
                        className={`${styles.hcell} ${getStickyClasses(sticky)} ${className}`}
                        style={{
                          ...(hCell.width ? { minWidth: width } : {}),
                          ...getCellStyle(headerRows.length, hcIdx, sticky, true),
                          ...(style ?? {})
                        }}
                        data-dragging={draggingData?.col === key}
                        data-drag-over={
                          draggingData?.over === key
                            ? draggingData?.to === "left"
                              ? "left"
                              : "right"
                            : ""
                        }
                        tabIndex={restProps.draggable && onColDrop ? 0 : undefined}
                      >
                        <div className={styles.header_cell_container}>
                          {renderLeft}
                          {
                            sortableCol ? (
                              <SortBtn
                                sort={getSort(key, sort)}
                                onClick={() => handleSort(key)}
                                className={styles.sort_btn}
                              />
                            ) : null
                          }
                          {renderRight}
                        </div>
                        {resizable && (
                          <button
                            data-resize={key}
                            className={`${styles.resize_handle}`}
                          >
                          </button>
                        )}
                      </Element>
                    );
                  })
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            data?.map((rowData) => {
              const hasCollapsibleContent = isRowCollapsible?.(rowData);
              const isExpanded = hasCollapsibleContent && expandedRows?.includes(rowData.id);
              const parentRowAttrs = hasCollapsibleContent ? { "data-expanded": isExpanded } : {};
              const cols = headerRows[0];
              return (
                <Fragment key={rowData.id}>
                  <tr {...parentRowAttrs}>
                    {
                      cols?.map((hCol, index) => {
                        const col = header?.[hCol.key];
                        const rowConfig = body?.[hCol.key];
                        const Element = rowConfig?.as ?? "td";
                        return (
                          <Element
                            key={rowData.id + hCol.key}
                            className={`${col?.sticky ? styles.sc_td : ""} ${rowConfig?.className ?? ""} ${getStickyClasses(col?.sticky)}`}
                            style={{ ...getCellStyle(cols?.length, index, col?.sticky), ...(rowConfig?.style ?? {}) }}
                          >
                            {rowConfig?.render?.(rowData)}
                          </Element>
                        );
                      })
                    }
                  </tr>
                  {hasCollapsibleContent && (
                    <tr className={styles.collapsible_row}>
                      <td colSpan={cols?.length}>
                        <CollapsibleContainer
                          open={isExpanded ?? false}
                          renderWhileClosed={renderWhileCollapsed}
                        >
                          {renderDetails?.(rowData)}
                        </CollapsibleContainer>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })
          }
        </tbody>
        <tfoot
          className={stickyFooter ? styles.sticky_footer : ""}
          style={stickyFooter ? { zIndex: totalCols * 2 } : {}}
        >
          <tr>
            {
              headerRows[0].map((hCol, index) => {
                const rowConfig = footer?.[hCol.key];
                if (!rowConfig) return null;
                const { render, as, sticky, className, style, ...restProps } = rowConfig;
                const Element = as ?? "td";
                return (
                  <Element
                    key={`fc-${hCol.key}`}
                    {...restProps}
                    className={`${getStickyClasses(sticky)} ${className}`}
                    style={{ ...getCellStyle(totalCols, index, sticky, true), ...(style ?? {}) }}
                  >
                    {render}
                  </Element>
                );
              })
            }
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;

import React, { ComponentProps, ComponentPropsWithoutRef, Fragment, ReactNode, useState } from "react";

import { SortBtn } from "@/lib/ui/elements/butttons";
import { CollapsibleContainer } from "@/lib/ui/elements/collapsible";

import styles from "./Table.module.scss";

export type DragType = "reorder" | "transfer";
export type StickType = "left" | "right" | "both";

export interface RootCellItem {
  as?: "th" | "td";
  sticky?: StickType;
  sortable?: boolean;
  resizable?: boolean;
  // draggable?: boolean;
}

export interface HeaderItem extends RootCellItem, ComponentPropsWithoutRef<"th"> {
  key: string;
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
  width?: number;
}
export interface CellItem<T> extends ComponentPropsWithoutRef<"td"> {
  as?: "th" | "td";
}

export interface BodyCellItem<T> extends CellItem<T> {
  render?: (row: T) => ReactNode;
}

export interface FooterCellItem<T> extends RootCellItem, CellItem<T> {
  render?: ReactNode;
}

export interface TableProps<T> extends ComponentProps<"div"> {
  data: Array<T>;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  sort?: string;
  onSort?: (key: string) => void;
  onColResize?: (key: string, width: number) => void;
  onColDrop?: () => void;
  onRowDrop?: () => void;
  rootClass?: string;
  isRowCollapsible?: (record: T) => boolean;
  renderDetails?: (record: T) => ReactNode;
  expandedRows?: string[];
  renderWhileCollapsed?: boolean;
  colResizeDefer?: boolean;
  header?: Array<Array<HeaderItem>>;
  body?: {
    [key: string]: BodyCellItem<T>;
  };
  footer?: {
    [key: string]: FooterCellItem<T>;
  };
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
  header, body, footer,
  stickyHeader, stickyFooter,
  sort, onSort,
  className, rootClass,
  colResizeDefer, onColDrop, onRowDrop, onColResize,
  isRowCollapsible, renderDetails, expandedRows,
  renderWhileCollapsed = true,
  ...props
}: TableProps<T>) => {
  const [resizingData, setResizingData] = useState<{ x: number; y: number; col: string; ogWidth?: number; }>();
  const [draggingData, setDraggingData] = useState<{ col?: string; over?: string; to?: "before" | "after"; }>();

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
    // if (e.dataTransfer.dropEffect) {
    //   console.log("--- drag end ---", e, e.dataTransfer.dropEffect);
    // }
    setDraggingData(undefined);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (e.dataTransfer.dropEffect !== "none") {
      e.preventDefault();
      // console.log("*** DROP ***", e, e.dataTransfer.dropEffect);
      onColDrop?.();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    const elem = e.target as HTMLElement;
    const draggingCol = elem?.closest("[data-column]");
    const colKey = draggingCol?.getAttribute("data-column");
    if (!draggingCol || !colKey) return;
    e.preventDefault();
    const colRect = draggingCol.getBoundingClientRect();
    const before = (e.pageX - colRect.x) < colRect.width / 2;
    setDraggingData(currData => ({ ...currData, over: colKey, to: before ? "before" : "after" }));
  };

  return (
    <div className={`${styles.wrapper} ${rootClass}`}>
      <table className={`${styles.table} ${className}`}>
        {!!header?.length && (
          <thead
            className={stickyHeader ? styles.sticky_header : ""}
            style={(stickyHeader && header?.length) ? { zIndex: header[header.length - 1].length * 2 } : {}}
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
              header?.map((hRow, idx) => (
                <tr key={idx}>
                  {
                    hRow.map((hCell, index) => {
                      const {
                        key, as, renderLeft, renderRight, sortable: sortableCol, resizable, sticky, className, style,
                        ...restProps
                      } = hCell;
                      const Element = as ?? "th";
                      return (
                        <Element
                          key={key}
                          data-column={key}
                          {...restProps}
                          className={`${styles.hcell} ${getStickyClasses(sticky)} ${className}`}
                          style={{
                            ...(hCell.width ? { minWidth: hCell.width } : {}),
                            ...getCellStyle(header[header.length - 1].length, index, sticky, true),
                            ...(style ?? {})
                          }}
                          data-dragging={draggingData?.col === key}
                          data-drag-over={
                            draggingData?.over === key
                              ? draggingData?.to === "before"
                                ? "before"
                                : "after"
                              : ""
                          }
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
        )}
        <tbody>
          {
            data?.map((rowData) => {
              const hasCollapsibleContent = isRowCollapsible?.(rowData);
              const isExpanded = hasCollapsibleContent && expandedRows?.includes(rowData.id);
              const parentRowAttrs = hasCollapsibleContent ? { "data-expanded": isExpanded } : {};
              const cols = header?.[header.length - 1] ?? [];
              return (
                <Fragment key={rowData.id}>
                  <tr {...parentRowAttrs}>
                    {
                      cols?.map((hCol, index) => {
                        const rowConfig = body?.[hCol.key];
                        const Element = rowConfig?.as ?? "td";
                        return (
                          <Element
                            key={rowData.id + hCol.key}
                            className={`${hCol.sticky ? styles.sc_td : ""} ${rowConfig?.className ?? ""} ${getStickyClasses(hCol.sticky)}`}
                            style={{ ...getCellStyle(cols.length, index, hCol.sticky), ...(rowConfig?.style ?? {}) }}
                          >
                            {rowConfig?.render?.(rowData)}
                          </Element>
                        );
                      })
                    }
                  </tr>
                  {hasCollapsibleContent && (
                    <tr className={styles.collapsible_row}>
                      <td colSpan={cols.length}>
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
          style={(stickyFooter && header?.length) ? { zIndex: header[header.length - 1].length * 2 } : {}}
        >
          <tr>
            {
              header?.[header.length - 1].map((hCol, index) => {
                const rowConfig = footer?.[hCol.key];
                if (!rowConfig) return null;
                const { render, as, sticky, className, style, ...restProps } = rowConfig;
                const Element = as ?? "td";
                return (
                  <Element
                    key={`fc-${hCol.key}`}
                    {...restProps}
                    className={`${getStickyClasses(sticky)} ${className}`}
                    style={{ ...getCellStyle(header[header.length - 1].length, index, sticky, true), ...(style ?? {}) }}
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

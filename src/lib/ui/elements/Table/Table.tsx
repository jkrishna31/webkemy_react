import { ComponentProps, ComponentPropsWithoutRef, Fragment, ReactNode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import { SortBtn } from "@/lib/ui/elements/butttons";
import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Table.module.scss";

export type DragType = "reorder" | "transfer";
export type StickType = "left" | "right" | "both";

export interface TableLayout {
  id: string;
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
  width?: number;
}

export interface BodyCellItem<T> extends CellItem<T> {
  render?: (row: T, depth?: number) => ReactNode;
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
  colDnd?: DragType;
  rowDnd?: DragType;
  onColDrag?: () => void;
  onColDrop?: (payload: any) => void;
  onRowDrag?: () => void;
  onRowDrop?: (payload: any) => void;
  isRowCollapsible?: (record: T) => boolean;
  renderDetails?: (record: T) => ReactNode;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  renderWhileCollapsed?: boolean;
  rootClass?: string;
  getRowProps?: (row: T) => ComponentProps<"tr">;
}

export interface DragPreviewProps extends ComponentProps<"div"> { }

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

const getRootCols = (layout: TableLayout[]) => {
  const rootCols = [];
  for (const item of layout) {
    if (!item.children?.length) {
      rootCols.push({ ...item });
    } else {
      const res = getRootCols(item.children);
      res.forEach(item => rootCols.push({ ...item }));
    }
  }
  return rootCols;
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

const DragPreview = (props: DragPreviewProps) => {
  return (
    <div className={styles.drag_preview} {...props}>
      {props.children}
    </div>
  );
};

const Table = <T extends { id: string; children?: Array<T> }>({
  data,
  layout, header, body, footer,
  sort, onSort,
  colDnd = "reorder", rowDnd = "reorder", onColDrop, onRowDrop, onColResize,
  isRowCollapsible, renderDetails, expandedRows, getRowProps,
  stickyHeader, stickyFooter, renderWhileCollapsed = true,
  className, rootClass,
  ...props
}: TableProps<T>) => {
  const [resizingData, setResizingData] = useState<{ x: number; y: number; col: string; ogWidth?: number; }>();
  const [draggingData, setDraggingData] = useState<{ row?: string; col?: string; over?: string; to?: "before" | "after"; }>();

  const headerRows: {
    id: string; rowSpan?: number; colSpan?: number; width?: number;
  }[][] = useMemo(() => {
    const rows: any[] = [];
    generateLayoutRows(rows, layout, 0);
    return rows;
  }, [layout]);

  const rootCols = layout ? getRootCols(layout) : [];

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
    onColResize(resizingData.col, (resizingData.ogWidth ?? 0) + (e.pageX - resizingData.x));
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

  const setDragImage = (e: React.DragEvent, content?: ReactNode, elem?: Node) => {
    if (elem) {
      const clone = elem.cloneNode(true) as HTMLElement;
      clone.style.opacity = "1";
      clone.style.transform = "scale(.85)";
      clone.style.pointerEvents = "none";
      document.body.appendChild(clone);
      e.dataTransfer.setDragImage(clone, 10, 10);
      setTimeout(() => clone.remove(), 0);
    } else {
      const node = document.createElement("div");
      node.style.position = "absolute";
      node.style.top = `-${300}vh`;
      document.body.appendChild(node);

      const root = createRoot(node);
      root.render(
        <DragPreview>
          {content}
        </DragPreview>
      );

      e.dataTransfer.setDragImage(node, -12, -12);

      setTimeout(() => {
        root.unmount();
        node.remove();
      }, 0);
    }
  };

  const handleColDragStart = (e: React.DragEvent) => {
    const elem = e.target as HTMLElement;
    const draggingCol = elem?.closest("[data-column]");
    const colKey = draggingCol?.getAttribute("data-column");
    if (!colKey) return;
    setDraggingData({ col: colKey });
    setDragImage(e, colKey);
  };

  const handleColDragOver = (e: React.DragEvent) => {
    const elem = e.target as HTMLElement;
    const dragOverCol = elem?.closest("[data-column]");
    const colKey = dragOverCol?.getAttribute("data-column");
    const isDraggable = dragOverCol?.getAttribute("draggable");
    if (!dragOverCol || !colKey || !isDraggable) return;
    e.preventDefault();
    const colRect = dragOverCol.getBoundingClientRect();
    const toLeft = (e.pageX - colRect.x) < colRect.width / 2;
    setDraggingData(currData => ({ ...currData, over: colKey, to: toLeft ? "before" : "after" }));
  };

  const handleColDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onColDrop?.(draggingData);
  };

  const handleRowDragStart = (e: React.DragEvent) => {
    const elem = e.target as HTMLElement;
    const draggingCol = elem?.closest("[data-row]");
    const rowKey = draggingCol?.getAttribute("data-row");
    if (!rowKey) return;
    setDraggingData({ row: rowKey });
    setDragImage(e, rowKey);
  };

  const handleRowDragOver = (e: React.DragEvent) => {
    const elem = e.target as HTMLElement;
    const dragOverRow = elem?.closest("[data-row]");
    const rowKey = dragOverRow?.getAttribute("data-row");
    const isDraggable = dragOverRow?.getAttribute("draggable");
    if (!dragOverRow || !rowKey || !isDraggable) return;
    e.preventDefault();
    const rowRect = dragOverRow.getBoundingClientRect();
    const toUp = (e.pageY - rowRect.y) < rowRect.height / 2;
    setDraggingData(currData => ({ ...currData, over: rowKey, to: toUp ? "before" : "after" }));
  };

  const handleRowDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!(e.target as HTMLElement).closest("[data-dragging]")) {
      onRowDrop?.(draggingData);
      setDraggingData(undefined);
    }
  };

  const handleDragEnd = () => setDraggingData(undefined);

  const handleDragExit = () => setDraggingData(currData => ({ ...currData, over: undefined }));

  const renderBodyRows = (rows?: T[], depth = 0, parentId?: string, isParentDragging?: boolean) => {
    if (!rows?.length) return null;
    return rows?.map((rowData) => {
      const hasCollapsibleContent = isRowCollapsible?.(rowData);
      const isExpanded = expandedRows?.includes(rowData.id);
      const rowAttrs = hasCollapsibleContent ? { "data-expanded": isExpanded } : {};
      const isDragging = draggingData?.row === rowData.id || isParentDragging;

      const rowProps = getRowProps?.(rowData) ?? {};

      return (
        <Fragment key={rowData.id}>
          <tr
            {...rowAttrs}
            {...rowProps}
            data-row={rowData.id}
            draggable
            data-dragging={isDragging}
            data-drag-over={
              (draggingData?.row && draggingData?.over === rowData.id)
                ? draggingData?.to
                : ""
            }
          >
            {
              rootCols?.map((hCol, index) => {
                const col = header?.[hCol.id];
                const rowConfig = body?.[hCol.id];
                const Element = rowConfig?.as ?? "td";
                return (
                  <Element
                    key={rowData.id + hCol.id}
                    className={classes(col?.sticky && styles.sc_td, rowConfig?.className, getStickyClasses(col?.sticky))}
                    style={{ ...getCellStyle(rootCols?.length, index, col?.sticky), ...(rowConfig?.style ?? {}) }}
                  >
                    {rowConfig?.render?.(rowData, depth)}
                  </Element>
                );
              })
            }
          </tr>
          {hasCollapsibleContent && (
            <tr
              className={styles.collapsible_row}
              data-dragging={isDragging}
              aria-hidden={isExpanded}
            >
              <td colSpan={rootCols?.length}>
                <CollapsiblePanel
                  open={isExpanded}
                  renderWhileClosed={renderWhileCollapsed}
                >
                  {renderDetails?.(rowData)}
                </CollapsiblePanel>
              </td>
            </tr>
          )}
          {isExpanded && renderBodyRows(rowData.children, depth + 1, rowData.id, isDragging)}
        </Fragment>
      );
    });
  };

  return (
    <div className={classes(styles.wrapper, rootClass)}>
      <table
        className={classes(styles.table, className)}
      >
        <thead
          data-col-dnd={colDnd}
          className={stickyHeader ? styles.sticky_header : ""}
          style={stickyHeader ? { zIndex: rootCols.length * 2 } : {}}
          onPointerDown={onColResize ? handlePointerDown : undefined}
          onPointerMove={(onColResize && resizingData) ? handleResize : undefined}
          onPointerUp={onColResize ? handlePointerUp : undefined}
          onKeyDown={onColResize ? handleKeyDown : undefined}
          onDragStart={onColDrop ? handleColDragStart : undefined}
          onDragOver={(onColDrop && draggingData?.col) ? handleColDragOver : undefined}
          onDrop={(onColDrop && draggingData?.col) ? handleColDrop : undefined}
          onDragEnd={(onColDrop && draggingData?.col) ? handleDragEnd : undefined}
          onDragExit={(onColDrop && draggingData?.col) ? handleDragExit : undefined}
        >
          {
            headerRows.map((hRow, hrIdx) => (
              <tr key={hrIdx}>
                {
                  hRow.map((hCell, hcIdx) => {
                    const { id, colSpan, rowSpan } = hCell;
                    const {
                      as, renderLeft, renderRight, sortable: sortableCol, resizable, sticky, className, style, width,
                      ...restProps
                    } = header?.[id] ?? {};
                    const Element = as ?? "th";
                    return (
                      <Element
                        key={id}
                        data-column={id}
                        colSpan={colSpan}
                        rowSpan={rowSpan}
                        {...restProps}
                        className={classes(styles.hcell, getStickyClasses(sticky), className)}
                        style={{
                          ...(width ? { minWidth: width } : {}),
                          ...getCellStyle(rootCols.length, hcIdx, sticky, true),
                          ...style,
                        }}
                        data-dragging={draggingData?.col === id}
                        data-drag-over={
                          (draggingData?.col && draggingData?.over === id)
                            ? draggingData?.to
                            : ""
                        }
                        tabIndex={restProps.draggable && onColDrop ? 0 : undefined}
                      >
                        <div className={styles.header_cell_container}>
                          {renderLeft}
                          {
                            sortableCol ? (
                              <SortBtn
                                sort={getSort(id, sort)}
                                onClick={() => handleSort(id)}
                                className={styles.sort_btn}
                              />
                            ) : null
                          }
                          {renderRight}
                        </div>
                        {resizable && (
                          <button
                            aria-label="Resize Column"
                            title="Resize Column"
                            data-resize={id}
                            className={styles.resize_handle}
                            style={{ "--zi-resize-handle": rootCols.length * 2 } as React.CSSProperties}
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
        <tbody
          data-row-dnd={rowDnd}
          onDragStart={onRowDrop ? handleRowDragStart : undefined}
          onDragOver={(onRowDrop && draggingData?.row) ? handleRowDragOver : undefined}
          onDrop={(onRowDrop && draggingData?.row) ? handleRowDrop : undefined}
          onDragEnd={(onRowDrop && draggingData?.row) ? handleDragEnd : undefined}
          onDragExit={(onRowDrop && draggingData?.row) ? handleDragExit : undefined}
        >
          {renderBodyRows(data)}
        </tbody>
        <tfoot
          className={stickyFooter ? styles.sticky_footer : ""}
          style={stickyFooter ? { zIndex: rootCols.length * 2 } : {}}
        >
          <tr>
            {
              rootCols.map((hCol, index) => {
                const rowConfig = footer?.[hCol.id];
                if (!rowConfig) return null;
                const { render, as, sticky, className, style, ...restProps } = rowConfig;
                const Element = as ?? "td";
                return (
                  <Element
                    key={`fc-${hCol.id}`}
                    {...restProps}
                    className={classes(getStickyClasses(sticky), className)}
                    style={{ ...getCellStyle(rootCols.length, index, sticky, true), ...style }}
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

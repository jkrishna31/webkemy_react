"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { PageSetup } from "@/components/managers";
import { tableData } from "@/data/dummy/tableData";
import useTableColumn from "@/lib/hooks/useTableColumn";
import useTableRows from "@/lib/hooks/useTableRows";
import { useTreeSelect } from "@/lib/hooks/useTreeSelect";
import { Color } from "@/lib/types/general.types";
import { Avatar } from "@/lib/ui/elements/Avatar";
import { AvatarList } from "@/lib/ui/elements/AvatarList";
import { Badge } from "@/lib/ui/elements/Badge";
import { Button } from "@/lib/ui/elements/butttons";
import { Chip } from "@/lib/ui/elements/Chip";
import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import { Checkbox } from "@/lib/ui/elements/inputs/Checkbox";
import { SkeletonLoader } from "@/lib/ui/elements/loaders";
import { Rate } from "@/lib/ui/elements/Rate";
import { Table } from "@/lib/ui/elements/Table";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import DeleteIcon from "@/lib/ui/svgs/icons/DeleteIcon";
import EditIcon from "@/lib/ui/svgs/icons/EditIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import PlusIcon from "@/lib/ui/svgs/icons/PlusIcon";
import { findRecursive } from "@/lib/utils/array.utils";
import { formatDate } from "@/lib/utils/datetime.utils";
import { deepClone } from "@/lib/utils/object.utils";

import styles from "./page.module.scss";

const defaultCols = ["name", "dob", "status", "contact", "rating", "peers", "address", "startDate"];

const defaultColsData: {
  [key: string]: {
    name: string;
    colSpan?: number;
    rowSpan?: number;
  }
} = {
  select: { name: "Select", colSpan: 1, rowSpan: 1 },
  name: { name: "Name" },
  dob: { name: "Date of Birth" },
  status: { name: "Status" },
  contact: { name: "Contact" },
  rating: { name: "Rating" },
  peers: { name: "Peers" },
  address: { name: "Address" },
  startDate: { name: "Start Date" },
  actions: { name: "Actions" },
};

const statusColorMap: { [key in string]: Color } = {
  "active": "green",
  "inactive": "purple",
  "rejected": "red",
  "leave": "blue",
  "pending": "yellow",
  "transferred": "pink",
  "dead": "orange",
};

type TreeItem = { id: string; children?: TreeItem[] };

const Page = () => {
  const [sort, setSort] = useState<{ key: string; dir?: "+" | "-" }>();
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [colWidths, setColWidths] = useState<{ [key: string]: number }>({});
  const [colsOrder, setColsOrder] = useState<string[]>(defaultCols);
  const [rowsOrder, setRowsOrder] = useState<TreeItem[]>();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const {
    selectedKeys: selectedRows, select: selectRows, getTotalItems,
  } = useTreeSelect(rowsOrder);

  const totalItems = getTotalItems();

  const theadRef = useRef<HTMLTableSectionElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const handleSelection = (checked: boolean, id?: string) => {
    selectRows(id ? [id] : [], checked ? "select" : "deselect");
  };

  const updateSort = (key: string) => {
    if (sort?.key === key) {
      setSort({ ...sort, dir: sort.dir === "+" ? "-" : sort.dir === "-" ? undefined : "+" });
    } else {
      setSort({ key, dir: "+" });
    }
  };

  const updateColWidth = (colKey: string, newWidth: number) => {
    setColWidths(currWidths => ({
      ...currWidths,
      [colKey]: newWidth,
    }));
  };

  const updateColsOrder = (src: string, target: string, to: "before" | "after" | "in") => {
    setColsOrder(currColsOrder => {
      const newColsOrder = [];
      for (let i = 0; i < currColsOrder.length; i++) {
        if (currColsOrder[i] === src) continue;
        if (currColsOrder[i] === target) {
          if (to === "before") newColsOrder.push(src);
          newColsOrder.push(currColsOrder[i]);
          if (to === "after") newColsOrder.push(src);
        } else {
          newColsOrder.push(currColsOrder[i]);
        }
      }
      return newColsOrder;
    });
  };

  const updateRowsOrder = (src: string, target: string, to: "before" | "after" | "in") => {
    if (!rowsOrder?.length) return;

    const srcData = findRecursive(src, rowsOrder);
    if (!srcData) return;

    const isTargetInsideSrc = findRecursive(target, [srcData]);
    if (isTargetInsideSrc) return;

    const getNewData = (_data?: TreeItem[]) => {
      if (!_data?.length) return [];
      const _newData: any[] = [];
      for (let i = 0; i < _data.length; i++) {
        if (_data[i].id === src) {
          continue;
        } else {
          if (_data[i].id === target && to === "before") {
            const newItem = deepClone(srcData);
            _newData.push(newItem);
          }
          const newItem: TreeItem = { id: _data[i].id };
          if (_data[i].children?.length) {
            newItem.children = getNewData(_data[i].children);
          }
          _newData.push(newItem);
          if (_data[i].id === target && to === "after") {
            const newItem = deepClone(srcData);
            _newData.push(newItem);
          }
        }
      }
      return _newData;
    };

    const newData = getNewData(rowsOrder);
    setRowsOrder(newData);
  };

  const handleColDnD = (config: any) => {
    if (config.src !== config.target) {
      updateColsOrder(config.src, config.target, config.to);
    }
  };

  const handleRowDnD = (config: any) => {
    if (config.src !== config.target) {
      updateRowsOrder(config.src, config.target, config.to);
    }
  };

  const {
    draggingCol, draggingOverCol, dragTo: colDragTo,
  } = useTableColumn(
    theadRef, {
    draggable: true, resizable: true,
    onResize: updateColWidth,
    onDrop: handleColDnD,
    itemSelector: "data-column",
  });

  const {
    draggingRow, draggingOverRow, dragTo: rowDragTo,
  } = useTableRows(tbodyRef, {
    draggable: true,
    onDrop: handleRowDnD,
    itemSelector: "data-row",
  });

  const resetTable = useEffectEvent(() => {
    const _rowsDetails: any = {};

    const iterate = (_data?: any[]) => {
      if (!_data?.length) return [];
      const _newLevelOrder: any[] = [];
      for (let i = 0; i < _data.length; i++) {
        const id = _data[i].id;
        const children = _data[i].children;
        _rowsDetails[id] = _data[i];
        const _orderItem: any = { id: id };
        const _children = iterate(children);
        if (_children?.length) _orderItem.children = _children;
        _newLevelOrder.push(_orderItem);
      }
      return _newLevelOrder;
    };

    const _rowsOrder = iterate(tableData.slice(0, 15));

    setRowsOrder(_rowsOrder);
    setData(_rowsDetails);
  });

  useEffect(() => {
    resetTable();
  }, []);

  useEffect(() => {
    // if (!sort?.dir) setRowsOrder();
  }, [sort]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const renderLoader = () => {
    return Array.from({ length: 7 }).map((_, rowIdx) => (
      <tr key={rowIdx}>
        {Array.from({ length: colsOrder.length + 2 }).map((_, colIdx) => (
          <Table.Cell as="td" sticky={colIdx === 0 ? "left" : colIdx === (colsOrder.length + 1) ? "right" : undefined} key={colIdx}>
            <SkeletonLoader style={{ minWidth: "2rem", width: "100%", height: "2rem", borderRadius: "var(--br-pill)" }} loading />
          </Table.Cell>
        ))}
      </tr>
    ));
  };

  const fields = {
    name: (rowData: any, depth: number) => {
      return (
        <div
          style={{ display: "flex", alignItems: "center", gap: ".8rem", paddingLeft: `${depth * 2}rem` }}
        >
          <div style={{ position: "relative" }}>
            <Avatar>
              <Image
                src={rowData.profile ?? ""} alt={rowData.name} width={40} height={40}
                style={{ width: "2.6rem", height: "2.6rem" }}
              />
            </Avatar>
            <Badge color={statusColorMap[rowData.status!]} float="br" style={{ transform: "translate3d(7%, 7%, 0)" }} />
          </div>
          <div>
            <p style={{ fontWeight: 500 }}>{rowData.name}</p>
            <p style={{ color: "var(--fg-s)" }}>{rowData.role}</p>
          </div>
        </div>
      );
    },
    dob: (rowData: any) => {
      return (
        <>
          {formatDate(rowData.dob)} <span style={{ color: "var(--fg-s-alt)" }}>{"("}{new Date().getUTCFullYear() - new Date(rowData.dob).getUTCFullYear()}{" Years"}{")"}</span>
        </>
      );
    },
    status: (rowData: any) => {
      return (
        <Chip
          color={statusColorMap[rowData.status]}
          style={{
            textTransform: "capitalize",
            borderRadius: "var(--br-pill)",
            // paddingLeft: ".4rem"
          }}
        >
          {rowData.status}
        </Chip>
      );
    },
    contact: (rowData: any) => {
      return (
        <>
          {!!rowData.phone && (
            <p style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
              {/* <ContactIcon style={{ width: "1.5rem", height: "1.5rem", color: "var(--fg-s)" }} /> */}
              <a href={`tel:${rowData.phone}`} style={{ color: "var(--blue-1)" }}>{rowData.phone}</a>
            </p>
          )}
          {!!rowData.email && (
            <p style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
              {/* <EmailIcon style={{ width: "1.5rem", height: "1.5rem", color: "var(--fg-s)" }} /> */}
              <a href={`mailto:${rowData.email}`} style={{ color: "var(--blue-1)" }}>{rowData.email ?? "N/A"}</a>
            </p>
          )}
        </>
      );
    },
    rating: (rowData: any) => {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <Rate value={(rowData.rating ?? 0) / 5} className={styles.rate} readonly key={rowData.id} max={1} />
          <p>{rowData.rating}</p>
        </div>
      );
    },
    peers: (rowData: any) => {
      return rowData.peers?.length ? (
        <AvatarList
          expandable={false}
          avatars={rowData.peers?.map((avatar: any) => (
            {
              id: avatar.name,
              children: (
                <Image src={avatar.profile} width={26} height={26} alt={avatar.name} style={{ width: "2.6rem", height: "2.6rem" }} />
              )
            }
          ))}
        />
      ) : "N/A";
    },
    address: (rowData: any) => {
      return (
        <p style={{ minWidth: "20rem", whiteSpace: "wrap" }}>{rowData.address}</p>
      );
    },
    startDate: (rowData: any) => {
      return formatDate(rowData.startDate);
    },
  };

  const renderRow = (row: TreeItem, parent?: string[], depth: number = 0) => {
    const isExpanded = expandedRows.includes(row.id);
    const isExpandable = !!row.children?.length;
    const isDragging = draggingRow === row.id || parent?.some(parentKey => parentKey === draggingRow);
    const hasDetails = ["6", "11", "14", "15"].includes(row.id);
    const rowData = data[row.id];

    if (parent?.length && !expandedRows.includes(parent[parent.length - 1])) return null;

    return (
      <>
        <tr
          draggable
          data-row={row.id}
          data-dragging={isDragging}
          data-drag-over={
            (draggingRow && draggingOverRow === row.id)
              ? rowDragTo
              : undefined
          }
        >
          <Table.Cell as="td" sticky="left" style={{ paddingRight: ".4rem" }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
            >
              <Checkbox
                checked={selectedRows.includes(row.id)}
                onChange={e => handleSelection(e.target.checked, row.id)}
              />
              {(isExpandable || hasDetails) && (
                <button
                  className={styles.expand_btn}
                  aria-pressed={isExpanded}
                  onClick={
                    () => setExpandedRows(
                      currRows => isExpanded ? [...currRows.filter(key => key !== row.id)] : [...currRows, row.id]
                    )
                  }
                >
                  {hasDetails ? <PlusIcon /> : <ChevronRightIcon />}
                </button>
              )}
            </div>
          </Table.Cell>

          {colsOrder.map((colKey) => (
            <Table.Cell as="td" key={colKey}>
              {(fields as any)[colKey](rowData, depth)}
            </Table.Cell>
          ))}

          <Table.Cell as="td" sticky="right" style={{ paddingInline: "1rem" }}>
            <div className={styles.table_actions}>
              <Button variant="secondary" aria-label="Edit" title="Edit">
                <EditIcon />
              </Button>
              <Button variant="secondary" aria-label="Delete" title="Delete">
                <DeleteIcon />
              </Button>
            </div>
          </Table.Cell>
        </tr>
        {hasDetails && (
          <tr
            data-dragging={isDragging}
            aria-hidden={!isExpanded}
          >
            <Table.Cell as="td" colSpan={colsOrder.length + 2} style={{ padding: 0, border: "none" }}>
              <CollapsiblePanel open={isExpanded}>
                <div style={{ padding: "1rem 2rem", maxWidth: "100%", whiteSpace: "wrap", background: "var(--bg-t)", borderBottom: ".1rem solid var(--border-t)" }}>
                  <p>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti reiciendis, laboriosam pariatur temporibus, incidunt deleniti delectus quia, velit illo aspernatur facilis! Maiores placeat quae earum nam similique quo beatae asperiores veritatis debitis inventore magnam sed pariatur a, praesentium perferendis aliquid numquam maxime, in nobis cum! Error repellat adipisci dolorem quos quam possimus itaque deserunt provident, doloribus quidem cum."}</p>
                  <p>{"Doloribus voluptas adipisci facilis, velit exercitationem cumque architecto ut quasi corporis blanditiis. Sapiente dolor autem mollitia. Voluptas sint voluptatibus quod facere accusamus, tenetur quasi non nam blanditiis doloribus quae illum esse possimus cum dignissimos tempora? Debitis facilis sunt possimus voluptatem quis consequuntur nihil, beatae dicta aliquid deleniti molestiae perspiciatis distinctio, inventore ipsa eum quas soluta aut, consectetur ut? Ducimus officia commodi."}</p>
                </div>
              </CollapsiblePanel>
            </Table.Cell>
          </tr>
        )}
      </>
    );
  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="table" />

      <Table
        className={styles.table}
        rootClass={styles.table_wrapper}
      >
        <Table.Header
          isSticky
          ref={theadRef}
          style={{ zIndex: colsOrder.length + 2 }}
        >
          <tr>
            <Table.Cell
              sticky="left"
            >
              <div className={styles.header_cell}>
                <Checkbox
                  className={styles.all_select_check}
                  data-indeterminate={!!selectedRows.length && selectedRows.length !== totalItems}
                  checked={!!selectedRows.length && selectedRows.length === totalItems}
                  onChange={e => handleSelection(e.target.checked)}
                />
              </div>
            </Table.Cell>
            {colsOrder.map(colKey => (
              <Table.Cell
                key={colKey}
                colKey={colKey}
                width={colWidths[colKey]}
                resizable sortable draggable
                isDragging={draggingCol === colKey}
                draggingOver={
                  (draggingCol && draggingOverCol === colKey)
                    ? colDragTo
                    : undefined
                }
                sort={sort?.key === colKey ? sort.dir : undefined}
                onSort={updateSort}
              >
                {defaultColsData[colKey].name}
              </Table.Cell>
            ))}
            <Table.Cell
              sticky="right"
            >
              <div className={styles.header_cell}>
                {"Actions"}
              </div>
              <button className={styles.col_more} aria-label="More">
                <EllipsisHIcon />
              </button>
            </Table.Cell>
          </tr>
        </Table.Header>

        <Table.Body
          ref={tbodyRef}
          renderRow={renderRow}
          data={loading ? [] : rowsOrder}
        >
          {loading && renderLoader()}
        </Table.Body>

        <Table.Footer
          isSticky
          style={{ zIndex: colsOrder.length + 2 }}
        >
          <tr>
            <Table.Cell as="td" colSpan={2} sticky="left">
              {!!selectedRows.length && (
                <p style={{ fontWeight: 500 }}>{"Selected: "}<span>{selectedRows.length}</span></p>
              )}
            </Table.Cell>
            <Table.Cell as="td" colSpan={defaultCols.length - 1}></Table.Cell>
            <Table.Cell as="td" colSpan={2} sticky="right">
              <p style={{ textAlign: "right", fontWeight: 500 }}>{"Total: "}{totalItems}</p>
            </Table.Cell>
          </tr>
        </Table.Footer>
      </Table>
    </main>
  );
};

export default Page;

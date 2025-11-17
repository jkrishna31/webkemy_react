"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import { PageSetup } from "@/components/managers";
import { tableData } from "@/data/dummy/tableData";
import { useMultiLevelData, useTreeSelect } from "@/lib/hooks";
import { Avatar, AvatarList } from "@/lib/ui/elements/avatar";
import { Badge } from "@/lib/ui/elements/badges";
import { Button } from "@/lib/ui/elements/butttons";
import { Chip } from "@/lib/ui/elements/chip";
import { Checkbox } from "@/lib/ui/elements/inputs";
import { Rate } from "@/lib/ui/elements/rate";
import { StickType, Table } from "@/lib/ui/elements/tables";
import { ChevronRightIcon, DeleteIcon, EditIcon, EllipsisHIcon, PlusIcon } from "@/lib/ui/svgs/icons";
import { formatDate } from "@/lib/utils/datetime.utils";
import { deepSort } from "@/lib/utils/object.utils";
import { Color } from "@/types/general.types";

import styles from "./styles.module.scss";

const DEFAULT_LAYOUT = [
  { id: "select", },
  { id: "name" },
  { id: "dob" },
  { id: "status" },
  { id: "contact" },
  { id: "rating" },
  { id: "peers" },
  { id: "address" },
  { id: "startDate" },
  // { id: "lastUpdateDate" },
  { id: "actions" },
];

const statusColorMap: { [key in string]: Color } = {
  "active": "green",
  "inactive": "purple",
  "rejected": "red",
  "leave": "blue",
  "pending": "yellow",
};

type TableData = {
  id: string;
  name: string;
  rank: number;
  address: string;
  duration: number;
  startDate?: string;
  endDate?: string;
  phone?: string;
  email?: string;
  rating?: number;
  status?: string;
  profile: string;
  role: string;
  dob: string;
  peers?: { name: string; profile: string; }[];
  children?: TableData[];
}

const Page = () => {
  const [data, setData] = useState<TableData[]>(() => tableData.slice(0, 15));
  const [sort, setSort] = useState<string>();
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [colWidths, setColWidths] = useState<{ [key: string]: number }>({});

  const {
    order: layoutOrder,
    move: updateLayoutOrder,
  } = useMultiLevelData(DEFAULT_LAYOUT, { orderOnly: true });
  const {
    order: recordsOrder, details: recordsDetails,
    move: updateRecordsOrder,
  } = useMultiLevelData(data);
  const {
    selectedKeys: selectedRows, select: selectRows, getTotalItems,
  } = useTreeSelect(data);

  const totalItems = getTotalItems();

  const handleSelection = (checked: boolean, id?: string) => {
    selectRows(id ? [id] : [], checked ? "select" : "deselect");
  };

  const handleResize = (colKey: string, newWidth: number) => {
    setColWidths(currWidths => ({
      ...currWidths,
      [colKey]: newWidth,
    }));
  };

  const handleColDnD = (config: any) => {
    if (config.col !== config.over) {
      updateLayoutOrder("reorder", { moveKey: config.col, moveToKey: config.over, place: config.to });
    }
  };

  const handleRowDnD = (config: any) => {
    if (config.row !== config.over) {
      updateRecordsOrder("reorder", { moveKey: config.row, moveToKey: config.over, place: config.to });
    }
  };

  const isRowCollapsible = useCallback((row: TableData) => {
    return ["6", "11", "14", "15"].includes(row.id);
  }, []);

  const renderDetails = useCallback((_: TableData) => {
    return (
      <div style={{ padding: "1rem 2rem", maxWidth: "100%", whiteSpace: "wrap", borderBottom: ".1rem solid var(--border-t)", background: "var(--bg-t)" }}>
        {"Lorem ipsum dolor, sit amet elit. Odit numquam consequuntur, commodi ipsum consectetur tenetur natus, aliquam omnis in necessitatibus earum? Inventore voluptatum cupiditate et. Dolorum unde voluptas est dicta consectetur officia?"}
      </div>
    );
  }, []);

  const header = {
    select: {
      sticky: "left" as StickType,
      renderLeft: (
        <div className={styles.header_cell}>
          <Checkbox
            className={styles.all_select_check}
            data-indeterminate={!!selectedRows.length && selectedRows.length !== totalItems}
            checked={!!selectedRows.length && selectedRows.length === totalItems}
            onChange={e => handleSelection(e.target.checked)}
          />
        </div>
      ),
    },
    name: {
      draggable: true, resizable: true, sortable: true, width: colWidths.name,
      renderLeft: (
        <div className={styles.header_cell}>
          {"Name"}
        </div>
      ),
    },
    dob: {
      draggable: true, resizable: true, sortable: true, width: colWidths.dob,
      renderLeft: (
        <div className={styles.header_cell}>
          {"D.O.B. (Age)"}
        </div>
      ),
    },
    status: {
      draggable: true, resizable: true, sortable: true, width: colWidths.status,
      renderLeft: (
        <div className={styles.header_cell}>
          {"Status"}
        </div>
      ),
    },
    contact: {
      draggable: true, resizable: true, width: colWidths.contact,
      renderLeft: (
        <div className={styles.header_cell}>
          {"Contact"}
        </div>
      ),
    },
    rating: {
      draggable: true, resizable: true, sortable: true, width: colWidths.rating,
      renderLeft: (
        <div className={styles.header_cell}>
          {"Rating"}
        </div>
      ),
    },
    peers: {
      draggable: true, resizable: true, width: colWidths.peers,
      renderLeft: "Peers",
    },
    address: {
      draggable: true, resizable: true, width: colWidths.address,
      renderLeft: "Address",
    },
    startDate: {
      draggable: true, resizable: true, width: colWidths.startDate,
      renderLeft: "Started On",
    },
    lastUpdateDate: {
      draggable: true, resizable: true,
      renderLeft: "Last Updated On",
    },
    actions: {
      sticky: "right" as StickType,
      renderLeft: (
        <div className={styles.header_cell}>
          {"Actions"}
        </div>
      ),
      renderRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
    },
  };

  const body = {
    select: {
      render: (row: any) => {
        const isExpanded = expandedRows.includes(row.id);
        const rowDetails = recordsDetails[row.id];
        const isCollapsible = isRowCollapsible(rowDetails);
        return (
          <div
            style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
          >
            <Checkbox
              checked={selectedRows.includes(row.id)}
              onChange={e => handleSelection(e.target.checked, row.id)}
            />
            {(!!rowDetails.children?.length || isCollapsible) && (
              <button
                className={styles.expand_btn}
                aria-pressed={isExpanded}
                onClick={
                  () => setExpandedRows(
                    currRows => isExpanded ? [...currRows.filter(key => key !== row.id)] : [...currRows, row.id]
                  )
                }
              >
                {isCollapsible ? <PlusIcon /> : <ChevronRightIcon />}
              </button>
            )}
          </div>
        );
      },
    },
    name: {
      render: (row: any, depth = 0) => {
        const rowDetails = recordsDetails[row.id];
        return (
          <div
            style={{ display: "flex", alignItems: "center", gap: ".8rem", paddingLeft: `${depth * 2}rem` }}
          >
            <div style={{ position: "relative" }}>
              <Avatar>
                <Image
                  src={rowDetails.profile ?? ""} alt={rowDetails.name} width={40} height={40}
                  style={{ width: "2.6rem", height: "2.6rem" }}
                />
              </Avatar>
              <Badge color={statusColorMap[rowDetails.status!]} float="br" style={{ transform: "translate3d(7%, 7%, 0)" }} />
            </div>
            <div>
              <p style={{ fontWeight: 500 }}>{rowDetails.name}</p>
              <p style={{ color: "var(--fg-s)" }}>{rowDetails.role}</p>
            </div>
          </div>
        );
      },
    },
    dob: {
      render: (row: any) => {
        const rowDetails = recordsDetails[row.id];
        return (
          <>
            {formatDate(rowDetails.dob)} <span style={{ color: "var(--fg-s-alt)" }}>{"("}{new Date().getUTCFullYear() - new Date(rowDetails.dob).getUTCFullYear()}{" Years"}{")"}</span>
          </>
        );
      },
    },
    status: {
      render: (row: any) => {
        const rowDetails = recordsDetails[row.id];
        return rowDetails.status ? (
          <Chip
            color={statusColorMap[rowDetails.status]}
            style={{
              textTransform: "capitalize",
              borderRadius: "var(--br-pill)",
              // paddingLeft: ".4rem"
            }}
          >
            {/* <Badge color={statusColorMap[rowDetails.status]} style={{ flexShrink: 0, marginRight: ".4rem" }} float={null} /> */}
            {rowDetails.status}
          </Chip>
        ) : "N/A";
      },
    },
    contact: {
      render: (row: any) => {
        const rowDetails = recordsDetails[row.id];
        return (
          <>
            {!!rowDetails.phone && (
              <p style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                {/* <ContactIcon style={{ width: "1.5rem", height: "1.5rem", color: "var(--fg-s)" }} /> */}
                <a href={`tel:${rowDetails.phone}`} style={{ color: "var(--blue-1)" }}>{rowDetails.phone}</a>
              </p>
            )}
            {!!rowDetails.email && (
              <p style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                {/* <EmailIcon style={{ width: "1.5rem", height: "1.5rem", color: "var(--fg-s)" }} /> */}
                <a href={`mailto:${rowDetails.email}`} style={{ color: "var(--blue-1)" }}>{rowDetails.email ?? "N/A"}</a>
              </p>
            )}
          </>
        );
      },
    },
    rating: {
      render: (row: any) => {
        const rowDetails = recordsDetails[row.id];
        return (
          <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
            <Rate rating={(rowDetails.rating ?? 0) / 5} className={styles.rate} readonly key={rowDetails.id} max={1} />
            <p>{rowDetails.rating}</p>
          </div>
        );
      },
    },
    address: {
      render: (row: any) => {
        const rowDetails = recordsDetails[row.id];
        return (
          <p style={{ minWidth: "20rem", whiteSpace: "wrap" }}>{rowDetails.address}</p>
        );
      },
    },
    peers: {
      render: (row: any) => {
        const rowDetails = recordsDetails[row.id];
        return rowDetails.peers?.length ? (
          <AvatarList
            expandable={false}
            avatars={rowDetails.peers?.map((avatar: any) => (
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
    },
    startDate: {
      render: (row: any) => {
        const rowDetails = recordsDetails[row.id];
        return (
          formatDate(rowDetails.startDate)
        );
      },
    },
    lastUpdateDate: {
      render: (row: any) => {
        const rowDetails = recordsDetails[row.id];
        return (
          formatDate(rowDetails.endDate)
        );
      },
    },
    actions: {
      render: () => {
        return (
          <div className={`${styles.table_actions}`}>
            <Button variant="secondary">
              <EditIcon />
            </Button>
            <Button variant="secondary">
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    }
  };

  const footer = {
    select: {
      render: selectedRows.length ? (
        <p style={{ fontWeight: 500 }}>{"Selected: "}<span>{selectedRows.length}</span></p>
      ) : null,
      sticky: "left" as StickType,
      colSpan: 2,
    },
    name: {
      render: "",
      colSpan: layoutOrder.length - 3,
    },
    actions: {
      render: (
        <p style={{ textAlign: "right", fontWeight: 500 }}>{"Total: "}{totalItems}</p>
      ),
      sticky: "right" as StickType,
      colSpan: 2,
      style: { zIndex: 12 },
    },
  };

  useEffect(() => {
    if (sort) {
      const isAsc = sort.startsWith("-");
      setData(currData => deepSort<any>(currData, isAsc ? sort.slice(1) : sort, isAsc));
    } else {
      setData(tableData.slice(0, 15));
    }
  }, [sort]);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="table" />

      <Table<any>
        data={recordsOrder}
        layout={layoutOrder}
        header={header}
        body={body}
        footer={footer}
        stickyHeader stickyFooter
        sort={sort}
        onSort={setSort}
        onColResize={handleResize}
        onColDrop={handleColDnD}
        onRowDrop={handleRowDnD}
        isRowCollapsible={isRowCollapsible}
        renderDetails={renderDetails}
        expandedRows={expandedRows}
        renderWhileCollapsed={false}
        className={styles.table}
        rootClass={styles.table_wrapper}
      />
    </main>
  );
};

export default Page;

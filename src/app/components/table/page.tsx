"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import { PageSetup } from "@/components/managers";
import { tableData } from "@/data/dummy/tableData";
import { Avatar, AvatarList } from "@/lib/ui/elements/avatar";
import { Badge } from "@/lib/ui/elements/badges";
import { Button } from "@/lib/ui/elements/butttons";
import { Chip } from "@/lib/ui/elements/chip";
import { Checkbox } from "@/lib/ui/elements/inputs";
import { Rate } from "@/lib/ui/elements/rate";
import { Table } from "@/lib/ui/elements/tables";
import { HeaderItem, StickType } from "@/lib/ui/elements/tables/Table/Table";
import { ChevronRightIcon, DeleteIcon, EditIcon, EllipsisHIcon } from "@/lib/ui/svgs/icons";
import { formatDate } from "@/lib/utils/datetime.utils";
import { Color } from "@/types/general.types";

import styles from "./styles.module.scss";

const statusColorMap: { [key in string]: Color } = {
  "active": "green",
  "inactive": "orange",
  "rejected": "red",
  "leave": "blue",
};

type TableData = {
  id: string;
  name: string;
  age: number;
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
}

const Page = () => {
  const [data, setData] = useState<TableData[]>(() => tableData.slice(0, 15));
  const [sort, setSort] = useState<string>();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [colWidths, setColWidths] = useState<{ [key: string]: number }>({});

  const handleSelection = (checked: boolean, row?: TableData,) => {
    if (!row) {
      setSelectedRows(checked ? [...data.map(item => item.id)] : []);
    } else {
      if (checked) {
        setSelectedRows(currSelectedRows => [...currSelectedRows, row.id]);
      } else {
        setSelectedRows(currSelectedRows => [...currSelectedRows.filter(id => id !== row.id)]);
      }
    }
  };

  const handleResize = (colKey: string, newWidth: number) => {
    setColWidths(currWidths => ({
      ...currWidths,
      [colKey]: newWidth,
    }));
  };

  const isRowCollapsible = useCallback((_: TableData) => {
    return true;
  }, []);

  const renderDetails = useCallback((_: TableData) => {
    return (
      <div style={{ padding: "1rem 2rem", maxWidth: "100%", whiteSpace: "wrap", borderBottom: ".1rem solid var(--border-t)", background: "var(--bg-t)" }}>
        {"Lorem ipsum dolor, sit amet elit. Odit numquam consequuntur, commodi ipsum consectetur tenetur natus, aliquam omnis in necessitatibus earum? Inventore voluptatum cupiditate et. Dolorum unde voluptas est dicta consectetur officia?"}
      </div>
    );
  }, []);

  const header: Array<Array<HeaderItem>> = [
    [
      {
        key: "select", sticky: "left",
        renderLeft: (
          <div className={styles.header_cell}>
            <Checkbox
              className={styles.all_select_check}
              data-indeterminate={!!selectedRows.length && selectedRows.length !== data.length}
              checked={!!selectedRows.length && selectedRows.length === data.length}
              onChange={e => handleSelection(e.target.checked)}
            />
          </div>
        ),
      },
      {
        key: "name", draggable: true, resizable: true, sortable: true, width: colWidths.name,
        renderLeft: (
          <div className={styles.header_cell}>
            {"Name"}
          </div>
        ),
      },
      {
        key: "age", draggable: true, resizable: true, width: colWidths.age,
        renderLeft: (
          <div className={styles.header_cell}>
            {"D.O.B. (Age)"}
          </div>
        ),
      },
      {
        key: "status", draggable: true, resizable: true, sortable: true, width: colWidths.status,
        renderLeft: (
          <div className={styles.header_cell}>
            {"Status"}
          </div>
        ),
      },
      {
        key: "contact", draggable: true, resizable: true, width: colWidths.contact,
        renderLeft: (
          <div className={styles.header_cell}>
            {"Contact"}
          </div>
        ),
      },
      {
        key: "rating", draggable: true, resizable: true, sortable: true, width: colWidths.rating,
        renderLeft: (
          <div className={styles.header_cell}>
            {"Rating"}
          </div>
        ),
      },
      {
        key: "peers", draggable: true, resizable: true, width: colWidths.peers,
        renderLeft: "Peers",
      },
      {
        key: "address", draggable: true, resizable: true, width: colWidths.address,
        renderLeft: "Address",
      },
      {
        key: "startDate", draggable: true, resizable: true, width: colWidths.startDate,
        renderLeft: "Started On",
      },
      // {
      //   key: "lastUpdateDate", draggable: true, resizable: true,
      //   renderLeft: "Last Updated On",
      // },
      {
        key: "actions", draggable: true, resizable: true, sticky: "right", width: colWidths.actions,
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
    ]
  ];

  const body = {
    select: {
      render: (row: any) => {
        const isExpanded = expandedRows.includes(row.id);
        return (
          <div
            style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
          >
            <Checkbox
              checked={selectedRows.includes(row.id)}
              onChange={e => handleSelection(e.target.checked, row)}
            />
            <button
              className={styles.expand_btn}
              aria-pressed={isExpanded}
              onClick={() => setExpandedRows(currRows => isExpanded ? [...currRows.filter(key => key !== row.id)] : [...currRows, row.id])}
            >
              <ChevronRightIcon />
            </button>
          </div>
        );
      },
    },
    name: {
      render: (row: any) => {
        const isExpanded = expandedRows.includes(row.id);
        return (
          <div
            style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
          >
            <div style={{ position: "relative" }}>
              <Avatar>
                <Image
                  src={row.profile ?? ""} alt={row.name} width={40} height={40}
                  style={{ width: "2.6rem", height: "2.6rem" }}
                />
              </Avatar>
              <Badge color={statusColorMap[row.status]} float="br" style={{ transform: "translate3d(7%, 7%, 0)" }} />
            </div>
            <div>
              <p style={{ fontWeight: 500 }}>{row.name}</p>
              <p style={{ color: "var(--fg-s)" }}>{row.role}</p>
            </div>
          </div>
        );
      },
    },
    age: {
      render: (row: any) => {
        return (
          <>
            {formatDate(row.dob)} <span style={{ color: "var(--fg-s-alt)" }}>{"("}{row.age}{" Years"}{")"}</span>
          </>
        );
      },
    },
    status: {
      render: (row: any) => {
        return row.status ? (
          <Chip
            color={statusColorMap[row.status]}
            style={{
              textTransform: "capitalize",
              borderRadius: "var(--br-pill)",
              // paddingLeft: ".4rem"
            }}
          >
            {/* <Badge color={statusColorMap[row.status]} style={{ flexShrink: 0, marginRight: ".4rem" }} float={null} /> */}
            {row.status}
          </Chip>
        ) : "N/A";
      },
    },
    contact: {
      render: (row: any) => {
        return (
          <>
            <p style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
              {/* <ContactIcon style={{ width: "1.5rem", height: "1.5rem", color: "var(--fg-s)" }} /> */}
              <a href={`tel:${row.phone}`} style={{ color: "var(--blue-1)" }}>{row.phone}</a>
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
              {/* <EmailIcon style={{ width: "1.5rem", height: "1.5rem", color: "var(--fg-s)" }} /> */}
              <a href="mailto:example@gmail.com" style={{ color: "var(--blue-1)" }}>{row.email ?? "N/A"}</a>
            </p>
          </>
        );
      },
    },
    rating: {
      render: (row: any) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
            <Rate rating={(row.rating ?? 0) / 5} className={styles.rate} readonly key={row.id} max={1} />
            <p>{row.rating}</p>
          </div>
        );
      },
    },
    address: {
      render: (row: any) => {
        return (
          <p style={{ minWidth: "20rem", whiteSpace: "wrap" }}>{row.address}</p>
        );
      },
    },
    peers: {
      render: (row: any) => {
        return row.peers?.length ? (
          <AvatarList
            expandable={false}
            avatars={row.peers?.map((avatar: any) => (
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
        return (
          formatDate(row.startDate)
        );
      },
    },
    lastUpdateDate: {
      render: (row: any) => {
        return (
          formatDate(row.endDate)
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
      colSpan: header[header.length - 1].length - 3,
    },
    actions: {
      render: (
        <p style={{ textAlign: "right", fontWeight: 500 }}>{"Total: "}{data.length}</p>
      ),
      sticky: "right" as StickType,
      colSpan: 2,
      style: { zIndex: 12 },
    },
  };

  useEffect(() => {
    if (sort) {
      const isAsc = sort.startsWith("-");
      setData(currData => [
        ...currData.sort((a, b) => {
          const fieldKey = (isAsc ? sort.slice(1) : sort) as keyof TableData;
          if (a[fieldKey]! < b[fieldKey]!) {
            return isAsc ? 1 : -1;
          } else if (a[fieldKey] === b[fieldKey]) {
            return 0;
          } else {
            return isAsc ? -1 : 1;
          }
        })
      ]);
    } else {
      setData(tableData.slice(0, 15));
    }
  }, [sort]);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="table" />

      <Table<TableData>
        data={data}
        header={header}
        body={body}
        footer={footer}
        stickyHeader stickyFooter
        colResize
        sort={sort}
        onSort={setSort}
        onResize={handleResize}
        // colResizeDefer
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

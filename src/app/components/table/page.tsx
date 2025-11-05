"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import { PageSetup } from "@/components/managers";
import { tableData } from "@/data/dummy/tableData";
import { Avatar } from "@/lib/ui/elements/avatar";
import { Badge } from "@/lib/ui/elements/badges";
import { Button } from "@/lib/ui/elements/butttons";
import { Chip } from "@/lib/ui/elements/chip";
import { Checkbox, Switch } from "@/lib/ui/elements/inputs";
import { Rate } from "@/lib/ui/elements/rate";
import { Table, TableCol } from "@/lib/ui/elements/tables";
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
}

const Page = () => {
  const [data, setData] = useState<TableData[]>(() => tableData.slice(0, 15));
  const [sort, setSort] = useState<string>();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

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

  const isRowCollapsible = useCallback((_: TableData) => {
    return true;
  }, []);

  const renderDetails = useCallback((_: TableData) => {
    return (
      <div style={{ padding: "1rem 2rem", maxWidth: "100%", whiteSpace: "wrap", borderBottom: ".1rem solid var(--border-t)", background: "var(--bg-t)" }}>
        {"Lorem ipsum dolor, sit amet elit. Odit numquam consequuntur, commodi ipsum consectetur tenetur natus, aliquam omnis in necessitatibus earum? Inventore voluptatum cupiditate et. Dolorum unde voluptas est dicta consectetur officia ut?"}
      </div>
    );
  }, []);

  const tableColumns: TableCol<TableData>[] = [
    {
      key: "select",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          <Checkbox
            className={styles.all_select_check}
            data-indeterminate={!!selectedRows.length && selectedRows.length !== data.length}
            checked={!!selectedRows.length && selectedRows.length === data.length}
            onChange={e => handleSelection(e.target.checked)}
          />
        </div>
      ),
      renderBodyCell: (row) => {
        return (
          <div className="grid items-center">
            <Checkbox
              checked={selectedRows.includes(row.id)}
              onChange={e => handleSelection(e.target.checked, row)}
            />
          </div>
        );
      },
      // renderFooterCell: (
      //   <p>{"Total"}</p>
      // ),
      // footerCellSpan: [1, 9],
      sticky: "left",
    },
    // {
    //   key: "rank",
    //   renderBodyCell: (row) => {
    //     return (
    //       <span style={{ color: "var(--fg-s-alt)" }}>{row.rank}</span>
    //     );
    //   },
    //   draggable: true,
    //   tdStyle: { paddingInline: "1rem" },
    // },
    {
      key: "name",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Name"}
        </div>
      ),
      renderBodyCell: (row: any) => {
        const isExpanded = expandedRows.includes(row.id);
        return (
          <div
            style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
          >
            <button
              className={styles.expand_btn}
              aria-pressed={isExpanded}
              onClick={() => setExpandedRows(currRows => isExpanded ? [...currRows.filter(key => key !== row.id)] : [...currRows, row.id])}
            >
              <ChevronRightIcon />
            </button>
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
      // sticky: "both",
      allowSort: true,
      draggable: true,
      resizable: true,
    },
    {
      key: "age",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"D.O.B. (Age)"}
        </div>
      ),
      renderBodyCell: (row) => {
        return (
          <>
            {formatDate(row.dob)} <span style={{ color: "var(--fg-s-alt)" }}>{"("}{row.age}{" Years"}{")"}</span>
          </>
        );
      },
      draggable: true,
      resizable: true,
    },
    {
      key: "status",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Status"}
        </div>
      ),
      renderBodyCell: (row) => {
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
      allowSort: true,
      draggable: true,
      resizable: true,
    },
    {
      key: "contact",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Contact"}
        </div>
      ),
      renderBodyCell: (row) => {
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
      draggable: true,
      resizable: true,
    },
    {
      key: "rating",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Rating"}
        </div>
      ),
      renderBodyCell: (row) => {
        return (
          <Rate rating={row.rating} className={styles.rate} readonly key={row.id} />
        );
      },
      allowSort: true,
      draggable: true,
      resizable: true,
    },
    {
      key: "address",
      renderHeadLeft: "Address",
      renderBodyCell: (row) => {
        return (
          <p style={{ width: "20rem", whiteSpace: "wrap" }}>{row.address}</p>
        );
      },
      draggable: true,
      resizable: true,
    },
    {
      key: "startDate",
      renderHeadLeft: "Started On",
      renderBodyCell: (row) => {
        return (
          formatDate(row.startDate)
        );
      },
      resizable: true,
    },
    {
      key: "endDate",
      renderHeadLeft: "Last Updated",
      renderBodyCell: (row) => {
        return (
          formatDate(row.endDate)
        );
      },
      resizable: true,
    },
    {
      key: "actions",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Actions"}
        </div>
      ),
      renderHeadRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
      renderBodyCell: () => {
        return (
          <div className={`${styles.table_actions}`}>
            {/* <Switch className="mr-[8px]" /> */}
            <Button variant="secondary">
              {/* {"Edit"} */}
              <EditIcon />
            </Button>
            <Button variant="secondary">
              {/* {"Delete"} */}
              <DeleteIcon />
            </Button>
          </div>
        );
      },
      // renderFooterCell: (
      //   <p style={{ textAlign: "right" }}>{"15"}</p>
      // ),
      sticky: "right",
    }
  ];

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
        columns={tableColumns}
        data={data}
        stickyHeader
        sort={sort}
        onSort={setSort}
        className={styles.table}
        rootClass={styles.table_wrapper}
        isRowCollapsible={isRowCollapsible}
        renderDetails={renderDetails}
        expandedRows={expandedRows}
      />
    </main>
  );
};

export default Page;

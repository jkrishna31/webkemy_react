"use client";

import Image from "next/image";
import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { tableData } from "@/data/dummy/tableData";
import { Avatar } from "@/lib/ui/elements/avatar";
import { Badge } from "@/lib/ui/elements/badges";
import { Button } from "@/lib/ui/elements/butttons";
import { Chip } from "@/lib/ui/elements/chip";
import { Checkbox } from "@/lib/ui/elements/inputs";
import { Rate } from "@/lib/ui/elements/rate";
import { Table, TableCol } from "@/lib/ui/elements/tables";
import { DeleteIcon, EditIcon, EllipsisHIcon } from "@/lib/ui/svgs/icons";
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
  rating?: number;
  status?: string;
  profile: string;
  role: string;
  dob: string;
}

const Page = () => {
  const [sort, setSort] = useState<string>();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelection = (checked: boolean, row?: TableData,) => {
    if (!row) {
      setSelectedRows(checked ? [...tableData.map(item => item.id)] : []);
    } else {
      if (checked) {
        setSelectedRows(currSelectedRows => [...currSelectedRows, row.id]);
      } else {
        setSelectedRows(currSelectedRows => [...currSelectedRows.filter(id => id !== row.id)]);
      }
    }
  };

  const tableColumns: TableCol<TableData>[] = [
    {
      key: "select",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          <Checkbox
            className={styles.all_select_check}
            data-indeterminate={!!selectedRows.length && selectedRows.length !== tableData.length}
            checked={!!selectedRows.length && selectedRows.length === tableData.length}
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
      sticky: "left",
    },
    {
      key: "rank",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {/* {"Rank"} */}
        </div>
      ),
      renderBodyCell: (row) => {
        return (
          <span style={{ color: "var(--fg-s-alt)" }}>{row.rank}</span>
        );
      },
      draggable: true,
      tdStyle: { paddingInline: "1rem" },
      // thStyle: { paddingInline: 0 },
    },
    {
      key: "name",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Name"}
        </div>
      ),
      renderBodyCell: (row) => {
        return (
          <div
            style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
          >
            <Avatar>
              <Image
                src={row.profile ?? ""} alt={row.name} width={40} height={40}
                style={{ width: "2.6rem", height: "2.6rem" }}
              />
            </Avatar>
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
    },
    {
      key: "age",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"D.O.B. (Age)"}
        </div>
      ),
      renderBodyCell: (row) => {
        const age = new Date().getFullYear() - new Date(row.dob).getFullYear();
        return (
          <>
            {formatDate(row.dob)} <span style={{ color: "var(--fg-s-alt)" }}>{"("}{row.age}{" Years"}{")"}</span>
          </>
        );
      },
      allowSort: true,
      draggable: true,
    },
    {
      key: "phone",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Phone Number"}
        </div>
      ),
      renderBodyCell: (row) => {
        return (
          row.phone
        );
      },
      draggable: true,
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
    },
    {
      key: "startDate",
      renderHeadLeft: "Started On",
      renderBodyCell: (row) => {
        return (
          formatDate(row.startDate)
        );
      },
      allowSort: true,
    },
    {
      key: "endDate",
      renderHeadLeft: "Last Updated",
      renderBodyCell: (row) => {
        return (
          formatDate(row.endDate)
        );
      },
      allowSort: true,
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
      renderBodyCell: (row) => {
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
      sticky: "right",
    }
  ];

  return (
    <main className={styles.main}>
      <PageSetup pageKey="table" />

      <Table<TableData>
        columns={tableColumns}
        data={tableData.slice(0, 25)}
        stickyHeader
        sort={sort}
        onSort={setSort}
        className={styles.table}
        rootClass={styles.table_wrapper}
      />
    </main>
  );
};

export default Page;

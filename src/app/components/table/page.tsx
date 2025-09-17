"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Button } from "@/lib/ui/elements/butttons";
import { Checkbox } from "@/lib/ui/elements/inputs";
import { Table, TableCol } from "@/lib/ui/elements/tables";
import { DeleteIcon, EditIcon, EllipsisHIcon } from "@/lib/ui/svgs/icons";
import { formatDate } from "@/lib/utils/datetime.utils";

import styles from "./styles.module.scss";

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
}

const tableData = [
  {
    id: "1", name: "Miles Calvin", age: 24,
    rank: 1, duration: 30, address: "777 Brockton Avenue, Abington MA 2351",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    phone: "(731) 346-4107",
  },
  {
    id: "2", name: "Lucille Guadalupe", age: 31,
    rank: 2, duration: 30, address: "30 Memorial Drive, Avon MA 2322",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    phone: "(250) 549-7396",
  },
  {
    id: "3", name: "Lopez Tucker", age: 27,
    rank: 3, duration: 30, address: "250 Hartford Avenue, Bellingham MA 2019",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    phone: "(335) 885-1577",
  },
  {
    id: "4", name: "Yvonne Roosevelt", age: 21,
    rank: 4, duration: 30, address: "700 Oak Street, Brockton MA 2301",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    phone: "(889) 467-6295",
  },
  {
    id: "5", name: "Lela Glover", age: 46,
    rank: 5, duration: 30, address: "66-4 Parkhurst Rd, Chelmsford MA 1824",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    phone: "(378) 738-1047",
  },
];

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
      key: "name",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Name"}
        </div>
      ),
      renderHeadRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
      renderBodyCell: (row) => {
        return (
          <p className="font-[500]">
            {row.name}
          </p>
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
          {"Age"}
        </div>
      ),
      renderHeadRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
      renderBodyCell: (row) => {
        return (
          row.age
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
      renderHeadRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
      renderBodyCell: (row) => {
        return (
          row.phone
        );
      },
      draggable: true,
    },
    {
      key: "rank",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Rank"}
        </div>
      ),
      renderHeadRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
      renderBodyCell: (row) => {
        return (
          row.rank
        );
      },
      draggable: true,
    },
    {
      key: "duration",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Duration"}
        </div>
      ),
      renderHeadRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
      renderBodyCell: (row) => {
        return (
          row.duration
        );
      },
      allowSort: true,
      draggable: true,
    },
    {
      key: "address",
      renderHeadLeft: "Address",
      renderBodyCell: (row) => {
        return (
          row.address
        );
      },
      draggable: true,
    },
    {
      key: "startDate",
      renderHeadLeft: "Started On",
      renderHeadRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
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
      renderHeadRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
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
        data={tableData}
        stickyHeader
        sort={sort}
        onSort={setSort}
        className={styles.table}
      />
    </main>
  );
};

export default Page;

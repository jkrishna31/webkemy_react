"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
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
  "inactive": "yellow",
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
}

const tableData = [
  {
    id: "1", name: "Miles Calvin", age: 24,
    rank: 1, duration: 30, address: "777 Brockton Avenue, Abington MA 2351",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(731) 346-4107",
    rating: 4.2, status: "active",
  },
  {
    id: "2", name: "Lucille Guadalupe", age: 31,
    rank: 2, duration: 30, address: "30 Memorial Drive, Avon MA 2322",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(250) 549-7396",
    rating: 5, status: "inactive",
  },
  {
    id: "3", name: "Lopez Tucker", age: 27,
    rank: 3, duration: 30, address: "250 Hartford Avenue, Bellingham MA 2019",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(335) 885-1577",
    rating: 2.5, status: "rejected",
  },
  {
    id: "4", name: "Yvonne Roosevelt", age: 21,
    rank: 4, duration: 30, address: "700 Oak Street, Brockton MA 2301",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(889) 467-6295",
    rating: 3, status: "leave",
  },
  {
    id: "5", name: "Lela Glover", age: 46,
    rank: 5, duration: 30, address: "66-4 Parkhurst Rd, Chelmsford MA 1824",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(378) 738-1047",
    rating: 1.7, status: "active",
  },
  {
    id: "6", name: "Carlos Rivera", age: 34,
    rank: 6, duration: 12, address: "12 Elm St, Austin TX 73301",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(512) 467-2039",
    rating: 0, status: "inactive",
  },
  {
    id: "7", name: "Sophia Patel", age: 29,
    rank: 7, duration: 18, address: "88 Maple Ave, Edison NJ 08817",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(908) 451-7765",
    rating: 5, status: "active",
  },
  {
    id: "8", name: "Henry Thompson", age: 52,
    rank: 8, duration: 45, address: "220 Cedar Ln, Richmond VA 23220",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(804) 330-4820",
    rating: 2, status: "leave",
  },
  {
    id: "9", name: "Mia Chen", age: 41,
    rank: 9, duration: 24, address: "731 Willow St, San Jose CA 95125",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(408) 590-1144",
    rating: 4, status: "active",
  },
  {
    id: "10", name: "Daniel O'Connor", age: 38,
    rank: 10, duration: 36, address: "67 Broad St, Boston MA 02109",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(617) 742-6651",
    rating: 3, status: "inactive",
  },
  {
    id: "11", name: "Ava Martinez", age: 27,
    rank: 11, duration: 10, address: "440 Palm Dr, Miami FL 33101",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(305) 983-2240",
    rating: 5, status: "rejected",
  },
  {
    id: "12", name: "Liam Anderson", age: 33,
    rank: 12, duration: 20, address: "501 King St, Seattle WA 98104",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(206) 399-7721",
    rating: 1, status: "active",
  },
  {
    id: "13", name: "Emma Wilson", age: 45,
    rank: 13, duration: 50, address: "29 Market Sq, Pittsburgh PA 15222",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(412) 254-6330",
    rating: 0, status: "leave",
  },
  {
    id: "14", name: "Noah Smith", age: 39,
    rank: 14, duration: 14, address: "1020 Olive St, St. Louis MO 63101",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(314) 209-8429",
    rating: 2, status: "inactive",
  },
  {
    id: "15", name: "Isabella Rossi", age: 31,
    rank: 15, duration: 22, address: "5 Sunset Blvd, Los Angeles CA 90026",
    startDate: new Date().toISOString(), endDate: new Date().toISOString(),
    phone: "(213) 745-1188",
    rating: 4, status: "active",
  }
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
      key: "status",
      renderHeadLeft: (
        <div className={styles.header_cell}>
          {"Status"}
        </div>
      ),
      renderHeadRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
      renderBodyCell: (row) => {
        return row.status ? (
          <Chip color={statusColorMap[row.status]}>{row.status}</Chip>
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
          row.address
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
      renderHeadRight: (
        <button className={styles.col_more}>
          <EllipsisHIcon />
        </button>
      ),
      renderBodyCell: (row) => {
        return (
          <Rate rating={row.rating} className={styles.rate} readonly noStroke key={row.id} />
        );
      },
      allowSort: true,
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
        rootClass={styles.table_wrapper}
      />
    </main>
  );
};

export default Page;

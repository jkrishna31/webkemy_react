"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Pagination } from "@/lib/ui/elements/Pagination";

import styles from "./page.module.scss";

const totalRecords = 1500;
const recordsPerPage = 10;

const Page = () => {
  const [currPage, setCurrPage] = useState(1);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="pagination" />

      <Pagination
        currentPage={currPage} totalRecords={totalRecords} recordsPerPage={recordsPerPage}
        onPageChange={setCurrPage}
      />
      <Pagination
        siblingCount={2}
        currentPage={currPage} totalRecords={totalRecords} recordsPerPage={recordsPerPage}
        onPageChange={setCurrPage}
      />
    </main>
  );
};

export default Page;

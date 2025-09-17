import React from "react";

import { PageSetup } from "@/components/managers";
import { Pagination } from "@/lib/ui/elements/pagination";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="pagination" />

      <Pagination currentPage={4} totalRecords={1500} recordsPerPage={10} />
    </main>
  );
};

export default Page;

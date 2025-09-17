import React from "react";

import { PageSetup } from "@/components/managers";
import { Rate } from "@/lib/ui/elements/rate";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="rate" />

      <Rate />
    </main>
  );
};

export default page;

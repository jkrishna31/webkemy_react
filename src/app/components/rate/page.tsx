import React from "react";

import { PageSetup } from "@/components/managers";
import { Rate } from "@/lib/ui/elements/rate";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="rate" />

      <Rate />
      <Rate max={7} color="blue" />
      <Rate rating={4} max={5} color="green" readonly />
      <Rate rating={3} max={5} color="red" disabled />
    </main>
  );
};

export default page;

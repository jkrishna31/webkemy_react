import React from "react";

import { PageSetup } from "@/components/managers";
import { Chip } from "@/lib/ui/elements/chip";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="chip" />

      <Chip label="Active" />
      <Chip color="blue" label="Processing" />
      <Chip color="red" label="Cancelled" />
      <Chip color="green" label="Successful" />
    </main>
  );
};

export default Page;

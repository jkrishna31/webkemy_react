import React from "react";

import { PageSetup } from "@/components/managers";
import { Select } from "@/lib/ui/elements/inputs";

import styles from "./styles.module.scss";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
  { label: "Option 5", value: "5" },
  { label: "Option 6", value: "6" },
];

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="select" />

      <Select options={options} className={styles.input} aria-label="Select" />
    </main>
  );
};

export default Page;

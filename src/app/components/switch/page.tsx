import React from "react";

import { PageSetup } from "@/components/managers";
import { Switch } from "@/lib/ui/elements/inputs";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="switch" />

      <Switch switchSize="sm" />
      <Switch switchSize="md" />
      <Switch switchSize="lg" />
    </main>
  );
};

export default page;

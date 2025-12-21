"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { TabList } from "@/lib/ui/elements/TabList";

import styles from "./styles.module.scss";

const tabs = [
  { id: "1", label: "Tab Item 1" },
  { id: "2", label: "Tab Item 2" },
  { id: "3", label: "Tab Item 3" },
  { id: "4", label: "Tab Item 4" },
  { id: "5", label: "Tab Item 5" },
  { id: "6", label: "Tab Item 6" },
  { id: "7", label: "Tab Item 7" },
  { id: "8", label: "Tab Item 8" },
  { id: "9", label: "Tab Item 9" },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  return (
    <main className={styles.main}>
      <PageSetup pageKey="tablist" />

      <TabList
        tabs={tabs} activeTab={activeTab} onChange={setActiveTab}
        className={styles.tablist}
      />
    </main>
  );
};

export default Page;

"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { TabList } from "@/lib/ui/elements/tablist";

import styles from "./styles.module.scss";

const tabs = [
  { id: "trending", label: "Trending" },
  { id: "followers", label: "Followers" },
  { id: "following", label: "Following" },
  { id: "reactjs", label: "ReactJS" },
  { id: "nextjs", label: "NextJS" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web" },
  { id: "llm", label: "LLM" },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState<string>("trending");

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

import React from "react";

import { PageSetup } from "@/components/managers";
import { SplitHandle, SplitSection, Splitter } from "@/lib/ui/elements/splitter";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="splitter" />

      <Splitter>
        <Splitter layout="v">
          <SplitSection>{"1"}</SplitSection>
          <SplitHandle />
          <SplitSection>{"2"}</SplitSection>
        </Splitter>

        <SplitHandle />

        <Splitter layout="v">
          <SplitSection>{"3"}</SplitSection>
          <SplitHandle />
          <SplitSection>{"4"}</SplitSection>
          <SplitHandle />
          <SplitSection>{"5"}</SplitSection>
        </Splitter>

        <SplitHandle />

        <Splitter layout="v">
          <SplitSection>{"6"}</SplitSection>
          <SplitHandle />
          <SplitSection>{"7"}</SplitSection>
        </Splitter>
      </Splitter>
    </main>
  );
};

export default Page;

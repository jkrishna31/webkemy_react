"use client";

import { PageSetup } from "@/components/managers";
import { useSplitter } from "@/lib/hooks/useSplitter";
import { SplitHandle, SplitSection, Splitter } from "@/lib/ui/elements/Splitter";

import styles from "./page.module.scss";

const Page = () => {
  const { onResize, getSectionSize } = useSplitter([{ key: "1", children: ["2", "3"] }, { key: "4", children: ["5", "6", "7"] }, { key: "8", children: ["9", "10"] }]);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="splitter" />

      <Splitter className={styles.root_splitter}>
        <Splitter layout="v" size={getSectionSize("1")}>
          <SplitSection size={getSectionSize("2")} className={styles.split_section}>{"1"}</SplitSection>
          <SplitHandle onChange={value => onResize(value, [0, 0])} />
          <SplitSection size={getSectionSize("3")} className={styles.split_section}>{"2"}</SplitSection>
        </Splitter>

        <SplitHandle onChange={value => onResize(value, [0])} />

        <Splitter layout="v" size={getSectionSize("4")}>
          <SplitSection size={getSectionSize("5")} className={styles.split_section}>{"3"}</SplitSection>
          <SplitHandle onChange={value => onResize(value, [1, 0])} />
          <SplitSection size={getSectionSize("6")} className={styles.split_section}>{"4"}</SplitSection>
          <SplitHandle onChange={value => onResize(value, [1, 1])} />
          <SplitSection size={getSectionSize("7")} className={styles.split_section}>{"5"}</SplitSection>
        </Splitter>

        <SplitHandle onChange={value => onResize(value, [1])} />

        <Splitter layout="v" size={getSectionSize("8")}>
          <SplitSection size={getSectionSize("9")} className={styles.split_section}>{"6"}</SplitSection>
          <SplitHandle onChange={value => onResize(value, [2, 0])} />
          <SplitSection size={getSectionSize("10")} className={styles.split_section}>{"7"}</SplitSection>
        </Splitter>
      </Splitter>
    </main>
  );
};

export default Page;

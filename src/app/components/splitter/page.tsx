"use client";

import React from "react";

import { PageSetup } from "@/components/managers";
import { useSplitter } from "@/lib/hooks";
import { SplitHandle, SplitSection, Splitter } from "@/lib/ui/elements/splitter";

import styles from "./styles.module.scss";

const Page = () => {
  const { sizes, onResize } = useSplitter([100, 100, 100]);
  const { sizes: sizes12, onResize: onResize12 } = useSplitter([100, 100]);
  const { sizes: sizes67, onResize: onResize67 } = useSplitter([100, 100]);
  const { sizes: sizes345, onResize: onResize345 } = useSplitter([100, 100, 100]);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="splitter" />

      <Splitter>
        <Splitter layout="v" value={sizes[0]}>
          <SplitSection value={sizes12[0]}>{"1"}</SplitSection>
          <SplitHandle value={sizes12[0]} onChange={(e) => onResize12(Number((e.target as HTMLInputElement).value))} />
          <SplitSection value={sizes12[1]}>{"2"}</SplitSection>
        </Splitter>

        <SplitHandle onChange={(e) => onResize(Number((e.target as HTMLInputElement).value))} />

        <Splitter layout="v" value={sizes[1]}>
          <SplitSection value={sizes345[0]}>{"3"}</SplitSection>
          <SplitHandle value={sizes345[0]} onChange={(e) => onResize345(Number((e.target as HTMLInputElement).value))} />
          <SplitSection value={sizes345[1]}>{"4"}</SplitSection>
          <SplitHandle value={sizes345[1]} onChange={(e) => onResize345(Number((e.target as HTMLInputElement).value), 1)} />
          <SplitSection value={sizes345[2]}>{"5"}</SplitSection>
        </Splitter>

        <SplitHandle onChange={(e) => onResize(Number((e.target as HTMLInputElement).value), 1)} />

        <Splitter layout="v" value={sizes[2]}>
          <SplitSection value={sizes67[0]}>{"6"}</SplitSection>
          <SplitHandle value={sizes67[0]} onChange={(e) => onResize67(Number((e.target as HTMLInputElement).value))} />
          <SplitSection value={sizes67[1]}>{"7"}</SplitSection>
        </Splitter>
      </Splitter>
    </main>
  );
};

export default Page;

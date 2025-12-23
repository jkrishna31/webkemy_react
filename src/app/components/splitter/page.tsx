"use client";

import React, { useCallback } from "react";

import { PageSetup } from "@/components/managers";
import { useSplitter } from "@/lib/hooks/useSplitter";
import { SplitHandle, SplitSection, Splitter } from "@/lib/ui/elements/Splitter";

import styles from "./styles.module.scss";

const Page = () => {
  const { sizes, onResize } = useSplitter([100, 100, 100]);
  const { sizes: sizes12, onResize: onResize12 } = useSplitter([100, 100]);
  const { sizes: sizes67, onResize: onResize67 } = useSplitter([100, 100]);
  const { sizes: sizes345, onResize: onResize345 } = useSplitter([100, 100, 100]);

  const handleChangeFirst = useCallback((e: any) => onResize(Number(e.target.value)), [onResize]);
  const handleChangeLast = useCallback((e: any) => onResize(Number(e.target.value), 1), [onResize]);
  const handleChange12 = useCallback((e: any) => onResize12(Number(e.target.value)), [onResize12]);
  const handleChange67 = useCallback((e: any) => onResize67(Number(e.target.value)), [onResize67]);
  const handleChange345First = useCallback((e: any) => onResize345(Number(e.target.value)), [onResize345]);
  const handleChange345Last = useCallback((e: any) => onResize345(Number(e.target.value), 1), [onResize345]);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="splitter" />

      <Splitter className={styles.root_splitter}>
        <Splitter layout="v" value={sizes[0]}>
          <SplitSection className={styles.split_section} size={sizes12[0]}>{"1"}</SplitSection>
          <SplitHandle onChange={handleChange12} />
          <SplitSection className={styles.split_section} size={sizes12[1]}>{"2"}</SplitSection>
        </Splitter>

        <SplitHandle onChange={handleChangeFirst} />

        <Splitter layout="v" value={sizes[1]}>
          <SplitSection className={styles.split_section} size={sizes345[0]}>{"3"}</SplitSection>
          <SplitHandle onChange={handleChange345First} />
          <SplitSection className={styles.split_section} size={sizes345[1]}>{"4"}</SplitSection>
          <SplitHandle onChange={handleChange345Last} />
          <SplitSection className={styles.split_section} size={sizes345[2]}>{"5"}</SplitSection>
        </Splitter>

        <SplitHandle onChange={handleChangeLast} />

        <Splitter layout="v" value={sizes[2]}>
          <SplitSection className={styles.split_section} size={sizes67[0]}>{"6"}</SplitSection>
          <SplitHandle onChange={handleChange67} />
          <SplitSection className={styles.split_section} size={sizes67[1]}>{"7"}</SplitSection>
        </Splitter>
      </Splitter>
    </main>
  );
};

export default Page;

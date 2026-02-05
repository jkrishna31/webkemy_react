"use client";

import Image from "next/image";
import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Comparator, ComparatorItem } from "@/lib/ui/elements/Comparator";
import { classes } from "@/lib/utils/style.utils";

import styles from "./page.module.scss";

const Page = () => {
  const [value, setValue] = useState<[number, number]>([50, 50]);

  const renderImg = (style?: React.CSSProperties) => {
    return (
      <Image
        src="https://images.unsplash.com/photo-1499343162160-cd1441923dd3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        width={360}
        height={360}
        style={{ width: "100%", height: "100%", ...style }}
        unoptimized
      />
    );
  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="comparator" />

      <Comparator
        className={classes(styles.comparator)}
        value={value}
        onChange={setValue}
      >
        <ComparatorItem position="top_left" use="mask">
          {renderImg({ filter: "grayscale(100%)" })}
        </ComparatorItem>
        <ComparatorItem position="top_right" use="mask">
          {renderImg({ filter: "hue-rotate(120deg)" })}
        </ComparatorItem>
        <ComparatorItem position="bottom_left" use="mask">
          {renderImg({ filter: "invert(100%)" })}
        </ComparatorItem>
        <ComparatorItem position="bottom_right" use="mask">
          {renderImg({ filter: "" })}
        </ComparatorItem>
      </Comparator>

      <Comparator
        className={classes(styles.comparator)}
        value={[value[0], 100]}
        onChange={setValue}
      >
        <ComparatorItem position="top_left" use="mask">
          {renderImg()}
        </ComparatorItem>
        <ComparatorItem position="top_right" use="mask">
          {renderImg({ filter: "invert(100%)" })}
        </ComparatorItem>
      </Comparator>

      <Comparator
        className={classes(styles.comparator)}
        value={[100, value[1]]}
        onChange={setValue}
      >
        <ComparatorItem position="top_left" use="mask">
          {renderImg()}
        </ComparatorItem>
        <ComparatorItem position="top_right" use="mask">
          {renderImg({ filter: "hue-rotate(120deg)" })}
        </ComparatorItem>
      </Comparator>
    </main>
  );
};

export default Page;

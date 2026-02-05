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
        src="https://images.unsplash.com/photo-1764069970723-eff3e12de883?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
        alt=""
        width={360}
        height={360}
        style={{ width: "100%", height: "100%", ...style }}
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
          {renderImg({ filter: "invert(70%)" })}
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
          {renderImg({ filter: "grayscale(100%)" })}
        </ComparatorItem>
        <ComparatorItem position="top_right" use="mask">
          {renderImg({ filter: "hue-rotate(120deg)" })}
        </ComparatorItem>
      </Comparator>

      <Comparator
        className={classes(styles.comparator)}
        value={[100, value[1]]}
        onChange={setValue}
      >
        <ComparatorItem position="top_left" use="mask">
          {renderImg({ filter: "grayscale(100%)" })}
        </ComparatorItem>
        <ComparatorItem position="top_right" use="mask">
          {renderImg({ filter: "hue-rotate(120deg)" })}
        </ComparatorItem>
      </Comparator>
    </main>
  );
};

export default Page;

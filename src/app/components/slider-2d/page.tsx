"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Slider2D } from "@/lib/components/elements/slider-2d";
import { Text } from "@/lib/components/elements/text";

import styles from "./page.module.scss";

const defaultValue: [number, number] = [0, 0];

const Page = () => {
  const [value, setValue] = useState<[number, number]>(defaultValue);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="slider-2d" />

      <Slider2D
        value={value}
        onInput={setValue}
        className={styles.slider}
        aria-label="Slide"
      />
      <Text>{value[0]}{", "}{value[1]}</Text>
    </main>
  );
};

export default Page;

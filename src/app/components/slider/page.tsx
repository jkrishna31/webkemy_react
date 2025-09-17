"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Slider } from "@/lib/ui/elements/inputs";

import styles from "./styles.module.scss";

const Page = () => {
  const [value, setValue] = useState(0);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="slider" />

      <Slider
        variant="tube"
        min={0} max={100} step={1}
        value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
      />
      <Slider
        variant="rod"
        min={0} max={100} step={1}
        value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
      />
      <Slider
        asProgress={true}
        min={0} max={100} step={1}
        value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
      />
      <Slider
        min={0} max={100} step={1}
        asProgress={true} variant="rod"
        value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
      />
      <Slider
        orientation="vertical"
        dir="rtl"
        min={0} max={100} step={1}
        value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
      />
    </main>
  );
};

export default Page;

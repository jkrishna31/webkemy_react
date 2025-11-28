"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Slider } from "@/lib/ui/elements/inputs";
import { Text } from "@/lib/ui/elements/text";

import styles from "./styles.module.scss";

const Page = () => {
  const [value, setValue] = useState(0);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="slider" />

      <Text as="p">{"Value: "}{value}</Text>

      <Slider
        variant="tube"
        min={0} max={100} step={1}
        value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
        aria-label="Slide to Value"
      />
      <Slider
        variant="rod"
        min={0} max={100} step={1}
        value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
        aria-label="Slide to Value"
      />
      <Slider
        showFill={true}
        min={0} max={100} step={1}
        value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
        aria-label="Slide to Value"
      />
      <Slider
        min={0} max={100} step={1}
        showFill={true} variant="rod"
        value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
        aria-label="Slide to Value"
      />
      <Slider
        min={0} max={100} step={1}
        showFill={true} variant="rod" dir="rtl"
        value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
        aria-label="Slide to Value"
      />
      <div style={{ display: "flex", alignItems: "center", gap: "4rem" }}>
        <Slider
          orientation="vertical"
          showFill={true}
          dir="rtl"
          min={0} max={100} step={1}
          value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
          aria-label="Slide to Value"
        />
        <Slider
          orientation="vertical"
          showFill={true}
          min={0} max={100} step={1}
          value={value} onInput={e => setValue((e.target as HTMLInputElement).valueAsNumber)}
          aria-label="Slide to Value"
        />
      </div>
    </main>
  );
};

export default Page;

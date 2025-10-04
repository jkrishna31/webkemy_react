"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { NumberInput } from "@/lib/ui/elements/inputs";

import styles from "./styles.module.scss";

const Page = () => {
  const [value, setValue] = useState<number>();

  return (
    <main className={styles.main}>
      <PageSetup pageKey="number-input" />

      <NumberInput
        value={value}
        onInput={e => setValue(Number((e.target as HTMLInputElement).value))}
      />

      <NumberInput
        value={value} enclosedControls
        onInput={e => setValue(Number((e.target as HTMLInputElement).value))}
      />

      <NumberInput
        value={value} hideControls
        onInput={e => setValue(Number((e.target as HTMLInputElement).value))}
      />
    </main>
  );
};

export default Page;

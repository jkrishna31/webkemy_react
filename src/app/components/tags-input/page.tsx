"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { TagsInput } from "@/lib/ui/elements/inputs";

import styles from "./styles.module.scss";

const Page = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState<string>();

  return (
    <main className={styles.main}>
      <PageSetup pageKey="tags-input" />

      <TagsInput
        tags={tags} setTags={setTags}
        value={value}
        onInput={(e) => setValue((e.target as HTMLInputElement).value)}
        className={styles.input}
        aria-label="Add Tags"
      />
    </main>
  );
};

export default Page;

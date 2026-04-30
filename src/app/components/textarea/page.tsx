"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { TextArea } from "@/lib/components/elements/textarea";

import styles from "./page.module.scss";

const Page = () => {
  const [value, setValue] = useState("");

  return (
    <main className={styles.main}>
      <PageSetup pageKey="textarea" />

      <TextArea value={value} onChange={e => setValue((e.target as HTMLTextAreaElement).value)} rows={4} placeholder="Textarea with 4 rows by default & auto-resizable" aria-label="Textarea" />
      <TextArea rows={2} placeholder="Textarea with 2 rows by default & no-resize" autoResize={false} aria-label="Textarea" />
      <TextArea placeholder="Textarea with no multiline (wraps)" multiline={false} aria-label="Textarea" />
    </main>
  );
};

export default Page;

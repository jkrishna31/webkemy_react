import React from "react";

import { PageSetup } from "@/components/managers";
import { InputFieldWrapper, TextArea } from "@/lib/ui/elements/inputs";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="textarea" />

      <InputFieldWrapper className={styles.field_wrapper}>
        <TextArea rows={4} placeholder="Textarea with 4 rows by default & auto-resizable..." />
      </InputFieldWrapper>

      <InputFieldWrapper className={styles.field_wrapper}>
        <TextArea rows={2} placeholder="Textarea with 2 rows by default & no-resize..." autoResize={false} />
      </InputFieldWrapper>

      <InputFieldWrapper className={styles.field_wrapper}>
        <TextArea placeholder="Textarea with no multiline (wraps)..." multiline={false} />
      </InputFieldWrapper>
    </main>
  );
};

export default page;

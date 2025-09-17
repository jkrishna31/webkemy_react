import React from "react";

import { PageSetup } from "@/components/managers";
import { GeneralInput, InputFieldWrapper } from "@/lib/ui/elements/inputs";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="input" />

      <InputFieldWrapper className={styles.wrapper}>
        <GeneralInput placeholder="Write here..." />
      </InputFieldWrapper>
    </main>
  );
};

export default page;

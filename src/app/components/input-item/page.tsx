import React from "react";

import { PageSetup } from "@/components/managers";
import { GeneralInput, InputFieldWrapper, InputItem, Radio } from "@/lib/ui/elements/inputs";
import { Text } from "@/lib/ui/elements/text";

import styles from "./styles.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="input-item" />

      <InputItem className={styles.wrapper}>
        <Text<"label"> as="label">{"Label 1"}</Text>
        <InputFieldWrapper>
          <GeneralInput />
        </InputFieldWrapper>
      </InputItem>

      <InputItem inline className={styles.wrapper}>
        <Text<"label"> as="label" inline>{"Label 2"}</Text>
        <InputFieldWrapper>
          <GeneralInput />
        </InputFieldWrapper>
      </InputItem>

      <InputItem inline className={styles.wrapper}>
        <InputFieldWrapper>
          <GeneralInput />
        </InputFieldWrapper>
        <Text<"label"> as="label" inline>{"Label 3"}</Text>
      </InputItem>

      <InputItem<"fieldset"> as="fieldset" inline className={styles.wrapper}>
        <Text<"legend"> as="legend">{"Label 4 (fieldset)"}</Text>
        <InputItem inline className={styles.option}>
          <Radio name="option" id="1" value="1" />
          <Text<"label"> as="label" inline normal htmlFor="1">{"Option 1"}</Text>
        </InputItem>

        <InputItem inline className={styles.option}>
          <Radio name="option" id="2" value="2" />
          <Text<"label"> as="label" inline normal htmlFor="2">{"Option 2"}</Text>
        </InputItem>

        <InputItem inline className={styles.option}>
          <Radio name="option" id="3" value="3" />
          <Text<"label"> as="label" inline normal htmlFor="3">{"Option 3"}</Text>
        </InputItem>

        <InputItem inline className={styles.option}>
          <Radio name="option" id="4" value="4" />
          <Text<"label"> as="label" inline normal htmlFor="4">{"Option 4"}</Text>
        </InputItem>
      </InputItem>
    </main>
  );
};

export default page;

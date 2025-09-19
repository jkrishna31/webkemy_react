import React from "react";

import { PageSetup } from "@/components/managers";
import { Checkbox, InputItem } from "@/lib/ui/elements/inputs";
import { Text } from "@/lib/ui/elements/text";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="checkbox" />

      <InputItem<"fieldset">
        as="fieldset"
        name="option"
        className={styles.fieldset}
      >
        <Text<"legend"> as="legend">{"Choose your Options"}</Text>

        <InputItem inline className={styles.option}>
          <Checkbox name="option" id="1" value={1} />
          <Text<"label"> as="label" inline normal htmlFor="1">{"Option 1"}</Text>
        </InputItem>

        <InputItem inline className={styles.option}>
          <Checkbox name="option" id="2" value={2} />
          <Text<"label"> as="label" inline normal htmlFor="2">{"Option 2"}</Text>
        </InputItem>

        <InputItem inline className={styles.option}>
          <Checkbox name="option" id="3" value={3} disabled />
          <Text<"label"> as="label" inline normal htmlFor="3" disabled>{"Option 3"}</Text>
        </InputItem>

        <InputItem inline className={styles.option}>
          <Checkbox name="option" id="4" value={4} />
          <Text<"label"> as="label" inline normal htmlFor="4">{"Option 4"}</Text>
        </InputItem>
      </InputItem>
    </main>
  );
};

export default Page;

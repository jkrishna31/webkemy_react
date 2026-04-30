import { PageSetup } from "@/components/managers";
import { Input } from "@/lib/components/elements/input";
import { InputItem } from "@/lib/components/elements/input-item";
import { Radio } from "@/lib/components/elements/radio";
import { Text } from "@/lib/components/elements/text";

import styles from "./page.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="input-item" />

      <InputItem className={styles.wrapper}>
        <Text<"label"> as="label" htmlFor="input_1">{"Label 1"}</Text>
        <InputItem.FieldWrapper>
          <Input id="input_1" />
        </InputItem.FieldWrapper>
      </InputItem>

      <InputItem inline className={styles.wrapper}>
        <Text<"label"> as="label" htmlFor="input_2" inline>{"Label 2"}</Text>
        <InputItem.FieldWrapper>
          <Input id="input_2" />
        </InputItem.FieldWrapper>
      </InputItem>

      <InputItem inline className={styles.wrapper}>
        <InputItem.FieldWrapper>
          <Input aria-label="input_3" />
        </InputItem.FieldWrapper>
        <Text<"label"> as="label" inline>{"Label 3"}</Text>
      </InputItem>

      <InputItem<"fieldset"> as="fieldset" inline className={styles.wrapper}>
        <Text<"legend"> as="legend">{"Label 4 (fieldset)"}</Text>

        <div style={{ display: "flex", alignItems: "center", columnGap: "1rem", flexWrap: "wrap" }}>
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
        </div>
      </InputItem>
    </main>
  );
};

export default page;

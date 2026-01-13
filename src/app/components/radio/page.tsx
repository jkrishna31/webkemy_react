import { PageSetup } from "@/components/managers";
import { InputItem } from "@/lib/ui/elements/inputs/InputItem";
import { Radio } from "@/lib/ui/elements/inputs/Radio";
import { Text } from "@/lib/ui/elements/Text";

import styles from "./styles.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="radio" />

      <InputItem<"fieldset">
        as="fieldset"
        name="option"
        className={styles.fieldset}
      >
        <Text<"legend"> as="legend">{"Choose Your Option"}</Text>

        <InputItem inline className={styles.option}>
          <Radio name="option" id="1" value="1" />
          <Text<"label"> as="label" inline normal htmlFor="1">{"Option 1"}</Text>
        </InputItem>

        <InputItem inline className={styles.option}>
          <Radio name="option" id="2" value="2" />
          <Text<"label"> as="label" inline normal htmlFor="2">{"Option 2"}</Text>
        </InputItem>

        <InputItem inline className={styles.option}>
          <Radio name="option" id="3" value="3" disabled />
          <Text<"label"> as="label" inline normal htmlFor="3" disabled>{"Option 3"}</Text>
        </InputItem>

        <InputItem inline className={styles.option}>
          <Radio name="option" id="4" value="4" />
          <Text<"label"> as="label" inline normal htmlFor="4">{"Option 4"}</Text>
        </InputItem>
      </InputItem>
    </main>
  );
};

export default Page;

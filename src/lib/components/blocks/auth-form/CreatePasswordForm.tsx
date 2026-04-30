import { Button } from "@/lib/components/elements/buttton";
import { InputItem } from "@/lib/components/elements/input-item";
import { PasswordInput } from "@/lib/components/elements/password-input";
import { Text } from "@/lib/components/elements/text";

import styles from "./AuthForm.module.scss";

export const CreatePasswordForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{"Create Password"}</h1>
      </div>

      <form className={styles.form}>
        <InputItem>
          <Text<"label"> as="label">{"Password *"}</Text>
          <PasswordInput />
        </InputItem>

        <InputItem>
          <Text<"label"> as="label">{"Confirm Password *"}</Text>
          <PasswordInput />
        </InputItem>

        <Button
          variant="solid"
          className={styles.submit_btn}
        >
          {"Submit"}
        </Button>
      </form>
    </div>
  );
};

import { Button } from "@/lib/components/elements/buttton";
import { Input } from "@/lib/components/elements/input";
import { InputItem } from "@/lib/components/elements/input-item";
import { Text } from "@/lib/components/elements/text";

import styles from "./AuthForm.module.scss";

export const ResetPasswordForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{"Reset Password"}</h1>
      </div>

      <form className={styles.form}>
        <InputItem>
          <Text<"label"> as="label">{"Email *"}</Text>
          <Input placeholder="example@email.com" />
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

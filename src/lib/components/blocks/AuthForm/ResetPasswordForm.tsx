import { Button } from "@/lib/components/elements/butttons";
import { GeneralInput } from "@/lib/components/elements/inputs/GeneralInput";
import { InputItem } from "@/lib/components/elements/inputs/InputItem";
import { Text } from "@/lib/components/elements/Text";

import styles from "./AuthForm.module.scss";

const ResetPasswordForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{"Reset Password"}</h1>
      </div>

      <form className={styles.form}>
        <InputItem>
          <Text<"label"> as="label">{"Email *"}</Text>
          <GeneralInput placeholder="example@email.com" />
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

export default ResetPasswordForm;

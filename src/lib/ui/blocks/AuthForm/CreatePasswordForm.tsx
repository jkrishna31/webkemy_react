import { Button } from "@/lib/ui/elements/butttons";
import { InputItem } from "@/lib/ui/elements/inputs/InputItem";
import { PasswordInput } from "@/lib/ui/elements/inputs/PasswordInput";
import { Text } from "@/lib/ui/elements/Text";

import styles from "./AuthForm.module.scss";

const CreatePasswordForm = () => {
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
          variant="primary"
          className={styles.submit_btn}
        >
          {"Submit"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePasswordForm;

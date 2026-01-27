import { Button } from "@/lib/ui/elements/butttons";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { InputItem } from "@/lib/ui/elements/inputs/InputItem";
import { InputMetaWrapper } from "@/lib/ui/elements/inputs/InputMetaWrapper";
import { PasswordInput } from "@/lib/ui/elements/inputs/PasswordInput";
import { Text } from "@/lib/ui/elements/Text";
import CircleInfoIcon from "@/lib/ui/svgs/icons/CircleInfoIcon";

import styles from "./AuthForm.module.scss";

const SignUpForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{"Sign Up"}</h1>
      </div>

      <form className={styles.form}>
        <InputItem>
          <Text<"label"> as="label">{"Email *"}</Text>
          <InputFieldWrapper>
            <GeneralInput placeholder="example@email.com" />
          </InputFieldWrapper>
        </InputItem>

        <InputItem>
          <InputMetaWrapper>
            <Text<"label"> as="label">{"Password *"}</Text>
            <button type="button" className={styles.info_btn}>
              <CircleInfoIcon />
            </button>
          </InputMetaWrapper>
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

export default SignUpForm;

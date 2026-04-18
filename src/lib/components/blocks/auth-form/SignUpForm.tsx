import Link from "next/link";

import { AuthProviders } from "@/lib/components/blocks/auth-form";
import { Button } from "@/lib/components/elements/butttons";
import { Input } from "@/lib/components/elements/inputs/Input";
import { InputItem } from "@/lib/components/elements/inputs/InputItem";
import { InputMetaWrapper } from "@/lib/components/elements/inputs/InputMetaWrapper";
import { PasswordInput } from "@/lib/components/elements/inputs/PasswordInput";
import { Text } from "@/lib/components/elements/text";
import CircleInfoIcon from "@/lib/svgs/icons/CircleInfoIcon";

import styles from "./AuthForm.module.scss";

export const SignUpForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{"Sign Up"}</h1>
      </div>

      <AuthProviders />

      <form className={styles.form}>
        <InputItem>
          <Text<"label"> as="label">{"Email *"}</Text>
          <Input placeholder="example@email.com" />
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
          variant="solid"
          className={styles.submit_btn}
        >
          {"Submit"}
        </Button>
      </form>

      <div className={styles.footer}>
        <p>{"Already have an account? "}<Link href="#">{"Sign In"}</Link></p>
      </div>
    </div>
  );
};

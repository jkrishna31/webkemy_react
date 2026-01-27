"use client";

import { useState } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { InputItem } from "@/lib/ui/elements/inputs/InputItem";
import { PasswordInput } from "@/lib/ui/elements/inputs/PasswordInput";
import { Switch } from "@/lib/ui/elements/inputs/Switch";
import { Text } from "@/lib/ui/elements/Text";

import styles from "./AuthForm.module.scss";

const SignInForm = () => {
  const [usePassword, setUsePassword] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{"Sign In"}</h1>
      </div>

      <form className={styles.form}>
        <InputItem>
          <Text<"label"> as="label">{"Email *"}</Text>
          <InputFieldWrapper>
            <GeneralInput placeholder="example@email.com" />
          </InputFieldWrapper>
        </InputItem>

        <InputItem inline>
          <Switch id="use_password" onChange={e => setUsePassword(e.target.checked)} />
          <Text<"label"> as="label" htmlFor="use_password" inline>{"Use Password"}</Text>
        </InputItem>

        {usePassword && (
          <InputItem>
            <Text<"label"> as="label">{"Password *"}</Text>
            <PasswordInput />
          </InputItem>
        )}

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

export default SignInForm;

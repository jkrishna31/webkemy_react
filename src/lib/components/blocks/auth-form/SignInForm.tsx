"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthProviders } from "@/lib/components/blocks/auth-form";
import { Button } from "@/lib/components/elements/butttons";
import { Input } from "@/lib/components/elements/inputs/Input";
import { InputItem } from "@/lib/components/elements/inputs/InputItem";
import { PasswordInput } from "@/lib/components/elements/inputs/PasswordInput";
import { Switch } from "@/lib/components/elements/inputs/Switch";
import { Text } from "@/lib/components/elements/text";

import styles from "./AuthForm.module.scss";

export const SignInForm = () => {
  const [usePassword, setUsePassword] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{"Sign In"}</h1>
      </div>

      <AuthProviders />

      <form className={styles.form}>
        <InputItem>
          <Text<"label"> as="label">{"Email *"}</Text>
          <Input placeholder="example@email.com" />
        </InputItem>

        <InputItem inline>
          <Switch id="use_password" onChange={e => setUsePassword(e.target.checked)} />
          <Text<"label"> as="label" htmlFor="use_password" inline>{"Use Password"}</Text>
        </InputItem>

        {usePassword && (
          <div>
            <InputItem>
              <Text<"label"> as="label">{"Password *"}</Text>
              <PasswordInput />
            </InputItem>

            <button type="button" className={styles.forgot_password}>{"Forgot Password?"}</button>
          </div>
        )}

        <Button
          variant="solid"
          className={styles.submit_btn}
        >
          {"Submit"}
        </Button>
      </form>

      <div className={styles.footer}>
        <p>{"Don't have an account? "}<Link href="#">{"Create Account"}</Link></p>
      </div>
    </div>
  );
};

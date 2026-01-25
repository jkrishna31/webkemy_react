"use client";

import { useState } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { InputItem } from "@/lib/ui/elements/inputs/InputItem";
import { Switch } from "@/lib/ui/elements/inputs/Switch";
import { Text } from "@/lib/ui/elements/Text";
import EyeClosedIcon from "@/lib/ui/svgs/icons/EyeClosedIcon";
import EyeOpenIcon from "@/lib/ui/svgs/icons/EyeOpenIcon";

import styles from "./AuthForm.module.scss";

const SignInForm = () => {
  const [usePassword, setUsePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
            <InputFieldWrapper>
              <GeneralInput type={showPassword ? "text" : "password"} placeholder="******" />
              <Button
                variant="quaternary"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.visibility_toggle_btn}
              >
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </Button>
            </InputFieldWrapper>
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

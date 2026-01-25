"use client";

import { useState } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { InputItem } from "@/lib/ui/elements/inputs/InputItem";
import { Text } from "@/lib/ui/elements/Text";
import EyeClosedIcon from "@/lib/ui/svgs/icons/EyeClosedIcon";
import EyeOpenIcon from "@/lib/ui/svgs/icons/EyeOpenIcon";

import styles from "./AuthForm.module.scss";

const CreatePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{"Create Password"}</h1>
      </div>

      <form className={styles.form}>
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

        <InputItem>
          <Text<"label"> as="label">{"Confirm Password *"}</Text>
          <InputFieldWrapper>
            <GeneralInput type={showConfirmPassword ? "text" : "password"} placeholder="******" />
            <Button
              variant="quaternary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.visibility_toggle_btn}
            >
              {showConfirmPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </Button>
          </InputFieldWrapper>
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

"use client";

import { ComponentProps, useEffect, useState } from "react";

import { useDebouncedCallback } from "@/lib/hooks/useDebouncedCallback";
import { Button } from "@/lib/ui/elements/butttons";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import EyeClosedIcon from "@/lib/ui/svgs/icons/EyeClosedIcon";
import EyeOpenIcon from "@/lib/ui/svgs/icons/EyeOpenIcon";

import styles from "./PasswordInput.module.scss";

export interface PasswordInputProps extends ComponentProps<"input"> {
  autoHideDuration?: number;
}

const PasswordInput = ({
  autoHideDuration = 3000,
  className,
  ...restProps
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const hide = useDebouncedCallback(() => {
    setShowPassword(false);
  }, autoHideDuration);

  useEffect(() => {
    if (showPassword) {
      hide();
    } else {
      hide.cancel();
    }
    return () => hide.cancel();
  }, [hide, showPassword]);

  return (
    <InputFieldWrapper className={styles.wrapper}>
      <GeneralInput
        placeholder="******"
        className={className}
        onInput={(e) => {
          hide();
          restProps.onInput?.(e);
        }}
        {...restProps}
        type={showPassword ? "text" : "password"}
      />
      <Button
        variant="quaternary"
        onClick={() => setShowPassword(!showPassword)}
        className={styles.visibility_toggle_btn}
      >
        {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </Button>
    </InputFieldWrapper>
  );
};

export default PasswordInput;

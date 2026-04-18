"use client";

import { ComponentProps, useEffect, useState } from "react";

import { Button } from "@/lib/components/elements/butttons";
import { Input } from "@/lib/components/elements/inputs/Input";
import { InputFieldWrapper } from "@/lib/components/elements/inputs/InputFieldWrapper";
import { useDebouncedCallback } from "@/lib/hooks/useDebouncedCallback";
import EyeClosedIcon from "@/lib/svgs/icons/EyeClosedIcon";
import EyeOpenIcon from "@/lib/svgs/icons/EyeOpenIcon";
import { classes } from "@/lib/utils/style";

import styles from "./PasswordInput.module.scss";

export interface PasswordInputProps extends ComponentProps<"input"> {
  autoHideDuration?: number;
}

const PasswordInput = ({
  autoHideDuration = 3000,
  className, style,
  placeholder = "********",
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
    <InputFieldWrapper className={classes(styles.wrapper, className)} style={style}>
      <Input
        placeholder={placeholder}
        onInput={(e) => {
          hide();
          restProps.onInput?.(e);
        }}
        {...restProps}
        type={showPassword ? "text" : "password"}
      />
      <Button
        onClick={() => setShowPassword(!showPassword)}
        className={styles.visibility_toggle_btn}
      >
        {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </Button>
    </InputFieldWrapper>
  );
};

export default PasswordInput;

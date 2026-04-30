"use client";

import { ComponentProps, useEffect, useState } from "react";

import { Button } from "@/lib/components/elements/buttton";
import { Input } from "@/lib/components/elements/input";
import { InputItem } from "@/lib/components/elements/input-item";
import { useDebouncedCallback } from "@/lib/hooks/useDebouncedCallback";
import EyeClosedIcon from "@/lib/svgs/icons/EyeClosedIcon";
import EyeOpenIcon from "@/lib/svgs/icons/EyeOpenIcon";
import { classes } from "@/lib/utils/style";

import styles from "./PasswordInput.module.scss";

export interface PasswordInputProps extends ComponentProps<"input"> {
  autoHideDuration?: number;
}

export const PasswordInput = ({
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
    <InputItem.FieldWrapper className={classes(styles.wrapper, className)} style={style}>
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
    </InputItem.FieldWrapper>
  );
};

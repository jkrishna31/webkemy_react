"use client";

import { ComponentProps, useRef } from "react";

import { Input } from "@/lib/components/elements/input";
import { InputItem } from "@/lib/components/elements/input-item";
import { classes } from "@/lib/utils/style";

import styles from "./OtpInput.module.scss";

export interface OtpInputProps extends ComponentProps<"input"> {
  length?: number;
}

export const OtpInput = ({
  length = 6,
  type,
  className, style,
  ...restProps
}: OtpInputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // todo:
  // - if prev value is also empty, then move to input before
  // - on input move to field after [if last then be at it]
  // - arrow keys to navigate [focus trap for arrow keys]
  // - on tab move outside of otp
  // separator (before after each ) [-, /]

  const handleInput = () => {

  };

  return (
    <div
      ref={containerRef}
      className={classes(styles.wrapper, className)}
      style={style}
    >
      <input aria-hidden className={styles.hidden_input} type="hidden" {...restProps} />
      {Array.from({ length: length }).map((_, idx) => (
        <InputItem.FieldWrapper key={idx} className={styles.input_wrapper}>
          <Input
            maxLength={1} type={type} aria-setsize={length} aria-posinset={idx}
            tabIndex={-1}
          />
        </InputItem.FieldWrapper>
      ))}
    </div>
  );
};

"use client";

import React, { ComponentProps } from "react";

import { MinusIcon, PlusIcon } from "@/lib/ui/svgs/icons";

import { GeneralInput, InputFieldWrapper } from "..";
import styles from "./NumberInput.module.scss";

export interface NumberInputProps extends ComponentProps<"input"> {
  defaultValue?: number
  value?: number
  max?: number
  min?: number
  step?: number
}

const NumberInput = ({
  value, min, max, onInput, step = 1,
  className,
  ...props
}: NumberInputProps) => {
  const handleInput = (value: number) => {
    onInput?.({ target: { value: value } } as any);
  };

  const handleValueUpdation = (type: "inc" | "dec") => {
    const val = value ?? 0;
    if (type === "inc") {
      handleInput?.((max && val >= max) ? val : val + step);
    } else if (type === "dec") {
      handleInput?.((min && val <= min) ? val : val - step);
    }
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <button type="button" onClick={() => handleValueUpdation("dec")}>
        <MinusIcon />
      </button>
      <InputFieldWrapper className={styles.input_wrapper}>
        <GeneralInput
          type="number"
          inputMode="decimal"
          value={String(value)}
          onInput={e => {
            // logic to allow only number
            onInput?.(e);
          }}
          {...props}
        />
      </InputFieldWrapper>
      <button type="button" onClick={() => handleValueUpdation("inc")}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default NumberInput;

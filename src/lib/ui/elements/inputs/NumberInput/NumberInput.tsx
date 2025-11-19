"use client";

import React, { ComponentProps } from "react";

import { MinusIcon, PlusIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import { GeneralInput, InputFieldWrapper } from "..";
import styles from "./NumberInput.module.scss";

export interface NumberInputProps extends ComponentProps<"input"> {
  defaultValue?: number;
  value?: number;
  max?: number;
  min?: number;
  step?: number;
  hideControls?: boolean;
  enclosedControls?: boolean;
}

const NumberInput = ({
  value, min, max, onInput, step = 1, hideControls, enclosedControls,
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

  const renderInput = () => {
    return (
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
    );
  };

  return (
    <div className={classes(enclosedControls && "input_like", styles.wrapper, className)}>
      {
        !hideControls ? (
          <button
            type="button"
            disabled={!!min && value === min}
            onClick={() => handleValueUpdation("dec")}
            aria-label="Decrease"
            title="Decrease"
          >
            <MinusIcon />
          </button>
        ) : null
      }
      {
        enclosedControls ? (
          renderInput()
        ) : (
          <InputFieldWrapper className={styles.input_wrapper}>
            {renderInput()}
          </InputFieldWrapper>
        )
      }
      {
        !hideControls ? (
          <button
            type="button"
            disabled={!!max && value === max}
            onClick={() => handleValueUpdation("inc")}
            aria-label="Increase"
            title="Increase"
          >
            <PlusIcon />
          </button>
        ) : null
      }
    </div>
  );
};

export default NumberInput;

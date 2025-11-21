"use client";

import React, { ComponentProps, ReactNode, useEffect, useId, useState } from "react";

import { StarIcon } from "@/lib/ui/svgs/icons";
import { SVG } from "@/lib/ui/svgs/misc";
import { classes } from "@/lib/utils/style.utils";
import { Color } from "@/types/general.types";

import styles from "./Rate.module.scss";

export interface RateProps extends ComponentProps<"fieldset"> {
  color?: Color;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  subStep?: number;
  readonly?: boolean;
  disabled?: boolean;
  noStroke?: boolean;
  icon?: ReactNode;
  name?: string;
  clearable?: boolean;
  getLabelText?: (rating: number) => string;
  characters?: ReactNode[];
  itemClass?: string;
}

const Rate = ({
  value, defaultValue, onChange,
  min = 1, max = 5, step = 1, subStep = 1,
  readonly, disabled, noStroke, icon, color,
  className, children, name = "rating", clearable, onClick,
  getLabelText, characters, itemClass,
  ...props
}: RateProps) => {
  const [rate, setRate] = useState<number>(value ?? defaultValue ?? 0);
  const [active, setActive] = useState<number | null>(null);

  const id = useId();
  const total = (max - min + 1) / step;

  const handleRating = (e: React.FormEvent<HTMLFieldSetElement>) => {
    setRate(Number((e.target as HTMLInputElement).value));
    onChange?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLFieldSetElement, MouseEvent>) => {
    const selectedRating = (e.target as HTMLElement).closest("[data-rating]");
    if (selectedRating) {
      const newRated = Number(selectedRating?.getAttribute("data-rating"));
      if (newRated === rate) {
        setRate(0);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const selectedRating = (e.target as HTMLElement).closest("[data-rating]");
    if (selectedRating) {
      const newRated = Number(selectedRating?.getAttribute("data-rating"));
      setActive(newRated);
    }
  };

  const handlePointerLeave = () => {
    setActive(null);
  };

  useEffect(() => {
    setRate(value ?? defaultValue ?? 0);
  }, [defaultValue, value]);

  return (
    <fieldset
      onChange={handleRating}
      onClick={clearable ? handleClick : undefined}
      onPointerMove={(disabled || readonly) ? undefined : handlePointerMove}
      onPointerLeave={(disabled || readonly) ? undefined : handlePointerLeave}
      className={classes(styles.wrapper, className)}
      data-color={color}
      disabled={disabled || readonly}
      aria-disabled={disabled || readonly}
      aria-readonly={readonly}
      {...props}
    >
      {
        Array.from({ length: total }).map((_, idx: number) => {
          const rating = min + (step * idx);
          const ceil = active ?? rate;
          const isPartial = ceil < rating && ceil > (rating - step);
          // subSections = subStep; // each section value = (rating - 1) + step/subStep
          return (
            <span
              key={rating}
              data-rating={rating}
              data-state={(rating <= ceil && !isPartial) ? "full" : isPartial ? "partial" : ""}
              data-nostroke={noStroke}
              aria-label={String(rating)}
              aria-disabled={disabled || readonly}
              style={isPartial ? { fill: `url(#${id})` } : {}}
              className={classes(styles.item, itemClass)}
              aria-setsize={total}
              aria-posinset={rating}
            >
              {
                isPartial ? (
                  <SVG hidden>
                    <defs>
                      <linearGradient id={id}>
                        <stop offset={`${((ceil - (rating - step)) / step) * 100}%`} data-color={color ?? "default"} />
                        <stop offset={`${((ceil - (rating - step)) / step) * 100}%`} stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </SVG>
                ) : null
              }
              <input
                type="radio" name={name} id={name + "-" + rating} value={rating}
              />
              <label htmlFor={name + "-" + rating}>
                {icon ?? characters?.[idx] ?? <StarIcon />}
                <span className="invisible">
                  {getLabelText?.(rating) ?? `${rating} Rating`}
                </span>
              </label>
            </span>
          );
        })
      }
      {!!clearable && (
        <>
          <label className={styles.clear_input}>
            <input type="radio" name={name} id={name + "-clear"} value="" />
          </label>
        </>
      )}
    </fieldset>
  );
};

export default Rate;

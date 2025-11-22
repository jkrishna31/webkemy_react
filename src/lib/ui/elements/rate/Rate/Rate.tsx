"use client";

import React, { ComponentProps, Fragment, ReactNode, useEffect, useId, useState } from "react";

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
  min = 1, max = 5, step = 1, subStep = step,
  readonly, disabled, noStroke, icon, color,
  className, children, name = "rating", clearable, onClick,
  getLabelText, characters, itemClass,
  ...props
}: RateProps) => {
  const [rate, setRate] = useState<number>(value ?? defaultValue ?? 0);
  const [active, setActive] = useState<number | null>(null);

  const id = useId();
  const total = (max - min + 1) / step;
  const noOfSubStops = Math.ceil(step / subStep);

  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(Number((e.target as HTMLInputElement).value));
    onChange?.(e as any);
  };

  const handleClick = (e: React.MouseEvent<HTMLFieldSetElement, MouseEvent>) => {
    const selectedRatingElem = (e.target as HTMLElement).closest("[data-rating]");
    if (selectedRatingElem) {
      const newRating = Number(selectedRatingElem?.getAttribute("data-rating"));
      // adjust as per mouse offset from the selectedRatingElem
      if (newRating === rate) {
        setRate(0);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const selectedRatingElem = (e.target as HTMLElement).closest("[data-rating]");
    if (selectedRatingElem) {
      const newRating = Number(selectedRatingElem?.getAttribute("data-rating"));
      const selectedRatingElemRect = selectedRatingElem.getBoundingClientRect();
      const subStepInPx = selectedRatingElemRect.width / noOfSubStops;
      const coveredSubStops = Math.ceil((e.clientX - selectedRatingElemRect.x) / subStepInPx);
      const finalNewRating = (newRating - step) + (coveredSubStops * subStep);
      setActive(finalNewRating);
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
      {!!clearable && (
        <>
          <input
            type="radio"
            name={name} id={name + "-clear"}
            value=""
            onChange={handleRating}
            className={classes(styles.clear_input)}
          />
          <label className={styles.clear_input_label} htmlFor={name + "-clear"}></label>
        </>
      )}
      {
        Array.from({ length: total }).map((_, stepIdx: number) => {
          const rating = min + (step * stepIdx);
          const ceil = active ?? rate;
          const isPartial = ceil < rating && ceil > (rating - step);
          return (
            <span
              key={"rating-" + rating}
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
              {
                Array.from({ length: noOfSubStops }).map((_, subStepIdx) => {
                  const subRating = Math.min((rating - step) + ((subStepIdx + 1) * subStep), rating);
                  return (
                    <Fragment key={subRating}>
                      <label htmlFor={name + "-" + subRating} className={classes(subRating === active && styles.active_label)}>
                        <span className="invisible" hidden>
                          {getLabelText?.(subRating) ?? subRating}
                        </span>
                      </label>
                      <input
                        type="radio"
                        name={name} id={name + "-" + subRating}
                        value={subRating}
                        defaultChecked={subRating === ceil}
                        onChange={handleRating}
                      />
                    </Fragment>
                  );
                })
              }
              {/* <label>
              </label> */}
              {icon ?? characters?.[stepIdx] ?? <StarIcon />}
            </span>
          );
        })
      }
    </fieldset>
  );
};

export default Rate;

"use client";

import React, { ComponentProps, useState } from "react";

import { StarIcon } from "@/lib/ui/svgs/icons";
import { Color } from "@/types/general.types";

import styles from "./Rate.module.scss";

export interface RateProps extends ComponentProps<"div"> {
  color?: Color;
  rating?: number;
  min?: number;
  max?: number;
  step?: number;
  readonly?: boolean;
  disabled?: boolean;
}

const Rate = ({
  rating = 0, color,
  min = 1, max = 5, step = 1,
  readonly, disabled,
  className, children,
  ...props
}: RateProps) => {
  const [rated, setRated] = useState<number>(rating);

  const handleRating = (e: React.MouseEvent) => {
    const selectedRating = (e.target as HTMLElement).closest("[data-rating]");
    if (selectedRating) {
      setRated(Number(selectedRating?.getAttribute("data-rating")));
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      onClick={(readonly || disabled) ? undefined : handleRating}
      aria-readonly={readonly}
      aria-disabled={disabled}
      data-color={color}
    >
      {
        Array.from({ length: (max - min + 1) / step }).map((_, idx: number) => {
          const rating = min + (step * idx);
          return (
            <button
              key={rating}
              data-rating={rating} data-selected={rating <= rated}
              disabled={disabled}
              aria-disabled={disabled}
              data-readonly={readonly}
            >
              <StarIcon className={`${styles.icon}`} />
            </button>
          );
        })
      }
    </div>
  );
};

export default Rate;

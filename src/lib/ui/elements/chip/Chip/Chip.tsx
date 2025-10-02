import React, { ComponentProps } from "react";

import { CrossIcon } from "@/lib/ui/svgs/icons";
import { Color } from "@/types/general.types";

import styles from "./Chip.module.scss";

export interface ChipProps extends ComponentProps<"div"> {
  variant?: "solid" | "outlined" | "ghost";
  onRemove?: () => void;
  label?: string;
  color?: Color;
}

const Chip = ({
  onRemove, label, color, variant,
  children, className,
  ...props
}: ChipProps) => {
  return (
    <div
      className={`${styles.chip} ${onRemove ? "" : styles.static} ${className}`}
      data-color={color}
      data-removable={!!onRemove}
      {...props}
    >
      {children ?? <span>{label}</span>}
      {
        onRemove ? (
          <button type="button" className={styles.del_btn} onClick={onRemove} title="Remove Key">
            <CrossIcon className={styles.cross_icon} />
          </button>
        ) : null
      }
    </div>
  );
};

export default Chip;

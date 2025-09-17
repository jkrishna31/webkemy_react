import React, { ComponentProps } from "react";

import { CrossIcon } from "@/lib/ui/svgs/icons";

import styles from "./Chip.module.scss";

export type Color = "red" | "blue" | "green" | "yellow" | "orange";

export interface ChipProps extends ComponentProps<"div"> {
  onRemove?: () => void;
  label?: string;
  color?: Color
}

const Chip = ({
  onRemove, label, color,
  children, className,
  ...props
}: ChipProps) => {
  return (
    <div
      className={`${styles.chip} ${className}`}
      data-color={color}
      {...props}
    >
      {children ?? <span>{label}</span>}
      <button type="button" className={styles.del_btn} onClick={onRemove} title="Remove Key">
        <CrossIcon className={styles.cross_icon} />
      </button>
    </div>
  );
};

export default Chip;

import React, { ComponentProps } from "react";

import { Color } from "@/lib/types/general.types";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import { classes } from "@/lib/utils/style.utils";

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
      className={classes(styles.chip, !onRemove && styles.static, className)}
      data-color={color}
      data-removable={!!onRemove}
      {...props}
    >
      {children ?? <span>{label}</span>}
      {
        onRemove ? (
          <button type="button" className={styles.del_btn} onClick={onRemove} title="Remove">
            <CrossIcon className={styles.cross_icon} />
          </button>
        ) : null
      }
    </div>
  );
};

export default Chip;

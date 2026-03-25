import { ComponentProps, ReactNode } from "react";

import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import { Color } from "@/lib/types/general.types";
import { classes } from "@/lib/utils/style";

import styles from "./Chip.module.scss";

export interface ChipProps extends ComponentProps<"div"> {
  intensity?: "full" | "mid" | "low";
  variant?: "solid" | "outlined" | "muted";
  color?: Color;
  onRemove?: () => void;
  label?: ReactNode;
}

const Chip = ({
  onRemove, label, color, variant = "outlined", intensity,
  children, className,
  ...props
}: ChipProps) => {
  return (
    <div
      className={classes(styles.chip, styles[variant], !onRemove && styles.static, className)}
      data-color={color}
      data-intensity={intensity}
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

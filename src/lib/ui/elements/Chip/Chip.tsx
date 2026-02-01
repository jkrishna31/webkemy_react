import { ComponentProps, ReactNode } from "react";

import { Color } from "@/lib/types/general.types";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Chip.module.scss";

export interface ChipProps extends ComponentProps<"div"> {
  intensity?: "full" | "mid" | "low";
  variant?: "solid" | "outlined" | "ghost";
  onRemove?: () => void;
  label?: ReactNode;
  color?: Color;
}

const Chip = ({
  onRemove, label, color, variant, intensity,
  children, className,
  ...props
}: ChipProps) => {
  return (
    <div
      className={classes(styles.chip, !onRemove && styles.static, className)}
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

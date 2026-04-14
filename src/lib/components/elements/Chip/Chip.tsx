import Link from "next/link";
import { ComponentProps, ElementType, ReactNode } from "react";

import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import PlusIcon from "@/lib/svgs/icons/PlusIcon";
import { TColor } from "@/lib/types/general";
import { classes } from "@/lib/utils/style";

import styles from "./Chip.module.scss";

export type ChipProps<T extends ElementType> = {
  as?: T;
  intensity?: "full" | "mid" | "low";
  variant?: "solid" | "outlined" | "muted";
  color?: TColor;
  onRemove?: () => void;
  onAdd?: () => void;
  label?: ReactNode;
} & ComponentProps<T>;

const Chip = <T extends ElementType = "div">({
  as = "div",
  onRemove, onAdd, label, color, variant = "outlined", intensity,
  children, className,
  ...props
}: ChipProps<T>) => {
  const isLink = "href" in props && typeof props.href === "string";
  const Tag = isLink ? Link : as;

  return (
    <Tag
      className={classes(styles.chip, styles[variant], (!onRemove && !onAdd) && styles.static, className)}
      data-color={color}
      data-intensity={intensity}
      {...props}
    >
      {children ?? <span>{label}</span>}
      {!!onRemove && (
        <button type="button" className={styles.del_btn} onClick={onRemove} title="Remove" aria-label="Remove">
          <CrossIcon />
        </button>
      )}
      {!!onAdd && (
        <button type="button" className={styles.add_btn} onClick={onAdd} title="Add" aria-label="Add">
          <PlusIcon />
        </button>
      )}
    </Tag>
  );
};

export default Chip;

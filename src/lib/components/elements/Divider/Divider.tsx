import { ComponentProps, ReactNode } from "react";

import { TOrientation } from "@/lib/types/general";
import { classes } from "@/lib/utils/style";

import styles from "./Divider.module.scss";

export interface DividerProps extends ComponentProps<"hr"> {
  orientation?: TOrientation;
  label?: ReactNode;
  labelAlignment?: "left" | "right" | "center";
}

const Divider = ({
  orientation, label, labelAlignment,
  className, children,
  ...restProps
}: DividerProps) => {
  return (
    <div
      className={classes(styles.divider, !!labelAlignment && styles[labelAlignment], !!orientation && styles[orientation], className)}
      role="separator"
      aria-orientation={orientation}
      {...restProps}
    >
      <hr />
      {!!label && <span className={styles.label}>{label}</span>}
      {children}
    </div>
  );
};

export default Divider;

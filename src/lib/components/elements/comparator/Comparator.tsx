import { ComponentProps } from "react";

import { Slider2D } from "@/lib/components/elements/slider-2d";
import { classes } from "@/lib/utils/style";

import styles from "./Comparator.module.scss";

export interface ComparatorProps extends Omit<ComponentProps<"div">, "onChange"> {
  layout?: "split" | "quadrant";
  value?: [number, number];
  onChange?: (coords: [number, number]) => void;
}

export const Comparator = ({
  layout, value, onChange,
  className, children, style,
  ...restProps
}: ComparatorProps) => {
  const [x, y] = value ?? [50, 50];

  return (
    <div
      className={classes(styles.wrapper, className)}
      style={{ ...style, "--comparator-x": `${x}%`, "--comparator-y": `${y}%` } as React.CSSProperties}
      {...restProps}
    >
      <div className={styles.inner}>
        {children}
      </div>
      <Slider2D
        value={value}
        onChange={onChange}
        step={[.01, .01]}
        crosshair="both"
        className={styles.slider}
      />
    </div>
  );
};

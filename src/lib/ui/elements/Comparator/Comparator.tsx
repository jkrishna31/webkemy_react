import { ComponentProps } from "react";

import { Slider2D } from "@/lib/ui/elements/inputs/Slider2D";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Comparator.module.scss";

export interface ComparatorProps extends Omit<ComponentProps<"div">, "onChange"> {
  layout?: "split" | "quadrant";
  value?: [number, number];
  onChange?: (coords: [number, number]) => void;
}

const Comparator = ({
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

export default Comparator;

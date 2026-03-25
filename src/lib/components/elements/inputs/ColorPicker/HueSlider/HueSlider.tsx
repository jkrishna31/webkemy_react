import { Slider, SliderProps } from "@/lib/components/elements/inputs/Slider";
import { classes } from "@/lib/utils/style";

import styles from "./HueSlider.module.scss";

const HueSlider = ({ className, ...restProps }: SliderProps) => {
  return (
    <Slider
      id="hue"
      name="hue"
      wrapperClass={styles.wrapper}
      className={classes(styles.slider, className)}
      min={0}
      max={360}
      step={1}
      aria-label="Hue Slider"
      {...restProps}
    />
  );
};

export default HueSlider;

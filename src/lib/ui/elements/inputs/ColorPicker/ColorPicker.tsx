"use client";

import React, { CSSProperties, useState } from "react";

import { SelectDropdown } from "@/lib/ui/elements/dropdowns";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { Slider } from "@/lib/ui/elements/inputs/Slider";
import { Slider2D } from "@/lib/ui/elements/inputs/Slider2D";
import { ColorFormat, hsvToHex, hsvToHsl, hsvToRgb, stringifyColor } from "@/lib/utils/color.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ColorPicker.module.scss";

const converters: { [key in ColorFormat]?: Function } = {
  hsl: hsvToHsl,
  rgb: hsvToRgb,
  hex: hsvToHex,
  hsv: (...args: number[]) => args
};

const colorFormatOpts = [
  { label: "HSV", value: "hsv" },
  { label: "HSL", value: "hsl" },
  { label: "RGB", value: "rgb" },
  { label: "HEX", value: "hex", disabled: true },
];

const ColorPicker = () => {
  const [color, setColor] = useState<number[]>([0, 0, 100, 100]);
  const [selectedFormat, setSelectedFormat] = useState<ColorFormat>("hsv");

  const colorInSelectedFormat = converters[selectedFormat]?.(...color);
  const colorInHslFormat = hsvToHsl(color[0], color[1], color[2]);

  const handleValueChange = (field: string, value: string) => {
    setColor(currValues => {
      const newValues = [...currValues];
      const val = Number(value);
      if (field === "hue") {
        newValues[0] = val;
      } else if (field === "staturation") {
        newValues[1] = val;
      } else if (field === "lightness") {
        newValues[2] = val;
      } else if (field === "alpha") {
        newValues[3] = val;
      }
      return newValues;
    });
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        "--active-hue": color[0],
        "--active-hsl": stringifyColor(colorInHslFormat, "hsl"),
        "--active-hsla": stringifyColor([...colorInHslFormat, color[3]], "hsl", true)
      } as CSSProperties}
    >
      <div className={styles.controls}>
        <Slider2D
          className={styles.color_area}
          thumbClass={styles.area_thumb}
          value={[color[1], color[2]]}
          onInput={(coords: number[]) => {
            setColor(currColor => [currColor[0], Math.round(coords[0]), Math.round(coords[1]), currColor[3]]);
          }}
        />
        <Slider
          orientation="vertical"
          id="hue" name="hue"
          className={classes(styles.slider, styles.hue_slider)}
          min={0} max={360} step={1}
          value={color[0]}
          onInput={(e) => handleValueChange("hue", (e.target as HTMLInputElement).value)}
          aria-label="Hue Slider"
        />
        <Slider
          orientation="vertical"
          id="opacity" name="opacity"
          className={classes(styles.slider, styles.opacity_slider)}
          min={0} max={100} step={1}
          value={color[3]}
          onInput={(e) => handleValueChange("alpha", (e.target as HTMLInputElement).value)}
          aria-label="Opacity Slider"
        />
      </div>

      <div className={styles.result}>
        <div className={styles.active_color}></div>
        <SelectDropdown
          selected={selectedFormat}
          options={colorFormatOpts}
          onOptionSelect={(option) => setSelectedFormat(option.value as ColorFormat)}
          btnClass={styles.format_selector}
        />
        <InputFieldWrapper>
          <GeneralInput
            value={stringifyColor(colorInSelectedFormat, selectedFormat, true)}
            onInput={(e) => { }}
            className={styles.color_input}
            aria-label="Color Value"
          />
        </InputFieldWrapper>
      </div>
    </div>
  );
};

export default ColorPicker;

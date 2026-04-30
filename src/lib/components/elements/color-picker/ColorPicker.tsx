"use client";

import { CSSProperties, useCallback, useMemo, useState } from "react";

import { Dropdown } from "@/lib/components/elements/dropdown";
import { Input } from "@/lib/components/elements/input";
import { Item, ItemList } from "@/lib/components/elements/list-item";
import { Slider } from "@/lib/components/elements/slider";
import { Slider2D } from "@/lib/components/elements/slider-2d";
import { ColorFormat, hsvToHex, hsvToHsl, hsvToRgb, stringifyColor } from "@/lib/utils/color";
import { classes } from "@/lib/utils/style";

import styles from "./ColorPicker.module.scss";
import { HueSlider } from "./HueSlider";

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

export const ColorPicker = () => {
  const [color, setColor] = useState<number[]>([0, 0, 100, 100]);
  const [selectedFormat, setSelectedFormat] = useState<ColorFormat>("hsv");
  const [openFormatSelector, setOpenFormatSelector] = useState(false);

  const colorInSelectedFormat = converters[selectedFormat]?.(...color);
  const colorInHslFormat = hsvToHsl(color[0], color[1], color[2], color[3]);

  const satLightness = useMemo(() => [color[1], color[2]], [color]);

  const handleSatLightnessChange = useCallback((coords: number[]) => {
    setColor(currColor => [currColor[0], Math.round(coords[0]), Math.round(coords[1]), currColor[3]]);
  }, []);

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
        "--hue": colorInHslFormat[0],
        "--saturation": `${colorInHslFormat[1]}%`,
        "--lightness": `${colorInHslFormat[2]}%`,
        "--alpha": `${colorInHslFormat[3]}%`,
      } as CSSProperties}
    >
      <div className={styles.controls}>
        <Slider2D
          className={styles.color_area}
          thumbClass={styles.area_thumb}
          value={satLightness as [number, number]}
          onInput={handleSatLightnessChange}
        />
        <HueSlider
          orientation="vertical"
          value={color[0]}
          onInput={(e) => handleValueChange("hue", (e.target as HTMLInputElement).value)}
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
        <Dropdown
          open={openFormatSelector}
          onOpenChange={setOpenFormatSelector}
          dropdown={
            <ItemList>
              {
                colorFormatOpts.map(item => (
                  <Item
                    key={item.value}
                    label={item.label}
                    onClick={() => {
                      setSelectedFormat(item.value as ColorFormat);
                      setOpenFormatSelector(false);
                    }}
                    selected={selectedFormat === item.value}
                    disabled={item.disabled}
                  />
                ))
              }
            </ItemList>
          }
          triggerClass={styles.format_selector}
        >
          {colorFormatOpts.find(item => item.value === selectedFormat)?.label}
        </Dropdown>
        <Input
          value={stringifyColor(colorInSelectedFormat, selectedFormat, true)}
          onInput={(e) => { }}
          className={styles.color_input}
          aria-label="Color Value"
        />
      </div>
    </div>
  );
};

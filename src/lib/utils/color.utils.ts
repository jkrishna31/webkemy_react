export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch" | "hsv";

export const stringifyColor = (values: (number)[], format: ColorFormat, alpha?: boolean) => {
  const alphaModifier = alpha ? "a" : "";
  const alphaValue = alpha ? `, ${values[3] ?? 100}%` : "";
  switch (format) {
    case "hsl":
      return "hsl" + alphaModifier + `(${values[0]}, ${values[1]}%, ${values[2]}%` + alphaValue + ")";
    case "hsv":
      return "hsv" + alphaModifier + `(${values[0]}, ${values[1]}%, ${values[2]}%` + alphaValue + ")";
    case "rgb":
      return "rgb" + alphaModifier + `(${values[0]}, ${values[1]}, ${values[2]}` + alphaValue + ")";
  }
};

export const parseColor = (str: string) => {
  let possibleFormat: ColorFormat | undefined = undefined;
  const inputVal = str.toLowerCase();

  if (inputVal[0] === "#") possibleFormat = "hex";
  else if (inputVal.startsWith("rgb")) possibleFormat = "rgb";
  else if (inputVal.startsWith("hsl")) possibleFormat = "hsl";

  if (!possibleFormat) return;

  if (possibleFormat === "hex") {
    // 
  } else if (possibleFormat === "hsl") {
    // 
  } else if (possibleFormat === "rgb") {
    // 
  }

  // return the format and the array of values in that format
};

export const hsvToHsl = (
  hue: number,
  saturation: number,
  value: number,
) => {
  const lightness = (value * (100 - saturation / 2)) / 100;

  let _saturation = 0;
  if (lightness > 0 && lightness < 100) {
    _saturation = ((value - lightness) * 100) / Math.min(lightness, 100 - lightness);
  }
  return [hue, Math.round(_saturation), Math.round(lightness)];
};

export const hsvToRgb = (
  hue: number,
  saturation: number,
  value: number,
) => {
  const _saturation = saturation / 100;
  const _value = value / 100;

  const k = (n: number) => (n + hue / 60) % 6;
  const f = (n: number) => _value * (1 - _saturation * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [Math.round(255 * f(5)), Math.round(255 * f(3)), Math.round(255 * f(1))];
};

export const hsvToHex = (
  hue: number,
  saturation: number,
  value: number,
) => {

};

export const rgbToHex = (red: number, green: number, blue: number) => {
  return ((red << 16) + (green << 8) + blue).toString(16).padStart(6, "0");
};

export const hexToRgb = (hex: string) => {

};

export const rgbToHsl = (red: number, green: number, blue: number) => {

};

export const hslToRgb = (hue: number, saturation: number, lightness: number) => {

};

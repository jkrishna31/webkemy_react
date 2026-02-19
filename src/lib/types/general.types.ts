import { directions, themes } from "@/constants/general.const";

export type ThemeType = Exclude<typeof themes[keyof typeof themes], "theme">;
export type LangType = "english";
export type DirType = typeof directions[keyof typeof directions];
export type Color = "red" | "blue" | "green" | "yellow" | "orange" | "purple" | "pink" | "gray" | "lightblue" | "yellowgreen";
export type BaseVariant = "solid" | "ghost" | "outlined" | "muted";
export type Orientation = "vertical" | "horizontal";

export type Page = {
  key: string;
  path: string;
  children?: {
    [key: string]: Page;
  }
};

export type LeafValues<T> = T extends object ? { [K in keyof T]: LeafValues<T[K]> }[keyof T] : T;

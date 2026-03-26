import { Themes } from "@/lib/constants/general";
import { Directions } from "@/lib/constants/position";

export type ThemeType = Exclude<typeof Themes[keyof typeof Themes], "theme">;
export type LangType = "english";
export type DirType = typeof Directions[keyof typeof Directions];
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

export type DirectKeys<T> = T extends object ? keyof T : never;

export type LeafPrimitive = | string | number | boolean | bigint | symbol | null | undefined;
export type LeafValues<T> = T extends object ? { [K in keyof T]: LeafValues<T[K]> }[keyof T] : T;

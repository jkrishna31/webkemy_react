import { Colors } from "@/lib/constants/colors";
import { Themes } from "@/lib/constants/general";

export type TTheme = typeof Themes[keyof typeof Themes];
export type TLang = "english";
export type TColor = typeof Colors[keyof typeof Colors];
export type TOrientation = "vertical" | "horizontal";

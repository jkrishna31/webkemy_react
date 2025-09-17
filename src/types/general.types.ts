import { directions, themes } from "@/constants/general.const";

export type ThemeType = Exclude<typeof themes[keyof typeof themes], "theme">;
export type LangType = "english";
export type DirType = typeof directions[keyof typeof directions];

export type Page = {
  key: string;
  path: string;
  children?: {
    [key: string]: Page;
  }
};

export const Colors = {
  RED: "red",
  ORANGE: "orange",
  YELLOW: "yellow",
  GREEN: "green",
  BLUE: "blue",
  PURPLE: "purple",
  PINK: "pink",
  GRAY: "gray",
  WHITE: "white",
  BLACK: "black",
} as const;

export const SkinTonesHex = ["#FFCC22", "#FADCBC", "#E0BB95", "#BF8F68", "#9B643D", "#60452B"];

export const SkinTonesChars = ["🟡", "🏻", "🏼", "🏽", "🏾", "🏿"];

export const SkinTones = [
  { emoji: "🟡", name: "Default", id: "default", hex: SkinTonesHex[0], },
  { emoji: "🏿", name: "Dark", id: "dark", hex: SkinTonesHex[1] },
  { emoji: "🏾", name: "Medium-Dark", id: "medium_dark", hex: SkinTonesHex[2] },
  { emoji: "🏽", name: "Medium", id: "medium", hex: SkinTonesHex[3] },
  { emoji: "🏼", name: "Medium-Light", id: "medium_light", hex: SkinTonesHex[4] },
  { emoji: "🏻", name: "Light", id: "light", hex: SkinTonesHex[5] },
];

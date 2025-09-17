export const characters = {
  BULLET: "•",
  ELLIPSIS: "…",
  PENTAGRAM: "⛥",
  TEARDROP_ASTERISK: "❊",
  STRESS_OUTLINED_STAR: "✩",
  CIRCLED_STAR: "✪",
  SOLID_RIGHT_CARET: "▶",
  CHECKMARK: "✓",
  CROSSMARK: "✗",
  BOX_SQUARE: "☐",
  BOX_CIRCLE: "◯",
  COPYRIGHT: "©",
  LOADER: ["⠷", "⠯", "⠟", "⠻", "⠽", "⠾", "⠿"],
} as const;

export const skinTonesHex = ["#FFCC22", "#FADCBC", "#E0BB95", "#BF8F68", "#9B643D", "#60452B"];
export const skinTones = ["🟡", "🏻", "🏼", "🏽", "🏾", "🏿"];

export const skinTones2 = [
  { emoji: "🟡", name: "Default", id: "default", hex: skinTonesHex[0], },
  { emoji: "🏿", name: "Dark", id: "dark", hex: skinTonesHex[1] },
  { emoji: "🏾", name: "Medium-Dark", id: "medium_dark", hex: skinTonesHex[2] },
  { emoji: "🏽", name: "Medium", id: "medium", hex: skinTonesHex[3] },
  { emoji: "🏼", name: "Medium-Light", id: "medium_light", hex: skinTonesHex[4] },
  { emoji: "🏻", name: "Light", id: "light", hex: skinTonesHex[5] },
];

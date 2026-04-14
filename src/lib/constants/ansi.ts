export const ESC_HEX = "\x1b";
// export const ESC_OCT = "\033";

export const ANSIEscCodes = {
  RESET: 0,
  TextStyles: {
    BOLD: 1,
    DIM: 2,
    ITALIC: 3,
    UNDERLINE: 4,
    BLINK: 5,
    INVERSE: 7,
    HIDDEN: 8,
    STRIKE_THROUGH: 9,

    NORMAL: 22,
    NO_ITALIC: 23,
    NO_UNDERLINE: 24,
    NO_BLINK: 25,
    NO_INVERSE: 27,
    NO_HIDDEN: 28,
    NO_STRIKE_THROUGH: 29,
  },
  Colors: {
    Foreground: {
      BLACK: 30,
      RED: 31,
      GREEN: 32,
      YELLOW: 33,
      BLUE: 34,
      MAGENTA: 35,
      CYAN: 36,
      WHITE: 37,

      BRIGHT_BLACK: 90,
      BRIGHT_RED: 91,
      BRIGHT_GREEN: 92,
      BRIGHT_YELLOW: 93,
      BRIGHT_BLUE: 94,
      BRIGHT_MAGENTA: 95,
      BRIGHT_CYAN: 96,
      BRIGHT_WHITE: 97,
    },
    Background: {
      BLACK: 40,
      RED: 41,
      GREEN: 42,
      YELLOW: 43,
      BLUE: 44,
      MAGENTA: 45,
      CYAN: 46,
      WHITE: 47,

      BRIGHT_BLACK: 100,
      BRIGHT_RED: 101,
      BRIGHT_GREEN: 102,
      BRIGHT_YELLOW: 103,
      BRIGHT_BLUE: 104,
      BRIGHT_MAGENTA: 105,
      BRIGHT_CYAN: 106,
      BRIGHT_WHITE: 107,
    },
  },
};

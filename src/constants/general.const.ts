export const APPNAME = "WEBKEMY";

// ENVIRONMENT
export const env = {
    DEV: "development",
    PROD: "production",
    PRE_PROD: "pre_production",
    TEST: "test",
    STAGE: "stage",
} as const;

// THEMES
export const themes = {
    THEME: "theme",
    DARK: "dark",
    LIGHT: "light",
    SYSTEM: "system",
} as const;

// DIRECTIONS
export const directions = {
    EAST: "east",
    WEST: "west",
    NORTH: "north",
    SOUTH: "south",
    NORTH_EAST: "north_east",
    NORTH_WEST: "north_west",
    SOUTH_EAST: "south_east",
    SOUTH_WEST: "south_west",

    E: "e",
    W: "w",
    N: "n",
    S: "s",
    NE: "ne",
    NW: "nw",
    SE: "se",
    SW: "sw",
} as const;

// EDGES
export const edges = {
    RIGHT: "right",
    LEFT: "left",
    TOP: "top",
    BOTTOM: "bottom",
} as const;

export const corners = {
    TOP_LEFT: "tl",
    TOP_RIGHT: "tr",
    BOTTOM_LEFT: "bl",
    BOTTOM_RIGHT: "br",
} as const;

// POSITIONS
export const positions = {
    TOP_LEFT: "tl",
    TOP_CENTER: "tc",
    TOP_RIGHT: "tr",
    BOTTOM_LEFT: "bl",
    BOTTOM_CENTER: "bc",
    BOTTOM_RIGHT: "br",
    LEFT_CENTER: "lc",
    RIGHT_CENTER: "rc",
    CENTER: "c",
} as const;

// SOCIALS
export const socials = {
    LINKEDIN: "linkedin",
    TWITTER: "twitter",
    GITHUB: "github",
    FACEBOOK: "facebook",
    INSTAGRAM: "instagram",
    YOUTUBE: "youtube",
    REDDIT: "reddit",
} as const;

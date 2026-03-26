export const Positions = {
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

export const Corners = {
  TOP_LEFT: "tl",
  TOP_RIGHT: "tr",
  BOTTOM_LEFT: "bl",
  BOTTOM_RIGHT: "br",
} as const;

export const Edges = {
  RIGHT: "right",
  LEFT: "left",
  TOP: "top",
  BOTTOM: "bottom",
} as const;

export const Directions = {
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

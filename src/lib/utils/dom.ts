import { Edges } from "@/lib/constants/position";

export type LayoutPosition = typeof Edges[keyof typeof Edges] | "center";

export const hasDOM = () => {
  return typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
};

export const calculateRenderPosition = (
  anchorBoundingRect: DOMRect,
  targetBoundingRect: DOMRect,
  options: {
    placement: Exclude<LayoutPosition, "center">;
    alignment?: LayoutPosition;
    anchorMargin: number;
    viewportMargin?: number;
    overlap?: boolean | "prefer";
  }
) => {
  const { placement, alignment, anchorMargin = 0, overlap, viewportMargin = 0 } = options;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const position: {
    top: number;
    left: number;
    bottom?: number;
    right?: number;
    maxHeight?: number | string;
    maxWidth?: number | string;
    placement?: LayoutPosition;
    alignment?: LayoutPosition;
  } = {
    top: viewportMargin,
    left: viewportMargin,
  };

  const totalAxialMargin = viewportMargin + anchorMargin;

  const _leftSpace = Math.floor(anchorBoundingRect.x);
  const _rightSpace = Math.floor(vw - anchorBoundingRect.x - anchorBoundingRect.width);
  const _topSpace = Math.floor(anchorBoundingRect.y);
  const _bottomSpace = Math.floor(vh - anchorBoundingRect.y - anchorBoundingRect.height);

  if (!placement || placement === "top" || placement === "bottom") {
    // finalize alignnment [left, right, center]
    const isLeftAlignPossible = _rightSpace + anchorBoundingRect.width - viewportMargin >= targetBoundingRect.width;
    const isRightAlignPossible = _leftSpace + anchorBoundingRect.width - viewportMargin >= targetBoundingRect.width;

    let finalAlignment: "left" | "right" | "center" | undefined;

    if (alignment === "left" && isLeftAlignPossible) finalAlignment = "left";
    else if (alignment === "right" && isRightAlignPossible) finalAlignment = "right";
    else if (isRightAlignPossible) finalAlignment = "right";
    else if (isLeftAlignPossible) finalAlignment = "left";
    else {
      if (_leftSpace >= (targetBoundingRect.width / 2 - viewportMargin) && _rightSpace >= (targetBoundingRect.width / 2 - viewportMargin)) {
        finalAlignment = "center";
      }
    }

    switch (finalAlignment) {
      case "left":
        position.left = anchorBoundingRect.x;
        break;
      case "right":
        position.left = anchorBoundingRect.x + anchorBoundingRect.width - targetBoundingRect.width;
        break;
      case "center":
        position.left = anchorBoundingRect.x + anchorBoundingRect.width / 2 - targetBoundingRect.width / 2;
        break;
      default:
        position.left = viewportMargin;
        position.maxWidth = `calc(100vw - ${viewportMargin * 2}px)`;
    }

    // finalize placement [top, bottom, center]
    const isTopPlacementPossible = (_topSpace - totalAxialMargin) >= targetBoundingRect.height;
    const isBottomPlacementPossible = (_bottomSpace - totalAxialMargin) >= targetBoundingRect.height;

    let finalPlacement: "top" | "bottom" | "center" | undefined;
    let withOverlap: boolean | undefined;

    if (placement === "top" && isTopPlacementPossible) finalPlacement = "top";
    else if (placement === "bottom" && isBottomPlacementPossible) finalPlacement = "bottom";
    else if (isBottomPlacementPossible) finalPlacement = "bottom";
    else if (isTopPlacementPossible) finalPlacement = "top";

    if (!finalPlacement) {
      // const _newTopSpace = _topSpace + anchorBoundingRect.height;
      // const _newBottomSpace = _bottomSpace + anchorBoundingRect.width;

      // const isTopPlacementPossible = (_newTopSpace - totalAxialMargin) >= targetBoundingRect.height;
      // const isBottomPlacementPossible = (_newBottomSpace - totalAxialMargin) >= targetBoundingRect.height;

      // if (placement === "top" && isTopPlacementPossible) finalPlacement = "top";
      // else if (placement === "bottom" && isBottomPlacementPossible) finalPlacement = "bottom";
      // else if (isBottomPlacementPossible) finalPlacement = "bottom";
      // else if (isTopPlacementPossible) finalPlacement = "top";

      // if (isTopPlacementPossible || isBottomPlacementPossible) withOverlap = true;

      const isCenterPlacementPossible = (_topSpace + anchorBoundingRect.height / 2 - viewportMargin) >= targetBoundingRect.height / 2 && (_bottomSpace + anchorBoundingRect.height / 2 - viewportMargin) >= targetBoundingRect.height / 2;

      if (isCenterPlacementPossible) finalPlacement = "center";
    }

    switch (finalPlacement) {
      case "top":
        position.top = anchorBoundingRect.y - targetBoundingRect.height + (withOverlap ? anchorBoundingRect.height : -anchorMargin);
        position.maxHeight = `${_topSpace + (withOverlap ? (anchorBoundingRect.height - viewportMargin) : -totalAxialMargin)}px`;
        break;
      case "bottom":
        position.top = anchorBoundingRect.y + (withOverlap ? 0 : (anchorBoundingRect.height + anchorMargin));
        position.maxHeight = `${_bottomSpace + (withOverlap ? (anchorBoundingRect.height - viewportMargin) : -totalAxialMargin)}px`;
        break;
      case "center":
        position.top = anchorBoundingRect.y + anchorBoundingRect.height / 2 - targetBoundingRect.height / 2;
        break;
      default:
        position.top = viewportMargin;
        position.maxHeight = `calc(100vh - ${viewportMargin * 2}px)`;
    }

    position.placement = finalPlacement;
    position.alignment = finalAlignment;

    return position;
  }

  if (!placement || placement === "left" || placement === "right") {
    // finalize alignnment [top, bottom, center]
    const isTopAlignPossible = _bottomSpace + anchorBoundingRect.height - viewportMargin >= targetBoundingRect.height;
    const isBottomAlignPossible = _topSpace + anchorBoundingRect.height - viewportMargin >= targetBoundingRect.height;

    let finalAlignment: "top" | "bottom" | "center" | undefined;

    if (alignment === "top" && isTopAlignPossible) finalAlignment = "top";
    else if (alignment === "bottom" && isBottomAlignPossible) finalAlignment = "bottom";
    else if (isBottomAlignPossible) finalAlignment = "bottom";
    else if (isTopAlignPossible) finalAlignment = "top";
    else {
      if (_topSpace >= (targetBoundingRect.height / 2 + viewportMargin) && _bottomSpace >= (targetBoundingRect.height / 2 + viewportMargin)) {
        finalAlignment = "center";
      }
    }

    switch (finalAlignment) {
      case "top":
        position.top = anchorBoundingRect.y;
        break;
      case "bottom":
        position.top = anchorBoundingRect.y + anchorBoundingRect.height - targetBoundingRect.height;
        break;
      case "center":
        position.top = anchorBoundingRect.y + anchorBoundingRect.height / 2 - targetBoundingRect.height / 2;
        break;
      default:
        position.top = viewportMargin;
        position.maxHeight = `calc(100vh - ${viewportMargin * 2}px)`;
    }

    // finalize placement [left, right, center]
    const isLeftPlacementPossible = (_leftSpace - totalAxialMargin) >= targetBoundingRect.width;
    const isRightPlacementPossible = (_rightSpace - totalAxialMargin) >= targetBoundingRect.width;

    let finalPlacement: "left" | "right" | "center" | undefined;
    let withOverlap: boolean | undefined;

    if (placement === "left" && isLeftPlacementPossible) finalPlacement = "left";
    else if (placement === "right" && isRightPlacementPossible) finalPlacement = "right";
    else if (isRightPlacementPossible) finalPlacement = "right";
    else if (isLeftPlacementPossible) finalPlacement = "left";

    if (!finalPlacement) {
      // const _newLeftSpace = _leftSpace + anchorBoundingRect.width;
      // const _newRightSpace = _rightSpace + anchorBoundingRect.width;

      // const isLeftPlacementPossible = (_newLeftSpace - totalAxialMargin) >= targetBoundingRect.width;
      // const isRightPlacementPossible = (_newRightSpace - totalAxialMargin) >= targetBoundingRect.width;

      // if (placement === "left" && isLeftPlacementPossible) finalPlacement = "left";
      // else if (placement === "right" && isRightPlacementPossible) finalPlacement = "right";
      // else if (isRightPlacementPossible) finalPlacement = "right";
      // else if (isLeftPlacementPossible) finalPlacement = "left";

      // if (isLeftPlacementPossible || isRightPlacementPossible) withOverlap = true;

      const isCenterPlacementPossible = (_leftSpace + anchorBoundingRect.width / 2 - viewportMargin) >= targetBoundingRect.width / 2 && (_rightSpace + anchorBoundingRect.width / 2 - viewportMargin) >= targetBoundingRect.width / 2;

      if (isCenterPlacementPossible) finalPlacement = "center";
    }

    switch (finalPlacement) {
      case "left":
        position.left = anchorBoundingRect.x - targetBoundingRect.width + (withOverlap ? anchorBoundingRect.width : -anchorMargin);
        position.maxWidth = `${_leftSpace + (withOverlap ? (anchorBoundingRect.width - viewportMargin) : -totalAxialMargin)}px`;
        break;
      case "right":
        position.left = anchorBoundingRect.x + (withOverlap ? 0 : (anchorBoundingRect.width + anchorMargin));
        position.maxWidth = `${_rightSpace + (withOverlap ? (anchorBoundingRect.width - viewportMargin) : -totalAxialMargin)}px`;
        break;
      case "center":
        position.left = anchorBoundingRect.x + anchorBoundingRect.width / 2 - targetBoundingRect.width / 2;
        break;
      default:
        position.left = viewportMargin;
        position.maxWidth = `calc(100vw - ${viewportMargin * 2}px)`;
    }

    position.placement = finalPlacement;
    position.alignment = finalAlignment;

    return position;
  }

  return position;
};

export function findNextCandidate(
  allItems?: NodeListOf<Element>,
  options?: {
    predicate?: (el: Element) => boolean,
    current?: number;
    dir?: "prev" | "next";
  }
) {
  const len = allItems?.length;
  if (!len) return;

  const {
    current = -1,
    dir = "next",
    predicate = (el: Element) => el?.getAttribute("disabled") !== "true" && el?.getAttribute("aria-disabled") !== "true",
  } = options ?? {};

  let nextItemIdx: number | undefined;

  if (dir === "prev") {
    for (let i = 0; i < len; i++) {
      const idx = (current - 1 - i + len) % len;
      if (predicate(allItems[idx])) {
        nextItemIdx = idx;
        break;
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      const idx = (current + 1 + i) % len;
      if (predicate(allItems[idx])) {
        nextItemIdx = idx;
        break;
      }
    }
  }

  return nextItemIdx;
}

export function isDisabled(element?: Element) {
  if (!element) return false;
  if (element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false") return true;
  if (element.hasAttribute("aria-disabled") && element.getAttribute("aria-disabled") !== "false") return true;
  return false;
}

export function getPosStats(
  element?: Element,
  options?: { margin: number | [number?, number?, number?, number?], side?: "in" | "out" | "both" }
) {
  if (!element) return;

  // return false, if not
  // return edge, if around edge
  // return true, else
}

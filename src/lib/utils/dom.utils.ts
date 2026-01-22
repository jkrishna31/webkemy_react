import { edges } from "@/constants/general.const";

export type LayoutPosition = typeof edges[keyof typeof edges] | "center";

export const calculateRenderPosition = (
  anchorBoundingRect: DOMRect,
  targetBoundingRect: DOMRect,
  options: {
    placement: Exclude<LayoutPosition, "center">;
    alignment: LayoutPosition;
    offset: number;
    overlap?: boolean | "prefer";

  }
) => {
  const { placement, alignment, offset = 8, overlap } = options;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const position: {
    top: number;
    left: number;
    bottom?: number;
    right?: number;
    maxHeight?: number | string;
    maxWidth?: number | string;
  } = {
    top: offset,
    left: offset,
  };

  if (!placement || placement === "left" || placement === "right") {
    const _leftSpace = Math.floor(anchorBoundingRect.x + (overlap ? anchorBoundingRect.width : 0) - offset - (overlap ? 0 : offset));
    const _rightSpace = Math.floor(vw - anchorBoundingRect.x - (overlap ? 0 : anchorBoundingRect.width) - offset - (overlap ? 0 : offset));
    const _topSpace = Math.floor(anchorBoundingRect.y - offset);
    const _bottomSpace = Math.floor(vh - anchorBoundingRect.y - anchorBoundingRect.height - offset);

    const isCenterAlignPossible = ((_topSpace + anchorBoundingRect.height / 2) >= (targetBoundingRect.height / 2 + offset))
      && ((_bottomSpace + anchorBoundingRect.height / 2) >= (targetBoundingRect.height / 2 + offset));
    const isTopAlignPossible = _bottomSpace >= (targetBoundingRect.height + offset);
    const isBottomAlignPossible = _topSpace >= (targetBoundingRect.height + offset);

    const finalAlignment = (alignment === "center" && isCenterAlignPossible ? "center" : null)
      || (alignment === "top" && isTopAlignPossible ? "top" : null)
      || (alignment === "bottom" && isBottomAlignPossible ? "bottom" : null)
      || (isCenterAlignPossible ? "center" : null)
      || (isBottomAlignPossible ? "bottom" : null)
      || (isTopAlignPossible ? "top" : null);

    switch (finalAlignment) {
      case "top": {
        position.top = anchorBoundingRect.y;
        break;
      }
      case "center": {
        position.top = anchorBoundingRect.y + anchorBoundingRect.height / 2 - targetBoundingRect.height / 2;
        break;
      }
      case "bottom": {
        position.top = anchorBoundingRect.y + anchorBoundingRect.height - targetBoundingRect.height;
        break;
      }
      default: {
        position.top = offset;
        position.maxHeight = overlap ? `calc(100vh - ${offset * 2}` : `${_bottomSpace >= _topSpace ? _bottomSpace : _topSpace}px`;
      }
    }

    const isLeftPlacementPossible = _leftSpace >= targetBoundingRect.width;
    const isRightPlacementPossible = _rightSpace >= targetBoundingRect.width;

    const finalPlacement = (placement === "left" && isLeftPlacementPossible ? "left" : null)
      || (placement === "right" && isRightPlacementPossible ? "right" : null)
      || (isLeftPlacementPossible ? "left" : null)
      || (isRightPlacementPossible ? "right" : null);

    switch (finalPlacement) {
      case "left": {
        position.left = anchorBoundingRect.x - offset - targetBoundingRect.width;
        break;
      }
      case "right": {
        position.left = anchorBoundingRect.x + anchorBoundingRect.width + offset;
        break;
      }
      default: {
        position.left = (_leftSpace >= _rightSpace) ? (anchorBoundingRect.x - offset - targetBoundingRect.width) : offset;
      }
    }
    position.maxWidth = overlap ? `calc(100vw - ${offset * 2})` : `${(_leftSpace >= _rightSpace) ? _leftSpace : _rightSpace}px`;

    return position;
  }

  if (!placement || placement === "top" || placement === "bottom") {
    const _topSpace = Math.floor(anchorBoundingRect.y + (overlap ? anchorBoundingRect.height : 0) - offset - (overlap ? 0 : offset));
    const _bottomSpace = Math.floor(vh - anchorBoundingRect.y - (overlap ? 0 : anchorBoundingRect.height) - offset - (overlap ? 0 : offset));
    const _leftSpace = Math.floor(anchorBoundingRect.x + (alignment === "right" ? anchorBoundingRect.width : 0) - offset);
    const _rightSpace = Math.floor(vw - anchorBoundingRect.x - (alignment === "left" ? 0 : anchorBoundingRect.width) - offset);

    const isCenterAlignPossible = ((_leftSpace + anchorBoundingRect.width / 2) >= (targetBoundingRect.width / 2 + offset)) && ((_rightSpace + anchorBoundingRect.width / 2) >= (targetBoundingRect.width / 2 + offset));
    const isLeftAlignPossible = _rightSpace >= (targetBoundingRect.width + offset);
    const isRightAlignPossible = _leftSpace >= (targetBoundingRect.width + offset);

    const finalAlignment = (alignment === "center" && isCenterAlignPossible ? "center" : null)
      || (alignment === "left" && isLeftAlignPossible ? "left" : null)
      || (alignment === "right" && isRightAlignPossible ? "right" : null)
      || (isCenterAlignPossible ? "center" : null)
      || (isLeftAlignPossible ? "left" : null)
      || (isRightAlignPossible ? "right" : null);

    switch (finalAlignment) {
      case "left": {
        position.left = anchorBoundingRect.x;
        break;
      }
      case "center": {
        position.left = anchorBoundingRect.x + anchorBoundingRect.width / 2 - targetBoundingRect.width / 2;
        break;
      }
      case "right": {
        position.left = anchorBoundingRect.x + anchorBoundingRect.width - targetBoundingRect.width;
        break;
      }
      default: {
        position.left = offset;
        position.maxWidth = `calc(100vw - ${offset * 2})`;
      }
    }

    const isTopPlacementPossible = _topSpace >= targetBoundingRect.height;
    const isBottomPlacementPossible = _bottomSpace >= targetBoundingRect.height;

    const finalPlacement = (placement === "top" && isTopPlacementPossible ? "top" : null)
      || (placement === "bottom" && isBottomPlacementPossible ? "bottom" : null)
      || (isTopPlacementPossible ? "top" : null)
      || (isBottomPlacementPossible ? "bottom" : null);

    switch (finalPlacement) {
      case "top": {
        position.top = anchorBoundingRect.y - offset - targetBoundingRect.height;
        break;
      }
      case "bottom": {
        position.top = anchorBoundingRect.y + anchorBoundingRect.height + offset;
        break;
      }
      default: {
        position.top = (_bottomSpace >= _topSpace) ? (anchorBoundingRect.y + anchorBoundingRect.height + offset) : offset;
      }
    }
    position.maxHeight = overlap ? `calc(100vh - ${offset * 2})` : `${(_bottomSpace >= _topSpace) ? _bottomSpace : _topSpace}px`;

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

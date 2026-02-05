import { RefObject, useEffect, useEffectEvent, useRef, useState } from "react";

export type KanbanDragCtx = {
  dragging?: "item" | "col",
  src?: string;
  target?: string;
  targetCol?: string;
  to?: "before" | "after";
}

export type TOptions = {
  layout?: "horizontal" | "vertical";
  variant?: "combined" | "separate";
  onDrop?: (e: DragEvent, dragCtx: any) => void;
  isValidTarget?: (targetKey: string, dragCtx?: KanbanDragCtx) => boolean;
}

const isInsideKanban = (elem: HTMLElement, e: DragEvent) => {
  const kanbanRect = elem.getBoundingClientRect();
  if (kanbanRect.top < e.pageY && (kanbanRect.top + kanbanRect.height) > e.pageY && kanbanRect.left < e.pageX && (kanbanRect.left + kanbanRect.width) > e.pageX) return true;
  return;
};

export function useKanban<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options?: TOptions,
) {
  const isDropped = useRef<boolean>(false);

  const [dragCtx, setDragCtx] = useState<KanbanDragCtx | undefined>();

  const {
    layout = "horizontal",
    variant = "combined",
    onDrop,
    isValidTarget,
  } = options ?? {};

  const handleDragOver = useEffectEvent((e: DragEvent) => {
    e.preventDefault();
    if (!ref.current) return;

    if (dragCtx?.dragging === "col") {
      const col = (e.target as HTMLElement).closest("[data-col-key]");
      const colKey = col?.getAttribute("data-col-key") || undefined;

      if (!col) {
        if (!isInsideKanban(ref.current, e)) {
          setDragCtx(curr => ({ ...curr, target: undefined, targetCol: colKey }));
        }
        return;
      }

      const colRect = col.getBoundingClientRect();
      let to: "before" | "after";

      if (layout === "horizontal") {
        if (colRect.left <= e.clientX && (colRect.left + colRect.width / 2) >= e.clientX) to = "before";
        else to = "after";
      } else {
        if (colRect.top <= e.clientY && (colRect.top + colRect.height / 2) >= e.clientY) to = "before";
        else to = "after";
      }

      setDragCtx(curr => ({ ...curr, to, target: undefined, targetCol: colKey }));
    } else {
      const itemElem = (e.target as HTMLElement).closest("[data-item-key]");
      let itemKey = itemElem?.getAttribute("data-item-key") || undefined; // only if the user of both item is same
      const colElem = (e.target as HTMLElement).closest("[data-col-key]");
      const colKey = colElem?.getAttribute("data-col-key") || undefined;

      if (itemKey && variant === "combined" && !isValidTarget?.(itemKey, dragCtx)) itemKey = undefined;

      if (!itemElem) {
        if (colKey !== dragCtx?.targetCol) {
          setDragCtx(curr => ({ ...curr, target: undefined, targetCol: colKey }));
        }
        return;
      }

      const itemRect = itemElem.getBoundingClientRect();
      let to: "before" | "after";

      if (layout === "horizontal") {
        if (itemRect.top <= e.clientY && (itemRect.top + itemRect.height / 2) >= e.clientY) to = "before";
        else to = "after";
      } else {
        if (itemRect.left <= e.clientX && (itemRect.left + itemRect.width / 2) >= e.clientX) to = "before";
        else to = "after";
      }

      setDragCtx(curr => ({ ...curr, target: itemKey, to, targetCol: colKey }));
    }
  });

  const handleDrop = useEffectEvent((e: DragEvent) => {
    if (!dragCtx?.src) return;

    isDropped.current = true;

    onDrop?.(e, dragCtx);

    setDragCtx(undefined);
    isDropped.current = false;
  });

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const abortController = new AbortController();

    const handleDragStart = (e: DragEvent) => {
      let type: "col" | "item" = "item";
      let item = (e.target as HTMLElement).closest("[data-item-key]");
      if (!item) {
        type = "col";
        item = (e.target as HTMLElement).closest("[data-col-key]");
      }
      const itemKey = item?.getAttribute(`data-${type}-key`);
      if (itemKey) {
        setDragCtx({ src: itemKey, dragging: type });
      }
    };

    const handleDragEnd = () => {
      if (isDropped.current) {
        isDropped.current = false;
        return;
      }
      setDragCtx(undefined);
    };

    const handleDragLeave = (e: DragEvent) => {
      if (isInsideKanban(elem, e)) return;
      setDragCtx(curr => ({ ...curr, target: undefined, targetCol: undefined }));
    };

    elem.addEventListener("dragstart", handleDragStart, { signal: abortController.signal });
    elem.addEventListener("dragover", handleDragOver, { signal: abortController.signal });
    elem.addEventListener("dragend", handleDragEnd, { signal: abortController.signal });
    elem.addEventListener("dragleave", handleDragLeave, { signal: abortController.signal });
    elem.addEventListener("drop", handleDrop, { signal: abortController.signal });
    return () => {
      abortController.abort();
    };
  }, [ref, layout, variant]);

  return {
    dragging: dragCtx?.dragging,
    dragSrc: dragCtx?.src,
    dragTarget: dragCtx?.target,
    dragTargetCol: dragCtx?.targetCol,
    dragTo: dragCtx?.to,
  };
}

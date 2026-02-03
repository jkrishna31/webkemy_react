import { RefObject, useEffect, useEffectEvent, useState } from "react";

export type TDnd = { src: string; target: string; to: "before" | "after" | "in" };

export type TOptions = {
  draggable?: boolean;
  resizable?: boolean;
  onResize?: (key: string, width: number) => void;
  onDrop?: (config?: Partial<TDnd>) => void;
  direction?: "vertical" | "horizontal";
  itemSelector: string;
}

const setDragImage = (e: DragEvent, elem?: Node | null) => {
  if (elem) {
    const clone = elem.cloneNode(true) as HTMLElement;
    clone.style.opacity = "1";
    clone.style.transform = "scale(.85)";
    clone.style.pointerEvents = "none";
    document.body.appendChild(clone);
    e.dataTransfer?.setDragImage(clone, 10, 10);
    setTimeout(() => clone.remove(), 0);
  }
};

export default function useTableRows(
  ref: RefObject<HTMLTableSectionElement | null>,
  options?: TOptions,
) {
  const [dragCtx, setDragCtx] = useState<Partial<TDnd>>();
  const [resizeCtx, setResizeCtx] = useState<{ x: number; y: number; col: string; ogWidth?: number; }>();

  const {
    itemSelector,
    direction = "vertical",
    draggable,
    resizable,
    onResize,
    onDrop,
  } = options ?? {};

  const handleResize = useEffectEvent((e: PointerEvent) => {
    if (!resizeCtx) return;
    onResize?.(resizeCtx.col, (resizeCtx.ogWidth ?? 0) + (e.pageX - resizeCtx.x));
  });

  const handleTransfer = useEffectEvent(() => {
    onDrop?.(dragCtx);
    setDragCtx(undefined);
  });

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const abortController = new AbortController();

    if (draggable) {
      const handleDragOver = (e: DragEvent) => {
        const elem = e.target as HTMLElement;
        const dragOverRow = elem?.closest("[data-row]");
        const rowKey = dragOverRow?.getAttribute("data-row");
        const isDraggable = dragOverRow?.getAttribute("draggable");
        if (!dragOverRow || !rowKey || !isDraggable) return;
        e.preventDefault();
        const rowRect = dragOverRow.getBoundingClientRect();
        const toUp = (e.pageY - rowRect.y) < rowRect.height / 2;
        setDragCtx(currData => ({ ...currData, target: rowKey, to: toUp ? "before" : "after" }));
      };

      const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        handleTransfer();
      };

      const handleDragEnd = (e: DragEvent) => {
        setDragCtx(undefined);
      };

      const handleDragLeave = (e: DragEvent) => {
        setDragCtx(currData => ({ ...currData, target: undefined }));
      };

      const handleDragStart = (e: DragEvent) => {
        const elem = e.target as HTMLElement;
        const draggingRow = elem?.closest("[data-row]");
        const rowKey = draggingRow?.getAttribute("data-row");
        if (!rowKey) return;
        setDragCtx({ src: rowKey });
        setDragImage(e, draggingRow);
      };

      elem.addEventListener("dragstart", handleDragStart, { signal: abortController.signal });
      elem.addEventListener("dragover", handleDragOver, { signal: abortController.signal });
      elem.addEventListener("dragend", handleDragEnd, { signal: abortController.signal });
      elem.addEventListener("drop", handleDrop, { signal: abortController.signal });
      elem.addEventListener("dragleave", handleDragLeave, { signal: abortController.signal });

      return () => {
        abortController.abort();
      };
    }
  }, [draggable, ref]);

  return {
    draggingRow: dragCtx?.src,
    draggingOverRow: dragCtx?.target,
    dragTo: dragCtx?.to,
  };
}

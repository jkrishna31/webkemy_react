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

export function useTableColumn(
  ref: RefObject<HTMLTableSectionElement | null>,
  options?: TOptions,
) {
  const [dragCtx, setDragCtx] = useState<Partial<TDnd>>();
  const [resizeCtx, setResizeCtx] = useState<{ x: number; y: number; col: string; ogWidth?: number; }>();

  const {
    itemSelector,
    direction = "horizontal",
    draggable,
    resizable,
    onResize,
    onDrop,
  } = options ?? {};

  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.code !== "ArrowLeft" && e.code !== "ArrowRight") return;
    const resizeHandle = (e.target as HTMLElement)?.closest("[data-resize]");
    if (!resizeHandle) return;
    const colToResize = resizeHandle.closest("[data-column]") as HTMLElement;
    e.preventDefault();
    onResize?.(colToResize.getAttribute("data-column") ?? "", colToResize.clientWidth + (e.code === "ArrowLeft" ? -5 : 5));
  });

  const handleResize = useEffectEvent((e: PointerEvent) => {
    if (!resizeCtx) return;
    onResize?.(resizeCtx.col, (resizeCtx.ogWidth ?? 0) + (e.pageX - resizeCtx.x));
  });

  const handleTransfer = useEffectEvent(() => {
    onDrop?.(dragCtx);
  });

  useEffect(() => {
    const theadElem = ref.current;
    if (!theadElem) return;

    const abortController = new AbortController();

    if (resizable) {
      const handlePointerUp = (e: PointerEvent) => {
        theadElem.removeEventListener("pointermove", handleResize);
        theadElem.removeEventListener("pointerup", handlePointerUp);

        setResizeCtx(undefined);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      };

      const handlePointerDown = (e: PointerEvent) => {
        theadElem.addEventListener("pointermove", handleResize);
        theadElem.addEventListener("pointerup", handlePointerUp);

        const elem = e.target as HTMLElement;
        elem.setPointerCapture(e.pointerId);
        const resizeHandle = elem?.closest("[data-resize]");
        if (!resizeHandle) return;
        e.preventDefault();
        const colToResize = resizeHandle.closest("[data-column]") as HTMLElement;
        setResizeCtx({ x: e.pageX, y: e.pageY, col: colToResize.getAttribute("data-column") ?? "", ogWidth: colToResize.clientWidth });
      };

      theadElem.addEventListener("pointerdown", handlePointerDown, { signal: abortController.signal });
      theadElem.addEventListener("keydown", handleKeyDown, { signal: abortController.signal });
    }

    if (draggable) {
      const handleDragStart = (e: DragEvent) => {
        const elem = e.target as HTMLElement;
        const draggingCol = elem?.closest("[data-column]");
        const colKey = draggingCol?.getAttribute("data-column");
        if (!colKey) return;
        setDragCtx({ src: colKey });
        setDragImage(e, draggingCol);
      };

      const handleDragOver = (e: DragEvent) => {
        const elem = e.target as HTMLElement;
        const dragOverCol = elem?.closest("[data-column]");
        const colKey = dragOverCol?.getAttribute("data-column");
        const isDraggable = dragOverCol?.getAttribute("draggable");
        if (!dragOverCol || !colKey || !isDraggable) return;
        e.preventDefault();
        const colRect = dragOverCol.getBoundingClientRect();
        const toLeft = (e.pageX - colRect.x) < colRect.width / 2;
        setDragCtx(currData => ({ ...currData, target: colKey, to: toLeft ? "before" : "after" }));
      };

      const handleDragEnd = (e: DragEvent) => {
        setDragCtx(undefined);
      };

      const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        handleTransfer();
      };

      const handleDragExit = (e: DragEvent) => {
        setDragCtx(currData => ({ ...currData, target: undefined }));
      };

      theadElem.addEventListener("dragstart", handleDragStart, { signal: abortController.signal });
      theadElem.addEventListener("dragover", handleDragOver, { signal: abortController.signal });
      theadElem.addEventListener("drop", handleDrop, { signal: abortController.signal });
      theadElem.addEventListener("dragend", handleDragEnd, { signal: abortController.signal });
      theadElem.addEventListener("dragleave", handleDragExit);
    }

    return () => {
      abortController.abort();
    };
  }, [draggable, ref, resizable]);

  return {
    draggingCol: dragCtx?.src,
    draggingOverCol: dragCtx?.target,
    dragTo: dragCtx?.to,
  };
}

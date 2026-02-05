import { RefObject, useCallback, useLayoutEffect, useMemo, useState } from "react";

import { edges } from "@/constants/general.const";
import { Resizers } from "@/lib/ui/elements/Resizable";
import { deepClone } from "@/lib/utils/object.utils";

export type TGridItem = { row?: [number, number]; col?: [number, number] };
export type TItems = { [key: string]: TGridItem };

export type Edge = typeof edges[keyof typeof edges];

export type TOptions = {
  step: number | "auto" | "grid";
};

const normalizeGridLines = () => {
  // accepts - curr rows & cols, and new & old size
  // inc/dec the items grid area based on the % diff. in size

  const oldSize = [0, 0];
  const newSize = [0, 0];
  const percentChange = [
    ((newSize[0] - oldSize[0]) / oldSize[0]) * 100,
    ((newSize[1] - oldSize[1]) / oldSize[1]) * 100,
  ];

  // let's save [40px, 20px] inc/dec in size
  // inc/dec [40px, 20px] from all items size
};

export default function useGrid(ref: RefObject<HTMLElement | null>, initialState?: TItems, options?: TOptions) {
  const { step = "auto" } = options ?? {};

  const [items, setItems] = useState<TItems>(initialState ?? {});
  const [gridSize, setGridSize] = useState<[number, number]>([0, 0]);

  const cols = useMemo(() => Object.keys(items).reduce((total, itemKey) => Math.max(...(items[itemKey].col ?? [0]), total), 0), [items]);
  const rows = useMemo(() => Object.keys(items).reduce((total, itemKey) => Math.max(...(items[itemKey].row ?? [0]), total), 0), [items]);

  console.log("=== grid size ===", gridSize);

  // use gridWidth as cols & gridHeight as rows [ISSUE - gap (optional)] (for step as "grid")
  // on resize, allow only +-1 of cols/rows

  // on mousemove (when dragging), detect the grid cell

  // when placing on the inline edge of the grid, increase the cols with the no. of col consumed by that item
  // when placing on the block edge of the grid, increase the rows with the no. of row consumed by that item

  // don't allow resizing on the grid edges

  const addColumn = useCallback(() => {

  }, []);

  const addRow = useCallback(() => {

  }, []);

  const canMove = useCallback(() => {

  }, []);

  const canResize = useCallback((key: string, edge: Edge) => {
    // return the number of grid block that can be adjusted, otherwise 0
  }, []);

  const swapItems = useCallback((key1: string, key2: string) => {
    const newItems = deepClone(items);
    const item1Details = items[key1];
    newItems[key1] = newItems[key2];
    newItems[key2] = item1Details;
    setItems(newItems);
  }, [items]);

  const getResizers = useCallback((key: string) => {
    const resizers: Resizers[] = [];
    const row = items[key].row;
    const col = items[key].col;
    if (row && row[0] !== 1) resizers.push("t");
    if (row && row[1] !== rows) resizers.push("b");
    if (col && col[0] !== 1) resizers.push("l");
    if (col && col[1] !== cols) resizers.push("r");
    return resizers;
  }, [cols, items, rows]);

  useLayoutEffect(() => {
    const gridElem = ref.current;
    if (!gridElem) return;
    const gridBoundingRect = gridElem.getBoundingClientRect();
    setGridSize([gridBoundingRect.width, gridBoundingRect.height]);
  }, [ref]);

  return {
    items, cols, rows,
    getResizers,
    addColumn, addRow, canMove, canResize, swapItems, setItems,
  };
}

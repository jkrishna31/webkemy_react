import { useCallback, useMemo, useState } from "react";

import { edges } from "@/constants/general.const";
import { deepClone } from "@/lib/utils/object.utils";

export type TGridItem = { rows: [number, number]; cols: [number, number] };

export type Edge = typeof edges[keyof typeof edges];

export default function useGrid() {
  const [items, setItems] = useState<{ [key: string]: TGridItem }>({});

  const cols = useMemo(() => Object.keys(items).reduce((total, itemKey) => Math.max(...items[itemKey].cols, total), 0), [items]);
  const rows = useMemo(() => Object.keys(items).reduce((total, itemKey) => Math.max(...items[itemKey].rows, total), 0), [items]);

  const addColumn = useCallback(() => {

  }, []);

  const addRow = useCallback(() => {

  }, []);

  const canMove = useCallback(() => {

  }, []);

  const canResize = useCallback((key: string, edge: Edge,) => {
    // return the number of grid block that can be adjusted, otherwise 0
  }, []);

  const swapItems = useCallback((key1: string, key2: string) => {
    const newItems = deepClone(items);
    const item1Details = items[key1];
    newItems[key1] = newItems[key2];
    newItems[key2] = item1Details;
    setItems(newItems);
  }, [items]);

  return {
    items, cols, rows,
    addColumn, addRow, canMove, canResize, swapItems, setItems,
  };
}

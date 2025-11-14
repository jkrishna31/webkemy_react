import { useCallback, useState } from "react";

import { clampNumber } from "@/lib/utils/math.utils";

export interface UseMultiLevelDataOptions<T> {
  id?: string;
  branch?: keyof T;
}

export type MovePayload = {
  moveKey: string;
  moveToKey: string;
  place?: "before" | "after";
};

function moveItem(array: any[], fromIndex: number, toIndex: number, direction: string) {
  const length = array.length;
  if (length === 0) return array;

  fromIndex = clampNumber(fromIndex, 0, length - 1);
  toIndex = clampNumber(toIndex, 0, length - 1);

  const arr = [...array];
  const [item] = arr.splice(fromIndex, 1);

  if (fromIndex < toIndex) toIndex--;
  const insertIndex = direction === "after" ? toIndex + 1 : toIndex;

  const safeInsertIndex = clampNumber(insertIndex, 0, arr.length);

  arr.splice(safeInsertIndex, 0, item);

  return arr;
}

export default function useMultiLevelData<T>(data: T[], options?: UseMultiLevelDataOptions<T>) {
  const {
    id = "id",
    branch = "children",
  } = options ?? {};

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const getTotalItems = useCallback((_data = data) => {
    let count = 0;
    const stack: T[] = [..._data];

    while (stack.length) {
      const node: any = stack.pop();
      count++;

      if (node && node[branch]?.length) stack.push(...node[branch]);
    }

    return count;
  }, [branch, data]);

  const findByKey = useCallback((key: string) => {
    return (function _find(arr: T[]) {
      for (const item of arr) {
        const _item = item as any;
        if (_item[id] === key) return item;
        if (_item[branch]?.length) {
          return _find(_item[branch]);
        }
      }
      return;
    })(data);
  }, [branch, data, id]);

  const select = useCallback(
    (keys: string[], op: "select" | "deselect" | "toggle" = "toggle", strict?: boolean) => {
      setSelectedKeys(currKeys => {
        let newKeys = [...currKeys];

        const _select = (_id: string) => {
          const isAlreadyPresent = selectedKeys.includes(_id);
          if (isAlreadyPresent && op !== "select") {
            newKeys = newKeys.filter(newKey => newKey !== _id);
          } else if (!isAlreadyPresent && op !== "deselect") {
            newKeys.push(_id);
          }
        };

        const deepSelect = (arr: T[]) => {
          if (!arr?.length) return;
          for (const item of arr) {
            const itemId = (item as any)[id];
            _select(itemId);
            deepSelect((item as any)[branch]);
          }
        };

        if (keys?.length) {
          for (const key of keys) {
            _select(key);
            if (strict) {
              const item: any = findByKey(key);
              if (item[branch]?.length) deepSelect(item[branch]);
            }
          }
        } else {
          if (getTotalItems() === selectedKeys.length && op !== "select") {
            newKeys = [];
          } else {
            deepSelect(data);
          }
        }

        return newKeys;
      });
    },
    [branch, data, findByKey, id, selectedKeys, getTotalItems]
  );

  const move = (type: "reorder" | "transfer" = "reorder", payload?: MovePayload) => {
    const { moveKey, moveToKey, place } = payload ?? {};
    if (!moveKey || !moveToKey || moveKey === moveToKey) return;

    let moveKeyParent: string | undefined, moveToKeyParent: string | undefined;
    let moveKeyIndex: number | undefined, moveToKeyIndex: number | undefined;

    const findParentAndPos = (arr: T[], parent?: string) => {
      if (moveKeyParent && moveToKeyParent) return;

      for (let i = 0; i < arr.length; i++) {
        if (moveKeyParent && moveToKeyParent) return;

        const item = arr[i] as any;
        if (moveKeyParent == null && item[id] === moveKey) {
          moveKeyParent = parent;
          moveKeyIndex = i;
        }
        if (moveToKeyParent == null && item[id] === moveToKey) {
          moveToKeyParent = parent;
          moveToKeyIndex = i;
        }

        if (item[branch]?.length) findParentAndPos(item[branch]);

      }
    };

    findParentAndPos(data);

    const generateNewData = (arr: T[]) => {

    };

    // separate out the og data and nested data of only keys

    if (moveKeyParent === moveToKeyParent) {
      // if parent key same then move the dragging col to dragover col idx accordingly
    } else {
      // if parent key are different then splice out the dragging col from its parent and splice into the dragover parent accordingly
    }
  };

  return {
    selectedKeys,
    select,
    move,
    getTotalItems,
  };
}

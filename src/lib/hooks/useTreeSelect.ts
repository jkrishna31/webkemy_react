import { useCallback, useState } from "react";

export interface UseTreeSelectOptions<T> {
  id?: string;
  branch?: keyof T;
}

export default function useTreeSelect<T>(data: T[], options?: UseTreeSelectOptions<T>) {
  const {
    id = "id",
    branch = "children",
  } = options ?? {};

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const getTotalItems = (_data = data) => {
    let count = 0;
    const stack: T[] = [..._data];

    while (stack.length) {
      const node: any = stack.pop();
      count++;

      if (node && node[branch]?.length) stack.push(...node[branch]);
    }

    return count;
  };

  const findByKey = (key: string) => {
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
  };

  const select = (keys: string[], op: "select" | "deselect" | "toggle" = "toggle", strict?: boolean) => {
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
  };

  return {
    selectedKeys,
    select,
    getTotalItems,
  };
}

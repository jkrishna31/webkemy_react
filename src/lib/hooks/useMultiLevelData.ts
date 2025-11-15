import { useCallback, useEffect, useState } from "react";

export interface UseMultiLevelDataOptions<T> {
  id?: string;
  branch?: keyof T;
  orderOnly?: boolean;
}

export type MoveSpec = {
  moveKey: string;
  moveToKey: string;
  place?: "before" | "after";
};

export type Order = {
  id: string;
  children?: Order[];
};

export default function useMultiLevelData<T>(payload: T[], options?: UseMultiLevelDataOptions<T>) {
  const {
    id = "id",
    branch = "children",
    orderOnly,
  } = options ?? {};

  const [details, setDetails] = useState<{ [key: string]: T }>({});
  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    const _details: any = {};

    const generateDataAndOrder = (arr: T[]) => {
      const currLevelOrder: any[] = [];

      for (let i = 0; i < arr.length; i++) {
        const item = arr[i] as any;

        if (!orderOnly) {
          const _item = { ...item };
          // delete _item[branch];
          _details[_item[id]] = _item;
        }

        currLevelOrder[i] = {
          [id]: item[id],
          ...(item[branch]?.length ? { children: generateDataAndOrder(item[branch]) } : {}),
        };
      }

      return currLevelOrder;
    };

    const _order: any[] = generateDataAndOrder(payload);

    setOrder(_order);
    setDetails(_details);
  }, [branch, id, orderOnly, payload]);

  const getTotalItems = useCallback(
    (_data = payload) => {
      let count = 0;
      const stack: T[] = [..._data];

      while (stack.length) {
        const node: any = stack.pop();
        count++;

        if (node && node[branch]?.length) stack.push(...node[branch]);
      }

      return count;
    },
    [branch, payload]
  );

  const move = useCallback(
    (type: "reorder" | "transfer" = "reorder", moveSpec?: MoveSpec) => {
      const { moveKey, moveToKey, place } = moveSpec ?? {};
      if (!moveKey || !moveToKey || moveKey === moveToKey) return;

      if (type === "reorder") {
        let moveKeyParent: string | undefined;
        let moveToKeyParent: string | undefined;
        let moveKeyIndex: number | undefined;
        let moveToKeyIndex: number | undefined;
        let itemToMove: Order | undefined;

        // also check for invalid move like moving to any of children
        const findParentAndPos = (arr: Order[], parent?: string) => {
          if (moveKeyParent && moveToKeyParent) return;

          for (let i = 0; i < arr.length; i++) {
            if (moveKeyParent && moveToKeyParent) return;

            const item = arr[i] as any;
            if (moveKeyParent == null && item[id] === moveKey) {
              moveKeyParent = parent;
              moveKeyIndex = i;
              itemToMove = item;
            }
            if (moveToKeyParent == null && item[id] === moveToKey) {
              moveToKeyParent = parent;
              moveToKeyIndex = i;
            }

            if (item[branch]?.length) findParentAndPos(item[branch], arr[i].id);
          }
        };

        findParentAndPos(order);

        if (!itemToMove || moveKeyIndex === undefined || moveToKeyIndex === undefined) return;

        if (moveKeyParent === moveToKeyParent && moveKeyIndex < moveToKeyIndex) moveToKeyIndex--;
        const insertIndex = place === "after" ? moveToKeyIndex + 1 : moveToKeyIndex;

        const generateNewOrder = (arr: Order[], parent?: string) => {
          const newOrder: Order[] = [...arr];

          if (moveKeyParent === parent) {
            newOrder.splice(moveKeyIndex!, 1);
          }

          if (moveToKeyParent === parent) {
            newOrder.splice(insertIndex, 0, itemToMove!);
          }

          for (let i = 0; i < newOrder.length; i++) {
            const item = newOrder[i];
            newOrder[i] = {
              id: item.id,
              ...(item.children?.length ? { children: generateNewOrder(item.children, item.id) } : {}),
            };
          }

          return newOrder;
        };

        setOrder(generateNewOrder(order));
      }
    }
    , [branch, id, order]
  );

  return {
    details,
    order,
    move,
    getTotalItems,
  };
}

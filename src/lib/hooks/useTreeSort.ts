import { useCallback, useState } from "react";

export type TTreeItem = { id: string; children?: TTreeItem[]; };

export default function useTreeSort(data: TTreeItem[]) {
  const [tree, setTree] = useState(data);

  const sort = useCallback((key: string, dir?: "+" | "-") => {
    if (!dir) setTree(data);
    // todo: sort asc and desc
  }, [data]);

  return { tree, sort };
}

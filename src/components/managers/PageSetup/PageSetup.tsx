"use client";

import { useEffect } from "react";

import { useClientActions, useScrollActions } from "@/data/stores";
import { Edges } from "@/lib/constants/position";

const PageSetup = ({ pageKey }: { pageKey?: string }) => {
  const { setField } = useClientActions();
  const { updateStore: updateScrollStore } = useScrollActions();

  useEffect(() => {
    setField("activePage", pageKey);
    updateScrollStore("dir", Edges.TOP);
    return () => {
      setField("activePage", undefined);
    };
  }, [pageKey, setField, updateScrollStore]);

  return null;
};

export default PageSetup;

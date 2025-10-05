"use client";

import { useEffect } from "react";

import { edges } from "@/constants/general.const";
import { useClientActions, useScrollActions } from "@/data/stores";

const PageSetup = ({ pageKey }: { pageKey?: string }) => {
  const { setField } = useClientActions();
  const { updateStore: updateScrollStore } = useScrollActions();

  useEffect(() => {
    setField("activePage", pageKey);
    updateScrollStore("dir", edges.TOP);
    return () => {
      setField("activePage", undefined);
    };
  }, [pageKey, setField, updateScrollStore]);

  return null;
};

export default PageSetup;

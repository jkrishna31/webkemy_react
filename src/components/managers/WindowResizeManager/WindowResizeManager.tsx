"use client";

import { useCallback, useEffect } from "react";

import { useClientActions } from "@/data/stores";
import { hasDOM } from "@/lib/utils/client.utils";

const WindowResizeManager = () => {
  const { updateStore: updateWindowStore } = useClientActions();

  const handleResize = useCallback(() => {
    if (hasDOM()) {
      updateWindowStore("size", [window.innerWidth, window.innerHeight]);
    }
  }, [updateWindowStore]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return null;
};

export default WindowResizeManager;

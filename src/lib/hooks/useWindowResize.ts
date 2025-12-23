"use client";

import { useCallback, useEffect, useState } from "react";

import { hasDOM } from "@/lib/utils/client.utils";

export function useWindowResize() {
  const [size, setSize] = useState<[number | undefined, number | undefined]>();

  const handleResize = useCallback(() => {
    if (hasDOM()) {
      setSize([window.innerWidth, window.innerHeight]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return { size };
}

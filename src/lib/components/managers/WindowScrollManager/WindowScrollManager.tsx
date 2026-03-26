"use client";

import { useCallback, useEffect, useRef } from "react";

import { useScrollActions, useScrollDir, useScrollMargin, useScrollXEdge } from "@/data/stores";
import { Edges } from "@/lib/constants/position";

const WindowScrollManager = () => {
  const { updateStore: updateScrollStore } = useScrollActions();
  const scrollDir = useScrollDir();
  const margin = useScrollMargin();
  const xEdge = useScrollXEdge();

  const lastScrollCoords = useRef(0);

  const handleScroll = useCallback((e: any) => {
    if (!e.isTrusted) {
      return;
    }
    const currScroll = window.scrollY + window.innerHeight;
    const isBottom = (document.body.scrollHeight - currScroll) <= margin;
    const isTop = window.scrollY === 0;
    let dir = scrollDir;
    const dy = lastScrollCoords.current - window.scrollY;
    lastScrollCoords.current = Math.abs(window.scrollY);
    if (dy >= 0) {
      dir = Edges.TOP;
    } else if (dy < 0) {
      dir = Edges.BOTTOM;
    }
    if (isBottom && xEdge !== Edges.BOTTOM) {
      updateScrollStore("xEdge", Edges.BOTTOM);
    }
    if (isTop && xEdge !== Edges.TOP) {
      updateScrollStore("xEdge", Edges.TOP);
    }
    if (scrollDir !== dir) {
      updateScrollStore("dir", dir);
    }
  }, [scrollDir, updateScrollStore, margin, xEdge]);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return null;
};

export default WindowScrollManager;

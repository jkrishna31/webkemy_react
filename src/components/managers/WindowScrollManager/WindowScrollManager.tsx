"use client";

import { useCallback, useEffect, useRef } from "react";

import { edges } from "@/constants/general.const";
import { useScrollActions, useScrollDir, useScrollMargin, useScrollXEdge } from "@/data/stores";

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
    // const docHeight = document.documentElement.scrollHeight;
    // const isBottom = (docHeight - currScroll) <= margin;
    const isBottom = (document.body.scrollHeight - currScroll) <= margin;
    const isTop = window.scrollY === 0;
    let dir = scrollDir;
    const dy = lastScrollCoords.current - window.scrollY;
    lastScrollCoords.current = Math.abs(window.scrollY);
    if (dy >= 0) {
      dir = edges.TOP;
    } else if (dy < 0) {
      dir = edges.BOTTOM;
    }
    if (isBottom && xEdge !== edges.BOTTOM) {
      updateScrollStore("xEdge", edges.BOTTOM);
    }
    if (isTop && xEdge !== edges.TOP) {
      updateScrollStore("xEdge", edges.TOP);
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

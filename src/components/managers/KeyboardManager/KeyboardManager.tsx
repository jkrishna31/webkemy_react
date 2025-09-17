"use client";

import { useCallback, useEffect } from "react";

import { useAccMenu, useAppMenu, useLayoutActions, useSearchMenu } from "@/data/stores";

const KeyboardManager = () => {
  const { setLayout } = useLayoutActions();
  const appMenu = useAppMenu();
  const accMenu = useAccMenu();
  const searchMenu = useSearchMenu();

  const keyDown = useCallback((e: KeyboardEvent) => {
    // console.log("=== win: keydown ===", e);
  }, []);

  // const keyUp = (e: KeyboardEvent) => {
  //     console.log('===== win: keyup =====', e);
  // };

  // const keyPress = (e: KeyboardEvent) => {
  //     console.log('===== win: keypress =====', e);
  // };

  const handleClick = useCallback(() => {
    if (accMenu) {
      setLayout("accMenu", false);
    }
    if (searchMenu) {
      setLayout("searchMenu", false);
    }
    if (appMenu) {
      setLayout("appMenu", false);
    }
  }, [accMenu, searchMenu, appMenu, setLayout]);

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener("keydown", keyDown, { signal: controller.signal });
    document.addEventListener("click", handleClick, { signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, [handleClick, keyDown]);

  return null;
};

export default KeyboardManager;

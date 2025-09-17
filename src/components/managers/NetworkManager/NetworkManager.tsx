"use client";

import { useCallback, useEffect } from "react";

import { useClientActions, useToastActions } from "@/data/stores";
import { getUniqueId } from "@/lib/utils/crypto.utils";

const NetworkManager = () => {
  const { updateStore: updateWindowStore } = useClientActions();
  const toastActions = useToastActions();

  const handleOnline = useCallback(() => {
    updateWindowStore("isOnline", true);
    toastActions.addToast({
      id: getUniqueId(4), message: "You are back online!", type: "success", channel: "network",
    });
  }, [toastActions, updateWindowStore]);

  const handleOffline = useCallback(() => {
    updateWindowStore("isOnline", false);
    toastActions.addToast({
      id: getUniqueId(4), message: "You are offline!", type: "warn", channel: "network",
    });
  }, [toastActions, updateWindowStore]);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOffline, handleOnline]);

  return null;
};

export default NetworkManager;

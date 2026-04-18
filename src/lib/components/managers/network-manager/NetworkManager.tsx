"use client";

import { useClientActions, useToastActions } from "@/data/stores";
import { useWindoEvent } from "@/lib/hooks/useWindowEvent";
import { generateId } from "@/lib/utils/crypto";

export const NetworkManager = () => {
  const { updateStore: updateWindowStore } = useClientActions();
  const toastActions = useToastActions();

  useWindoEvent("online", (e) => {
    updateWindowStore("isOnline", true);
    toastActions.addToast({
      id: generateId(4), message: "You are back online!", type: "success", channel: "network",
    });
  });

  useWindoEvent("offline", () => {
    updateWindowStore("isOnline", false);
    toastActions.addToast({
      id: generateId(4), message: "You are offline!", type: "warn", channel: "network",
    });
  });

  return null;
};

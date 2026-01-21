"use client";

import { useClientActions, useToastActions } from "@/data/stores";
import { useWindoEvent } from "@/lib/hooks/useWindowEvent";
import { getUniqueId } from "@/lib/utils/crypto.utils";

const NetworkManager = () => {
  const { updateStore: updateWindowStore } = useClientActions();
  const toastActions = useToastActions();

  useWindoEvent("online", (e) => {
    updateWindowStore("isOnline", true);
    toastActions.addToast({
      id: getUniqueId(4), message: "You are back online!", type: "success", channel: "network",
    });
  });

  useWindoEvent("offline", () => {
    updateWindowStore("isOnline", false);
    toastActions.addToast({
      id: getUniqueId(4), message: "You are offline!", type: "warn", channel: "network",
    });
  });

  return null;
};

export default NetworkManager;

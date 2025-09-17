import { create } from "zustand";

import { RequireOnly } from "@/types/utility.types";

export interface INotification {
  id: string
  type: "success" | "error" | "warn" | "info"
  message: string
}

export interface INotificationActions {
  addNotification: (toast: RequireOnly<INotification, "message" | "id">) => void
  removeNotification: (toastId: string) => void
}

export interface INotificationState {
  notifications: RequireOnly<INotification, "message" | "id">[]
  actions: INotificationActions
}

const useNotificationStore = create<INotificationState>((set) => ({
  notifications: [],
  actions: {
    addNotification: (notif: RequireOnly<INotification, "message" | "id">) => set(
      (state) => ({ ...state, notifications: [notif, ...state.notifications] })
    ),
    removeNotification: (notifId: string) => set(
      (state) => ({
        ...state,
        notifications: [...state.notifications.filter(notif => notif.id !== notifId)]
      })
    ),
  }
}));

export const useNotificationActions = () => useNotificationStore(store => store.actions);

export const useNotifications = () => useNotificationStore(store => store.notifications);

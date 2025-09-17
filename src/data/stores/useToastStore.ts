import { create } from "zustand";

import { RequireOnly } from "@/types/utility.types";

export type ToastType =
  | "info"
  | "success"
  // | "failure"
  | "warn"
  | "error"
  | "critical"
  | "";

export interface IToast {
  id: string
  type: ToastType
  message: string
  title: string
  datetime: string
  timeout: number
  closable: boolean
  channel: string
  actions: any[]
}

export interface ToastStore {
  toasts: RequireOnly<IToast, "message" | "id">[]
  actions: {
    addToast: (toast: RequireOnly<IToast, "message" | "id">) => void
    removeToast: (toastId: string) => void
    setField: (key: string, value: any) => void
    setStore: (payload: Partial<Exclude<ToastStore, "actions">>) => void
  }
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  actions: {
    addToast: (toast: RequireOnly<IToast, "message" | "id">) => set(
      (state) => ({
        ...state,
        toasts: [
          toast,
          ...state.toasts?.filter(item => !(item.channel && item.channel === toast.channel))
        ]
      })
    ),
    removeToast: (toastId: string) => set(
      (state) => ({
        ...state,
        toasts: [
          ...state.toasts.filter(toast => toast.id !== toastId)
        ],
      })
    ),
    setField: (key: string, value: string) => set(
      (store) => ({ ...store, [key]: value })
    ),
    setStore: (payload) => set(
      (state) => ({ ...state, ...payload })
    ),
  }
}));

export const useToastActions = () => useToastStore(store => store.actions);

export const useToasts = () => useToastStore(store => store.toasts);

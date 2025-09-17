import { create } from "zustand";

import { edges } from "@/constants/general.const";

export interface ScrollStore {
  isLocked: boolean
  dir: string | null
  margin: number
  xEdge: "top" | "bottom" | null
  yEdge: "left" | "right" | null
  actions: {
    updateStore: any
    setField: (key: string, value: any) => void
    setStore: (payload: Partial<Exclude<ScrollStore, "actions">>) => void
  }
}

const useScrollStore = create<ScrollStore>((set) => ({
  dir: edges.TOP,
  xEdge: "top",
  yEdge: "left",
  margin: 300,
  isLocked: false,
  actions: {
    updateStore: (eventName: string, value: any) => set(
      (state) => ({ ...state, [eventName]: value })
    ),
    setField: (key: string, value: string) => set(
      (store) => ({ ...store, [key]: value })
    ),
    setStore: (payload) => set(
      (state) => ({ ...state, ...payload })
    ),
  }
}));

export const useScrollActions = () => useScrollStore(store => store.actions);

export const useScrollDir = () => useScrollStore(store => store.dir);
export const useIsScrollLocked = () => useScrollStore(store => store.isLocked);
export const useScrollMargin = () => useScrollStore(store => store.margin);
export const useScrollXEdge = () => useScrollStore(store => store.xEdge);
export const useScrollYEdge = () => useScrollStore(store => store.yEdge);

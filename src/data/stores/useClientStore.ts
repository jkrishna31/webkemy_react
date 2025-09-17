import { create } from "zustand";

import { hasDOM } from "@/lib/utils/client.utils";

export interface ClientActions {
  updateStore: any
  setField: (key: string, value: any) => void
  setStore: (payload: Partial<Exclude<ClientStore, "actions">>) => void
}

export interface ClientStore {
  size: [number, number]
  isOnline?: boolean
  activePage?: string
  actions: ClientActions
}

const useClientStore = create<ClientStore>((set) => ({
  size: hasDOM() ? [window.innerWidth, window.innerHeight] : [0, 0],
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

export const useClientActions = () => useClientStore(store => store.actions);

export const useWindowSize = () => useClientStore(store => store.size);
export const useIsOnline = () => useClientStore(store => store.isOnline);
export const useActivePage = () => useClientStore(store => store.activePage);

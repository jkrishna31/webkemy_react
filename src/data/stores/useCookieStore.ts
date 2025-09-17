import { create } from "zustand";

export interface CookieStore {
  manager: boolean
  banner?: boolean
  actions: {
    setField: (key: string, value: boolean) => void,
    setStore: (payload: Partial<Exclude<CookieStore, "actions">>) => void,
  }
}

const useCookieStore = create<CookieStore>((set) => ({
  manager: false,
  actions: {
    setField: (key: string, value: boolean) => set(
      (state) => ({ ...state, [key]: value })
    ),
    setStore: (payload) => set(
      (state) => ({ ...state, ...payload }),
    ),
  }
}));

export const useCookieActions = () => useCookieStore(store => store.actions);

export const useCookieManager = () => useCookieStore(store => store.manager);
export const useCookieBanner = () => useCookieStore(store => store.banner);

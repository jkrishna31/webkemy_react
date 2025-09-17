import { create } from "zustand";

export interface LayoutStore {
  appMenu: boolean
  accMenu: boolean
  searchMenu: boolean
  footbar: boolean
  sidebar?: "expanded" | "collapsed"
  actions: {
    setLayout: any
    resetLayout?: any
    setField: (key: string, value: any) => void
    setStore: (payload: Partial<Exclude<LayoutStore, "actions">>) => void
  }
}

const useLayoutStore = create<LayoutStore>((set) => ({
  appMenu: false,
  accMenu: false,
  searchMenu: false,
  footbar: true,
  actions: {
    setLayout: (item: string, value: any) => set(
      (state) => ({ ...state, [item]: value })
    ),
    setField: (key: string, value: string) => set(
      (store) => ({ ...store, [key]: value })
    ),
    setStore: (payload) => set(
      (state) => ({ ...state, ...payload })
    ),
  }
}));

export const useLayoutActions = () => useLayoutStore(store => store.actions);

export const useAppMenu = () => useLayoutStore(store => store.appMenu);
export const useAccMenu = () => useLayoutStore(store => store.accMenu);
export const useSearchMenu = () => useLayoutStore(store => store.searchMenu);
export const useFootbar = () => useLayoutStore(store => store.footbar);
export const useSidebar = () => useLayoutStore(store => store.sidebar);

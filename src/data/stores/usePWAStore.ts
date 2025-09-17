import { create } from "zustand";

export interface PWAStore {
  showIntentPrompt: boolean
  actions: {
    updateField: (key: string, value: any) => void
    setField: (key: string, value: any) => void
    setStore: (payload: Partial<Exclude<PWAStore, "actions">>) => void
  }
}

const usePWAStore = create<PWAStore>((set) => ({
  showIntentPrompt: false,
  actions: {
    updateField: (key: string, value: any) => set(
      (store) => ({ ...store, [key]: value })
    ),
    setField: (key: string, value: string) => set(
      (store) => ({ ...store, [key]: value })
    ),
    setStore: (payload) => set(
      (state) => ({ ...state, ...payload })
    ),
  }
}));

export const usePWAActions = () => usePWAStore(store => store.actions);

export const useShowIntentPrompt = () => usePWAStore(store => store.showIntentPrompt);

import { create } from "zustand";

export interface ServiceWorkerStore {
  supported?: boolean
  registration?: ServiceWorkerRegistration
  subscription?: PushSubscription
  actions: {
    updateField: any
    setField: (key: string, value: any) => void
    setStore: (payload: Partial<Exclude<ServiceWorkerStore, "actions">>) => void
  }
}

const useServiceWorkerStore = create<ServiceWorkerStore>((set) => ({
  actions: {
    updateField: (type: string, value: any) => set(
      (state) => ({ ...state, [type]: value })
    ),
    setField: (key: string, value: string) => set(
      (store) => ({ ...store, [key]: value })
    ),
    setStore: (payload) => set(
      (state) => ({ ...state, ...payload })
    ),
  }
}));

export const useServiceWorkerActions = () => useServiceWorkerStore(store => store.actions);

export const useServiceWorkerSupported = () => useServiceWorkerStore(store => store.supported);
export const useServiceWorkerRegistration = () => useServiceWorkerStore(store => store.registration);
export const useServiceWorkerSubscription = () => useServiceWorkerStore(store => store.subscription);

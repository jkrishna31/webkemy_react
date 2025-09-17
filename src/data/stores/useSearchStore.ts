import { create } from "zustand";

export interface SearchStore {
    active: "text" | "audio" | undefined
    actions: {
        setSearch: any
        setField: (key: string, value: any) => void
        setStore: (payload: Partial<Exclude<SearchStore, "actions">>) => void
    }
}

const useSearchStore = create<SearchStore>((set) => ({
    active: undefined,
    actions: {
        setSearch: (type: string, value: boolean) => set(
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

export const useSearchActions = () => useSearchStore(store => store.actions);

export const useSearchActive = () => useSearchStore(store => store.active);

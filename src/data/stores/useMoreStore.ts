import { create } from "zustand";

export interface MoreStore {
    active: boolean
    prompt: boolean
    actions: {
        setField: (key: string, value: any) => void
        setStore: (payload: Partial<Exclude<MoreStore, "actions">>) => void
    }
}

const useMoreStore = create<MoreStore>((set) => ({
    active: false,
    prompt: false,
    actions: {
        setField: (key: string, value: string) => set(
            (store) => ({ ...store, [key]: value })
        ),
        setStore: (payload) => set(
            (state) => ({ ...state, ...payload })
        ),
    }
}));

export const useMoreActions = () => useMoreStore(store => store.actions);

export const useMoreActive = () => useMoreStore(store => store.active);
export const useMorePrompt = () => useMoreStore(store => store.prompt);

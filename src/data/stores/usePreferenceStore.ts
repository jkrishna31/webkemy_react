import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Themes } from "@/lib/constants/general";
import { TLang, TTheme } from "@/lib/types/general";

export interface PreferenceStore {
    theme: TTheme
    lang: TLang
    actions: {
        setTheme: any
        setLang: any
        setPreference: any
        setField: (key: string, value: any) => void
        setStore: (payload: Partial<Exclude<PreferenceStore, "actions">>) => void
    }
}

const usePreferenceStore = create<PreferenceStore>()(persist((set) => ({
    theme: Themes.SYSTEM,
    lang: "english",
    actions: {
        setTheme: (theme: TTheme) => set((state) => ({ ...state, theme: theme })),
        setLang: (lang: TLang) => set((state) => ({ ...state, lang: lang })),
        setPreference: (key: string, value: boolean) => set(
            (state) => ({ ...state, [key]: value })
        ),
        setField: (key: string, value: string) => set(
            (store) => ({ ...store, [key]: value })
        ),
        setStore: (payload) => set(
            (state) => ({ ...state, ...payload })
        ),
    }
}), {
    name: "preference"
}));

export const usePreferenceActions = () => usePreferenceStore(store => store.actions);

export const usePreferredTheme = () => usePreferenceStore(store => store.theme);
export const usePreferredLang = () => usePreferenceStore(store => store.lang);

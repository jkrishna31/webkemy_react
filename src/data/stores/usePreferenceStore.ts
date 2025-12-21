import { create } from "zustand";
import { persist } from "zustand/middleware";

import { themes } from "@/constants/general.const";
import { LangType, ThemeType } from "@/lib/types/general.types";

export interface PreferenceStore {
    theme: ThemeType
    lang: LangType
    actions: {
        setTheme: any
        setLang: any
        setPreference: any
        setField: (key: string, value: any) => void
        setStore: (payload: Partial<Exclude<PreferenceStore, "actions">>) => void
    }
}

const usePreferenceStore = create<PreferenceStore>()(persist((set) => ({
    theme: themes.SYSTEM,
    lang: "english",
    actions: {
        setTheme: (theme: ThemeType) => set((state) => ({ ...state, theme: theme })),
        setLang: (lang: LangType) => set((state) => ({ ...state, lang: lang })),
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

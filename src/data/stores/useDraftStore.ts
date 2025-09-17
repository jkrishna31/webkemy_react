import { create } from "zustand";

export interface IDraft {
    title: string
    subtitle?: string
    coverImgUrl?: string
    coverImgFile?: File
    tags?: string[]
    isScheduled: boolean
    scheduledDateTime?: string
    meta: boolean
    metaTitle?: string
    metaDesc?: string
    canonicalUrl?: string
    disableComments: boolean
    actions: {
        setField: (field: string, value: any) => void
    }
}

const useDraftStore = create<IDraft>((set) => ({
    title: "",
    isScheduled: false,
    meta: false,
    disableComments: false,
    actions: {
        setField: (field, value) => set((state) => ({ ...state, [field]: value }))
    }
}));

export const useDraftActions = () => useDraftStore(store => store.actions);

export const useDraftTitle = () => useDraftStore(store => store.title);
export const useDraftSubtitle = () => useDraftStore(store => store.subtitle);
export const useDraftCoverImgUrl = () => useDraftStore(store => store.coverImgUrl);
export const useDraftCoverImgFile = () => useDraftStore(store => store.coverImgFile);
export const useDraftTags = () => useDraftStore(store => store.tags);
export const useDraftIsScheduled = () => useDraftStore(store => store.isScheduled);
export const useDraftSchedule = () => useDraftStore(store => store.scheduledDateTime);
export const useDraftMetaTitle = () => useDraftStore(store => store.metaTitle);
export const useDraftMetaDesc = () => useDraftStore(store => store.metaDesc);
export const useDraftCanonicalUrl = () => useDraftStore(store => store.canonicalUrl);
export const useDraftDisableComments = () => useDraftStore(store => store.disableComments);

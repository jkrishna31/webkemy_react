import { create } from "zustand";

export interface ModalStore {
    theme: boolean
    lang: boolean
    save: boolean
    more: boolean
    share: boolean
    confirm: boolean
    // type: 'theme' | 'lang' | 'save' | 'share' | 'more' | null   // won't work for multiple drawer active at a time
    actions: {
        updateStore: any
        setField: (key: string, value: any) => void
        setStore: (payload: Partial<Exclude<ModalStore, "actions">>) => void
    }
    payload: any
}

const useModalStore = create<ModalStore>((set) => ({
    theme: false,
    lang: false,
    save: false,
    more: false,
    share: false,
    confirm: false,
    // type: null,
    payload: {},
    actions: {
        updateStore: (type: string, value: boolean) => set(
            (state) => ({ ...state, [type]: value })
        ),
        setField: (key: string, value: string) => set(
            (store) => ({ ...store, [key]: value })
        ),
        setStore: (payload) => set(
            (state) => ({ ...state, ...payload })
        ),
    },
}));

export const useModalActions = () => useModalStore(store => store.actions);

export const useThemeModal = () => useModalStore(store => store.theme);
export const useLangModal = () => useModalStore(store => store.lang);
export const useSaveModal = () => useModalStore(store => store.save);
export const useMoreModal = () => useModalStore(store => store.more);
export const useShareModal = () => useModalStore(store => store.share);
export const useConfirmModal = () => useModalStore(store => store.confirm);
export const useModalPayload = () => useModalStore(store => store.payload);

"use client";

import { SearchSelect } from "@/components/common/general";
import { langData, themeData } from "@/data/general/general";
import { useLangModal, useModalActions, usePreferenceActions, usePreferredLang, usePreferredTheme, useThemeModal } from "@/data/stores";

const PreferenceManager = () => {
    const { setTheme, setLang } = usePreferenceActions();
    const theme = usePreferredTheme();
    const lang = usePreferredLang();
    const { updateStore } = useModalActions();
    const langModal = useLangModal();
    const themeModal = useThemeModal();

    const closeModal = (key: string) => {
        updateStore(key, false);
    };

    const manageSelection = (payload: any) => {
        const { checked, key, value } = payload;
        switch (key) {
            case "theme":
                setTheme(value);
                break;
            case "lang":
                setLang(value);
        }
        closeModal(key);
    };

    return (langModal || themeModal) ? (
        <SearchSelect
            options={themeModal ? themeData : langData}
            selected={themeModal ? theme : lang}
            keey={themeModal ? "theme" : "lang"}
            title={themeModal ? "Theme" : "Language"}
            placeholder={themeModal ? "Search theme..." : "Search language..."}
            onSelect={manageSelection}
            onCancel={() => closeModal(themeModal ? "theme" : "lang")}
        />
    ) : null;
};

export default PreferenceManager;

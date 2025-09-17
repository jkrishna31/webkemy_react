"use client";

import React from "react";

import { KeyboardManager, NetworkManager, NotificationManager, PreferenceManager, SearchManager, ToastManager, WindowResizeManager, WindowScrollManager } from "@/components/managers";
import { useSearchActive } from "@/data/stores";

const ClientSetup = () => {
    const search = useSearchActive();

    return (
        <>
            {search && <SearchManager />}
            <NotificationManager />
            <ToastManager />
            <PreferenceManager />
            <WindowScrollManager />
            <WindowResizeManager />
            <KeyboardManager />
            <NetworkManager />
        </>
    );
};

export default ClientSetup;

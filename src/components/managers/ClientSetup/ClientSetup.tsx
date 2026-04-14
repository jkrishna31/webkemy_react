"use client";

import { KeyboardManager, NotificationManager, SearchManager } from "@/components/managers";
import { useSearchActive } from "@/data/stores";
import { NetworkManager, ToastManager, WindowResizeManager, WindowScrollManager } from "@/lib/components/managers";

const ClientSetup = () => {
    const search = useSearchActive();

    return (
        <>
            {search && <SearchManager />}
            <NotificationManager />
            <KeyboardManager />
            <ToastManager />
            <WindowScrollManager />
            <WindowResizeManager />
            <NetworkManager />
        </>
    );
};

export default ClientSetup;

"use client";

import { RefObject, useEffect } from "react";

const defaultOpts: MutationObserverInit = {
    childList: true, attributes: true, subtree: true, characterData: true
};

export function useMutationObserver(
    target: RefObject<HTMLElement | null>,
    cb: MutationCallback,
    options: MutationObserverInit = defaultOpts,
) {
    useEffect(() => {
        const elem = target.current;
        if (!elem) return;
        const observer = new MutationObserver(cb);
        observer.observe(elem, options);
        return () => {
            observer?.disconnect();
        };
    }, [cb, options, target]);
}

"use client";

import { useRef, useState } from "react";

import useIsomorphicLayoutEffect from "@/lib/hooks/useIsomorphicLayoutEffect";

type UseScrollLockOptions = {
    autoLock?: boolean
    lockTarget?: HTMLElement | string
    widthReflow?: boolean
    lockAll?: boolean
}

type UseScrollLockReturn = {
    isLocked: boolean
    lock: () => void
    unlock: () => void
}

type OriginalStyle = {
    overflow: CSSStyleDeclaration["overflow"]
    paddingRight: CSSStyleDeclaration["paddingRight"]
}

const IS_SERVER = typeof window === "undefined";

export default function useScrollLock(
    options: UseScrollLockOptions = {},
): UseScrollLockReturn {
    const { autoLock, lockTarget, lockAll, widthReflow = true } = options;
    const [isLocked, setIsLocked] = useState(false);
    const target = useRef<HTMLElement | null>(null);
    const originalStyle = useRef<OriginalStyle | null>(null);

    const lock = () => {
        if (target.current) {
            const { overflow, paddingRight } = target.current.style;

            originalStyle.current = { overflow, paddingRight };

            if (widthReflow) {
                const currentPaddingRight = parseInt(window.getComputedStyle(target.current).paddingRight, 10) || 0;
                const scrollbarWidth = target.current.clientWidth - target.current.offsetWidth;
                target.current.style.paddingRight = `${scrollbarWidth + currentPaddingRight}px`;
            }

            target.current.style.overflow = "hidden";

            setIsLocked(true);
        }
    };

    const unlock = () => {
        if (target.current && originalStyle.current) {
            target.current.style.overflow = originalStyle.current.overflow;

            if (widthReflow) {
                target.current.style.paddingRight = originalStyle.current.paddingRight;
            }
        }

        setIsLocked(false);
    };

    useIsomorphicLayoutEffect(() => {
        if (IS_SERVER) return;

        if (lockTarget) {
            target.current =
                typeof lockTarget === "string"
                    ? document.querySelector(lockTarget)
                    : lockTarget;
        }

        if (!target.current) {
            target.current = document.body;
        }

        if (autoLock) {
            lock();
        }

        return () => {
            unlock();
        };

    }, [autoLock, lockTarget, widthReflow]);

    return { isLocked, lock, unlock };
}

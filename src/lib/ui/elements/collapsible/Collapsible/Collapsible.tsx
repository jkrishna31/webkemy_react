"use client";

import React, { ComponentProps, ElementType, ReactNode, useCallback, useEffect, useLayoutEffect, useRef } from "react";

import styles from "./Collapsible.module.scss";

export type CollapsibleProps<T extends ElementType, K extends ElementType> = {
    wrapperAs?: T
    detailsAs?: K
    open: boolean
    summary: ReactNode
    detailsClass?: string
    renderWhileClosed?: boolean
} & ComponentProps<T>;

const Collapsible = <T extends ElementType = "div", K extends ElementType = "div">({
    children, className, detailsClass,
    open, summary, renderWhileClosed = true,
    wrapperAs = "div", detailsAs = "div",
    ...props
}: CollapsibleProps<T, K>) => {
    const ref = useRef<HTMLUListElement>(null);

    const WrapperElement = wrapperAs;
    const DetailsElement = detailsAs;

    const updateHeight = useCallback(() => {
        if (ref.current) {
            const contentHeight = (ref.current as HTMLElement).scrollHeight;
            ref.current.style.height = "fit-content";
            ref.current.style.maxHeight = `${open ? contentHeight : 0}px`;
        }
    }, [open]);

    // useLayoutEffect(() => {
    //     const el = ref.current;
    //     if (!el) return;

    //     // Ensure we can animate and hide overflow
    //     el.style.overflow = "hidden";
    //     el.style.transition = `max-height ${500}ms ease`;

    //     // Helper to force layout (reflow)
    //     const forceReflow = () => void el.offsetHeight;

    //     // Keep a ResizeObserver while open so parent adjusts if nested content changes
    //     let ro: ResizeObserver;
    //     const attachRO = () => {
    //         if ("ResizeObserver" in window) {
    //             ro = new ResizeObserver(() => {
    //                 // If we've collapsed to "none" (auto) skip
    //                 if (el.style.maxHeight === "none") return;
    //                 el.style.maxHeight = `${el.scrollHeight}px`;
    //             });
    //             ro.observe(el);
    //         }
    //     };

    //     if (open) {
    //         // Make sure we start from 0px so transition has a numeric start
    //         el.style.maxHeight = "0px";
    //         forceReflow();

    //         // Set to the content height to animate open
    //         const target = el.scrollHeight;
    //         // two RAFs are defensive to ensure the start style is applied before changing to target
    //         requestAnimationFrame(() => requestAnimationFrame(() => {
    //             el.style.maxHeight = `${target}px`;
    //         }));

    //         // After transition, set maxHeight to "none" so content can grow/shrink naturally
    //         const onEnd = (e) => {
    //             if (e.propertyName === "max-height") {
    //                 el.style.maxHeight = "none"; // removes clamping
    //                 el.removeEventListener("transitionend", onEnd);
    //             }
    //         };
    //         el.addEventListener("transitionend", onEnd);

    //         attachRO();
    //     } else {
    //         // Closing: start from the current pixel height so we animate from the real value
    //         const start = el.scrollHeight;
    //         el.style.maxHeight = `${start}px`;
    //         forceReflow();
    //         // then set to 0 to animate close
    //         requestAnimationFrame(() => {
    //             el.style.maxHeight = "0px";
    //         });

    //         // When closed, disconnect RO
    //         if (ro) ro.disconnect();
    //     }

    //     return () => {
    //         if (ro) ro.disconnect();
    //     };
    // }, [open]);

    useLayoutEffect(() => {
        updateHeight();
    }, [open, updateHeight]);

    const renderDetails = () => {
        if (!renderWhileClosed && !open) return;
        return (
            <DetailsElement
                className={`${styles.details} ${detailsClass}`}
                ref={ref}
                onTransitionEnd={updateHeight}
            >
                {children}
            </DetailsElement>
        );
    };

    return (
        <WrapperElement
            className={`${styles.wrapper} ${className}`}
            data-expanded={open}
            {...props}
        >
            {summary}
            {renderDetails()}
        </WrapperElement>
    );
};

export default Collapsible;

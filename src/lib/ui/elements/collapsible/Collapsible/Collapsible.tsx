"use client";

import React, { ComponentProps, ElementType, ReactNode, useCallback, useLayoutEffect, useRef } from "react";

import styles from "./Collapsible.module.scss";

export type CollapsibleProps<T extends ElementType, K extends ElementType> = {
    wrapperAs?: T;
    detailsAs?: K;
    open: boolean;
    summary: ReactNode;
    detailsClass?: string;
    renderWhileClosed?: boolean;
    detailsPanelId?: string;
    adjustOverflow?: boolean;
} & ComponentProps<T>;

const Collapsible = <T extends ElementType = "div", K extends ElementType = "div">({
    children, className, detailsClass,
    open, summary, renderWhileClosed = true, adjustOverflow,
    detailsPanelId,
    wrapperAs = "div", detailsAs = "div",
    ...props
}: CollapsibleProps<T, K>) => {
    const ref = useRef<HTMLUListElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    const WrapperElement = wrapperAs;
    const DetailsElement = detailsAs;

    const updateHeight = useCallback(() => {
        const elem = ref.current;
        if (elem) {
            const contentHeight = (elem as HTMLElement).scrollHeight;
            elem.style.height = "fit-content";
            elem.style.maxHeight = `${open ? contentHeight : 0}px`;
            clearTimeout(timeoutRef.current ?? undefined);
            if (open) {
                elem.style.opacity = "100%";
                if (adjustOverflow) {
                    timeoutRef.current = setTimeout(() => {
                        elem.style.overflow = "initial";
                    }, .6 * 500);
                }
            } else {
                elem.style.overflow = "hidden";
                elem.style.opacity = "0%";
            }
        }
    }, [adjustOverflow, open]);

    const handleTransitionStart = () => {
        const elem = ref.current;
        if (elem && open) {
            clearTimeout(timeoutRef.current ?? undefined);
            elem.style.overflow = "hidden";
        }
    };

    useLayoutEffect(() => {
        updateHeight();
    }, [open, updateHeight]);

    const renderDetails = () => {
        if (!renderWhileClosed && !open) return;
        return (
            <DetailsElement
                className={`${styles.details} ${detailsClass}`}
                ref={ref}
                onTransitionStart={handleTransitionStart}
                onTransitionEnd={updateHeight}
                role="region"
                id={detailsPanelId ?? ""}
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

"use client";

import React, { ComponentProps, ElementType, ReactNode, useCallback, useEffect, useLayoutEffect, useRef } from "react";

import styles from "./Collapsible.module.scss";

export type CollapsibleProps<T extends ElementType, K extends ElementType> = {
    wrapperAs?: T;
    detailsAs?: K;
    open: boolean;
    summary: ReactNode;
    detailsClass?: string;
    renderWhileClosed?: boolean;
    detailsPanelId?: string;
} & ComponentProps<T>;

const Collapsible = <T extends ElementType = "div", K extends ElementType = "div">({
    children, className, detailsClass,
    open, summary, renderWhileClosed = true,
    detailsPanelId,
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

"use client";

import React, { ComponentProps, ElementType, ReactNode } from "react";

import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import { classes } from "@/lib/utils/style.utils";

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
    const WrapperElement = wrapperAs;

    const renderDetails = () => {
        return (
            <CollapsiblePanel
                as={detailsAs} open={open} id={detailsPanelId} className={detailsClass}
                renderWhileClosed={renderWhileClosed}
            >
                {children}
            </CollapsiblePanel>
        );
    };

    return (
        <WrapperElement
            className={classes(styles.wrapper, className)}
            aria-expanded={open}
            {...props}
        >
            {summary}
            {renderDetails()}
        </WrapperElement>
    );
};

export default Collapsible;

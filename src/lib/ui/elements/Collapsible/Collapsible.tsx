"use client";

import React, { ComponentProps, ElementType, ReactNode } from "react";

import { CollapsibleContainer } from "@/lib/ui/elements/CollapsibleContainer";
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
    adjustOverflow?: boolean;
} & ComponentProps<T>;

const Collapsible = <T extends ElementType = "div", K extends ElementType = "div">({
    children, className, detailsClass,
    open, summary, renderWhileClosed = true, adjustOverflow,
    detailsPanelId,
    wrapperAs = "div", detailsAs = "div",
    ...props
}: CollapsibleProps<T, K>) => {
    const WrapperElement = wrapperAs;

    const renderDetails = () => {
        return (
            <CollapsibleContainer
                as={detailsAs} open={open} id={detailsPanelId} className={detailsClass}
                renderWhileClosed={renderWhileClosed}
            >
                {children}
            </CollapsibleContainer>
        );
    };

    return (
        <WrapperElement
            className={classes(styles.wrapper, className)}
            data-expanded={open}
            aria-expanded={open}
            {...props}
        >
            {summary}
            {renderDetails()}
        </WrapperElement>
    );
};

export default Collapsible;

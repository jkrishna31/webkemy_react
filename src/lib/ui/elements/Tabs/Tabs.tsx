"use client";

import { ComponentProps, ReactNode, useEffect, useRef } from "react";

import { Keys } from "@/constants/keys.const";
import { BaseVariant } from "@/lib/types/general.types";
import { Scrollable } from "@/lib/ui/elements/Scrollable";
import { isDisabled } from "@/lib/utils/dom.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Tabs.module.scss";

export interface Tab extends ComponentProps<"button"> {
    id: string;
    label?: ReactNode;
    disabled?: boolean;
    render?: () => ReactNode;
}

export interface TabListProps extends ComponentProps<"div"> {
    wrapperInnerClass?: string;
    btnClass?: string;
    tabs: Tab[];
    onChange: any;
    activeTab: string;
    showScrollBtns?: boolean;
    variant?: "solid" | "muted";
}

const Tabs = ({
    variant = "solid", wrapperInnerClass, btnClass, tabs, onChange, activeTab, showScrollBtns = false,
    className,
    ...rest
}: TabListProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeTabRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (activeTabRef.current && containerRef.current && containerRef.current.scrollWidth > containerRef.current.clientWidth) {
            activeTabRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "nearest",
            });
        }
    }, [activeTab]);

    useEffect(() => {
        const list = containerRef.current;
        if (list) {
            const handleKeyDown = (e: KeyboardEvent) => {
                const activeElem = list.contains(document.activeElement) ? document.activeElement : activeTabRef.current;
                if (!activeElem) return;

                let focusableTab: HTMLElement | undefined;

                if (e.key === Keys.ARROW_DOWN || e.key === Keys.ARROW_RIGHT) {
                    let i = 0;
                    let candidate = activeElem.nextElementSibling as HTMLElement;
                    while (!focusableTab && candidate && i < tabs?.length) {
                        if (candidate.getAttribute("role") === "tab" && !isDisabled(candidate)) {
                            focusableTab = candidate;
                        } else {
                            candidate = candidate.nextElementSibling as HTMLElement;
                        }
                        i++;
                    }
                } else if (e.key === Keys.ARROW_UP || e.key === Keys.ARROW_LEFT) {
                    let i = 0;
                    let candidate = activeElem.previousElementSibling as HTMLElement;
                    while (!focusableTab && candidate && i < tabs?.length) {
                        if (candidate.getAttribute("role") === "tab" && !isDisabled(candidate)) {
                            focusableTab = candidate;
                        } else {
                            candidate = candidate.previousElementSibling as HTMLElement;
                        }
                    }
                    i++;
                }

                focusableTab?.focus();
                if (e.shiftKey) focusableTab?.click();
            };

            list.addEventListener("keydown", handleKeyDown);
            return () => list.removeEventListener("keydown", handleKeyDown);
        }
    }, [tabs?.length]);

    return (
        <div
            className={classes("scroll_invisible", styles.tab_btns_wrapper, className)}
            {...rest}
        >
            <Scrollable
                className={classes(styles.tabs_wrapper, variant && styles[variant], wrapperInnerClass)}
                role="tablist"
                ref={containerRef}
            >
                {
                    tabs?.map((tab) => {
                        const isSelected = tab.id === activeTab;
                        return (
                            <button
                                className={classes(styles.tab_btn, btnClass)}
                                role="tab"
                                key={tab.id}
                                ref={isSelected ? activeTabRef : null}
                                onClick={() => onChange(tab.id)}
                                aria-selected={isSelected}
                                title={tab.title}
                                aria-hidden={rest["aria-hidden"]}
                                tabIndex={isSelected ? 0 : -1}
                                disabled={tab.disabled}
                            >
                                {tab.render?.()}
                                {tab.label ? (
                                    <span className={styles.tab_btn_label}>{tab.label}</span>
                                ) : null}
                            </button>
                        );
                    })
                }
            </Scrollable>
        </div>
    );
};

export default Tabs;

"use client";

import { ComponentProps, useEffect, useRef } from "react";

import { Keys } from "@/constants/keys.const";
import { Scrollable } from "@/lib/ui/elements/Scrollable";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Tabs.module.scss";

export interface TabListProps extends ComponentProps<"div"> {
    wrapperInnerClass?: string
    btnClass?: string
    tabs: any[]
    onChange: any
    activeTab: string
    showScrollBtns?: boolean
}

const Tabs = ({
    wrapperInnerClass, btnClass, tabs, onChange, activeTab, showScrollBtns = false,
    className,
    ...rest
}: TabListProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeTabRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // call only when the container has scroll area
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
                // TODO: nextElementSibling, if not diabled; and move to first or last if last or first respectively
                if (e.key === Keys.ARROW_DOWN || e.key === Keys.ARROW_RIGHT) {
                    focusableTab = activeElem.nextElementSibling as HTMLElement;
                } else if (e.key === Keys.ARROW_UP || e.key === Keys.ARROW_LEFT) {
                    focusableTab = activeElem.previousElementSibling as HTMLElement;
                }
                focusableTab?.focus();
            };

            list.addEventListener("keydown", handleKeyDown);
            return () => list.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    return (
        <div
            className={classes("scroll_invisible", styles.tab_btns_wrapper, className)}
            {...rest}
        >
            <Scrollable
                className={classes(styles.tabs_wrapper, wrapperInnerClass)}
                role="tablist"
                ref={containerRef}
            >
                {
                    tabs?.map((tab: any) => {
                        const isSelected = tab.id === activeTab;
                        return (
                            <button
                                className={classes(styles.tab_btn, btnClass)}
                                ref={isSelected ? activeTabRef : null}
                                onClick={() => onChange(tab.id)}
                                aria-selected={isSelected}
                                key={tab.id}
                                role="tab"
                                title={tab.title}
                                aria-hidden={rest["aria-hidden"]}
                                tabIndex={isSelected ? 0 : -1}
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

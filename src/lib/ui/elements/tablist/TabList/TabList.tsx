"use client";

import { ComponentProps, useEffect, useRef } from "react";

import { Scrollable } from "@/lib/ui/elements/scrollable";

import styles from "./TabList.module.scss";

export interface TabListProps extends ComponentProps<"div"> {
    wrapperInnerClass?: string
    btnClass?: string
    tabs: any[]
    onChange: any
    activeTab: string
    showScrollBtns?: boolean
}

const TabList = ({
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

    return (
        <div
            className={`scroll_invisible ${styles.tab_btns_wrapper} ${className}`}
            {...rest}
        >
            <Scrollable
                className={`${styles.tabs_wrapper} ${wrapperInnerClass}`}
                role="tablist"
                ref={containerRef}
            >
                {
                    tabs?.map((tab: any, idx: number) => (
                        <button
                            className={`${styles.tab_btn} ${btnClass}`}
                            tab-active={tab.id === activeTab ? 1 : 0}
                            ref={tab.id === activeTab ? activeTabRef : null}
                            onClick={(e) => {
                                onChange(tab.id);
                            }}
                            aria-selected={tab.id === activeTab}
                            key={tab.id}
                            role="tab"
                            title={tab.title}
                            aria-hidden={rest["aria-hidden"]}
                            tabIndex={rest["aria-hidden"] ? -1 : 0}
                        >
                            {tab.render?.()}
                            {tab.label ? (
                                <span className={styles.tab_btn_label}>{tab.label}</span>
                            ) : null}
                        </button>
                    ))
                }
            </Scrollable>
        </div>
    );
};

export default TabList;

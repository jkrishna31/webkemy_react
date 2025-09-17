"use client";

import React, { useState } from "react";

import { Dropdown } from "@/lib/ui/elements/dropdowns";
import { ChevronDownIcon, PlusIcon } from "@/lib/ui/svgs/icons";

import styles from "./BlockSelector.module.scss";

const BlockSelector = ({ label, blocks, onSelect, wrapperClass, btnClass, listClass, ...props }: any) => {
    const [listState, setListState] = useState<boolean>(false);
    const [nestedListState, setNestedListState] = useState<number>(-1);

    const openToolsList = () => {
        setListState(true);
    };

    const closeToolsList = () => {
        setListState(false);
        setNestedListState(-1);
    };

    const handleSelectorClick = () => {
        setListState(!listState);
    };

    const handleToolClick = (key: string) => {
        closeToolsList();
        onSelect(key);
    };

    const handleNestedClick = (key: number = -1) => {
        setNestedListState(nestedListState !== key ? key : -1);
    };

    const renderNestedSelector = (toolGroup: any) => {
        return (
            <>
                <span className={styles.group_label}>{toolGroup.label}</span>
                <ul className={`${styles.nested_tools_list}`}>
                    {
                        toolGroup.st.map((tool: any) => {
                            return (
                                <li key={tool.key} className={`${styles.list_item} ${styles.nested_list_item}`}>
                                    <button
                                        className={`${styles.tool_item} ${styles.nested_tool_item}`} onClick={() => handleToolClick(tool.key)}
                                        disabled={tool.disabled}
                                    >
                                        {tool.icon}
                                        <span>{tool.label}</span>
                                        <span className={styles.kb}>{tool.kb}</span>
                                    </button>
                                </li>
                            );
                        })
                    }
                </ul>
            </>
        );
    };

    return (
        <Dropdown
            open={listState}
            className={`${styles.wrapper} ${wrapperClass}`} onMouseEnter={openToolsList} onMouseLeave={closeToolsList}
            btnClass={`${styles.selector} ${btnClass}`}
            onOpen={handleSelectorClick}
            dropdown={
                <ul className={`${styles.tools_list} scroll_thin ${listClass}`}>
                    {
                        blocks.map((tool: any, index: number) => {
                            return (
                                <li key={tool.key || index} className={styles.list_item}>
                                    {
                                        tool.st ? (
                                            renderNestedSelector(tool)
                                        ) : (
                                            <button
                                                className={styles.tool_item}
                                                onClick={tool.st ? (() => handleNestedClick(index)) : (() => handleToolClick(tool.key))}
                                                disabled={tool.disabled}
                                            >
                                                {tool.icon}
                                                <span>{tool.label}</span>
                                                {
                                                    tool.st ? (
                                                        <ChevronDownIcon className={`${styles.tool_expand_arrow} ${nestedListState === index ? styles.tool_expanded : ""}`} />
                                                    ) : (
                                                        <span className={styles.kb}>{tool.kb}</span>
                                                    )
                                                }
                                            </button>
                                        )
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            }
        >
            <PlusIcon className={styles.plus_icon} />
        </Dropdown>
    );
};

export default BlockSelector;

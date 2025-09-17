"use client";

import { ComponentProps } from "react";

import styles from "./ToolSelector.module.scss";

export interface ToolSelectorProps extends ComponentProps<"div"> {
    toolsState?: any
    tools?: any
    onClick?: any
}

const ToolSelector = ({
    toolsState, onClick, tools,
}: ToolSelectorProps) => {
    return (
        <div className={styles.wrapper}>
            <div
                className={styles.toolbar}
                onMouseDown={(e) => {
                    e.preventDefault();
                }}
            >
                {
                    tools?.map((toolGroup: any, toolGroupIdx: number) => (
                        <div className={styles.tool_group} key={toolGroupIdx}>
                            {
                                toolGroup?.map((tool: any) => (
                                    <button
                                        key={tool.key}
                                        className={`${styles.inline_tool_btn} ${styles?.[tool["color"]] || ""}`}
                                        title={tool.name}
                                        disabled={tool?.disabled}
                                        data-active={toolsState?.[tool.key]}
                                        id={tool?.key}
                                        onClick={(e: any) => onClick?.(e, tool.key)}
                                    >
                                        {tool?.render}
                                    </button>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ToolSelector;

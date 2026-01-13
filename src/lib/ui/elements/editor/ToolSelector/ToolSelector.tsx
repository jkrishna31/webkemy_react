"use client";

import { ComponentProps } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./ToolSelector.module.scss";

export interface ToolSelectorProps extends ComponentProps<"div"> {
    toolsState?: any
    options?: any
    onClick?: any
}

const ToolSelector = ({
    toolsState, onClick, options,
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
                    options?.map((toolGroup: any, toolGroupIdx: number) => (
                        <div className={styles.tool_group} key={toolGroupIdx}>
                            {
                                toolGroup?.map((tool: any) => (
                                    <button
                                        key={tool.key}
                                        className={classes(styles.inline_tool_btn, styles?.[tool["color"]])}
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

"use client";

import React, { useState } from "react";

import TriangleRightIcon from "@/lib/ui/svgs/icons/TriangleRightIcon";
import { classes } from "@/lib/utils/style.utils";

import cStyles from "../block.module.scss";
import styles from "./RenderCollapsible.module.scss";

const RenderCollapsible = ({ block, ...props }: any) => {
    const [state, setState] = useState(false);

    const handleToggle = () => {
        setState(!state);
    };

    return (
        <div
            data-block
            className={classes(cStyles.block, styles.data_collapsible, state && styles.open)}
            data-open={state}
            id={block.id}
        >
            <div className={styles.header}>
                <button type="button" className={styles.btn} onClick={handleToggle} contentEditable={false} title="Expand/Collapse">
                    <TriangleRightIcon className={styles.icon} />
                </button>
                <p className={styles.title}>{block.data?.title}</p>
            </div>
            <div className={styles.body}>
                <div className={styles.details}>
                    <span>
                        {block.data?.desc}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RenderCollapsible;

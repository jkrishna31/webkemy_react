"use client";

import React, { useState } from "react";

import { Dropdown } from "@/lib/ui/elements/dropdowns";
import { MenuItem } from "@/lib/ui/elements/menu";
import { PlusIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import styles from "./BlockSelector.module.scss";

const BlockSelector = ({ label, blocks, onSelect, wrapperClass, btnClass, listClass, ...props }: any) => {
    const [listState, setListState] = useState<boolean>(false);

    const openToolsList = () => {
        setListState(true);
    };

    const closeToolsList = () => {
        setListState(false);
    };

    const handleSelectorClick = () => {
        setListState(!listState);
    };

    return (
        <Dropdown
            open={listState}
            className={classes(styles.wrapper, wrapperClass)}
            btnClass={classes(styles.selector, btnClass)}
            dropdownClass={classes(styles.dropdown)}
            onMouseEnter={openToolsList} onMouseLeave={closeToolsList}
            onOpen={handleSelectorClick}
            dropdown={
                <ul className={classes(styles.tools_list, "scroll_thin", listClass)}>
                    {
                        blocks.map((item: any) => {
                            return (
                                <MenuItem
                                    as="button"
                                    {...item}
                                    key={item.key}
                                    id={item.key}
                                />
                            );
                        })
                    }
                </ul>
            }
            xPos="left"
        >
            <PlusIcon className={styles.plus_icon} />
        </Dropdown>
    );
};

export default BlockSelector;

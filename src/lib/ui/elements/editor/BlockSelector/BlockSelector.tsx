"use client";

import React, { useState } from "react";

import { Dropdown } from "@/lib/ui/elements/dropdowns";
import { Item } from "@/lib/ui/elements/Item";
import { ItemGroup } from "@/lib/ui/elements/ItemGroup";
import PlusIcon from "@/lib/ui/svgs/icons/PlusIcon";
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
                        blocks?.map((group: any) => (
                            <ItemGroup
                                key={group.key}
                                headerClass={group.className}
                                group={group.group}
                            >
                                <div className={styles.list}>
                                    {
                                        group.menu?.map((item: any) => (
                                            <Item<"button">
                                                as="button"
                                                {...item}
                                                key={item.key}
                                            />
                                        ))
                                    }
                                </div>
                            </ItemGroup>
                        ))
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

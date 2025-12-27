"use client";

import React from "react";

import { Dropdown } from "@/lib/ui/elements/Dropdown";
import { Item } from "@/lib/ui/elements/Item";
import { ItemGroup } from "@/lib/ui/elements/ItemGroup";
import { ItemList } from "@/lib/ui/elements/ItemList";
import PlusIcon from "@/lib/ui/svgs/icons/PlusIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./BlockSelector.module.scss";

const BlockSelector = ({ label, blocks, onSelect, wrapperClass, btnClass, listClass, ...props }: any) => {
    return (
        <Dropdown
            hintIcon={null}
            className={classes(styles.wrapper, wrapperClass)}
            triggerClass={classes(styles.selector, btnClass)}
            dropdown={
                <ItemList className={classes(styles.tools_list, "scroll_thin", listClass)}>
                    {
                        blocks?.map((group: any) => (
                            <ItemGroup
                                key={group.key}
                                headerClass={classes(styles.group, group.className)}
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
                </ItemList>
            }
        >
            <PlusIcon className={styles.plus_icon} />
        </Dropdown>
    );
};

export default BlockSelector;

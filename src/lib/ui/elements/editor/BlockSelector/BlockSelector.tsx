"use client";

import { useState } from "react";

import { Dropdown } from "@/lib/ui/elements/Dropdown";
import { Item } from "@/lib/ui/elements/Item";
import { ItemGroup } from "@/lib/ui/elements/ItemGroup";
import { ItemList } from "@/lib/ui/elements/ItemList";
import PlusIcon from "@/lib/ui/svgs/icons/PlusIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./BlockSelector.module.scss";

export interface BlockSelectorProps {
    options?: any[];
    onSelect?: (key: string) => void;
}

const BlockSelector = ({
    options, onSelect,
}: BlockSelectorProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dropdown
            open={open}
            onOpenChange={setOpen}
            hintIcon={null}
            rootClass={styles.wrapper}
            triggerClass={classes(styles.selector)}
            dropdownClass={styles.dropdown}
            alignment="left"
            dropdown={
                <ItemList className={classes(styles.tools_list, "scroll_thin")}>
                    {
                        options?.map((group: any) => (
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
                                                scope="list"
                                                {...item}
                                                key={item.key}
                                                onClick={() => {
                                                    onSelect?.(item.key);
                                                    setOpen(false);
                                                }}
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

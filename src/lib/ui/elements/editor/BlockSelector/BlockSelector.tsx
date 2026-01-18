"use client";


import { Dropdown } from "@/lib/ui/elements/Dropdown";
import { Item } from "@/lib/ui/elements/Item";
import { ItemGroup } from "@/lib/ui/elements/ItemGroup";
import { ItemList } from "@/lib/ui/elements/ItemList";
import PlusIcon from "@/lib/ui/svgs/icons/PlusIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./BlockSelector.module.scss";

export interface BlockSelectorProps {
    options?: any[];
    wrapperClass?: string;
    btnClass?: string;
    listClass?: string;
}

const BlockSelector = ({ options, wrapperClass, btnClass, listClass, ...props }: BlockSelectorProps) => {
    return (
        <Dropdown
            hintIcon={null}
            triggerClass={classes(styles.selector, btnClass)}
            dropdownClass={styles.dropdown}
            alignment="left"
            dropdown={
                <ItemList className={classes(styles.tools_list, "scroll_thin", listClass)}>
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

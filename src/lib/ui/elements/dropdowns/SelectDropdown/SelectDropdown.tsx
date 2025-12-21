"use client";

import React, { ComponentProps, ReactNode, useEffect, useMemo, useState } from "react";

import { SearchForm } from "@/components/common/forms";
import { Dropdown } from "@/lib/ui/elements/dropdowns";
import ExpandSolidIcon from "@/lib/ui/svgs/icons/ExpandSolidIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./SelectDropdown.module.scss";

export interface SelectOption {
    label: string
    value: string | number
    data?: string
    groupLabel?: string
    children?: SelectOption[]
    disabled?: boolean
}

export interface SelectDropdownProps extends ComponentProps<"div"> {
    options: SelectOption[]
    selected: SelectOption["value"]
    transformSelected?: (op?: SelectOption) => string | undefined
    allowSearch?: boolean
    wrapperClass?: string
    btnClass?: string
    listClass?: string
    iconClass?: string
    onOptionSelect?: (item: SelectOption) => void
    xPos?: "left" | "right"
    yPos?: "top" | "bottom"
    customSelector?: ReactNode
    isFilter?: boolean
    noIcon?: boolean
}

const SelectDropdown = ({
    options, selected, onOptionSelect, allowSearch, isFilter,
    xPos, yPos, transformSelected, customSelector,
    wrapperClass, btnClass, listClass, iconClass, noIcon,
    ...props
}: SelectDropdownProps) => {
    const [listToShow, setListToShow] = useState<SelectOption[]>([]);
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const selectedOp = useMemo(() => options?.find(op => op.value === selected), [options, selected]);

    const openDropdown = () => {
        setOpen(true);
    };

    const closeDropdown = () => {
        setQuery("");
        setListToShow(options);
        setOpen(false);
    };

    const handleItemSelect = (item: SelectOption) => {
        onOptionSelect?.(item);
        closeDropdown();
    };

    const getSelectedLabel = () => {
        return selectedOp?.data ? `${selectedOp.data} ${selectedOp.label}` : selectedOp?.label;
    };

    // useEffect(() => {
    //     setListToShow(options);
    // }, [options]);

    useEffect(() => {
        const newListToShow = options?.filter(item => (
            item.label.toLowerCase().includes(query.toLowerCase())
        ));
        setListToShow(newListToShow);
    }, [options, query]);

    return (
        <Dropdown
            open={open}
            className={classes(styles.container, wrapperClass)}
            onMouseLeave={allowSearch ? undefined : closeDropdown}
            onClose={closeDropdown}
            onOpen={openDropdown}
            xPos={xPos} yPos={yPos}
            dropdownClass={`${styles.dd_list}`}
            btnClass={`${styles.dropdown_btn} ${btnClass}`}
            dropdown={
                <>
                    {
                        allowSearch ? (
                            <div className={styles.search_wrapper}>
                                <SearchForm
                                    wrapperClass={styles.search_input_wrapper}
                                    inputClass={styles.search_input}
                                    placeholder="Search..."
                                    allowSearch={false}
                                    query={query}
                                    onQueryChange={setQuery}
                                />
                            </div>
                        ) : null
                    }
                    <ul className={classes(styles.ul, "scroll_thin")}>
                        {
                            listToShow.map((item, index) => {
                                return (
                                    <li key={index} className={styles.list_item}>
                                        <button
                                            className={classes(styles.item_btn, selected === item.value && styles.item_selected)}
                                            onClick={() => handleItemSelect(item)}
                                            disabled={item.disabled}
                                        >
                                            <span>{item.label}</span>
                                            {
                                                item.data ? <span>{item.data}</span> : null
                                            }
                                        </button>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {
                        (query && !listToShow?.length) ? (
                            <p className={styles.info_text}>{"No match found."}</p>
                        ) : null
                    }
                </>
            }
        >
            {
                customSelector ?? (
                    <>
                        <span className={styles.dropdown_label}>
                            {
                                transformSelected
                                    ? transformSelected(selectedOp)
                                    : getSelectedLabel()
                            }
                        </span>
                        {
                            !noIcon ? (
                                <ExpandSolidIcon className={classes(styles.dropdown_icon, iconClass)} />
                            ) : null
                        }
                    </>
                )
            }
        </Dropdown>
    );
};

export default SelectDropdown;

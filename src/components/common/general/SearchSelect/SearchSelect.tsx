"use client";

import React, { ComponentProps, useState } from "react";

import { InputItem } from "@/lib/ui/elements/inputs/InputItem";
import { Radio } from "@/lib/ui/elements/inputs/Radio";
import { Modal, ModalHeader } from "@/lib/ui/elements/modals";
import { Text } from "@/lib/ui/elements/Text";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import SearchIcon from "@/lib/ui/svgs/icons/SearchIcon";

import styles from "./SearchSelect.module.scss";

export interface SearchSelectProps extends ComponentProps<"div"> {

}

const SearchSelect = ({ options, title, keey, wrapperClass, selected, overlay = true, onSelect, onCancel, ...props }: any) => {
    const SEARCH_THRESHOLD = 10;
    const [allowedItems, setAllowedItems] = useState(options);
    const [searchQuery, setSearchQuery] = useState<any>("");
    const [searchResult, setSearchResult] = useState<any>(null);

    const handleSearch = (e: any, q?: string) => {
        const query = q ? q : e.target.value;
        setSearchQuery(query);
        setAllowedItems(options?.filter((option: any) => {
            return option?.id.includes(query.toLowerCase());
        }));
    };

    const handlePick = (checked: boolean, value: any) => {
        if (onSelect) {
            onSelect({
                checked: checked,
                key: keey,
                value: value,
            });
        } else {
            console.log("------ handlePick ------", checked, keey, value);
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        setAllowedItems(options);
    };

    const handleClose = () => {
        onCancel(keey);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        handleSearch(null, searchQuery);
    };

    return (
        <Modal overlay={overlay} onClose={handleClose} className={styles.container}>
            <ModalHeader titleText={title} className={styles.header}>
                <button className={styles.close_btn} onClick={handleClose} autoFocus>
                    <CrossIcon />
                </button>
            </ModalHeader>
            {
                options.length > SEARCH_THRESHOLD ? (
                    <form className={styles.search_section} onSubmit={handleSubmit}>
                        <input type="text" className={styles.search_input} placeholder="Search..." onInput={handleSearch} value={searchQuery} />
                        {
                            searchQuery ? (
                                <button type="reset" className={styles.reset_btn} onClick={clearSearch}>
                                    <CrossIcon className={styles.cross_icon} />
                                </button>
                            ) : null
                        }
                        <button type="submit" className={styles.go_btn} onClick={handleSubmit}>
                            <SearchIcon className={styles.search_icon} />
                        </button>
                    </form>
                ) : null
            }
            <div className={styles.list_section}>
                <ul className={styles.list}>
                    {
                        allowedItems?.map((item: any, index: number) => (
                            <li className={styles.list_item} key={index}>
                                <InputItem inline>
                                    <Radio id={item.id} name={keey} checked={selected === item.id} onChange={(e: any) => handlePick(e.target.checked, item.id)} />
                                    <Text<"label"> as="label" inline normal htmlFor={item.id}>{item.label}</Text>
                                </InputItem>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Modal>
    );
};

export default SearchSelect;

"use client";

import React, { ComponentProps, useState } from "react";

import { Dropdown } from "@/lib/ui/elements/dropdowns";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs";
import { MenuItem } from "@/lib/ui/elements/menu";
import { Options } from "@/lib/ui/elements/options";
import { CheckMarkIcon, CrossIcon, ExpandSolidIcon } from "@/lib/ui/svgs/icons";

import styles from "./Select.module.scss";

export interface SelectProps extends ComponentProps<"select"> {
    label?: string;
    options: any[];
    showDopdown?: boolean;
    labelKey?: string;
    variant?: "combobox" | "select";
    clearable?: boolean;
    searchable?: boolean;
    placeholder?: string;
}

const Select = ({
    variant = "select",
    label, options, showDopdown, labelKey = "label", clearable, searchable, multiple, placeholder,
    id, className,
    ...props
}: SelectProps) => {
    const [dd, setDd] = useState(false);
    const [query, setQuery] = useState("");

    const optionsToShow = query ? options?.filter((item: any) => item?.[labelKey]?.toLocaleLowerCase()?.includes(query?.toLocaleLowerCase())) : options;

    return (
        <Dropdown
            className={styles.wrapper}
            open={dd}
            onClose={() => {
                setDd(false);
            }}
            isCustomSelector
            dropdownClass={styles.dd_list}
            noOverlap
            dropdown={
                <Options role="listbox">
                    {
                        optionsToShow?.map((item: any) => (
                            <MenuItem
                                as="div"
                                key={item.value}
                                id={item.value}
                                icon={item.icon}
                                primary={item[labelKey]}
                                // badge={(multiple && selected) ? <CheckMarkIcon style={{ width: "1.8rem", height: "1.8rem" }} /> : undefined}
                                role="option"
                                data-value={item.value}
                                aria-selected={false}
                            />
                        ))
                    }
                </Options>
            }
        >
            <InputFieldWrapper className={className} onClick={() => setDd(true)}>
                <input
                    {...props as ComponentProps<"input">}
                    placeholder={placeholder}
                    id={id}
                    type="search"
                    className={styles.input}
                    autoComplete="off"
                    role="combobox"
                    aria-controls=""
                    aria-expanded={dd}
                    aria-haspopup={true}
                    value={query}
                    onInput={(e: any) => setQuery(e.target.value)}
                />
                {
                    query ? (
                        <button
                            className={styles.dd_btn}
                            onClick={(e) => {
                                e.stopPropagation();
                                setQuery("");
                            }}
                            type="button"
                            title="Clear"
                            aria-label="Clear Select"
                        >
                            <CrossIcon strokeWidth={2} className={styles.down_icon} />
                        </button>
                    ) : null
                }
                <button
                    aria-pressed={dd}
                    className={styles.dd_btn}
                    onClick={(e) => {
                        e.stopPropagation();
                        setDd(!dd);
                    }}
                    type="button"
                    title="Options Dropdown"
                    aria-label={dd ? "Open Options" : "Close Options"}
                >
                    <ExpandSolidIcon className={styles.down_icon} />
                </button>
            </InputFieldWrapper>
        </Dropdown>
    );
};

export default Select;

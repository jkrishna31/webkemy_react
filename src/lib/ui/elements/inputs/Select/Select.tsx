"use client";

import React, { ComponentProps, useState } from "react";

import { Dropdown } from "@/lib/ui/elements/dropdowns";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs";
import { CrossIcon, ExpandSolidIcon } from "@/lib/ui/svgs/icons";

import styles from "./Select.module.scss";

export interface SelectProps extends ComponentProps<"select"> {
    label?: string
    options: any[]
    showDopdown?: boolean
    labelKey?: string
    variant?: "combobox" | "select"
}

const Select = ({
    variant = "select",
    label, options, showDopdown, labelKey = "label",
    id, className,
    // onInput, onClick,
    ...props
}: SelectProps) => {
    const [dd, setDd] = useState(false);
    const [query, setQuery] = useState("");

    const optionsToShow = query ? options?.filter((item: any) => item?.[labelKey]?.toLocaleLowerCase()?.includes(query?.toLocaleLowerCase())) : options;

    if (query && optionsToShow.length && !dd) {
        setDd(true);
    }

    // if single input -> then close on click inside as well
    // if multiple input -> then prevent propagation on inside dd click

    // if combobox
    // show an add btn as well for input, so that can be added

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
                optionsToShow?.map((item: any) => (
                    <div className={styles.list_item} key={item.value}>
                        {item.icon}
                        <span className={styles.item}>{item[labelKey]}</span>
                    </div>
                ))
            }
        >
            <InputFieldWrapper className={className}>
                <input
                    {...props as ComponentProps<"input">}
                    type="text" className={styles.input} id={id}
                    autoComplete="off"
                    role="combobox"
                    aria-controls=""
                    aria-expanded={dd}
                    aria-haspopup={true}
                    value={query}
                    onClick={e => e.stopPropagation()}
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

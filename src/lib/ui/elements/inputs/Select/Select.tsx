"use client";

import React, { ComponentProps, ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { Keys } from "@/constants/keys.const";
import { Dropdown } from "@/lib/ui/elements/dropdowns";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs";
import { MenuItem } from "@/lib/ui/elements/menu";
import { Options } from "@/lib/ui/elements/options";
import { CheckMarkIcon, CrossIcon, ExpandSolidIcon } from "@/lib/ui/svgs/icons";
import { hasDOM } from "@/lib/utils/client.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Select.module.scss";

export interface Option {
    label?: ReactNode;
    value: string | number;
    group?: ReactNode;
    options?: Option[];
    icon?: ReactNode;
}

export interface SelectProps extends ComponentProps<"select"> {
    label?: string;
    options: Option[];
    showDopdown?: boolean;
    labelKey?: string;
    variant?: "combobox" | "select";
    clearable?: boolean;
    searchable?: boolean;
    placeholder?: string;
}

const Select = ({
    variant = "select",
    value, onChange,
    label, options, showDopdown, labelKey = "label", clearable, searchable, multiple, placeholder,
    id, className,
    ...props
}: SelectProps) => {
    const [dd, setDd] = useState(false);
    const [query, setQuery] = useState("");
    const [activeCandidate, setActiveCandidate] = useState<{ index: number; keyboard?: boolean; }>({ index: 0 });

    const listRef = useRef<HTMLDivElement>(null);

    const filteredOptions = useMemo(() => {
        return query
            ? options?.filter((item: any) => item?.[labelKey]?.toLocaleLowerCase()?.includes(query?.toLocaleLowerCase()))
            : options;
    }, [labelKey, options, query]);

    const handleSelect = (item?: Option, activeIndex?: number) => {
        const selectedOption = item ?? filteredOptions[activeIndex ?? activeCandidate.index];
        if (selectedOption) {
            if (multiple) {
                const newValues = (value as (string | number)[]).filter(item => item !== selectedOption.value);
                if (newValues.length === (value as (string | number[])).length) {
                    newValues.push(selectedOption.value);
                }
                onChange?.({ target: { value: newValues } } as any);
            } else {
                if (selectedOption) onChange?.({ target: { value: selectedOption.value } } as any);
            }
            if (!multiple) setDd(false);
        }
    };

    // todo: combobox (explicit option in dropdown to add the query)
    // todo: optgroup

    const handleKeyboardNavigation = (e: KeyboardEvent | number) => {
        // TODO: handle optgroup
        if (typeof e === "number") {
            setActiveCandidate({ index: e });
        } else {
            switch (e.key) {
                case Keys.ARROW_UP: {
                    e.preventDefault();
                    const newActiveIdx = (filteredOptions.length + (activeCandidate.index - 1)) % filteredOptions.length;
                    setActiveCandidate({ index: newActiveIdx, keyboard: true });
                    if (e.shiftKey && multiple) handleSelect(undefined, newActiveIdx);
                    break;
                }
                case Keys.ARROW_DOWN: {
                    e.preventDefault();
                    const newActiveIdx = (filteredOptions.length + (activeCandidate.index + 1)) % filteredOptions.length;
                    setActiveCandidate({ index: newActiveIdx, keyboard: true });
                    if (e.shiftKey && multiple) handleSelect(undefined, newActiveIdx);
                    break;
                }
                case Keys.ENTER:
                    handleSelect();
                    break;
            }
        }
    };

    useEffect(() => {
        if (hasDOM() && window.innerWidth >= 768) setActiveCandidate({ index: 0 });
        else setActiveCandidate({ index: -1 });
    }, [filteredOptions, dd]);

    useEffect(() => {
        if (!activeCandidate.keyboard) return;
        const listElem = listRef.current;
        if ((listElem && listElem.scrollHeight > listElem.clientHeight) || (listElem?.parentElement && listElem.parentElement.scrollHeight > listElem.parentElement.clientHeight)) {
            const activeElem = listElem.querySelector(".active_option");
            if (activeElem) {
                const containerRect = listElem.getBoundingClientRect();
                const activeElemRect = activeElem.getBoundingClientRect();
                const scrollBy = activeElemRect.top - containerRect.top + listElem.scrollTop - (listElem.parentElement?.clientHeight ?? 0) / 2 + activeElemRect.height / 2;
                listElem.parentElement?.scrollTo({ top: scrollBy, behavior: "smooth" });
            }
        }
    }, [activeCandidate]);

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
                <Options role="listbox" onCandidateChange={handleKeyboardNavigation} ref={listRef}>
                    {
                        filteredOptions?.map((item, idx: number) => {
                            const isSelected = (multiple && Array.isArray(value)) ? value.includes(item.value) : value === item.value;
                            return (
                                <MenuItem<"div">
                                    as="div"
                                    key={item.value}
                                    id={item.value as string}
                                    icon={item.icon}
                                    primary={(item as any)[labelKey]}
                                    badge={(isSelected) ? (
                                        <CheckMarkIcon className={styles.mark} />
                                    ) : undefined}
                                    onClick={() => handleSelect(item)}
                                    role="option"
                                    aria-selected={isSelected}
                                    className={classes(styles.option, idx === activeCandidate.index && "active_option")}
                                    collapsible={false}
                                />
                            );
                        })
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

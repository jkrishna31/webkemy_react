"use client";

import React, { ComponentProps, ReactNode, useEffect, useMemo, useState } from "react";

import { Keys } from "@/constants/keys.const";
import { Dropdown } from "@/lib/ui/elements/dropdowns";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { MenuItem } from "@/lib/ui/elements/menu";
import { Options } from "@/lib/ui/elements/Options";
import CheckMarkIcon from "@/lib/ui/svgs/icons/CheckMarkIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import ExpandSolidIcon from "@/lib/ui/svgs/icons/ExpandSolidIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Select.module.scss";

export type Value = string | number | boolean;

export interface Option {
    label?: ReactNode;
    value: Value;
    group?: ReactNode;
    options?: Option[];
    icon?: ReactNode;
    disabled?: boolean;
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
    rootClassName?: string;
    styles?: {
        root?: React.CSSProperties;
    }
}

const Select = ({
    variant = "select",
    defaultValue, value, onChange,
    label, options, showDopdown, labelKey = "label", clearable, searchable, multiple, placeholder,
    id, className, rootClassName, styles: stylesFromProp,
    ...props
}: SelectProps) => {
    const [dd, setDd] = useState(false);
    const [query, setQuery] = useState("");
    const [highlighted, setHighlighted] = useState<{ index?: number, keyboard?: boolean } | undefined>();

    const filteredOptions = useMemo(() => {
        return query
            ? options?.filter((item: any) => item?.[labelKey]?.toLocaleLowerCase()?.includes(query?.toLocaleLowerCase()))
            : options;
    }, [labelKey, options, query]);

    const handleSelect = (item?: Option, activeIndex?: number) => {
        const selectedOption = item
            ?? (activeIndex ? filteredOptions[activeIndex] : null)
            ?? (highlighted?.index ? filteredOptions[highlighted.index] : null);
        if (selectedOption) {
            if (multiple) {
                const newValues = (value as Value[]).filter(item => item !== selectedOption.value);
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

    const handleKeyDown = (e: React.KeyboardEvent, highlightedIdx?: number) => {
        if (e.key === Keys.ARROW_DOWN || e.key === Keys.ARROW_UP) {
            if (e.shiftKey) {
                handleSelect(undefined, highlightedIdx);
            }
        } else if (e.key === Keys.ENTER) {
            handleSelect(undefined);
        }
    };

    // todo: variant combobox (+ Add "<query>")
    // todo: optgroup

    useEffect(() => {
        setHighlighted(undefined);
    }, [filteredOptions]);

    return (
        <Dropdown
            className={classes(styles.wrapper, rootClassName)}
            open={dd}
            onClose={() => {
                setDd(false);
            }}
            isCustomSelector
            dropdownClass={styles.dd_list}
            noOverlap
            dropdown={
                <Options
                    role="listbox"
                    highlighted={highlighted}
                    onHighlightedChange={setHighlighted}
                    onKeyDown={handleKeyDown}
                >
                    {
                        filteredOptions?.map((item, idx: number) => {
                            const isSelected = (multiple && Array.isArray(value)) ? value.includes(item.value) : value === item.value;
                            const isHighlighted = idx === highlighted?.index;
                            return (
                                <MenuItem<"div">
                                    as="div"
                                    key={String(item.value)}
                                    id={item.value as string}
                                    icon={item.icon}
                                    primary={(item as any)[labelKey]}
                                    badge={isSelected ? <CheckMarkIcon className={styles.mark} /> : undefined}
                                    onClick={() => handleSelect(item)}
                                    role="option"
                                    aria-selected={isSelected}
                                    disabled={item.disabled}
                                    aria-disabled={item.disabled}
                                    tabIndex={isHighlighted ? 0 : -1}
                                    className={classes(styles.option, isHighlighted && "active_option")}
                                    collapsible={false}
                                    data-highlighted={isHighlighted}
                                />
                            );
                        })
                    }
                    {/* TODO: + Add "<query>" */}
                </Options>
            }
            {...({ style: stylesFromProp?.root ?? {} })}
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

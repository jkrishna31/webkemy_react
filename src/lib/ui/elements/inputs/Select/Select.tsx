"use client";

import React, { ComponentProps, CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { Keys } from "@/constants/keys.const";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { Item } from "@/lib/ui/elements/Item";
import { ItemGroup } from "@/lib/ui/elements/ItemGroup";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Popover } from "@/lib/ui/elements/Popover";
import CheckMarkIcon from "@/lib/ui/svgs/icons/CheckMarkIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import ExpandSolidIcon from "@/lib/ui/svgs/icons/ExpandSolidIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Select.module.scss";

export type Value = string | number | boolean;

export type OptionBase = {
    label?: ReactNode;
    value: Value;
    icon?: ReactNode;
    disabled?: boolean;
}

export type IndexedOpitonBase = OptionBase & { _index?: number };

export type OptionGroup<T = OptionBase> = {
    key: string;
    group: ReactNode;
    options?: T[];
}

export type Option = (OptionGroup & Partial<OptionBase>) | (OptionBase & Partial<OptionGroup>);
type IndexedOption = (OptionGroup<IndexedOpitonBase> & Partial<IndexedOpitonBase>) | (IndexedOpitonBase & Partial<OptionGroup<IndexedOpitonBase>>);

export interface SelectProps extends ComponentProps<"select"> {
    label?: string;
    options: Option[];
    showDopdown?: boolean;
    labelKey?: string;
    variant?: "combobox" | "select";
    clearable?: boolean;
    searchable?: boolean;
    placeholder?: string;
    style?: CSSProperties;
}

const Select = ({
    variant = "select",
    defaultValue, value, onChange,
    label, options, showDopdown, labelKey = "label", clearable, searchable, multiple, placeholder,
    id, className, style,
    ...props
}: SelectProps) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [highlighted, setHighlighted] = useState<{ index?: number, keyboard?: boolean } | undefined>();

    const anchorRef = useRef<HTMLDivElement>(null);

    const filteredOptions = useMemo(() => {
        if (!query?.trim) return options as IndexedOption[];
        const _options: IndexedOption[] = [];
        let _index = 0;
        options.forEach(option => {
            if (option.group) {
                const __options: IndexedOpitonBase[] = [];
                option.options?.forEach(subOption => {
                    if ((subOption as any)[labelKey]?.toLocaleLowerCase()?.includes(query?.toLocaleLowerCase())) {
                        __options.push({ ...subOption, _index: _index++ });
                    }
                });
                if (__options.length) _options.push({ ...option, options: __options } as IndexedOption);
            } else {
                if ((option as any)[labelKey]?.toLocaleLowerCase()?.includes(query?.toLocaleLowerCase())) {
                    _options.push({ ...option, _index: _index++ });
                }
            }
        });
        return _options;
    }, [labelKey, options, query]);

    const getItemByIndex = (index: number) => {
        for (const option of filteredOptions) {
            if (option.group) {
                for (const subOption of (option.options ?? [])) {
                    if (subOption._index === index) return subOption;
                }
            } else if (option._index === index) return option;
        }
        return undefined;
    };

    const handleSelect = (item?: Option, activeIndex?: number) => {
        let selectedOption = item;
        const targetIndex = activeIndex ?? highlighted?.index;
        if (!selectedOption && targetIndex !== undefined) selectedOption = getItemByIndex(targetIndex);
        if (selectedOption && selectedOption.value) {
            if (multiple) {
                const newValues = (value as Value[]).filter(item => item !== selectedOption.value);
                if (newValues.length === (value as (string | number[])).length) {
                    newValues.push(selectedOption.value);
                }
                onChange?.({ target: { value: newValues } } as any);
            } else {
                if (selectedOption) onChange?.({ target: { value: selectedOption.value } } as any);
            }
            if (!multiple) setOpen(false);
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

    // TODO: variant combobox (+ Add "<query>")
    // TODO: opening/closing in accordance with focus
    // TODO: selected value display for single select

    useEffect(() => {
        setHighlighted(undefined);
    }, [filteredOptions]);

    const renderOptions = (_items?: IndexedOption[]) => {
        if (!_items?.length) return null;
        return (
            _items?.map((item) => {
                if (item.group) {
                    return (
                        <ItemGroup
                            group={item.group}
                            key={item.key}
                            headerClass={styles.group}
                        >
                            <div className={styles.group_options}>
                                {renderOptions(item.options)}
                            </div>
                        </ItemGroup>
                    );
                } else {
                    const isSelected = (multiple && Array.isArray(value)) ? value.includes(item.value) : value === item.value;
                    const isHighlighted = item._index === highlighted?.index;
                    return (
                        <Item<"div">
                            as="div"
                            key={String(item.value)}
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
                            data-highlight={isHighlighted}
                        />
                    );
                }
            })
        );
    };

    return (
        <>
            <InputFieldWrapper ref={anchorRef} className={className} onClick={() => setOpen(true)} style={style}>
                <input
                    {...props as ComponentProps<"input">}
                    placeholder={placeholder}
                    id={id}
                    type="search"
                    className={styles.input}
                    autoComplete="off"
                    role="combobox"
                    aria-controls=""
                    aria-expanded={open}
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
                    aria-pressed={open}
                    className={styles.dd_btn}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!open);
                    }}
                    type="button"
                    title="Options Dropdown"
                    aria-label={open ? "Open Options" : "Close Options"}
                >
                    <ExpandSolidIcon className={styles.down_icon} />
                </button>
            </InputFieldWrapper>
            {(open && !!anchorRef.current) && (
                <Popover
                    anchor={anchorRef.current}
                    onClose={() => setOpen(false)}
                    offset={6}
                    className={styles.dropdown}
                    trapFocus={false}
                >
                    <ItemList
                        role="listbox"
                        highlight={highlighted}
                        onHighlightChange={setHighlighted}
                        onKeyDown={handleKeyDown}
                        className={styles.options}
                    >
                        {renderOptions(filteredOptions)}
                    </ItemList>
                </Popover>
            )}
        </>

    );
};

export default Select;

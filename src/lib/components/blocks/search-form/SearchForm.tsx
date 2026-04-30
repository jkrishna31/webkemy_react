"use client";

import { ComponentProps, FormEvent, ReactNode } from "react";

import { Input } from "@/lib/components/elements/input";
import { InputItem } from "@/lib/components/elements/input-item";
import { Popover } from "@/lib/components/elements/popover";
import { useElementRef } from "@/lib/hooks/useElementRef";
import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import MicOnIcon from "@/lib/svgs/icons/MicOnIcon";
import SearchIcon from "@/lib/svgs/icons/SearchIcon";
import { classes } from "@/lib/utils/style";

import styles from "./SearchForm.module.scss";

export interface SearchFormProps extends ComponentProps<"form"> {
    onClose?: () => void;
    query?: string;
    onQueryChange?: (value: string) => void;
    allowClear?: boolean;
    allowAudio?: boolean;
    onMicClick?: (e: FormEvent<HTMLButtonElement>) => void;
    placeholder?: string;
    dropdown?: ReactNode;
}

export const SearchForm = ({
    placeholder = "Search (Ctrl+K)",
    dropdown,
    query,
    onQueryChange,
    onMicClick,
    onClose,
    onClick,
    allowAudio,
    allowClear = true,
    ref, className,
    ...restProps
}: SearchFormProps) => {
    const { element: anchor, ref: inputRef } = useElementRef<HTMLInputElement>();

    return (
        <form
            className={classes(styles.search_form, className)}
            role="search"
            {...restProps}
        >
            <InputItem.FieldWrapper
                ref={inputRef}
                className={classes(styles.input_wrapper)}
            >
                <Input
                    spellCheck="false"
                    id="query"
                    value={query}
                    onChange={e => onQueryChange?.(e.target.value)}
                    required
                    placeholder={placeholder}
                    autoComplete="off"
                    onClick={onClick as any}
                />
                {
                    allowClear ? (
                        <button
                            type="reset"
                            title="Clear"
                            className={classes(styles.btn, styles.reset_btn)}
                            aria-hidden={!query}
                            onClick={() => onQueryChange?.("")}
                        >
                            <CrossIcon />
                        </button>
                    ) : null
                }
                <button
                    type="submit"
                    className={classes(styles.btn, styles.search_btn)}
                    title="Search"
                >
                    <SearchIcon />
                </button>
            </InputItem.FieldWrapper>
            {!!(dropdown && anchor) && (
                <Popover
                    anchor={anchor}
                    placement="bottom"
                    alignment="right"
                    className={styles.sf_popover}
                    closeOnScroll
                    onClose={onClose}
                    trapFocus={false}
                    animation="slide"
                >
                    {dropdown}
                </Popover>
            )}
            {allowAudio ? (
                <button
                    type="button"
                    className={classes(styles.btn, styles.mic_btn)}
                    title="Mic"
                    onClick={onMicClick}
                >
                    <MicOnIcon />
                </button>
            ) : null}
        </form>
    );
};

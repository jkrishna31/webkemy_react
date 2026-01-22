"use client";

import { ComponentProps, FormEvent, ReactNode } from "react";

import { useElementRef } from "@/lib/hooks/useElementRef";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { Popover } from "@/lib/ui/elements/Popover";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import MicOnIcon from "@/lib/ui/svgs/icons/MicOnIcon";
import SearchIcon from "@/lib/ui/svgs/icons/SearchIcon";
import { classes } from "@/lib/utils/style.utils";

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

const SearchForm = ({
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
            <InputFieldWrapper
                ref={inputRef}
                className={classes(styles.input_wrapper)}
            >
                <GeneralInput
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
            </InputFieldWrapper>
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

export default SearchForm;

import { ComponentProps, FormEvent, useRef } from "react";

import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { Popover } from "@/lib/ui/elements/Popover";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import MicIcon from "@/lib/ui/svgs/icons/MicIcon";
import MicOnIcon from "@/lib/ui/svgs/icons/MicOnIcon";
import SearchIcon from "@/lib/ui/svgs/icons/SearchIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./SearchForm.module.scss";

export interface SearchFormProps extends ComponentProps<"form"> {
    onClose?: () => void;
}

const SearchForm = ({
    formClass, inputClass, wrapperClass,
    audio, placeholder = "Search (Ctrl+K)",
    searchDd,
    onMicClick, onClick,
    query, onQueryChange,
    allowClear = true, allowSearch = true,
    xPos, onClose, ref,
    ...props
}: any) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form className={classes(styles.search_form, formClass)} role="search" {...props}>
            <InputFieldWrapper ref={inputRef} className={classes(styles.sf_input_wrapper, wrapperClass)} onClick={onClick}>
                <GeneralInput
                    spellCheck="false" id="query"
                    onInput={(e: FormEvent<HTMLInputElement>) => onQueryChange?.((e.target as HTMLInputElement).value)}
                    required
                    placeholder={placeholder}
                    className={classes(inputClass)}
                    autoComplete="off"
                />
                {
                    allowClear ? (
                        <button type="reset" className={classes(styles.sf_btn, styles.sf_reset_btn)} hidden={!query} onClick={() => onQueryChange?.("")} title="Clear">
                            <CrossIcon />
                        </button>
                    ) : null
                }
                {
                    allowSearch ? (
                        <button type="submit" className={classes(styles.sf_btn, styles.sf_search_btn)} title="Search">
                            <SearchIcon />
                        </button>
                    ) : null
                }
            </InputFieldWrapper>
            {!!(searchDd && inputRef?.current) && (
                <Popover
                    anchor={inputRef.current}
                    placement="bottom"
                    alignment="right"
                    className={styles.sf_popover}
                    closeOnScroll
                    onClose={onClose}
                    trapFocus={false}
                    animation="slide"
                >
                    {searchDd}
                </Popover>
            )}
            {audio ? (
                <button
                    type="button"
                    className={classes(styles.sf_btn, styles.sf_mic_btn)}
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

import { ComponentProps, FormEvent, useRef } from "react";

import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { Popover } from "@/lib/ui/elements/Popover";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import MicIcon from "@/lib/ui/svgs/icons/MicIcon";
import SearchIcon from "@/lib/ui/svgs/icons/SearchIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./SearchForm.module.scss";

export interface SearchFormProps extends ComponentProps<"form"> {
    onClose?: () => void;
}

const SearchForm = ({
    formClass, inputClass, wrapperClass,
    audio, placeholder = "Search (Ctrl+K)...",
    searchDd,
    onMicClick, onClick,
    query, onQueryChange,
    allowClear = true, allowSearch = true,
    xPos, onClose, ref,
    ...props
}: any) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form className={classes(styles.form, formClass)} role="search" {...props}>
            <InputFieldWrapper ref={inputRef} className={classes(styles.wrapper, wrapperClass)} onClick={onClick}>
                <GeneralInput
                    spellCheck="false" id="query"
                    onInput={(e: FormEvent<HTMLInputElement>) => onQueryChange?.((e.target as HTMLInputElement).value)}
                    required
                    placeholder={placeholder}
                    className={classes(styles.input, inputClass)}
                    autoComplete="off"
                />
                {
                    allowClear ? (
                        <button type="reset" className={classes(styles.form_btn, styles.reset_btn)} hidden={!query} onClick={() => onQueryChange?.("")} title="Clear">
                            <CrossIcon className={styles.reset_icon} />
                        </button>
                    ) : null
                }
                {
                    allowSearch ? (
                        <button type="submit" className={classes(styles.form_btn, styles.search_btn)} title="Search">
                            <SearchIcon className={styles.search_icon} />
                        </button>
                    ) : null
                }
            </InputFieldWrapper>
            {!!(searchDd && inputRef?.current) && (
                <Popover
                    anchor={inputRef.current}
                    placement="bottom"
                    alignment="right"
                    className={styles.dropdown}
                    closeOnScroll
                    onClose={onClose}
                    trapFocus={false}
                >
                    {searchDd}
                </Popover>
            )}
            {audio ? (
                <button
                    type="button" className={classes(styles.form_btn, styles.mic_btn)} title="Mic"
                    onClick={onMicClick}
                >
                    <MicIcon className={styles.mic_icon} />
                </button>
            ) : null}
        </form>
    );
};

export default SearchForm;

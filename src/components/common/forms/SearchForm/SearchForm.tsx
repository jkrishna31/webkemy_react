import React, { ComponentProps, FormEvent } from "react";

import { Dropdown } from "@/lib/ui/elements/dropdowns";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import MicIcon from "@/lib/ui/svgs/icons/MicIcon";
import SearchIcon from "@/lib/ui/svgs/icons/SearchIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./SearchForm.module.scss";

export interface SearchFormProps extends ComponentProps<"div"> {

}

const SearchForm = ({
    formClass, inputClass, wrapperClass,
    audio, placeholder = "Search (Ctrl+K)...",
    searchDd,
    onMicClick, onClick,
    query, onQueryChange,
    allowClear = true, allowSearch = true,
    xPos,
    ...props
}: any) => {
    return (
        <form className={classes(styles.form, formClass)} role="search" {...props}>
            <Dropdown
                open={searchDd}
                className={styles.ddw}
                dropdownClass={styles.ddc}
                isCustomSelector
                dropdown={
                    searchDd
                }
                xPos={xPos}
            >
                <InputFieldWrapper className={classes(styles.wrapper, wrapperClass)} onClick={onClick}>
                    <GeneralInput
                        spellCheck="false" id="query"
                        onInput={(e: FormEvent<HTMLInputElement>) => onQueryChange?.((e.target as HTMLInputElement).value)}
                        required
                        placeholder={placeholder}
                        className={classes(styles.input, inputClass)}
                        autoComplete="off"
                    // aria-label={placeholder}
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
            </Dropdown>
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

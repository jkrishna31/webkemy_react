"use client";

import React, { ComponentProps, useRef } from "react";

import { useKey } from "@/lib/hooks";
import { CrossIcon, PlusIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import styles from "./TagsInput.module.scss";

export interface TagsInputProps extends ComponentProps<"input"> {
    tags: any[]
    setTags?: any
    onRemove?: any
    onAdd?: any
    value?: string
    inputLabel?: string
    showKeys?: boolean
}

const TagsInput = ({
    tags, setTags, onRemove, onAdd, value = "", showKeys = true, onInput, onChange,
    className, children,
    ...props
}: TagsInputProps) => {
    const ref = useRef<HTMLInputElement>(null);

    const handleRemoveItem = (key: string) => {
        if (onRemove) {
            onRemove(key);
            return;
        }
        const newList = [...tags.filter((item: string) => item != key)];
        setTags(newList);
    };

    const handleKeyAdd = () => {
        if (onAdd) {
            onAdd();
        } else {
            if (!value) return;
            setTags((currKeys: string[]) => [...currKeys, value]);
        }
        onInput?.({ target: { value: "" } } as any);
        onChange?.({ target: { value: "" } } as any);
        if (ref.current) {
            ref.current.focus();
        }
    };

    useKey(() => {
        handleKeyAdd();
    }, ["Enter"], "keypress");

    const renderKeys = () => {
        if (!showKeys) return null;
        if (tags.length) {
            return (
                <ul className={styles.keys_list}>
                    {
                        tags.map((key: string, idx: number) => (
                            <li key={key + idx} className={styles.key_item}>
                                <span className={styles.key}>{key}</span>
                                <button type="button" className={styles.del_btn} onClick={() => handleRemoveItem(key)} title="Remove Key">
                                    <CrossIcon className={styles.cross_icon} />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            );
        }
        return null;
    };

    return (
        <>
            <div className={classes(styles.input_wrapper, className)}>
                <input
                    type="text" className={styles.input_field}
                    value={value}
                    ref={ref}
                    autoComplete="false"
                    onInput={onInput}
                    onChange={onChange}
                    {...props}
                />
                <button
                    type="button" className={styles.add_key_btn}
                    title="Add"
                    aria-label="Add"
                    onClick={handleKeyAdd}
                >
                    <PlusIcon className={styles.plus_icon} />
                </button>
            </div>
            {renderKeys()}
        </>
    );
};

export default TagsInput;

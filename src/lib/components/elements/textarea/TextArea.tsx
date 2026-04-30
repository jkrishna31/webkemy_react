"use client";

import { ComponentProps, FormEvent, useCallback, useEffect, useRef } from "react";

import { mergeRefs } from "@/lib/utils/react";
import { classes } from "@/lib/utils/style";

import styles from "./TextArea.module.scss";

const getNumber = (val: string) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
};

export interface TextAreaProps extends ComponentProps<"textarea"> {
    focused?: boolean;
    autoResize?: boolean;
    onChange?: (event: FormEvent<HTMLTextAreaElement>) => void;
    onInput?: (event: FormEvent<HTMLTextAreaElement>) => void;
    multiline?: boolean;
    maxRows?: number;
}

export const TextArea = ({
    focused, className, autoResize = true, id, onInput, onChange, ref, value, multiline = true, rows, maxRows,
    ...props
}: TextAreaProps) => {
    const _ref = useRef<HTMLTextAreaElement>(null);

    const resize = useCallback(() => {
        // if (CSS.supports && CSS.supports("field-sizing", "content")) return; // and it is set
        // todo: handles content-sizing: content-box (subtract padding and border width from scrollHeight)
        const elem = _ref.current;
        if (elem && autoResize) {
            elem.style.setProperty("height", "auto");
            const currStyles = window.getComputedStyle(elem);
            const borderSize = getNumber(currStyles.borderTopWidth) + getNumber(currStyles.borderBottomWidth);
            elem.style.setProperty("height", `${elem.scrollHeight + borderSize}px`);
        }
    }, [autoResize]);

    const handleInput = useCallback((e: FormEvent<HTMLTextAreaElement>) => {
        let val = (e.target as HTMLTextAreaElement).value;
        if (!multiline && val.charAt(val.length - 1) === "\n") {
            val = val.slice(0, -1);
            (e.target as HTMLTextAreaElement).value = val;
        }
        onInput?.(e);
        onChange?.(e);
    }, [multiline, onInput, onChange]);

    useEffect(() => {
        if (!_ref.current) return;
        const ro = new ResizeObserver(resize);
        ro.observe(_ref.current);
        return () => ro.disconnect();
    }, [resize]);

    useEffect(() => {
        if (!_ref.current) return;
        _ref.current.value = (value ?? "") as string;
        resize();
    }, [resize, value]);

    useEffect(() => {
        if (!_ref.current) return;
        if (focused) _ref.current.focus();
    }, [focused]);

    return (
        <textarea
            name={id}
            id={id}
            onInput={handleInput}
            className={classes(styles.input, className)}
            ref={mergeRefs(_ref, ref)}
            autoComplete="off"
            rows={multiline ? rows : 1}
            {...props}
        >
        </textarea>
    );
};

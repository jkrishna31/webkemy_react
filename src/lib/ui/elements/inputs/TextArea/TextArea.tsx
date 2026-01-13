"use client";

import { ComponentProps, FormEvent, useCallback, useEffect, useRef } from "react";

import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./TextArea.module.scss";

export interface TextAreaProps extends ComponentProps<"textarea"> {
    focused?: boolean;
    autoResize?: boolean;
    onInput?: (event: FormEvent<HTMLTextAreaElement>) => void;
    multiline?: boolean;
    maxRows?: number;
}

const TextArea = ({
    focused, className, autoResize = true, id, onInput, ref, value, multiline = true, rows, maxRows,
    ...props
}: TextAreaProps) => {
    const _ref = useRef<HTMLTextAreaElement>(null);

    const resize = useCallback(() => {
        // if (CSS.supports && CSS.supports("field-sizing", "content")) return;
        // handles content-sizing: content-box (subtract padding and border width from scrollHeight)
        if (_ref.current && autoResize) {
            _ref.current.style.height = "auto";
            _ref.current.style.height = `${_ref.current.scrollHeight}px`;
        }
    }, [autoResize]);

    const handleInput = useCallback((e: FormEvent<HTMLTextAreaElement>) => {
        let val = (e.target as HTMLTextAreaElement).value;
        if (!multiline && val.charAt(val.length - 1) === "\n") {
            val = val.slice(0, -1);
            (e.target as HTMLTextAreaElement).value = val;
        }
        resize();
        onInput?.(e);
    }, [multiline, resize, onInput]);

    useEffect(() => {
        if (_ref.current) _ref.current.value = (value ?? "") as string;
    }, [value]);

    useEffect(resize, [resize, value]);

    useEffect(() => {
        if (_ref.current) {
            if (focused) _ref.current.focus();
            resize();
        }
    }, [focused, resize]);

    return (
        <textarea
            name={id}
            id={id}
            // value={value}
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

export default TextArea;

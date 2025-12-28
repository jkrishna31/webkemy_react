"use client";

import React, { ComponentProps, FormEvent, useCallback, useEffect, useImperativeHandle, useRef } from "react";

import { classes } from "@/lib/utils/style.utils";

import styles from "./TextArea.module.scss";

export interface TextAreaProps extends ComponentProps<"textarea"> {
    focused?: boolean;
    autoResize?: boolean;
    onInput?: any;
    multiline?: boolean;
    maxRows?: number;
}

const TextArea = ({
    focused, className, autoResize = true, id, onInput, ref, value, multiline = true, rows, maxRows,
    ...props
}: TextAreaProps) => {
    const taRef = useRef<HTMLTextAreaElement>(null);

    const resize = useCallback((elem: HTMLTextAreaElement) => {
        // if (CSS.supports && CSS.supports("field-sizing", "content")) return;
        // handles content-sizing: content-box (subtract padding and border width from scrollHeight)
        if (taRef.current && autoResize) {
            taRef.current.style.height = "auto";
            taRef.current.style.height = `${elem.scrollHeight}px`;
        }
    }, [autoResize]);

    const handleKeyDown = (e: FormEvent<HTMLTextAreaElement>) => { };

    const handleInput = useCallback((e: FormEvent<HTMLTextAreaElement>) => {
        let val = (e.target as HTMLTextAreaElement).value;  // or use taRef.current?.value
        if (!multiline && val.charAt(val.length - 1) === "\n") {
            val = val.slice(0, -1);
            (e.target as HTMLTextAreaElement).value = val;
        }
        resize(e.target as HTMLTextAreaElement);
        onInput?.(e, val);
    }, [multiline, resize, onInput]);

    useEffect(() => {
        if (taRef.current) {
            resize(taRef.current);
        }
    }, [resize, value]);

    useEffect(() => {
        if (taRef.current) {
            if (focused) {
                taRef.current.focus();
            }
            resize(taRef.current);
        }
    }, [focused, resize]);

    useImperativeHandle(ref, () => taRef.current!);

    return (
        <textarea
            name={id} id={id}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            className={classes(styles.input, className)}
            ref={taRef}
            autoComplete="off"
            value={value}
            rows={multiline ? rows : 1}
            {...props}
        >
        </textarea>
    );
};

export default TextArea;

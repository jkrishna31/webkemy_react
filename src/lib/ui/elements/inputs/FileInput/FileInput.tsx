"use client";

import React, { ComponentProps, useEffect, useRef } from "react";

import { AddFileIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

import styles from "./FileInput.module.scss";

export interface IFileInput extends ComponentProps<"input"> {
    id?: string;
    placeholder?: string;
    files: FileList | null;
    minimal?: boolean;
}

const FileInput = ({
    id,
    files,
    onInput,
    placeholder = "or Select/Drop file",
    multiple = false,
    minimal,
    className,
    children,
    ...props
}: IFileInput) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handlePaste = (e: any) => {
        // check the mime type
        // check if the type is allowed
        // then add, otherwise ignore
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        onInput?.({ target: { files: e.dataTransfer.files } } as any);
    };

    useEffect(() => {
        (inputRef.current as HTMLInputElement).files = files ?? null;
    }, [files]);

    return (
        <div
            className={classes(styles.input_wrapper, !minimal && styles.input_wrapper_full, className)}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
        >
            <input
                type="file"
                id={id}
                className={styles.input_hidden}
                onInput={(e: any) => onInput?.(e)}
                multiple={multiple}
                ref={inputRef}
                {...props}
            />
            <label htmlFor={id} className={classes(styles.label, styles.file_input)}>
                {children || (
                    <>
                        <AddFileIcon className={styles.add_file_icon} />
                        {placeholder}
                    </>
                )}
            </label>
        </div>
    );
};

export default FileInput;

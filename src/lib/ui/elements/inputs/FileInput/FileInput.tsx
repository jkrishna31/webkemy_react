"use client";

import Image from "next/image";
import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";

import AddFileIcon from "@/lib/ui/svgs/icons/AddFileIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./FileInput.module.scss";

export interface FileMeta {
    id?: string;
    src: string;
    type?: string;
    name?: string;
}

export interface FileInputProps extends ComponentProps<"input"> {
    id?: string;
    placeholder?: string;
    files?: FileList | FileMeta[];
    minimal?: boolean;
    icon?: ReactNode;
    showPreview?: boolean;
    onFilesChange?: (files?: FileList) => void;
}

const FileInput = ({
    id,
    files,
    onInput,
    placeholder = "or Select/Drop file",
    multiple = false,
    minimal,
    accept,
    className,
    children,
    icon,
    showPreview,
    onFilesChange,
    ...props
}: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [draggingOver, setDraggingOver] = useState(false);

    const handlePaste = (e: React.ClipboardEvent) => {
        const _files = e.clipboardData.files;
        // todo: check if the type is allowed
        if (_files.length) {
            onInput?.({ target: { files: files } } as any);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDraggingOver(true);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        onInput?.({ target: { files: e.dataTransfer.files } } as any);
        setDraggingOver(false);
    };

    useEffect(() => {
        if (files instanceof FileList) (inputRef.current as HTMLInputElement).files = files ?? null;
    }, [files]);

    // todo: if multiple=false, them show the select file inside itself (if file then create src)

    return (
        <div
            className={classes(styles.input_wrapper, !minimal && styles.input_wrapper_full, draggingOver && styles.drag_over, className)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={() => setDraggingOver(false)}
            onPaste={handlePaste}
        >
            {(!multiple && files?.[0]) && (
                <Image
                    src={files instanceof FileList ? URL.createObjectURL(files[0]) : files[0].src}
                    alt={files[0].name ?? ""}
                    width={40}
                    height={40}
                    unoptimized
                />
            )}
            <input
                ref={inputRef}
                type="file"
                id={id}
                className={styles.input_hidden}
                onInput={onInput}
                multiple={multiple}
                accept={accept}
                {...props}
            />
            <label htmlFor={id} className={classes(styles.label, styles.file_input)}>
                {children || (
                    <>
                        {icon ?? <AddFileIcon />}
                        {placeholder}
                    </>
                )}
            </label>
        </div>
    );
};

export default FileInput;

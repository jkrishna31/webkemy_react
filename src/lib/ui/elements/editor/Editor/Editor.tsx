"use client";

import { ComponentProps, ReactNode } from "react";

import { Block } from "@/lib/ui/elements/editor";
import docStyles from "@/lib/ui/styles/classes/doc.module.scss";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Editor.module.scss";

export interface EditorProps extends ComponentProps<"div"> {
    blocks?: any[];
    rootClass?: string;
    className?: string;
    children?: ReactNode;
}

const Editor = ({
    ref,
    blocks,
    rootClass, className, children,
    ...props
}: EditorProps) => {
    return (
        <div
            className={classes(styles.wrapper, rootClass)}
        >
            <div
                className={classes(docStyles.doc, styles.editor, className)}
                suppressContentEditableWarning
                ref={ref}
                contentEditable={true}
                spellCheck={false}
                translate="no"
                {...props}
            >
                {
                    blocks?.length ? (
                        blocks?.map((block: any) => {
                            return (
                                <Block
                                    key={block.id}
                                    data={block}
                                    edit
                                    {...block.props}
                                />
                            );
                        })
                    ) : null
                }
            </div>
            {children}
        </div>
    );
};

export default Editor;

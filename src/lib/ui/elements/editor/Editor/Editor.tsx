"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { editorBlocks } from "@/constants/editor.const";
import { RenderBlock } from "@/lib/ui/elements/editor/blockRenderers";
import docStyles from "@/lib/ui/styles/classes/doc.module.scss";
import { getUniqueId } from "@/lib/utils/crypto.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Editor.module.scss";

const getPlaceholder = (type: any) => {
    if (type === editorBlocks.PARA) {
        return "Enter \"/\" for blocks...";
    } else if (type === editorBlocks.HEADING) {
        return "Heading...";
    } else if (type === editorBlocks.SUB_HEADING) {
        return "Subheading...";
    } else {
        return "";
    }
};

export interface EditorProps {
    rootClass?: string;
    className?: string;
    children?: ReactNode;
}

const Editor = ({
    rootClass, className, children,
    ...props
}: EditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);

    const [postBlocks, setPostBlocks] = useState<any[]>([]);
    const [activeBlock, setActiveBlock] = useState<any>(null);
    const [activeBlockElem, setActiveBlockElem] = useState<any>(null);

    useEffect(() => {
        if (postBlocks.length === 0) {
            setPostBlocks([{
                type: editorBlocks.PARA,
                id: getUniqueId(),
                props: {
                    "data-placeholder": getPlaceholder(editorBlocks.PARA),
                },
            }]);
        }
    }, [postBlocks]);

    const resetToolbar = useCallback(() => {
        // setBoxConfig({
        //     coords: ["revert", "revert", "revert", "revert"],
        //     maxWidth: Infinity,
        //     active: false
        // });
        // setToolsState({});
    }, []);

    const handleBlockActions = (op: "insert", blockId: string, type: any, dir: "up" | "down") => {
        setPostBlocks(currPostBlocks => {
            const newPostBlocks: any[] = [];
            currPostBlocks.forEach(block => {
                if (block.id === blockId && dir === "up") {
                    const newBlock = {
                        type: type,
                        id: getUniqueId(),
                        props: {
                            "data-placeholder": getPlaceholder(type),
                        }
                    };
                    setActiveBlock(newBlock);
                    newPostBlocks.push(newBlock);
                }
                newPostBlocks.push({
                    ...block,
                    props: null, // placeholder should be only null if 
                });
                if (block.id === blockId && dir === "down") {
                    const newBlock = {
                        type: type,
                        id: getUniqueId(),
                        props: {
                            "data-placeholder": getPlaceholder(type),
                        }
                    };
                    setActiveBlock(newBlock);
                    newPostBlocks.push(newBlock);
                }
            });
            console.log("+++++ new post blocks +++++", newPostBlocks);
            return newPostBlocks;
        });
    };

    const deleteBlock = (blockId: string,) => {
        setPostBlocks(currPostBlocks => {
            const newPostBlocks: any[] = [];
            let prev: string, useNext: boolean;
            currPostBlocks.forEach(block => {
                if (useNext) {
                    setActiveBlock(block);
                    useNext = false;
                }
                if (block.id !== blockId) {
                    newPostBlocks.push({
                        ...block,
                    });
                } else {
                    if (prev) {
                        setActiveBlock(prev);
                    } else {
                        useNext = true;
                    }
                }
                prev = block;
            });
            return newPostBlocks;
        });
    };

    const cleanSelection = useCallback((selection: Selection) => {
        const removeRanges = [];
        for (let i = 0; i < selection.rangeCount; i++) {
            const rangeItem = selection.getRangeAt(i);
            const insideEditor = editorRef.current?.contains(rangeItem.startContainer);
            if (!insideEditor) {
                removeRanges.push(rangeItem);
            }
            // console.log("------ range item ------", rangeItem);
        }
        for (let i = 0; i < removeRanges.length; i++) {
            selection.removeRange(removeRanges[i]);
        }
    }, []);

    const updateActiveBlock = useCallback((blockId: string) => {
        postBlocks.forEach(block => {
            if (block.id === blockId) {
                setActiveBlock(block);
            }
        });
    }, [postBlocks]);

    const handleClick = useCallback((e: any) => {
        const selection = document.getSelection();
        const [ab, fb] = selectionDetails(selection);
        const activeBlockId = fb?.getAttribute("id");
        if (activeBlockId) {
            updateActiveBlock(activeBlockId);
        }
    }, [updateActiveBlock]);

    const selectionDetails = (selection: Selection | null) => {
        let anchorBlock, focusBlock;
        if (selection?.anchorNode?.nodeType === 3) {
            anchorBlock = selection?.anchorNode?.parentElement?.closest("[data-block]");
        } else {
            anchorBlock = (selection?.anchorNode as HTMLElement)?.closest("[data-block]");
        }
        if (selection?.focusNode?.nodeType === 3) {
            focusBlock = selection?.focusNode?.parentElement?.closest("[data-block]");
        } else {
            focusBlock = (selection?.focusNode as HTMLElement)?.closest("[data-block]");
        }
        return [anchorBlock, focusBlock];
    };

    const handleKeyDown = useCallback((e: any) => {
        console.log("=== 🥶 key down ===", e, e.key, e.charCode, e.keyCode, e.ctrlKey, e.metaKey, e.altKey, e.shiftKey);

        if (e.key === "Enter") {
            e.preventDefault();
            const selection = document.getSelection();
            const [ab, fb] = selectionDetails(selection);

            // check for selection
            // if selection delete that and move the rest of the content on right side to new block

            const activeBlockId = fb?.getAttribute("id");
            if (activeBlockId) {
                handleBlockActions(
                    "insert",
                    activeBlockId,
                    editorBlocks.PARA,
                    e.shiftKey ? "up" : "down",
                );
            }

            // move the cursor to the start of the new block
            // handle the 
        } else if (e.key === "Backspace") {
            if (!activeBlock?.children?.length) {
                e.preventDefault();
                const selection = document.getSelection();
                const [ab, fb] = selectionDetails(selection);
                const activeBlockId = fb?.getAttribute("id");
                if (activeBlockId) {
                    deleteBlock(activeBlockId);
                }
            }
            // check for selection
            // if selection then delete them
            // if img or other special block delete them

            // otherwise ---
            // backspace (delete char on left)
            // delete (delete char on right)
            // ctrl + delete (delete word on right)
            // ctrl + backspace (delete word on left)
        } else if (e.key === "Delete") {

        }

        // DETECT THE TYPE ***
        // --- handle specials
        // on enter - 
        // 

        // PLACEHOLDER FIX ***
        // --- if there is only one p elem then show placeholder even if not hover
        // --- if multiple elem's then show placeholder only on focus

        // BASIC TEXT INPUT ***
        // --- 

        // BASIC SELECTION IN ***
        // --- 

        // TEXT SELECTION CONFLICT ***
        // --- resolved by knowing which number children it is in

        // ALL THE WAYS THE CONTENT CAN BE EDITED
        // +++ keys entering
        // +++ pasting (parse blocks, if parsable)
        // +++ cut
        // +++ backspace, select and delete

        // enter - if newline not supported, a new block (by default para)
        // ctrl+enter - next block
        // ctrl+shift+enter - previous block
        // if enter in a block between content then put the rest of the content on new block

        if (e.code === "Backspace") {
            // e.preventDefault();
            // e.stopPropagation();
        }
    }, [activeBlock?.children?.length]);

    const handleKeyUp = useCallback((e: any) => {
        // console.log("=== 🥶 key up ===", e);
        /*
            * on backspace key (review condition when deleting or modifying in any other way)
                = if already empty (delete the block and move back to the prev block)
                = if it is the only block then prevent deletion
            
            * on change
                + if inserted
                    - 
                + if removed/deleted
                + if selection
                + if shortcuts activated

            * if inside editor & not matching any allowed key prevent default and bubble up to window/browser

            *** APPROACHES FOR EDITOR CHANGES
                = hijack all keys/events (but changes can be from popup selections as well) - MAYBE
                    + cut/copy/paste
                    + 
                    + keys - back/del
                    + shortcuts - bold, italic, underline
                    + ctrl+a (select the current block); ctrl+a again (select all blocks)
                = listens to changes in dom changes (but issue with not allowed formatting) - NO
                + can use the combination of both
        */
    }, []);

    const handleFocus = useCallback((e: any) => {
        // console.log("=== 👀 focus ===", e, e.target);
        // const selection = document.getSelection();
        // if (boxConfig.active && selection?.isCollapsed) {
        //     resetToolbar();
        // }
        // remove br tag if e.target.innerHTML
    }, []);

    const handleBlur = useCallback((e: any) => {
        // console.log("=== 👀 blur ===", e);
    }, []);

    const handleBeforeInput = useCallback((e: any) => {
        console.log("=== 😎 before input ===", e.target);
    }, []);

    const handleInput = useCallback((e: any) => {
        console.log("=== 💥 on input ===", e.target);
    }, []);

    const handleMouseDown = useCallback((e: any) => {
        // console.log("=== 💫 mouse down ===",);
    }, []);

    const handleMouseLeave = useCallback((e: any) => {
        // console.log("=== 💫 mouse leave ===",);
    }, []);

    const handleMouseMove = useCallback((e: any) => {
        // console.log("=== 💫 mouse move ===",);
        // document.elementFromPoint(clientX, clientY)
    }, []);

    const handleMouseWheel = useCallback((e: any) => {
        // console.log("=== 💫 mouse wheel ===",);
    }, []);

    const handleTouchStart = useCallback((e: any) => {
        // console.log("=== 💫 touch start ===",);
    }, []);

    const handleTouchMove = useCallback((e: any) => {
        // console.log("=== 💫 touch move ===",);
    }, []);

    const handleCopy = useCallback((e: any) => {
        // console.log("=== 📋 copy ===", e);
        const parser = new DOMParser();
        const doc = parser.parseFromString("", "text/html");
        console.log("+++ doc +++", doc);
    }, []);

    const handleCut = useCallback((e: any) => {
        // console.log("=== 📋 cut ===", e);
    }, []);

    const handlePaste = useCallback((e: any) => {
        // parse the html (if possible) otherwise parse as plaintext
        console.log("=== 📋 paste ===", e.clipboardData.types, e.clipboardData.getData("text/html"));
    }, []);

    const handleContextMenu = useCallback((e: any) => {
        console.log("=== 📕 context menu ===", e);
    }, []);

    const handleCompositionStart = useCallback((e: any) => {
        console.log("=== 🔷 comp start ===", e);
    }, []);

    const handleCompositionUpdate = useCallback((e: any) => {
        console.log("=== 🔷 comp update ===", e);
    }, []);

    const handleCompositionEnd = useCallback((e: any) => {
        console.log("=== 🔷 comp end ===", e);
    }, []);

    const handleDrag = useCallback((e: any) => {
        e.preventDefault();
        resetToolbar();
    }, [resetToolbar]);

    const handleDragOver = useCallback((e: any) => {
        e.preventDefault();
    }, []);

    const handleDrop = useCallback((e: any) => {
        e.preventDefault();
    }, []);

    return (
        <div className={classes(styles.wrapper, rootClass)}>
            <div
                className={classes(docStyles.doc, styles.editor, className)}
                suppressContentEditableWarning
                ref={editorRef}
                contentEditable={true}
                spellCheck={false}
                translate="no"
                onBlur={handleBlur}
                onFocus={handleFocus}
                onContextMenu={handleContextMenu}
                onBeforeInput={handleBeforeInput}
                onCopy={handleCopy}
                onCut={handleCut}
                onPaste={handlePaste}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onDrag={handleDrag}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                onCompositionUpdate={handleCompositionUpdate}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onWheel={handleMouseWheel}
                onTouchMove={handleTouchMove}
                onTouchStart={handleTouchStart}
                onClick={handleClick}
            >
                {
                    postBlocks.length ? (
                        postBlocks?.map((block: any) => {
                            return (
                                <RenderBlock
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

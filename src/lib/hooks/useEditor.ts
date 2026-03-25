import { RefObject, useCallback, useEffect, useEffectEvent, useLayoutEffect, useState } from "react";

import { editorBlocks, inputTypes } from "@/constants/editor.const";
import { Keys } from "@/constants/keys.const";
import { Color } from "@/lib/types/general.types";
import { getUniqueId } from "@/lib/utils/crypto";
import { deepClone } from "@/lib/utils/object";

export type CaretActionDir = "backward" | "forward";

export interface BlockChild {
  id: string;
  type: "text" | string;
  text: string;
  children?: BlockChild[];
}

export interface BlockConfig {
  textAlign?: "left" | "right" | "center";
  direction?: "lrt" | "rtl";
}
export interface EditorBlockBase {
  id: string;
  type: keyof typeof editorBlocks;
  config?: BlockConfig;
}

export interface TextBlock {
  children?: BlockChild[];
}

export interface ImageBlock {
  sources?: { src: string; width: string; }[];
  caption?: BlockChild[];
  alt?: string;
  autoSize?: "width" | "height";
}

export interface CodeBlock {
  // codes - array of string; or single string with newline
  // config
}

export interface TableBlock {
  // rows & cols
}

export interface ListBlockBase {
  // will have child
}

export interface OListBlock {
  startIndex?: number;
}

export interface UListBlock {
}

export interface CListBlock {
  // will have child but each child have whether the item is checked or not
}

export interface DividerBlock {
}

export interface CollapsibleBlock {
  summary?: BlockChild[];
  details?: BlockChild[];
}

export interface QuoteBlock {
  content: BlockChild[];
}

export interface BoxBlock {
  title?: string;
  content?: BlockChild[];
  color?: Color;
}

export interface EmbedBlock {
  link: string;
}

export interface EditorOptions {

}

/**
 * BLOCK OPERATIONS =======================================
 * + add block [before, after, start, end]
 * + remove block [active]
 * + move block
 * + normalize block
 * 
 * 
 * FORMATTERS =============================================
 * - inline elements
 *    + bold, italic, strike-through, underline, sub, sup, highlight
 *    + link
 *        = target [_blank, blank, top, ...]
 *        = src
 *        = other attrs... [in ellipsis]
 *    + quote
 *    + img
 * - inline formatters
 *    + color[c], bg-color[bgc]
 *    + font-size[fs], font-weight[fw], font-family[ff], line-height[lh]
 *    + letter-spacing[ls], word-spacing[ws], letter-case[ls]
 *    + mention, hashtag; emoji
 * 
 *    + text-align[ta], dir[dir]
 * 
 * - indent
 *    + inc/dec
 * - text align
 * - dir/bdi/bdo [rtl, ltr, auto]
 * 
 * 
 * HISOTYR MANAGEMENT =====================================
 * + on editor modification save the block being changed and later use the block id to revert the change
 * + for continuous typing either use delay interval or space as separation for history snapshot
 * 
 * 
 * ALGOS ==================================================
 * - finding the start and end block and inline mutation of the selection
 *    + start & end block is same, means start & end mutation is in same, but still can at different depth
 *        > start & end mutation can be at any depth
 *            = need to find the common ancestor [it can be the block itself]
 *    + start and end block is different, means start & end mutation is also different
 * - sort the start & end block before operations
 * 
 * 
 * - while removing a inline mutation, if it ends up no mutation then convert it to text type mutation, so that no need to merge it to prev/next child item
 * - how to know all the inline mutations applied to the current cursor
 * 
 * 
 * ALL POSSIBLE SITUATIONS ===============================
 * + core --------------
 *    = insert text at the cursor position []
 *    = delete content at the cursor position
 *    = delete selection
 *    = replace selection
 *    = drop 
 *    = on enter at cursor split into two block [consider if: selection, shiftKey]
 * + others ------------
 *    = dragging and dropping text/fragment somewhere on the editor block
 *    = dragging block
 */


export interface SelectionDetails {
  selection: Selection | null;
  isCaret?: boolean;
  startBlock?: string;
  startOffset?: number;
  endBlock?: string;
  endOffset?: number;
  formattings?: {
    bold: {}; // other configs

  }[];
}

export function useEditor(ref: RefObject<HTMLDivElement | null>, initialContent?: any[], options?: EditorOptions) {
  const { } = options ?? {};

  const [data, setData] = useState<any[]>(() => initialContent ?? []);
  const [history, setHistory] = useState<{ snapshots: any[]; index: 0 }>();
  const [selection, setSelection] = useState<SelectionDetails>();

  const [showToolbar, setShowToolbar] = useState(false);
  const [dragCtx, setDragCtx] = useState<{}>();
  const [inputProcessed, setInputProcessed] = useState(false);

  // todo: content metadata: words, characters [to limit max characters/words]

  const toggleToolbarVisibility = () => setShowToolbar(!showToolbar);

  const updateCaret = useEffectEvent(() => {
    try {
      if (!ref.current) return;
      const activeBlock = ref.current.querySelector(`[data-block="${selection?.startBlock}"]`);
      const _selection = window.getSelection();
      if (!activeBlock || !_selection) return;
      if (!_selection.isCollapsed) return;

      const range = document.createRange();
      range.setStart(activeBlock, selection?.startOffset ?? 0);
      range.setEnd(activeBlock, selection?.startOffset ?? 0);
      range.collapse(true);

      _selection.removeAllRanges();
      _selection.addRange(range);
    } catch (error) {

    }
  });

  useLayoutEffect(() => {
    updateCaret();
  }, [selection]);

  // HISTORY ==================================================================

  const historyUndo = () => { };
  const historyRedo = () => { };

  // FORMATTERS ===============================================================

  const formatBold = () => { };
  const formatItalic = () => { };
  const formatUnderline = () => { };
  const formatStrikeThrough = () => { };
  const formatLink = () => { };
  const formatInlikeCode = () => { };
  const formatHighlight = () => { };
  const formatSubscript = () => { };
  const formatSuperscript = () => { };
  const formatJustify = (to: "left" | "right" | "full" | "center") => { };
  const formatFrontColor = () => { };
  const formatBackColor = () => { };
  const formatFontFamily = () => { }; // formatFontName
  const formatFontSize = () => { };
  const formatTextDirection = () => { }; // formatSetBlockTextDirection, formatSetInlineTextDirection
  const formatIndent = (value: number) => { }; // +ve or -ve value; formatIndent/formatOutdent
  const formatRemove = () => { };
  const formatLineHeight = () => { };
  const formatLetterCase = () => { }; // uppercase/lowercase/titlecase/capitalize
  const formatLetterSpacing = () => { };
  const formatWordSpacing = () => { };

  // INSERT ===================================================================

  const insertBlock = (
    type?: typeof editorBlocks[keyof typeof editorBlocks],
    options?: { to?: "before" | "after" },
  ) => {
    const { to } = options ?? {};
    const newBlock = { id: getUniqueId(12), type: type || editorBlocks.PARA };
    const newBlocks = [];
    if (data?.length) {
      const targetBlockId = selection?.startBlock;
      if (targetBlockId) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === targetBlockId) {
            if (to === "before") newBlocks.push(newBlock);
            newBlocks.push(deepClone(data[i]));
            if (!to || to === "after") newBlocks.push(newBlock);
          } else {
            newBlocks.push(deepClone(data[i]));
          }
        }
      } else {
        newBlocks.push(...data.map(item => deepClone(item)));
        if (to === "before") newBlocks.unshift(newBlock);
        else newBlocks.push(newBlock);
      }
    } else {
      newBlocks.push(newBlock);
    }
    setData(newBlocks);
  };

  const insertLineBreak = () => { };

  const insertText = (text: string) => {
    const newData = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === selection?.startBlock) {
        const newBlock = deepClone(data[i]);
        if (!newBlock.children?.length) newBlock.children = [{ text: "" }];
        newBlock.children[0].text += text;
        // go upto the fragment using the offset
        newData.push(newBlock);
        // @ts-ignore
        setSelection(currSelection => ({ ...currSelection, startOffset: (currSelection?.startOffset ?? 0) + text.length }));
        // todo: update the formattings
      } else {
        newData.push(deepClone(data[i]));
      }
    }

    setData(newData);
  };

  const insertFromPaste = () => { };
  const insertFromDrop = () => { };
  const insertFromYank = () => { };
  // insertFromPasteAsQuotation, insertTranspose, insertCompositionText, insertLink

  // DELETE ===================================================================

  const deleteBlock = (id?: string) => {
    if (!data?.length) return;
    const newBlocks = [];
    const _blockId = id || selection?.startBlock;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === _blockId) continue;
      newBlocks.push(deepClone(data[i]));
    }
    setData(newBlocks);
  };

  const iterateTextBlock = (block: BlockChild[], offset: number, cb: () => any) => {
    const newBlock: BlockChild[] = [];

    const _iterate = () => {

    };

    return newBlock;
  };

  const deleteContent = (dir: CaretActionDir = "backward") => {
    // deleteContent, deleteContentBackward, deleteContentForward

    // req: blockId, offset
    // go upto the offset: check which formatting the offset belongs
    // once a formatting is empty remove it completely

    // todo: function to traverse on block
    // go dfs
    // take ofset as argument
    // if offset reached, call the callback with the text 
  };

  const deleteWord = (dir: CaretActionDir = "backward") => {
    // deleteWordBackward, deleteWordForward
  };

  const deleteSoftLine = (dir?: CaretActionDir) => { }; // deleteSoftLineBackward, deleteSoftLineForward, deleteEntireSoftLine
  const deleteHardLine = (dir: CaretActionDir = "backward") => { }; // deleteHardLineBackward, deleteHardLineForward

  const deleteByCut = () => { };
  const deleteByDrag = () => { };

  // UTILITIES ================================================================

  const isBlockEmpty = (id?: string, block?: any) => {
    const _block = block ?? data?.find(candidate => candidate.id === id);
    if (!_block) return false;

    if (!_block.children?.length) return true;

    const hasContent = (children: any[]) => {
      if (!children?.length) return false;
      for (let i = 0; i < children.length; i++) {
        if (children[i].text) return true;
        return hasContent(children[i].children);
      }
      return false;
    };

    return !hasContent(_block.children);
  };

  const normalizeBlocks = (ids: string[], parentType: string) => {
    // normalize/collapse text>text>text>text to one text 
    // [on iterating on children, if type is same as parent then just return the childen otherwise return same]
    // handle: if [text/bold/italic]>[text/bold/italic]>[text/bold/italic]>... [no need to handle this here since it will be collapsed in different function which will be called when a formatting will be removed]
  };

  // DATA ACTIONS =============================================================

  const moveBlock = useCallback(() => {

  }, []);

  const replace = () => {

  };

  // DOM ACTIONS ==============================================================

  const cleanSelection = useCallback(() => {
    // const removeRanges = [];
    // for (let i = 0; i < selection.rangeCount; i++) {
    //   const rangeItem = selection.getRangeAt(i);
    //   const insideEditor = editorRef.current?.contains(rangeItem.startContainer);
    //   if (!insideEditor) {
    //     removeRanges.push(rangeItem);
    //   }
    // }
    // for (let i = 0; i < removeRanges.length; i++) {
    //   selection.removeRange(removeRanges[i]);
    // }
  }, []);

  // EVENT LISTENERS ==========================================================

  const handleSelectionChange = useEffectEvent(() => {
    const _selection = window.getSelection();

    if (!_selection || _selection.rangeCount === 0) {
      setSelection(undefined);
      return;
    }

    const range = _selection.getRangeAt(0);
    const isCaret = range.collapsed;

    const newSelection: SelectionDetails = {
      selection: _selection,
      isCaret,
    };

    let startNode = range.startContainer as HTMLElement;
    if (startNode.nodeType === 3) {
      startNode = startNode.parentElement as HTMLElement;
    }
    const startBlock = startNode.closest("[data-block]");

    newSelection.startBlock = startBlock?.getAttribute("data-block") || undefined;
    newSelection.startOffset = range.startOffset;
    // TODO: use children index [issue: nested fragment]; use id for each mutation [issue: text fragment]

    if (isCaret) {
      let endNode = range.startContainer as HTMLElement;
      if (endNode.nodeType === 3) {
        endNode = endNode.parentElement as HTMLElement;
      }
      const endBlock = endNode.closest("[data-block]");

      newSelection.endBlock = endBlock?.getAttribute("data-block") || undefined;
      newSelection.endOffset = range.endOffset;

      // TODO: check the order of start and end block and sort, if needed
    }

    setSelection(newSelection);
  });

  const handleBeforeInput = useEffectEvent((e: InputEvent) => {
    console.log("=== 😎 before input ===", e.inputType, e.data,);
    // if processed here, then prevent input [issue: others won't be able to listen to input event]

    // delete -----------------------------------------------------------------
    if (e.inputType === inputTypes.delete.CONTENT_BACKWARD) {

    } else if (e.inputType === inputTypes.delete.CONTENT_FORWARD) {

    } else if (e.inputType === inputTypes.delete.WORD_BACKWARD) {

    } else if (e.inputType === inputTypes.delete.WORD_FORWARD) {

    }
    // insert -----------------------------------------------------------------
    else if (e.inputType === inputTypes.insert.TEXT) {
      if (e.data) {
        insertText(e.data);
        e.preventDefault();
      }
    }

    // inputType.delete.SOFT_LINE_BACKWARD {}
    // inputType.delete.SOFT_LINE_FORWARD {}
    // inputType.delete.ENTIRE_SOFT_LINE {}
    // inputType.delete.HARD_LINE_BACKWARD {}
    // inputType.delete.HARD_LINE_FORWARD {}
  });

  const handleInput = useEffectEvent((e: Event) => {
    const _inputEvent = e as InputEvent;
    if (!_inputEvent.data) e.preventDefault();
    // console.log("=== 💥 on input ===", _inputEvent.data, e);
  });

  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    // console.log("=== 🥶 key down ===", "key:", e.key, "code:", e.code);
    if (e.code === Keys.ENTER) {
      if (e.shiftKey && e.ctrlKey) {
        insertBlock(undefined, { to: "before" });
      } else if (e.shiftKey) {
        insertLineBreak();
      } else {
        insertBlock();
      }
      e.preventDefault();
    } else if (e.code === Keys.SPACE && e.ctrlKey) {
      setShowToolbar(true);
    } else if (e.key === Keys.BACKSPACE) {
      // if (data?.length === 1 && isBlockEmpty(undefined, data[0])) { }
      if (e.ctrlKey && e.shiftKey) {
        deleteSoftLine("backward");
      } else if (e.ctrlKey) {
        deleteWord();
      } else {
        deleteContent();
      }
    } else if (e.key === Keys.DEL) {
      if (e.ctrlKey) {
        deleteWord("forward");
      } else {
        deleteContent("forward");
      }
    } else if (e.key === "b" && e.ctrlKey) {
      formatBold();
    } else if (e.key === "i" && e.ctrlKey) {
      formatItalic();
    } else if (e.key === "u" && e.ctrlKey) {
      formatUnderline();
    } else if (e.key === "s" && e.ctrlKey && e.shiftKey) {
      formatStrikeThrough();
    } else if (e.key === "`" && e.ctrlKey) {
      formatInlikeCode();
    } else if (e.key === "k" && e.ctrlKey) {
      formatLink();
    } else if (e.key === "f" && e.ctrlKey) {
      // show find popup
    } else if (e.key === "z" && e.ctrlKey) {
      historyUndo();
    } else if (e.key === "y" && e.ctrlKey) {
      historyRedo();
    }
  });

  const handleKeyUp = useEffectEvent((e: KeyboardEvent) => {
    // console.log("=== 🥶 key up ===", e);
  });

  const handleCopy = useEffectEvent((e: ClipboardEvent) => {
    // console.log("=== 📋 copy ===", e);
    // const parser = new DOMParser();
    // const doc = parser.parseFromString("", "text/html");
  });

  const handleCut = useEffectEvent((e: ClipboardEvent) => {
    // console.log("=== 📋 cut ===", e);
  });

  const handlePaste = useEffectEvent((e: ClipboardEvent) => {
    // console.log("=== 📋 paste ===", e,
    //   // e.clipboardData.types, e.clipboardData.getData("text/html")
    // );
  });

  const handleFocus = useEffectEvent((e: FocusEvent) => {
    // console.log("=== 👀 focus ===", e, e.target);
  });

  const handleBlur = useEffectEvent((e: FocusEvent) => {
    // console.log("=== 👀 blur ===", e);
  });

  const handleDragStart = useEffectEvent((e: DragEvent) => {
    // if selection, then grab the content
    // console.log("--- dragstart ---", e.dataTransfer?.getData("text"));
  });

  const handleDragOver = useEffectEvent((e: DragEvent) => {
    // e.preventDefault();
  });

  const handleDrop = useEffectEvent((e: DragEvent) => {
    // console.log("--- drop ---", e);
  });

  const handleDragEnd = useEffectEvent((e: DragEvent) => {

  });

  const handleDragLeave = useEffectEvent((e: DragEvent) => {

  });

  const handleContextMenu = useEffectEvent((e: PointerEvent) => {
    // if (e.pointerType === "touch") {
    //   if (!showToolbar) {
    //     e.preventDefault();
    //   }
    // }
  });

  // const handleCompositionStart = useEffectEvent((e: any) => {
  //   // console.log("=== 🔷 comp start ===", e);
  // });

  // const handleCompositionUpdate = useEffectEvent((e: any) => {
  //   // console.log("=== 🔷 comp update ===", e);
  // });

  // const handleCompositionEnd = useEffectEvent((e: any) => {
  //   // console.log("=== 🔷 comp end ===", e);
  // });

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const abortController = new AbortController();

    document.addEventListener("selectionchange", handleSelectionChange, { signal: abortController.signal });

    elem.addEventListener("beforeinput", handleBeforeInput, { signal: abortController.signal });
    elem.addEventListener("input", handleInput, { signal: abortController.signal });

    elem.addEventListener("keydown", handleKeyDown, { signal: abortController.signal });
    elem.addEventListener("keyup", handleKeyUp, { signal: abortController.signal });

    elem.addEventListener("focus", handleFocus, { signal: abortController.signal });
    elem.addEventListener("blur", handleBlur, { signal: abortController.signal });

    elem.addEventListener("copy", handleCopy, { signal: abortController.signal });
    elem.addEventListener("cut", handleCut, { signal: abortController.signal });
    elem.addEventListener("paste", handlePaste, { signal: abortController.signal });

    // elem.addEventListener("contextmenu", handleContextMenu, { signal: abortController.signal });

    // elem.addEventListener("compositionstart", handleCompositionStart, { signal: abortController.signal });
    // elem.addEventListener("compositionupdate", handleCompositionUpdate, { signal: abortController.signal });
    // elem.addEventListener("compositionend", handleCompositionEnd, { signal: abortController.signal });

    elem.addEventListener("dragstart", handleDragStart, { signal: abortController.signal });
    elem.addEventListener("dragover", handleDragOver, { signal: abortController.signal });
    elem.addEventListener("dragend", handleDragEnd, { signal: abortController.signal });
    elem.addEventListener("drop", handleDrop, { signal: abortController.signal });
    elem.addEventListener("dragleave", handleDragLeave, { signal: abortController.signal });

    return () => {
      abortController.abort();
    };
  }, [ref]);

  useEffect(() => {
    if (initialContent?.length) ((_content: any[]) => setData(initialContent))(initialContent);
  }, [initialContent]);

  return {
    data, selection,
    showToolbar, setShowToolbar, toggleToolbarVisibility,
    insertBlock, deleteBlock, moveBlock,
    normalizeBlocks,
  };
}

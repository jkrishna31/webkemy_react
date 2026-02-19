import { RefObject, useCallback, useEffect, useEffectEvent, useLayoutEffect, useState } from "react";

import { editorBlocks, inputTypes } from "@/constants/editor.const";
import { Keys } from "@/constants/keys.const";
import { LeafValues } from "@/lib/types/general.types";
import { getUniqueId } from "@/lib/utils/crypto.utils";
import { deepClone } from "@/lib/utils/object.utils";

export interface BlockChild {
  id: string;
  type: "text" | string;
  text: string;
  children?: BlockChild[];
}
export interface EditorBlockBase {
  id: string;
  type: keyof typeof editorBlocks;
  config?: any;
  children?: BlockChild[];
}

export interface EditorOptions {

}

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

  const toggleToolbarVisibility = () => setShowToolbar(!showToolbar);

  useLayoutEffect(() => {
    try {
      const activeBlock = ref.current?.querySelector(`[data-block="${selection?.startBlock}"]`);
      const _selection = window.getSelection();
      console.log("*** ACTIVE BLOK ***", activeBlock, selection?.startOffset);
      if (activeBlock && _selection) {
        const range = document.createRange();
        // _selection.setBaseAndExtent(activeBlock, selection?.startOffset ?? 0, activeBlock, selection?.startOffset ?? 0);
        range.setStart(activeBlock, selection?.startOffset ?? 0);
        range.setEnd(activeBlock, selection?.startOffset ?? 0);
        range.collapse(true);

        _selection.removeAllRanges();
        _selection.addRange(range);
      }
    } catch (error) {

    }
  }, [ref, selection?.startBlock, selection?.startOffset]);

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
        console.log("---- text length ----", text.length);
        // @ts-ignore
        setSelection(currSelection => ({ ...currSelection, startOffset: (currSelection?.startOffset ?? 0) + text.length }));
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

  const deleteLineBreak = () => { };

  const deleteWord = () => { }; // deleteWordBackward, deleteWordForward
  const deleteCotent = () => { }; // deleteContent, deleteContentBackward, deleteContentForward
  const deleteSoftLine = () => { }; // deleteSoftLineBackward, deleteSoftLineForward, deleteEntireSoftLine
  const deleteHardLine = () => { }; // deleteHardLineBackward, deleteHardLineForward

  const deleteByCut = () => { };
  const deleteByDrag = () => { };

  // INPUT ====================================================================

  const handleInputCore = (inputType: LeafValues<typeof inputTypes>) => {
    // based on inputType
    // call this function from handleBeforeInput
  };

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

  const getBlockIndex = (el?: Element | null) => {
    let index = 0;
    while (el = el?.previousElementSibling) {
      index++;
    }
    return index + 1; // 1-based index
  };

  const normalizeBlocks = (ids: string[], parentType: string) => {
    // normalize/collapse text>text>text>text to one text 
    // [on iterating on children, if type is same as parent then just return the childen otherwise return same]
    // handle: if [text/bold/italic]>[text/bold/italic]>[text/bold/italic]>... [no need to handle this here since it will be collapsed in different function which will be called when a formatting will be removed]
  };

  // DATA ACTIONS =============================================================

  const moveBlock = useCallback(() => {

  }, []);

  const insertChar = () => {
    // if selection.isCaret
    // = 
    // else
    // = first delete those charaters in the selection [& normalize different scenarios]
    // = then insert the character 
  };

  const deleteChar = () => {

  };

  const replace = () => {

  };

  // DOM ACTIONS ==============================================================

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

  const cleanSelection = useCallback((selection: Selection) => {
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
    console.log("=== 😎 before input ===", e.inputType, e.data, e);
    // if processed here, then prevent input [issue: others won't be able to listen to input event]

    // TYPESCRIPT
    // inputType.insert.BR {}
    // inputType.insert.PARAGRAPH {Enter}
    // inputType.insert.OL {}
    // inputType.insert.UL {}
    // inputType.insert.HR {}

    // inputType.delete.WORD_BACKWARD {Ctrl+Backspace}
    // inputType.delete.WORD_FORWARD {Ctrl+Shift+Backspace}
    // inputType.delete.SOFT_LINE_BACKWARD {}
    // inputType.delete.SOFT_LINE_FORWARD {}
    // inputType.delete.ENTIRE_SOFT_LINE {}
    // inputType.delete.HARD_LINE_BACKWARD {}
    // inputType.delete.HARD_LINE_FORWARD {}
    // inputType.delete.CONTENT {}
    // inputType.delete.CONTENT_BACKWARD {Shift?+Backspace}
    // inputType.delete.CONTENT_FORWARD {}

    switch (e.inputType) {
      case "insertText": {
        // console.log("--- INPUT TYPE ---", e.data);
        if (e.data) {
          insertText(e.data);
          e.preventDefault();
          // e.stopPropagation();
        }
        break;
      }
      case "insertReplacementText":
        break;
      case "":
        break;
      case "":
        break;
      case "":
        break;
      case "":
        break;
      case "":
        break;
      case "":
        break;
      case "":
        break;
      case "":
        break;
    }
  });

  const handleInput = useEffectEvent((e: Event) => {
    const _inputEvent = e as InputEvent;
    if (!_inputEvent.data) e.preventDefault();
    // console.log("=== 💥 on input ===", _inputEvent.data, e);
  });

  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    // console.log("=== 🥶 key down ===",
    //   e,
    //   e.key, e.code, e.charCode, e.keyCode,
    //   "ctrl:", e.ctrlKey, "meta:", e.metaKey, "alt:", e.altKey, "shift:", e.shiftKey,
    // );
    if (e.code === Keys.ENTER) {
      if (e.shiftKey && e.ctrlKey) {
        insertBlock(undefined, { to: "before" }); // TODO: place caret
        e.preventDefault();
      } else if (e.shiftKey) {
        // TODO: insert a br
      } else {
        insertBlock(); // TODO: place caret
        e.preventDefault();
      }
    } else if (e.code === Keys.SPACE && e.ctrlKey) {
      setShowToolbar(true);
    } else if (e.code === Keys.DEL || e.code === Keys.BACKSPACE) {
      if (data?.length === 1 && isBlockEmpty(undefined, data[0])) {
        // e.preventDefault();
      }
    } else {
    }
    // Ctrl+B [if selection, then make it bold (check how caret is placed after formatting); otherwise insert a empty formatted field]
    // Ctrl+I
    // Ctrl+U
    // Ctrl+F (find and replace)
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

  // const handleContextMenu = useEffectEvent((e: PointerEvent) => {

  // });

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
    insertChar, deleteChar,
    normalizeBlocks,
  };
}

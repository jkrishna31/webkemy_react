"use client";

import React, { useCallback, useState } from "react";

import { FloatBox } from "@/components/common/general";
import { PageSetup } from "@/components/managers";
import { editorBlocks, editorTools } from "@/constants/editor.const";
import { BlockSelector, Editor, ToolSelector } from "@/lib/ui/elements/editor";
import { GeneralInput, InputFieldWrapper } from "@/lib/ui/elements/inputs";
import { Text } from "@/lib/ui/elements/text";
import { AddEmojiIcon } from "@/lib/ui/svgs/emojis";
import { AlignCenterIcon, AlignRightIcon, BlockCautionIcon, BlockCodeIcon, BlockNoteIcon, BlockquoteIcon, BlockTipIcon, BoldIcon, ColorPaletteIcon, CopyLinkIcon, DeleteIcon, DividerIcon, EmbedCodepenIcon, EmbedCSBIcon, EmbedGithubIcon, EmbedIcon, EmbedYoutubeIcon, FileIcon, FontIcon, FrameIcon, HashtagIcon, HeadingIcon, HighlightertIcon, HyperlinkIcon, ImageIcon, IndentDecIcon, IndentIncIcon, InlineCodeIcon, ItalicIcon, LetterCaseIcon, LetterCaseLowerIcon, LetterCaseToggleIcon, LetterCaseUpperIcon, LetterSpacingIcon, LineHeightIcon, LineThroughIcon, MentionIcon, OrderedListIcon, PilcrowIcon, RedoIcon, SparklesIcon, SubHeadingIcon, SubscriptIcon, SuperscriptIcon, SwapIcon, TableIcon, TextColorIcon, TextFormattingRemoveIcon, TextIcon, TextOutlineIcon, TextSizeIcon, TopSidebarCloseIcon, UnderlineIcon, UndoIcon, UnorderedListIcon } from "@/lib/ui/svgs/icons";
import { getUniqueId } from "@/lib/utils/crypto.utils";

import styles from "./styles.module.scss";

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

const blocks = [
  {
    key: "general",
    group: "General",
    collapsible: false,
    className: styles.block_group,
    menu: [
      {
        key: editorBlocks.HEADING, primary: "Heading",
        icon: <HeadingIcon />,
      },
      {
        key: editorBlocks.SUB_HEADING, primary: "Sub Heading",
        icon: <SubHeadingIcon />
      },
      {
        key: editorBlocks.PARA, primary: "Paragraph",
        icon: <PilcrowIcon />
      },
      {
        key: editorBlocks.CODE, primary: "Code",
        icon: <BlockCodeIcon />
      },
      {
        key: editorBlocks.ORDERED_LIST, primary: "Ordered List",
        icon: <OrderedListIcon />
      },
      {
        key: editorBlocks.UNORDERED_LIST, primary: "Unordered List",
        icon: <UnorderedListIcon />
      },
      {
        key: editorBlocks.IMAGE, primary: "Image",
        icon: <ImageIcon />
      },
      {
        key: editorBlocks.TABLE, primary: "Table",
        icon: <TableIcon />
      },
      {
        key: editorBlocks.COLLAPSIBLE, primary: "Collapsible",
        icon: <TopSidebarCloseIcon />
      },
      {
        key: editorBlocks.DIVIDER, primary: "Divider",
        icon: <DividerIcon />
      },
    ],
  },
  {
    key: "frame",
    group: "Frame",
    collapsible: false,
    className: styles.block_group,
    menu: [
      {
        key: editorBlocks.QUOTE, primary: "Quote",
        icon: <BlockquoteIcon />
      },
      {
        key: editorBlocks.NOTE, primary: "Note",
        icon: <BlockNoteIcon />
      },
      {
        key: editorBlocks.TIP, primary: "Tip",
        icon: <BlockTipIcon />
      },
      {
        key: editorBlocks.CAUTION, primary: "Caution",
        icon: <BlockCautionIcon />
      },
    ],
  },
  {
    key: "embed",
    group: "Embed",
    collapsible: false,
    className: styles.block_group,
    menu: [
      {
        key: editorBlocks.YOUTUBE, primary: "Youtube",
        icon: <EmbedYoutubeIcon />
      },
      {
        key: editorBlocks.GITHUB, primary: "Github Gist",
        icon: <EmbedGithubIcon />
      },
      {
        key: editorBlocks.CODEPEN, primary: "CodePen",
        icon: <EmbedCodepenIcon />
      },
      {
        key: editorBlocks.CODESANDBOX, primary: "CodeSandbox",
        icon: <EmbedCSBIcon />
      }
    ],
  },
  {
    key: "misc",
    group: "Misc",
    collapsible: false,
    className: styles.block_group,
    menu: [
      {
        key: editorBlocks.DRAFT, primary: "Upload Draft",
        icon: <FileIcon />
      },
    ]
  }
];

const tools = [
  [
    {
      name: "Undo", key: editorTools.UNDO, color: "yellow", disabled: false,
      render: <UndoIcon className={styles.icon} />
    },
    {
      name: "Redo", key: editorTools.REDO, color: "yellow", disabled: true,
      render: <RedoIcon className={styles.icon} />
    }
  ],
  [
    {
      name: "Bold", key: editorTools.BOLD,
      render: <BoldIcon className={styles.icon} />
    },
    {
      name: "Italic", key: editorTools.ITALIC,
      render: <ItalicIcon className={styles.icon} />
    },
    {
      name: "Underline", key: editorTools.UNDERLINE,
      render: <UnderlineIcon className={styles.icon} />
    },
    {
      name: "Line Through", key: editorTools.LINE_THROUGH,
      render: <LineThroughIcon className={styles.icon} />
    },
    {
      name: "Hyperlink", key: editorTools.LINK,
      render: <HyperlinkIcon className={styles.icon} />
    },
    {
      name: "Inline Code", key: editorTools.INLINE_CODE,
      render: <InlineCodeIcon className={styles.icon} />
    },
    {
      name: "Highlight", key: editorTools.HIGHLIGHT,
      render: <HighlightertIcon className={styles.icon} />
    },
    {
      name: "Subscript", key: editorTools.SUBSCRIPT,
      render: <SubscriptIcon className={styles.icon} />
    },
    {
      name: "Superscript", key: editorTools.SUPERSCRIPT,
      render: <SuperscriptIcon className={styles.icon} />
    },
    {
      name: "Mention", key: editorTools.MENTION,
      render: <MentionIcon className={styles.icon} />
    },
    {
      name: "Hashtag", key: "hashtag",
      render: <HashtagIcon className={styles.icon} />
    },
    {
      name: "Color", key: "color",
      render: <ColorPaletteIcon className={styles.icon} />
    },
    {
      name: "Emoji", key: "emoji",
      render: <AddEmojiIcon className={styles.icon} />
    },
  ],
  [
    {
      name: "Indent Increase", key: editorTools.INDENT,
      render: <IndentDecIcon className={styles.icon} />
    },
    {
      name: "Indent Decrease", key: editorTools.OUTDENT,
      render: <IndentIncIcon className={styles.icon} />
    },
  ],
  [
    {
      name: "Text", key: "text",
      render: <TextIcon className={styles.icon} />,
    },
    {
      name: "Text Color", key: "text_color",
      render: <TextColorIcon className={styles.icon} />,
    },
    {
      name: "Text Size", key: "text_size",
      render: <TextSizeIcon className={styles.icon} />,
    },
    {
      name: "Letter Spacing", key: "letter_spacing",
      render: <LetterSpacingIcon className={styles.icon} />,
    },
    {
      name: "Line Height", key: "line_height",
      render: <LineHeightIcon className={styles.icon} />,
    },
    {
      name: "Text Outline", key: "text_outline",
      render: <TextOutlineIcon className={styles.icon} />,
    },
    {
      name: "Text Formatting", key: "text_formatting",
      render: <FontIcon className={styles.icon} />,
    },
    {
      name: "Letter Case", key: "letter_case",
      render: <LetterCaseIcon className={styles.icon} />,
    },
    {
      name: "Letter Case Upper", key: "letter_case_upper",
      render: <LetterCaseUpperIcon className={styles.icon} />,
    },
    {
      name: "Letter Case Lower", key: "letter_case_lower",
      render: <LetterCaseLowerIcon className={styles.icon} />,
    },
    {
      name: "Letter Case Toggle", key: "letter_case_toggle",
      render: <LetterCaseToggleIcon className={styles.icon} />,
    },
    {
      name: "Text Formatting Clear", key: "text_formatting_clear",
      render: <TextFormattingRemoveIcon className={styles.icon} />,
    },
  ],
  [
    {
      name: "Align Center", key: "align_center",
      render: <AlignCenterIcon className={styles.icon} />
    },
    {
      name: "Align Right", key: "align_right",
      render: <AlignRightIcon className={styles.icon} />
    },
  ],
  [
    {
      name: "Convert", key: editorTools.CONVERT,
      render: <SwapIcon className={styles.icon} />
    },
    {
      name: "Copy Link", key: editorTools.COPY_LINK,
      render: <CopyLinkIcon className={styles.icon} />
    },
    {
      name: "Delete Block", key: editorTools.DELETE, color: "red",
      render: <DeleteIcon className={styles.icon} />
    },
  ],
  [
    {
      name: "AI", key: editorTools.AI, color: "blue",
      render: <SparklesIcon className={styles.icon} />
    }
  ]
];

const convertTools = [
  [
    {
      name: "Heading", key: editorBlocks.HEADING,
      render: <HeadingIcon className={styles.icon} />,
    },
    {
      name: "Subheading", key: editorBlocks.SUB_HEADING,
      render: <SubHeadingIcon className={styles.icon} />,
    },
    {
      name: "Paragraph", key: editorBlocks.PARA,
      render: <PilcrowIcon className={styles.icon} />,
    },
    {
      name: "Code", key: editorBlocks.CODE,
      render: <BlockCodeIcon className={styles.icon} />,
    },
    {
      name: "Ordered List", key: editorBlocks.ORDERED_LIST,
      render: <OrderedListIcon className={styles.icon} />,
    },
    {
      name: "Unordered List", key: editorBlocks.UNORDERED_LIST,
      render: <UnorderedListIcon className={styles.icon} />,
    },
    {
      name: "Collapsible", key: editorBlocks.COLLAPSIBLE,
      render: <TopSidebarCloseIcon className={styles.icon} />,
    },
    {
      name: "Quote", key: editorBlocks.QUOTE,
      render: <BlockquoteIcon className={styles.icon} />,
    },
    {
      name: "Note", key: editorBlocks.NOTE,
      render: <BlockNoteIcon className={styles.icon} />,
    },
    {
      name: "Tip", key: editorBlocks.TIP,
      render: <BlockTipIcon className={styles.icon} />,
    },
    {
      name: "Caution", key: editorBlocks.CAUTION,
      render: <BlockCautionIcon className={styles.icon} />,
    },
  ]
];

const Page = () => {
  const [postBlocks, setPostBlocks] = useState<any[]>([]);
  const [editorSelection, setEditorSelection] = useState<Selection | null>();
  const [toolsState, setToolsState] = useState<{ [key: string]: boolean }>({});
  const [boxConfig, setBoxConfig] = useState<{
    coords: [number | string, number | string, number | string, number | string],
    maxWidth: number,
    active: boolean
  }>({
    coords: ["revert", "revert", "revert", "revert"],
    maxWidth: Infinity,
    active: false
  });

  const handleBlockSelect = useCallback((key: any) => {
    // get the current focused block
    // and insert after that
    if (key === editorBlocks.IMAGE) {
      // setPickerModal({
      //   active: true, type: "img",
      //   payload: {
      //     label: "Upload Image",
      //     // multiple: true,
      //     accept: "image/*",
      //     onFileInput: handleFileInput,
      //     onUrlInput: handleUrlInput,
      //   }
      // });
    } else if (key === editorBlocks.DRAFT) {
      // setPickerModal({
      //   active: true, type: "draft",
      //   payload: {
      //     label: "Upload Draft(s)",
      //     type: "file",
      //     // accept: ".json",
      //     multiple: true,
      //     placeholder: "Drop/Select File",
      //     onFileInput: handleFileInput,
      //     // onUrlInput: handleUrlInput,
      //   }
      // });
    } else {
      setPostBlocks((currBlocks: any) => {
        return [
          ...currBlocks,
          {
            type: key,
            id: getUniqueId(),
            props: {
              "data-placeholder": getPlaceholder(key)
            }
          },
        ];
      });
    }
  }, []);

  const handleToolSelect = useCallback((e: any, key: string) => {
    if (key === editorTools.UNDO) {
      // handle undo
    } else if (key === editorTools.REDO) {
      // handle redo
    } else if (key === editorTools.COPY_LINK) {
      // 
    } else if (key === editorTools.DELETE) {

    } else if (key === editorTools.INDENT) {

    } else if (key === editorTools.OUTDENT) {

    } else {
      setToolsState(currToolsState => {
        const newToolsState = { ...currToolsState };
        if (newToolsState[key]) {
          newToolsState[key] = false;
        } else {
          newToolsState[key] = true;
        }
        return newToolsState;
      });
    }
  }, []);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="editor" />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Text<"h2"> as="h2" className={styles.title}>{"Write"}</Text>
          <BlockSelector
            label="Block" blocks={blocks} onSelect={handleBlockSelect}
            wrapperClass={styles.tool_selector_wrapper}
          />
        </div>
        <Editor rootClass={styles.editor_wrapper}>
          <FloatBox
            className={styles.toolbar}
            style={boxConfig.active ? {
              position: "absolute",
              top: boxConfig.coords[0],
              right: boxConfig.coords[1],
              bottom: boxConfig.coords[2],
              left: boxConfig.coords[3],
              maxWidth: boxConfig.maxWidth,
            } : undefined}
          >
            <ToolSelector
              tools={tools}
              toolsState={toolsState}
              onClick={handleToolSelect}
            />
            {
              !!toolsState?.[editorTools.LINK] ? (
                <InputFieldWrapper className={styles.link_input_wrapper}>
                  <GeneralInput type="text" defaultValue={editorSelection?.toString()} className={styles.link_input} />
                  <GeneralInput type="url" defaultValue="" className={styles.link_input} placeholder="Insert link..." />
                </InputFieldWrapper>
              ) : null
            }
            {
              !!toolsState?.[editorTools.CONVERT] ? (
                <ToolSelector
                  tools={convertTools}
                  toolsState={[]}
                  onClick={undefined}
                />
                // <div className={styles.blocks_list}>
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<HeadingIcon className={styles.tool_icon} />}
                //     />
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<SubHeadingIcon className={styles.tool_icon} />}
                //     />
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<PilcrowIcon className={styles.tool_icon} />}
                //     />
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<BlockCodeIcon className={styles.tool_icon} />}
                //     />
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<OrderedListIcon className={styles.tool_icon} />}
                //     />
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<UnorderedListIcon className={styles.tool_icon} />}
                //     />
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<TopSidebarCloseIcon className={styles.tool_icon} />}
                //     />
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<BlockquoteIcon className={styles.tool_icon} />}
                //     />
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<BlockNoteIcon className={styles.tool_icon} />}
                //     />
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<BlockTipIcon className={styles.tool_icon} />}
                //     />
                //     <Button
                //         className={styles.tool_btn}
                //         icon={<BlockCautionIcon className={styles.tool_icon} />}
                //     />
                // </div>
              ) : null
            }
          </FloatBox>
        </Editor>
      </div>
    </main>
  );
};

export default Page;

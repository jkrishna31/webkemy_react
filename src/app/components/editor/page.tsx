"use client";

import { useCallback, useRef, useState } from "react";

import { PageSetup } from "@/components/managers";
import { editorBlocks, editorTools } from "@/constants/editor.const";
import { useEditor } from "@/lib/hooks/useEditor";
import { BlockSelector, Editor, ToolSelector } from "@/lib/ui/elements/editor";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { Popover } from "@/lib/ui/elements/Popover";
import { Tabs } from "@/lib/ui/elements/Tabs";
import { Text } from "@/lib/ui/elements/Text";
import AddEmojiIcon from "@/lib/ui/svgs/icons/AddEmojiIcon";
import AlignLeftIcon from "@/lib/ui/svgs/icons/AlignLeftIcon";
import BackgroundColorIcon from "@/lib/ui/svgs/icons/BackgroundColorIcon";
import BlockCodeIcon from "@/lib/ui/svgs/icons/BlockCodeIcon";
import BlockquoteIcon from "@/lib/ui/svgs/icons/BlockquoteIcon";
import BoldIcon from "@/lib/ui/svgs/icons/BoldIcon";
import ChecklistIcon from "@/lib/ui/svgs/icons/ChecklistIcon";
import ColorPaletteIcon from "@/lib/ui/svgs/icons/ColorPaletteIcon";
import CopyLinkIcon from "@/lib/ui/svgs/icons/CopyLinkIcon";
import DeleteIcon from "@/lib/ui/svgs/icons/DeleteIcon";
import DividerIcon from "@/lib/ui/svgs/icons/DividerIcon";
import EmbedCodepenIcon from "@/lib/ui/svgs/icons/EmbedCodepenIcon";
import EmbedCSBIcon from "@/lib/ui/svgs/icons/EmbedCSBIcon";
import EmbedGithubIcon from "@/lib/ui/svgs/icons/EmbedGithubIcon";
import EmbedYoutubeIcon from "@/lib/ui/svgs/icons/EmbedYoutubeIcon";
import FileIcon from "@/lib/ui/svgs/icons/FileIcon";
import FontIcon from "@/lib/ui/svgs/icons/FontIcon";
import HashtagIcon from "@/lib/ui/svgs/icons/HashtagIcon";
import Heading1Icon from "@/lib/ui/svgs/icons/Heading1Icon";
import Heading2Icon from "@/lib/ui/svgs/icons/Heading2Icon";
import Heading3Icon from "@/lib/ui/svgs/icons/Heading3Icon";
import Heading4Icon from "@/lib/ui/svgs/icons/Heading4Icon";
import Heading5Icon from "@/lib/ui/svgs/icons/Heading5Icon";
import Heading6Icon from "@/lib/ui/svgs/icons/Heading6Icon";
import HighlightertIcon from "@/lib/ui/svgs/icons/HighlightertIcon";
import HyperlinkIcon from "@/lib/ui/svgs/icons/HyperlinkIcon";
import ImageIcon from "@/lib/ui/svgs/icons/ImageIcon";
import IndentDecIcon from "@/lib/ui/svgs/icons/IndentDecIcon";
import IndentIncIcon from "@/lib/ui/svgs/icons/IndentIncIcon";
import InlineCodeIcon from "@/lib/ui/svgs/icons/InlineCodeIcon";
import ItalicIcon from "@/lib/ui/svgs/icons/ItalicIcon";
import LetterCaseIcon from "@/lib/ui/svgs/icons/LetterCaseIcon";
import LetterCaseLowerIcon from "@/lib/ui/svgs/icons/LetterCaseLowerIcon";
import LetterCaseToggleIcon from "@/lib/ui/svgs/icons/LetterCaseToggleIcon";
import LetterCaseUpperIcon from "@/lib/ui/svgs/icons/LetterCaseUpperIcon";
import LetterSpacingIcon from "@/lib/ui/svgs/icons/LetterSpacingIcon";
import LineHeightIcon from "@/lib/ui/svgs/icons/LineHeightIcon";
import LineThroughIcon from "@/lib/ui/svgs/icons/LineThroughIcon";
import MentionIcon from "@/lib/ui/svgs/icons/MentionIcon";
import NoteIcon from "@/lib/ui/svgs/icons/NoteIcon";
import OrderedListIcon from "@/lib/ui/svgs/icons/OrderedListIcon";
import PanelTopCloseIcon from "@/lib/ui/svgs/icons/PanelTopCloseIcon";
import PilcrowIcon from "@/lib/ui/svgs/icons/PilcrowIcon";
import RedoIcon from "@/lib/ui/svgs/icons/RedoIcon";
import SparklesIcon from "@/lib/ui/svgs/icons/SparklesIcon";
import SubscriptIcon from "@/lib/ui/svgs/icons/SubscriptIcon";
import SuperscriptIcon from "@/lib/ui/svgs/icons/SuperscriptIcon";
import SwapIcon from "@/lib/ui/svgs/icons/SwapIcon";
import TableIcon from "@/lib/ui/svgs/icons/TableIcon";
import TextAlignCenterIcon from "@/lib/ui/svgs/icons/TextAlignCenterIcon";
import TextAlignJustifyIcon from "@/lib/ui/svgs/icons/TextAlignJustifyIcon";
import TextAlignLeftIcon from "@/lib/ui/svgs/icons/TextAlignLeftIcon";
import TextAlignRightIcon from "@/lib/ui/svgs/icons/TextAlignRightIcon";
import TextColorIcon from "@/lib/ui/svgs/icons/TextColorIcon";
import TextFormattingRemoveIcon from "@/lib/ui/svgs/icons/TextFormattingRemoveIcon";
import TextSizeIcon from "@/lib/ui/svgs/icons/TextSizeIcon";
import UnderlineIcon from "@/lib/ui/svgs/icons/UnderlineIcon";
import UndoIcon from "@/lib/ui/svgs/icons/UndoIcon";
import UnorderedListIcon from "@/lib/ui/svgs/icons/UnorderedListIcon";

import styles from "./page.module.scss";

const getPlaceholder = (type: string) => {
  if (type === editorBlocks.PARA || type.startsWith("h")) {
    return "Enter \"/\" for blocks...";
  } else {
    return "";
  }
};

const defaultBlocks = [
  {
    type: editorBlocks.H1,
    id: "1",
    children: [],
  },
  {
    type: editorBlocks.PARA,
    id: "99",
    children: [
      { text: "Hi there," },
      { type: "br" },
      { text: "This is a simple paragraph with a line break." }
    ],
  },
  {
    type: editorBlocks.PARA,
    id: "2",
    props: {
      "data-placeholder": getPlaceholder(editorBlocks.PARA),
    },
    children: [
      { text: "Another paragraph with some " },
      { type: "bold", children: [{ text: "inline formatted" }] },
      { text: " content." },
    ],
  },
  {
    type: editorBlocks.DIVIDER,
    id: "3",
  },
  {
    type: editorBlocks.H2,
    id: "4",
  },
  {
    type: editorBlocks.H3,
    id: "5",
  },
  {
    type: editorBlocks.H4,
    id: "6",
  },
  {
    type: editorBlocks.PARA,
    id: "7",
    props: {
      "data-placeholder": getPlaceholder(editorBlocks.PARA),
    },
  },
];

const blockOptions = [
  {
    key: "general",
    group: "General",
    collapsible: false,
    className: styles.block_group,
    menu: [
      { key: editorBlocks.PARA, primary: "Paragraph", icon: <PilcrowIcon /> },
      { key: editorBlocks.H1, primary: "Heading 1", icon: <Heading1Icon />, },
      { key: editorBlocks.H2, primary: "Heading 2", icon: <Heading2Icon />, },
      { key: editorBlocks.H3, primary: "Heading 3", icon: <Heading3Icon /> },
      { key: editorBlocks.H4, primary: "Heading 4", icon: <Heading4Icon />, },
      // { key: editorBlocks.H5, primary: "Heading 5", icon: <Heading5Icon />, },
      // { key: editorBlocks.H6, primary: "Heading 6", icon: <Heading6Icon />, },
      { key: editorBlocks.ORDERED_LIST, primary: "Ordered List", icon: <OrderedListIcon /> },
      { key: editorBlocks.UNORDERED_LIST, primary: "Unordered List", icon: <UnorderedListIcon /> },
      { key: editorBlocks.CHECK_LIST, primary: "Check List", icon: <ChecklistIcon /> },
      { key: editorBlocks.CODE, primary: "Code", icon: <BlockCodeIcon /> },
      { key: editorBlocks.IMAGE, primary: "Image", icon: <ImageIcon /> },
      { key: editorBlocks.TABLE, primary: "Table", icon: <TableIcon /> },
      { key: editorBlocks.DIVIDER, primary: "Divider", icon: <DividerIcon /> },
      { key: editorBlocks.COLLAPSIBLE, primary: "Collapsible", icon: <PanelTopCloseIcon /> },
      { key: editorBlocks.QUOTE, primary: "Quote", icon: <BlockquoteIcon /> },
      { key: editorBlocks.NOTE, primary: "Note", icon: <NoteIcon /> },
    ],
  },
  {
    key: "embed",
    group: "Embed",
    collapsible: false,
    className: styles.block_group,
    menu: [
      { key: editorBlocks.YOUTUBE, primary: "Youtube", icon: <EmbedYoutubeIcon /> },
      { key: editorBlocks.GITHUB, primary: "Github Gist", icon: <EmbedGithubIcon /> },
      { key: editorBlocks.CODEPEN, primary: "CodePen", icon: <EmbedCodepenIcon /> },
      { key: editorBlocks.CODESANDBOX, primary: "CodeSandbox", icon: <EmbedCSBIcon /> }
    ],
  },
];

const toolOptions = [
  [
    {
      type: "button",
      name: "Undo", key: editorTools.UNDO, color: "yellow", disabled: false,
      render: <UndoIcon className={styles.icon} />
    },
    {
      type: "button",
      name: "Redo", key: editorTools.REDO, color: "yellow", disabled: true,
      render: <RedoIcon className={styles.icon} />
    }
  ],
  [
    {
      type: "switch",
      name: "Bold", key: editorTools.BOLD,
      render: <BoldIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Italic", key: editorTools.ITALIC,
      render: <ItalicIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Underline", key: editorTools.UNDERLINE,
      render: <UnderlineIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Line Through", key: editorTools.LINE_THROUGH,
      render: <LineThroughIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Hyperlink", key: editorTools.LINK,
      render: <HyperlinkIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Inline Code", key: editorTools.INLINE_CODE,
      render: <InlineCodeIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Highlight", key: editorTools.HIGHLIGHT,
      render: <HighlightertIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Subscript", key: editorTools.SUBSCRIPT,
      render: <SubscriptIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Superscript", key: editorTools.SUPERSCRIPT,
      render: <SuperscriptIcon className={styles.icon} />
    },
    // {
    //   type: "button",
    //   name: "Mention", key: editorTools.MENTION,
    //   render: <MentionIcon className={styles.icon} />
    // },
    // {
    //   type: "button",
    //   name: "Hashtag", key: "hashtag",
    //   render: <HashtagIcon className={styles.icon} />
    // },
    {
      type: "popover",
      name: "Emoji", key: "emoji",
      render: <AddEmojiIcon className={styles.icon} />
    },
  ],
  [
    {
      type: "popover",
      name: "Color", key: "color",
      render: <TextColorIcon className={styles.icon} />
    },
    {
      type: "popover",
      name: "Background", key: "background",
      render: <BackgroundColorIcon className={styles.icon} />
    },
  ],
  [
    {
      type: "popover",
      name: "Indent", key: editorTools.INDENT,
      render: <IndentIncIcon className={styles.icon} />
    },
    // {
    //   type: "button",
    //   name: "Indent Decrease", key: editorTools.OUTDENT,
    //   render: <IndentDecIcon className={styles.icon} />
    // },
  ],
  [
    // {
    //   type: "popover",
    //   name: "Font Family", key: "font",
    //   render: <FontIcon className={styles.icon} />,
    // },
    // {
    //   type: "popover",
    //   name: "Font Size", key: "text_size",
    //   render: <TextSizeIcon className={styles.icon} />,
    // },
    {
      type: "popover",
      name: "Spacing", key: "spacing",
      render: <LetterSpacingIcon className={styles.icon} />,
    },
    {
      type: "popover",
      name: "Line Height", key: "line_height",
      render: <LineHeightIcon className={styles.icon} />,
    },
    {
      type: "popover",
      name: "Letter Case", key: "letter_case",
      render: <LetterCaseIcon className={styles.icon} />,
    },
    // {
    //   name: "Letter Case Upper", key: "letter_case_upper",
    //   render: <LetterCaseUpperIcon className={styles.icon} />,
    // },
    // {
    //   name: "Letter Case Lower", key: "letter_case_lower",
    //   render: <LetterCaseLowerIcon className={styles.icon} />,
    // },
    // {
    //   name: "Letter Case Toggle", key: "letter_case_toggle",
    //   render: <LetterCaseToggleIcon className={styles.icon} />,
    // },
    // {
    //   name: "Text Stroke", key: "text_outline",
    //   render: <TextOutlineIcon className={styles.icon} />,
    // },
    // {
    //   type: "button",
    //   name: "Remove Formatting", key: "text_formatting_clear",
    //   render: <TextFormattingRemoveIcon className={styles.icon} />,
    // },
  ],
  [
    {
      type: "radio", group: "textAlign",
      name: "Align Left", key: "align_left",
      render: <TextAlignLeftIcon className={styles.icon} />
    },
    {
      type: "radio", group: "textAlign",
      name: "Align Center", key: "align_center",
      render: <TextAlignCenterIcon className={styles.icon} />
    },
    {
      type: "radio", group: "textAlign",
      name: "Align Right", key: "align_right",
      render: <TextAlignRightIcon className={styles.icon} />
    },
    {
      type: "radio", group: "textAlign",
      name: "Justify", key: "align_justify",
      render: <TextAlignJustifyIcon className={styles.icon} />
    },
  ],
  [
    {
      type: "popover",
      name: "Convert", key: editorTools.CONVERT,
      render: <SwapIcon className={styles.icon} />
    },
    {
      type: "button",
      name: "Copy Link", key: editorTools.COPY_LINK,
      render: <CopyLinkIcon className={styles.icon} />
    },
    {
      type: "button",
      name: "Delete Block", key: editorTools.DELETE, color: "red",
      render: <DeleteIcon className={styles.icon} />
    },
  ],
  [
    {
      type: "popover",
      name: "AI", key: editorTools.AI, color: "blue",
      render: <SparklesIcon className={styles.icon} />
    }
  ]
];

const Page = () => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  const editorRef = useRef<HTMLDivElement>(null);

  const {
    data, selection,
    showToolbar, toggleToolbarVisibility,
    insertBlock, deleteBlock,
  } = useEditor(editorRef, defaultBlocks);

  // console.log("--- data & selection ---", data, selection?.startBlock, selection?.startOffset);

  const handleBlockSelect = useCallback((key: any) => {
    insertBlock(key);
  }, [insertBlock]);

  const handleToolSelect = useCallback((e: any, key: string) => {
    switch (key) {
      case editorTools.BOLD:
        break;
      case editorTools.ITALIC:
        break;
      case editorTools.UNDERLINE:
        break;
      case editorTools.LINE_THROUGH:
        break;
      case editorTools.LINK:
        break;
      case editorTools.INLINE_CODE:
        break;
      case editorTools.HIGHLIGHT:
        break;
      case editorTools.SUBSCRIPT:
        break;
      case editorTools.SUPERSCRIPT:
        break;
      case editorTools.EMOJI:
        break;
      case editorTools.COLOR:
        break;
      case editorTools.BACKGROUND:
        break;
      case editorTools.INDENT:
        break;
      case editorTools.SPACING:
        break;
      case editorTools.LINE_HEIGHT:
        break;
      case editorTools.LETTER_CASE:
        break;
      case editorTools.TEXT_ALIGN:
        break;
      case editorTools.CONVERT:
        break;
      case editorTools.COPY_LINK:
        break;
    }
  }, []);

  const renderToolbar = () => {
    return (
      <>
        <ToolSelector
          options={toolOptions}
          onClick={handleToolSelect}
        />
        {/* {
          !!toolsState?.[editorTools.LINK] ? (
            <InputFieldWrapper className={styles.link_input_wrapper}>
              <GeneralInput type="text" className={styles.link_input} />
              <GeneralInput type="url" defaultValue="" className={styles.link_input} placeholder="Insert link..." />
            </InputFieldWrapper>
          ) : null
        } */}
      </>
    );
  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="editor" />

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Text<"h2"> as="h2" className={styles.title}>{"Write"}</Text>
          <BlockSelector options={blockOptions} onSelect={handleBlockSelect} />

          <Tabs
            variant="muted"
            activeTab={mode}
            tabs={[{ id: "edit", label: "Edit" }, { id: "preview", label: "Preview" }]}
            onChange={setMode}
            className={styles.tabs}
            tabClass={styles.tab}
          />
        </div>

        {/* showToolbar && data.find(block => block.id === selection.startBlock).type !== "divider" */}
        <Editor ref={editorRef} blocks={data} rootClass={styles.editor_wrapper}>
          {showToolbar && (
            <Popover
              anchor={window.getSelection() ?? undefined}
              animation="slide"
              onClose={toggleToolbarVisibility}
              className={styles.toolbar}
            >
              {renderToolbar()}
            </Popover>
          )}
        </Editor>
      </div>
    </main>
  );
};

export default Page;

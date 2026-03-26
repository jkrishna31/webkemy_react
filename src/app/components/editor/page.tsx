"use client";

import { useCallback, useRef, useState } from "react";

import { PageSetup } from "@/components/managers";
import { BlockSelector, Editor, FindReplace, ToolSelector } from "@/lib/components/elements/editor";
import { Popover } from "@/lib/components/elements/Popover";
import { Tabs } from "@/lib/components/elements/Tabs";
import { Text } from "@/lib/components/elements/Text";
import { EditorBlocks, EditorTools } from "@/lib/constants/editor";
import { useEditor } from "@/lib/hooks/useEditor";
import AddEmojiIcon from "@/lib/svgs/icons/AddEmojiIcon";
import AlignLeftIcon from "@/lib/svgs/icons/AlignLeftIcon";
import BackgroundColorIcon from "@/lib/svgs/icons/BackgroundColorIcon";
import BlockCodeIcon from "@/lib/svgs/icons/BlockCodeIcon";
import BlockquoteIcon from "@/lib/svgs/icons/BlockquoteIcon";
import BoldIcon from "@/lib/svgs/icons/BoldIcon";
import ChecklistIcon from "@/lib/svgs/icons/ChecklistIcon";
import ColorPaletteIcon from "@/lib/svgs/icons/ColorPaletteIcon";
import CopyLinkIcon from "@/lib/svgs/icons/CopyLinkIcon";
import DeleteIcon from "@/lib/svgs/icons/DeleteIcon";
import DividerIcon from "@/lib/svgs/icons/DividerIcon";
import EmbedCodepenIcon from "@/lib/svgs/icons/EmbedCodepenIcon";
import EmbedCSBIcon from "@/lib/svgs/icons/EmbedCSBIcon";
import EmbedGithubIcon from "@/lib/svgs/icons/EmbedGithubIcon";
import EmbedYoutubeIcon from "@/lib/svgs/icons/EmbedYoutubeIcon";
import FileIcon from "@/lib/svgs/icons/FileIcon";
import FontIcon from "@/lib/svgs/icons/FontIcon";
import HashtagIcon from "@/lib/svgs/icons/HashtagIcon";
import Heading1Icon from "@/lib/svgs/icons/Heading1Icon";
import Heading2Icon from "@/lib/svgs/icons/Heading2Icon";
import Heading3Icon from "@/lib/svgs/icons/Heading3Icon";
import Heading4Icon from "@/lib/svgs/icons/Heading4Icon";
import Heading5Icon from "@/lib/svgs/icons/Heading5Icon";
import Heading6Icon from "@/lib/svgs/icons/Heading6Icon";
import HighlightertIcon from "@/lib/svgs/icons/HighlightertIcon";
import HyperlinkIcon from "@/lib/svgs/icons/HyperlinkIcon";
import ImageIcon from "@/lib/svgs/icons/ImageIcon";
import IndentDecIcon from "@/lib/svgs/icons/IndentDecIcon";
import IndentIncIcon from "@/lib/svgs/icons/IndentIncIcon";
import InlineCodeIcon from "@/lib/svgs/icons/InlineCodeIcon";
import ItalicIcon from "@/lib/svgs/icons/ItalicIcon";
import LetterCaseIcon from "@/lib/svgs/icons/LetterCaseIcon";
import LetterCaseLowerIcon from "@/lib/svgs/icons/LetterCaseLowerIcon";
import LetterCaseToggleIcon from "@/lib/svgs/icons/LetterCaseToggleIcon";
import LetterCaseUpperIcon from "@/lib/svgs/icons/LetterCaseUpperIcon";
import LetterSpacingIcon from "@/lib/svgs/icons/LetterSpacingIcon";
import LineHeightIcon from "@/lib/svgs/icons/LineHeightIcon";
import LineThroughIcon from "@/lib/svgs/icons/LineThroughIcon";
import MentionIcon from "@/lib/svgs/icons/MentionIcon";
import NoteIcon from "@/lib/svgs/icons/NoteIcon";
import OrderedListIcon from "@/lib/svgs/icons/OrderedListIcon";
import PanelTopCloseIcon from "@/lib/svgs/icons/PanelTopCloseIcon";
import PilcrowIcon from "@/lib/svgs/icons/PilcrowIcon";
import RedoIcon from "@/lib/svgs/icons/RedoIcon";
import SearchReplaceIcon from "@/lib/svgs/icons/SearchReplaceIcon";
import SparklesIcon from "@/lib/svgs/icons/SparklesIcon";
import SubscriptIcon from "@/lib/svgs/icons/SubscriptIcon";
import SuperscriptIcon from "@/lib/svgs/icons/SuperscriptIcon";
import SwapIcon from "@/lib/svgs/icons/SwapIcon";
import TableIcon from "@/lib/svgs/icons/TableIcon";
import TextAlignCenterIcon from "@/lib/svgs/icons/TextAlignCenterIcon";
import TextAlignJustifyIcon from "@/lib/svgs/icons/TextAlignJustifyIcon";
import TextAlignLeftIcon from "@/lib/svgs/icons/TextAlignLeftIcon";
import TextAlignRightIcon from "@/lib/svgs/icons/TextAlignRightIcon";
import TextColorIcon from "@/lib/svgs/icons/TextColorIcon";
import TextFormattingRemoveIcon from "@/lib/svgs/icons/TextFormattingRemoveIcon";
import TextSizeIcon from "@/lib/svgs/icons/TextSizeIcon";
import UnderlineIcon from "@/lib/svgs/icons/UnderlineIcon";
import UndoIcon from "@/lib/svgs/icons/UndoIcon";
import UnorderedListIcon from "@/lib/svgs/icons/UnorderedListIcon";

import styles from "./page.module.scss";

const getPlaceholder = (type: string) => {
  if (type === EditorBlocks.PARA || type.startsWith("h")) {
    return "Enter \"/\" for blocks...";
  } else {
    return "";
  }
};

const defaultBlocks = [
  {
    type: EditorBlocks.H1,
    id: "1",
    children: [],
  },
  {
    type: EditorBlocks.PARA,
    id: "99",
    children: [
      { text: "Hi there," },
      { type: "br" },
      { text: "This is a simple paragraph with a line break." }
    ],
  },
  {
    type: EditorBlocks.PARA,
    id: "2",
    props: {
      "data-placeholder": getPlaceholder(EditorBlocks.PARA),
    },
    children: [
      { text: "Another paragraph with some " },
      { type: "bold", children: [{ text: "inline formatted" }] },
      { text: " content." },
    ],
  },
  {
    type: EditorBlocks.DIVIDER,
    id: "3",
  },
  {
    type: EditorBlocks.H2,
    id: "4",
  },
  {
    type: EditorBlocks.H3,
    id: "5",
  },
  {
    type: EditorBlocks.H4,
    id: "6",
  },
  {
    type: EditorBlocks.PARA,
    id: "7",
    props: {
      "data-placeholder": getPlaceholder(EditorBlocks.PARA),
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
      { key: EditorBlocks.PARA, primary: "Paragraph", icon: <PilcrowIcon /> },
      { key: EditorBlocks.H1, primary: "Heading 1", icon: <Heading1Icon />, },
      { key: EditorBlocks.H2, primary: "Heading 2", icon: <Heading2Icon />, },
      { key: EditorBlocks.H3, primary: "Heading 3", icon: <Heading3Icon /> },
      { key: EditorBlocks.H4, primary: "Heading 4", icon: <Heading4Icon />, },
      // { key: EditorBlocks.H5, primary: "Heading 5", icon: <Heading5Icon />, },
      // { key: EditorBlocks.H6, primary: "Heading 6", icon: <Heading6Icon />, },
      { key: EditorBlocks.ORDERED_LIST, primary: "Ordered List", icon: <OrderedListIcon /> },
      { key: EditorBlocks.UNORDERED_LIST, primary: "Unordered List", icon: <UnorderedListIcon /> },
      { key: EditorBlocks.CHECK_LIST, primary: "Check List", icon: <ChecklistIcon /> },
      { key: EditorBlocks.CODE, primary: "Code", icon: <BlockCodeIcon /> },
      { key: EditorBlocks.IMAGE, primary: "Image", icon: <ImageIcon /> },
      { key: EditorBlocks.TABLE, primary: "Table", icon: <TableIcon /> },
      { key: EditorBlocks.DIVIDER, primary: "Divider", icon: <DividerIcon /> },
      { key: EditorBlocks.COLLAPSIBLE, primary: "Collapsible", icon: <PanelTopCloseIcon /> },
      { key: EditorBlocks.QUOTE, primary: "Quote", icon: <BlockquoteIcon /> },
      { key: EditorBlocks.NOTE, primary: "Note", icon: <NoteIcon /> },
    ],
  },
  {
    key: "embed",
    group: "Embed",
    collapsible: false,
    className: styles.block_group,
    menu: [
      { key: EditorBlocks.YOUTUBE, primary: "Youtube", icon: <EmbedYoutubeIcon /> },
      { key: EditorBlocks.GITHUB, primary: "Github Gist", icon: <EmbedGithubIcon /> },
      { key: EditorBlocks.CODEPEN, primary: "CodePen", icon: <EmbedCodepenIcon /> },
      { key: EditorBlocks.CODESANDBOX, primary: "CodeSandbox", icon: <EmbedCSBIcon /> }
    ],
  },
];

const toolOptions = [
  [
    {
      type: "button",
      name: "Undo", key: EditorTools.UNDO, color: "yellow", disabled: false,
      render: <UndoIcon className={styles.icon} />
    },
    {
      type: "button",
      name: "Redo", key: EditorTools.REDO, color: "yellow", disabled: true,
      render: <RedoIcon className={styles.icon} />
    }
  ],
  [
    {
      type: "switch",
      name: "Bold", key: EditorTools.BOLD,
      render: <BoldIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Italic", key: EditorTools.ITALIC,
      render: <ItalicIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Underline", key: EditorTools.UNDERLINE,
      render: <UnderlineIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Line Through", key: EditorTools.LINE_THROUGH,
      render: <LineThroughIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Hyperlink", key: EditorTools.LINK,
      render: <HyperlinkIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Inline Code", key: EditorTools.INLINE_CODE,
      render: <InlineCodeIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Highlight", key: EditorTools.HIGHLIGHT,
      render: <HighlightertIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Subscript", key: EditorTools.SUBSCRIPT,
      render: <SubscriptIcon className={styles.icon} />
    },
    {
      type: "switch",
      name: "Superscript", key: EditorTools.SUPERSCRIPT,
      render: <SuperscriptIcon className={styles.icon} />
    },
    // {
    //   type: "button",
    //   name: "Mention", key: EditorTools.MENTION,
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
      name: "Indent", key: EditorTools.INDENT,
      render: <IndentIncIcon className={styles.icon} />
    },
    // {
    //   type: "button",
    //   name: "Indent Decrease", key: EditorTools.OUTDENT,
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
      name: "Find & Replace", key: "find_replace",
      render: <SearchReplaceIcon className={styles.icon} />,
    },
    {
      type: "popover",
      name: "Convert", key: EditorTools.CONVERT,
      render: <SwapIcon className={styles.icon} />
    },
    {
      type: "button",
      name: "Copy Link", key: EditorTools.COPY_LINK,
      render: <CopyLinkIcon className={styles.icon} />
    },
    {
      type: "button",
      name: "Delete Block", key: EditorTools.DELETE, color: "red",
      render: <DeleteIcon className={styles.icon} />
    },
  ],
  [
    {
      type: "popover",
      name: "AI", key: EditorTools.AI, color: "blue",
      render: <SparklesIcon className={styles.icon} />
    }
  ]
];

const Page = () => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [showFinder, setShowFinder] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  const {
    data, selection,
    showToolbar, toggleToolbarVisibility, setShowToolbar,
    insertBlock, deleteBlock,
  } = useEditor(editorRef, defaultBlocks);

  // console.log("--- data & selection ---", data, selection?.startBlock, selection?.startOffset);

  const updateFinderVisibility = useCallback((show: boolean) => {
    if (show) {
      setShowFinder(true);
      setShowToolbar(false);
    } else {
      setShowFinder(false);
    }
  }, [setShowToolbar]);

  const handleBlockSelect = useCallback((key: any) => {
    insertBlock(key);
  }, [insertBlock]);

  const handleToolSelect = useCallback((e: any, key: string) => {
    switch (key) {
      case EditorTools.BOLD:
        break;
      case EditorTools.ITALIC:
        break;
      case EditorTools.UNDERLINE:
        break;
      case EditorTools.LINE_THROUGH:
        break;
      case EditorTools.LINK:
        break;
      case EditorTools.INLINE_CODE:
        break;
      case EditorTools.HIGHLIGHT:
        break;
      case EditorTools.SUBSCRIPT:
        break;
      case EditorTools.SUPERSCRIPT:
        break;
      case EditorTools.EMOJI:
        break;
      case EditorTools.COLOR:
        break;
      case EditorTools.BACKGROUND:
        break;
      case EditorTools.INDENT:
        break;
      case EditorTools.SPACING:
        break;
      case EditorTools.LINE_HEIGHT:
        break;
      case EditorTools.LETTER_CASE:
        break;
      case EditorTools.TEXT_ALIGN:
        break;
      case EditorTools.CONVERT:
        break;
      case EditorTools.COPY_LINK:
        break;
      case "find_replace":
        updateFinderVisibility(!showFinder);
        break;
    }
  }, [showFinder, updateFinderVisibility]);

  const renderToolbar = () => {
    return (
      <ToolSelector
        options={toolOptions}
        onClick={handleToolSelect}
      />
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
        <div className={styles.sticky_container}>
          {!!showFinder && (
            <FindReplace className={styles.finder} onClose={() => setShowFinder(false)} />
          )}
          {!showToolbar && renderToolbar()}
        </div>
      </div>
    </main>
  );
};

export default Page;

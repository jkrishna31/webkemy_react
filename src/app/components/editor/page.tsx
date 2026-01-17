"use client";

import { useCallback, useState } from "react";

import { FloatBox } from "@/components/common/general";
import { PageSetup } from "@/components/managers";
import { editorBlocks, editorTools } from "@/constants/editor.const";
import { BlockSelector, Editor, ToolSelector } from "@/lib/ui/elements/editor";
import { GeneralInput } from "@/lib/ui/elements/inputs/GeneralInput";
import { InputFieldWrapper } from "@/lib/ui/elements/inputs/InputFieldWrapper";
import { Text } from "@/lib/ui/elements/Text";
import AddEmojiIcon from "@/lib/ui/svgs/icons/AddEmojiIcon";
import BlockCautionIcon from "@/lib/ui/svgs/icons/BlockCautionIcon";
import BlockCodeIcon from "@/lib/ui/svgs/icons/BlockCodeIcon";
import BlockNoteIcon from "@/lib/ui/svgs/icons/BlockNoteIcon";
import BlockquoteIcon from "@/lib/ui/svgs/icons/BlockquoteIcon";
import BlockTipIcon from "@/lib/ui/svgs/icons/BlockTipIcon";
import BoldIcon from "@/lib/ui/svgs/icons/BoldIcon";
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
import HeadingIcon from "@/lib/ui/svgs/icons/HeadingIcon";
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
import OrderedListIcon from "@/lib/ui/svgs/icons/OrderedListIcon";
import PanelTopCloseIcon from "@/lib/ui/svgs/icons/PanelTopCloseIcon";
import PilcrowIcon from "@/lib/ui/svgs/icons/PilcrowIcon";
import RedoIcon from "@/lib/ui/svgs/icons/RedoIcon";
import SparklesIcon from "@/lib/ui/svgs/icons/SparklesIcon";
import SubHeadingIcon from "@/lib/ui/svgs/icons/SubHeadingIcon";
import SubscriptIcon from "@/lib/ui/svgs/icons/SubscriptIcon";
import SuperscriptIcon from "@/lib/ui/svgs/icons/SuperscriptIcon";
import SwapIcon from "@/lib/ui/svgs/icons/SwapIcon";
import TableIcon from "@/lib/ui/svgs/icons/TableIcon";
import TextAlignCenterIcon from "@/lib/ui/svgs/icons/TextAlignCenterIcon";
import TextAlignLeftIcon from "@/lib/ui/svgs/icons/TextAlignLeftIcon";
import TextAlignRightIcon from "@/lib/ui/svgs/icons/TextAlignRightIcon";
import TextColorIcon from "@/lib/ui/svgs/icons/TextColorIcon";
import TextFormattingRemoveIcon from "@/lib/ui/svgs/icons/TextFormattingRemoveIcon";
import TextIcon from "@/lib/ui/svgs/icons/TextIcon";
import TextOutlineIcon from "@/lib/ui/svgs/icons/TextOutlineIcon";
import TextSizeIcon from "@/lib/ui/svgs/icons/TextSizeIcon";
import UnderlineIcon from "@/lib/ui/svgs/icons/UnderlineIcon";
import UndoIcon from "@/lib/ui/svgs/icons/UndoIcon";
import UnorderedListIcon from "@/lib/ui/svgs/icons/UnorderedListIcon";
import { getUniqueId } from "@/lib/utils/crypto.utils";

import styles from "./page.module.scss";

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

const blockOptions = [
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
        icon: <PanelTopCloseIcon />
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

const toolOptions = [
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
      name: "Align Left", key: "align_left",
      render: <TextAlignLeftIcon className={styles.icon} />
    },
    {
      name: "Align Center", key: "align_center",
      render: <TextAlignCenterIcon className={styles.icon} />
    },
    {
      name: "Align Right", key: "align_right",
      render: <TextAlignRightIcon className={styles.icon} />
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
      render: <PanelTopCloseIcon className={styles.icon} />,
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
  const [blocks, setBlocks] = useState<any[]>([]);
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
      setBlocks((currBlocks: any) => {
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
            options={blockOptions}
            //  onSelect={handleBlockSelect}
            wrapperClass={styles.tool_selector_wrapper}
          />
        </div>
        <Editor blocks={blocks} setBlocks={setBlocks} rootClass={styles.editor_wrapper}>
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
              options={toolOptions}
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
                  options={convertTools}
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
                //         icon={<PanelTopCloseIcon className={styles.tool_icon} />}
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

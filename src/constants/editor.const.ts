export const editorBlocks = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
  PARA: "para",
  CODE: "code",
  ORDERED_LIST: "ordered_list",
  UNORDERED_LIST: "unordered_list",
  CHECK_LIST: "check_list",
  COLLAPSIBLE: "collapsible",
  TABLE: "table",
  DIVIDER: "divider",
  IMAGE: "image",
  QUOTE: "quote",
  NOTE: "note",
  GITHUB: "github",
  YOUTUBE: "youtube",
  CODESANDBOX: "codesandbox",
  CODEPEN: "codepen",
  MARKDOWN: "markdown",
} as const;

export const editorTools = {
  UNDO: "undo",
  REDO: "redo",
  BOLD: "bold",
  ITALIC: "italic",
  UNDERLINE: "underline",
  LINE_THROUGH: "line_through",
  LINK: "link",
  INLINE_CODE: "inline_code",
  INLINE_QUOTE: "inline_quote",
  INLINE_IMAGE: "inline_image",
  HIGHLIGHT: "highlight",
  SUBSCRIPT: "subscript",
  SUPERSCRIPT: "superscript",
  MENTION: "mention",
  INDENT: "indent",
  CONVERT: "convert",
  COPY_LINK: "copy_link",
  DELETE: "delete",
  AI: "ai",
  EMOJI: "emoji",

  COLOR: "color",
  BACKGROUND: "background",

  FONT_FAMILY: "font_family",
  FONT_SIZE: "font_size",
  LETTER_CASE: "letter_case",
  LINE_HEIGHT: "line_height",
  TEXT_ALIGN: "text_align",
  SPACING: "spacing",
  LETTER_SPACING: "letter_spacing",
  WORD_SPACING: "word_spacing",
  TOGGLE_CASE: "case_toggle",
  LOWERCASE: "case_lower",
  UPPERCASE: "case_upper",
} as const;


export const inputTypes = {
  insert: {
    BLOCK: "insertBlock",

    CONTENT: "",

    PARA: "insertParagraph",

    OL: "insertOrderedList",
    UL: "insertUnorderedList",
    CL: "insertCheckList",

    BR: "insertLineBreak",
    HR: "insertHorizontalRule",
  },
  delete: {
    BLOCK: "deleteBlock",

    WORD_BACKWARD: "deleteWordBackward",
    WORD_FORWARD: "deleteWordForward",

    CONTENT: "deleteContent",
    CONTENT_BACKWARD: "deleteContentBackward",
    CONTENT_FORWARD: "deleteContentForward",

    SOFT_LINE_ENTIRE: "deleteEntireSoftLine",
    SOFT_LINE_BACKWARD: "deleteSoftLineBackward",
    SOFT_LINE_FORWARD: "deleteSoftLineForward",

    HARD_LINE_BACKWARD: "deleteHardLineBackward",
    HARD_LINE_FORWARD: "deleteHardLineForward",
  },
  format: {
    BOLD: "formatBold",
    ITALIC: "formatItalic",
    UNDERLINE: "formatUnderline",
    STRIKE_THROUGH: "formatStrikeThrough",
    SUPERSCRIPT: "formatSuperscript",
    SUBSCRIPT: "formatSubscript",
    LINK: "formatLink",
    INLINE_CODE: "formatInlineCode",
    INLINE_QUOTE: "formatInlineQuote",
    INLINE_IMAGE: "formatInlineImage",

    // FRONT_COLOR: "formatFrontColor",
    // BACK_COLOR: "formatBackColor",
    color: {
      FRONT: "formatFrontColor",
      BACK: "formatBackColor",
    },

    // FONT_FAMILY: "formatFontFamily",
    // FONT_SIZE: "formatFontSize",
    font: {
      FAMILY: "formatFontFamily",
      SIZE: "formatFontSize",
    },

    TEXT_DIRECTION: "formatTextDirection",

    INDENT: "formatIndent",
    OUTDENT: "formatOutdent",

    // ALIGN_LEFT: "formatJustifyLeft",
    // ALIGN_RIGHT: "formatJustifyRight",
    // ALIGN_CENTER: "formatJustifyCenter",
    // ALIGN_FULL: "formatJustifyFull",
    justify: {
      FULL: "formatJustifyFull",
      LEFT: "formatJustifyLeft",
      RIGHT: "formatJustifyRight",
      CENTER: "formatJustifyCenter",
    },

    LINE_HEIGHT: "formatLineHeight",
    LETTER_CASE: "formatLetterCase",
    LETTER_SPACING: "formatLetterSpacing",
    WORD_SPACING: "formatWordSpacing",

    REMOVE: "formatRemove",
  },
  history: {
    UNDO: "historyUndo",
    REDO: "historyRedo",
  }
} as const;

import { CSSProperties, Fragment } from "react";

import styles from "./RenderFormattedText.module.scss";

export interface RenderFormattedTextProps {
  data?: any;
}

const RenderFormattedText = ({
  data,
}: RenderFormattedTextProps) => {

  const generateFormattedText = (_data: any[], offset: number = 0) => {
    return _data?.map((item: any, idx) => {
      if (!item.type || item.type === "text") {
        return <Fragment key={idx}>{item.text}</Fragment>;
      }

      if (item.type === "br") {
        return <br key={idx} />;
      }

      if (!item.children?.length) return null;

      const decorations: CSSProperties = {}; // [--ff, --fs, --fw, --ls, --ws, --lh, --lc, --c, --bg]
      for (const dec of Object.keys(item.config ?? {})) {
        const cssVar = `--${dec}` as keyof CSSProperties;
        decorations[cssVar] = item.config[dec];
      }

      switch (item.type) {
        case "bold":
          return <strong key={idx} style={{ ...decorations }}>{generateFormattedText(item.children)}</strong>;
        case "italic":
          return <em key={idx} style={{ ...decorations }}>{generateFormattedText(item.children)}</em>;
        case "underline":
          return <u key={idx} style={{ ...decorations }}>{generateFormattedText(item.children)}</u>;
        case "line_through":
          return <s key={idx} style={{ ...decorations }}>{generateFormattedText(item.children)}</s>;
        case "link":
          return <a key={idx} style={{ ...decorations }}>{generateFormattedText(item.children)}</a>;
        case "inline_code":
          return <code key={idx} style={{ ...decorations }}>{generateFormattedText(item.children)}</code>;
        case "highlight":
          return <mark key={idx} style={{ ...decorations }}>{generateFormattedText(item.children)}</mark>;
        case "sub":
          return <sub key={idx} style={{ ...decorations }}>{generateFormattedText(item.children)}</sub>;
        case "sup":
          return <sup key={idx} style={{ ...decorations }}>{generateFormattedText(item.children)}</sup>;
        case "newline":
          return <br key={idx} />;
        // case "mention":
        //   return <span></span>;
        // case "hashtag":
        //   return <span></span>;
        case "span":
          return <span key={idx} style={{ ...decorations }}>{generateFormattedText(item.children)}</span>;
        default:
          return null;
      }
    });
  };

  return generateFormattedText(data);
};

export default RenderFormattedText;

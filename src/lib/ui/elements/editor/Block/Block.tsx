import { CSSProperties } from "react";

import { editorBlocks } from "@/constants/editor.const";
import { RenderFormattedText } from "@/lib/ui/elements/editor/RenderFormattedText";
import { classes } from "@/lib/utils/style.utils";

import { CodeBlock, CollapsibleBlock, EmbedBlock, ImageBlock, ListBlock, NoteBlock, QuoteBlock, TableBlock } from ".";
import styles from "./Block.module.scss";

export interface BlockProps {
  data?: any;
  edit?: boolean;
}

const Block = ({
  data, edit, ...props
}: BlockProps) => {
  const configurations: CSSProperties = {}; // todo: block configs [--ta, --indent(2ch*N)]

  switch (data.type) {
    case editorBlocks.H1:
      return (
        <h1
          data-block={data.id}
          className={classes(styles.block, !data.children?.length && styles.empty)}
          {...props}
        >
          {(!data.children?.length && edit) ? <br /> : null}
          <RenderFormattedText data={data.children} />
        </h1>
      );
    case editorBlocks.H2:
      return (
        <h2
          data-block={data.id}
          className={classes(styles.block, !data.children?.length && styles.empty)}
          {...props}
        >
          {(!data.children?.length && edit) ? <br /> : null}
          <RenderFormattedText data={data.children} />
        </h2>
      );
    case editorBlocks.H3:
      return (
        <h3
          data-block={data.id}
          className={classes(styles.block, !data.children?.length && styles.empty)}
          {...props}
        >
          {(!data.children?.length && edit) ? <br /> : null}
          <RenderFormattedText data={data.children} />
        </h3>
      );
    case editorBlocks.H4:
      return (
        <h4
          data-block={data.id}
          className={classes(styles.block, !data.children?.length && styles.empty)}
          {...props}
        >
          {(!data.children?.length && edit) ? <br /> : null}
          <RenderFormattedText data={data.children} />
        </h4>
      );
    case editorBlocks.PARA:
      return (
        <p
          data-block={data.id}
          className={classes(styles.block, !data.children?.length && styles.empty)}
          {...props}
        >
          {(!data.children?.length && edit) ? <br /> : null}
          <RenderFormattedText data={data.children} />
        </p>
      );
    case editorBlocks.DIVIDER:
      return (
        <hr
          tabIndex={-1}
          data-block={data.id}
          className={classes(styles.block, styles.divider)}
          id={data.id}
        />
      );
    case editorBlocks.QUOTE:
      return <QuoteBlock data={data} {...props} />;
    case editorBlocks.NOTE:
      return <NoteBlock data={data} {...props} />;
    case editorBlocks.CODE:
      return <CodeBlock data={data} {...props} />;
    case editorBlocks.IMAGE:
      return <ImageBlock data={data} {...props} />;
    case editorBlocks.COLLAPSIBLE:
      return <CollapsibleBlock data={data} {...props} />;
    case editorBlocks.TABLE:
      return <TableBlock data={data} {...props} />;
    case editorBlocks.ORDERED_LIST:
    case editorBlocks.UNORDERED_LIST:
    case editorBlocks.CHECK_LIST:
      return <ListBlock data={data} {...props} />;
    case editorBlocks.YOUTUBE:
    case editorBlocks.GITHUB:
    case editorBlocks.CODEPEN:
    case editorBlocks.CODESANDBOX:
      return <EmbedBlock data={data} {...props} />;
    default:
      return null;
  }
};

export default Block;

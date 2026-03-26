import { CSSProperties } from "react";

import { RenderFormattedText } from "@/lib/components/elements/editor/RenderFormattedText";
import { EditorBlocks } from "@/lib/constants/editor";
import { classes } from "@/lib/utils/style";

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
    case EditorBlocks.H1:
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
    case EditorBlocks.H2:
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
    case EditorBlocks.H3:
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
    case EditorBlocks.H4:
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
    case EditorBlocks.PARA:
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
    case EditorBlocks.DIVIDER:
      return (
        <hr
          tabIndex={-1}
          data-block={data.id}
          className={classes(styles.block, styles.divider)}
          id={data.id}
        />
      );
    case EditorBlocks.QUOTE:
      return <QuoteBlock data={data} {...props} />;
    case EditorBlocks.NOTE:
      return <NoteBlock data={data} {...props} />;
    case EditorBlocks.CODE:
      return <CodeBlock data={data} {...props} />;
    case EditorBlocks.IMAGE:
      return <ImageBlock data={data} {...props} />;
    case EditorBlocks.COLLAPSIBLE:
      return <CollapsibleBlock data={data} {...props} />;
    case EditorBlocks.TABLE:
      return <TableBlock data={data} {...props} />;
    case EditorBlocks.ORDERED_LIST:
    case EditorBlocks.UNORDERED_LIST:
    case EditorBlocks.CHECK_LIST:
      return <ListBlock data={data} {...props} />;
    case EditorBlocks.YOUTUBE:
    case EditorBlocks.GITHUB:
    case EditorBlocks.CODEPEN:
    case EditorBlocks.CODESANDBOX:
      return <EmbedBlock data={data} {...props} />;
    default:
      return null;
  }
};

export default Block;

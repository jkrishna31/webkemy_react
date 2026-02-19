import { classes } from "@/lib/utils/style.utils";

import blockStyles from "../Block.module.scss";
import styles from "./NoteBlock.module.scss";

export interface NoteBlockProps {
  data?: any;
}

const NoteBlock = ({
  data,
}: NoteBlockProps) => {
  return (
    <div data-block className={classes(blockStyles.block, styles.block)} id={data.id}>
      <b className={styles.label} contentEditable={false}>{"Tip"}</b>
      <p className={styles.content}>{data.data}</p>
    </div>
  );
};

export default NoteBlock;

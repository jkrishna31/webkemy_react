import { classes } from "@/lib/utils/style.utils";

import blockStyles from "../Block.module.scss";
import styles from "./QuoteBlock.module.scss";

export interface QuoteBlockProps {
  data?: any;
}

const QuoteBlock = ({
  data,
}: QuoteBlockProps) => {
  return (
    <blockquote
      data-block
      className={classes(blockStyles.block, styles.box, styles.quote)}
      id={data.id}
    >
      {data.data}
    </blockquote>
  );
};

export default QuoteBlock;

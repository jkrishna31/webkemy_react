import { ComponentProps } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import QuoteIcon from "@/lib/ui/svgs/icons/QuoteIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatQuoteCard.module.scss";

export interface ChatQuoteCardProps extends ComponentProps<"div"> {
  chat?: any;
  onCancel?: () => void;
}

const ChatQuoteCard = ({
  chat, onCancel,
  className, children,
  ...restProps
}: ChatQuoteCardProps) => {
  return (
    <div className={classes(styles.wrapper, className)} {...restProps}>
      <div className={styles.wrapper_inner}>
        <div className={styles.quoted_header}>
          <QuoteIcon />
          <p>{chat.author.name}</p>
        </div>
        <p className={styles.quoted_msg}>{chat.content.slice(0, 80)}</p>
      </div>
      {!!onCancel && (
        <Button variant="quaternary" className={styles.cancel_btn} onClick={onCancel}>
          <CrossIcon />
        </Button>
      )}
    </div>
  );
};

export default ChatQuoteCard;

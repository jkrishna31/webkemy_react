import { characters } from "@/constants/characters.const";
import { Button, ButtonProps } from "@/lib/components/elements/butttons";
import ReplyIcon from "@/lib/svgs/icons/ReplyIcon";
import { classes } from "@/lib/utils/style";

import styles from "./RepliesBtn.module.scss";

export interface RepliesBtnProps extends ButtonProps<"button"> {
  chat?: any;
  isConversation?: boolean;
}

const RepliesBtn = ({
  chat, isConversation = true,
  className, children,
  ...restProps
}: RepliesBtnProps) => {
  return (
    <Button
      variant="muted"
      className={classes(styles.btn, className)}
      {...restProps}
    >
      {/* todo: if replies count is same as unread count then don't show like: 4 replies with blue color */}
      {(!isConversation || (isConversation && chat.author.id !== "me")) && <ReplyIcon />}
      {chat.replies} {"Replies"} <span className={styles.separator}>{characters.BULLET}</span> <span className={styles.unread}>{4}{" Unread"}</span>
      {(isConversation && chat.author.id === "me") && <ReplyIcon />}
    </Button>
  );
};

export default RepliesBtn;

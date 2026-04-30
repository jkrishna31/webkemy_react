import { ComponentProps, ReactNode } from "react";

import { Avatar } from "@/lib/components/elements/avatar";
import { Button } from "@/lib/components/elements/buttton";
import { RepliesBtn } from "@/lib/components/elements/chat/RepliesBtn";
import BotMessageIcon from "@/lib/svgs/icons/BotMessageIcon";
import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import { formatDate } from "@/lib/utils/datetime";
import { classes } from "@/lib/utils/style";

import styles from "./ChatCard.module.scss";

export interface ChatCardProps extends ComponentProps<"div"> {
  chat: any;
  action?: ReactNode;
  onCancel?: () => void;
  onReplies?: () => void;
  onAuthor?: () => void;
}

const ChatCard = ({
  chat, action, onCancel, onReplies, onAuthor,
  className, children,
  ...restProps
}: ChatCardProps) => {
  return (
    <div
      className={classes(styles.wrapper, chat.author.id === "me" && styles.own, className)}
    >
      <div className={styles.header}>
        <div className={styles.user} onClick={onAuthor}>
          {
            chat.author.profile
              ? <Avatar className={styles.avatar} src={chat.author.profile} alt={chat.author.name} />
              : <BotMessageIcon />
          }
          <div className={styles.details}>
            <p className={styles.author}>{chat.author.name}</p>
            <p className={styles.datetime}>{formatDate(chat.datetime)}</p>
            {/*todo: format - 15 Mar 2026, 9:34pm */}
          </div>
        </div>
        {action ?? (
          <Button
            variant="muted"
            className={styles.act_btn}
            title="Remove"
            aria-label="Remove"
            onClick={onCancel}
          >
            <CrossIcon />
          </Button>
        )}
      </div>
      <div className={styles.body}>
        {chat.content.split("\n").map((item: string, idx: number) => (
          <p key={idx}>{item}</p>
        ))}
        {/* todo: media */}
      </div>
      {!!chat.replies && <RepliesBtn chat={chat} isConversation={false} onClick={onReplies} className={styles.replies} />}
      {children}
    </div>
  );
};

export default ChatCard;

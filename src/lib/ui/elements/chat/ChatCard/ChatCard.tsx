import Image from "next/image";
import { ComponentProps, ReactNode } from "react";

import { Avatar } from "@/lib/ui/elements/Avatar";
import { Button } from "@/lib/ui/elements/butttons";
import { RepliesBtn } from "@/lib/ui/elements/chat/RepliesBtn";
import BotMessageIcon from "@/lib/ui/svgs/icons/BotMessageIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import { formatDate } from "@/lib/utils/datetime.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatCard.module.scss";

export interface ChatCardProps extends ComponentProps<"div"> {
  chat: any;
  action?: ReactNode;
}

const ChatCard = ({
  chat, action,
  className, children,
  ...restProps
}: ChatCardProps) => {
  return (
    <div
      className={classes(styles.wrapper, chat.author.id === "me" && styles.own, className)}
    >
      <div className={styles.header}>
        {chat.author.profile ? (
          <Avatar className={styles.avatar}>
            <Image
              src={chat.author.profile}
              alt={chat.author.name}
              width={30}
              height={30}
            />
          </Avatar>
        ) : <BotMessageIcon />}
        <div className={styles.details}>
          <p className={styles.author}>{chat.author.name}</p>
          <p className={styles.datetime}>{formatDate(chat.datetime)}</p>
          {/*todo: format - 15 Mar 2026, 9:34pm */}
        </div>
        {action ?? (
          <Button
            variant="quaternary"
            className={styles.act_btn}
            title="Remove"
            aria-label="Remove"
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
      {!!chat.replies && <RepliesBtn chat={chat} isConversation={false} className={styles.replies} />}
      {children}
    </div>
  );
};

export default ChatCard;

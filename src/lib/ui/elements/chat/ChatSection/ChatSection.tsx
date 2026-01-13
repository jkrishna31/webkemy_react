import { ComponentProps } from "react";

import { ChatItem } from "@/lib/ui/elements/chat/ChatItem";
import { compareDateByPrecision, formatDate } from "@/lib/utils/datetime.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatSection.module.scss";

export interface ChatSectionProps extends ComponentProps<"div"> {
  chats?: any
}

const ChatSection = ({
  chats, className,
  ...restProps
}: ChatSectionProps) => {
  return (
    <div className={classes(styles.wrapper, className)} {...restProps}>
      <time className={styles.datetime}>{formatDate(chats[0].datetime)}</time>
      {
        chats?.reduce((acc: any[], item: any, idx: number) => {
          if (!acc.length) {
            acc.push({
              ...item,
              content: [item.content]
            });
          } else {
            const last = acc[acc.length - 1];
            if (last.author.id === item.author.id && !compareDateByPrecision(last.datetime, item.datetime, ["hour", "minute"])) {
              last.content.push(item.content);
            } else {
              acc.push({
                ...item,
                content: [item.content]
              });
            }
          }
          return acc;
        }, [])?.map((chat: any) => <ChatItem chat={chat} key={chat.id} />)
      }
    </div>
  );
};

export default ChatSection;

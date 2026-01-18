import Image from "next/image";
import { ComponentProps } from "react";

import { characters } from "@/constants/characters.const";
import { Avatar } from "@/lib/ui/elements/Avatar";
import BotMessageIcon from "@/lib/ui/svgs/icons/BotMessageIcon";
import CheckMarkIcon from "@/lib/ui/svgs/icons/CheckMarkIcon";
import DoubleCheckIcon from "@/lib/ui/svgs/icons/DoubleCheckIcon";
import { formatTime } from "@/lib/utils/datetime.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatItem.module.scss";

export interface ChatItemProps extends ComponentProps<"div"> {
  chat?: any
}

const ChatItem = ({
  chat, className,
  ...restProps
}: ChatItemProps) => {
  return (
    <div
      data-author={chat.author.id}
      className={classes(styles.wrapper, className)}
      {...restProps}
    >
      {
        chat.author.id !== "me" ? (
          <div className={styles.left}>
            <Avatar className={styles.profile_container}>
              <BotMessageIcon className={styles.profile} />
            </Avatar>
            {/* <Image src="/images/face12.jpg" alt="" width={40} height={40} className={styles.profile} /> */}
          </div>
        ) : null
      }
      <div className={styles.right}>
        {
          chat.author.id !== "me" ? (
            <div className={classes(styles.meta, styles.meta_head)}>
              <span className={styles.author}>{"Bot"}</span>
              {characters.BULLET}
              <time className={styles.msg_time}>{formatTime(chat.datetime)}</time>
            </div>
          ) : null
        }
        <div className={styles.chat_list}>
          {
            chat.content?.map((item: string, idx: number) => (
              <div key={idx} className={styles.chat}>
                {item?.split("\n")?.map((part, pIdx) => (
                  <p key={`${idx}-${pIdx}`}>{part}</p>
                ))}
              </div>
            ))
          }
          {/*
            + content.type (text/md, media/image, media/audio, media/video)
          */}
        </div>
        {chat.author.id === "me" && (
          <div className={styles.meta}>
            {/* Edited, Deleted */}
            {/* <span>{"Edited"}  {characters.BULLET}</span> */}
            <time className={styles.msg_time}>{formatTime(chat.datetime)}</time>
            {/* <CheckMarkIcon className={styles.msg_status} /> */}
            <DoubleCheckIcon className={styles.msg_status} aria-label="Read" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;

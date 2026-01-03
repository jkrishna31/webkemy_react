import React, { ComponentProps } from "react";

import { characters } from "@/constants/characters.const";
import BotMessageIcon from "@/lib/ui/svgs/icons/BotMessageIcon";
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
        chat.author.id !== "me" && false ? (
          <div className={styles.left}>
            <div className={styles.profile_container}>
              <BotMessageIcon className={styles.profile} />
              {/* <Image src="/images/face11.jpg" alt="" width={40} height={40} className={styles.profile} /> */}
            </div>
          </div>
        ) : null
      }
      <div className={styles.right}>
        <div className={styles.meta}>
          <p>
            {
              chat.author.id !== "me" ? (
                <>
                  <span className={styles.author}>{"Bot"}</span>
                  {characters.BULLET}
                </>
              ) : null
            }
            <time>{formatTime(chat.datetime)}</time>
          </p>
        </div>
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
      </div>
    </div>
  );
};

export default ChatItem;

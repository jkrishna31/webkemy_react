import Image from "next/image";
import { ComponentProps } from "react";

import { characters } from "@/constants/characters.const";
import { Avatar } from "@/lib/ui/elements/Avatar";
import { Button } from "@/lib/ui/elements/butttons";
import { ChatMedia } from "@/lib/ui/elements/chat/ChatMedia";
import { Reactions } from "@/lib/ui/elements/chat/Reactions";
import BotMessageIcon from "@/lib/ui/svgs/icons/BotMessageIcon";
import CheckMarkIcon from "@/lib/ui/svgs/icons/CheckMarkIcon";
import DoubleCheckIcon from "@/lib/ui/svgs/icons/DoubleCheckIcon";
import ReplyIcon from "@/lib/ui/svgs/icons/ReplyIcon";
import { formatTime } from "@/lib/utils/datetime.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatItem.module.scss";

export interface ChatItemProps extends ComponentProps<"div"> {
  chat?: any;
  selectedChats?: string | string[];
}

const ChatItem = ({
  chat, selectedChats,
  className,
  ...restProps
}: ChatItemProps) => {
  const isSelected = (chatId: string) => {
    if (typeof selectedChats === "string" && selectedChats === chatId) return true;
    if (Array.isArray(selectedChats) && selectedChats?.includes(chatId)) return true;
    return false;
  };

  return (
    <div
      data-author={chat.author.id}
      // data-id={chat.id}
      className={classes(styles.wrapper, className)}
      {...restProps}
    >
      {
        chat.author.id === "system" ? (
          <div className={styles.system_group}>
            {
              chat.content?.map((item: { id: string; content: string; }, idx: number) => (
                <div
                  key={idx}
                  className={styles.system}
                  data-author={chat.author.id}
                >
                  {item.content}
                </div>
              ))
            }
          </div>
        ) : (
          <>
            {
              chat.author.id !== "me" ? (
                <div className={styles.left}>
                  <Avatar className={styles.profile_container}>
                    {chat.author.profile ? (
                      <Image src={chat.author.profile} alt={chat.author.name} width={30} height={30} />
                    ) : (
                      <BotMessageIcon className={styles.profile} />
                    )}
                  </Avatar>
                </div>
              ) : null
            }
            <div className={styles.right}>
              {
                chat.author.id !== "me" ? (
                  <div className={classes(styles.meta, styles.meta_head)}>
                    <span className={styles.author}>{chat.author?.name ?? "Bot"}</span>
                    <time className={styles.msg_time}>{formatTime(chat.datetime)}</time>
                  </div>
                ) : null
              }
              {chat.author.id === "me" && (
                <div className={styles.meta}>
                  {/* <span>{"Edited"}</span>
                  <span className={styles.separator}>{characters.BULLET}</span> */}
                  <time className={styles.msg_time}>{formatTime(chat.datetime)}</time>
                  {/* <CheckMarkIcon className={styles.msg_status} aria-label="Sent" /> */}
                  <DoubleCheckIcon className={styles.msg_status} aria-label="Read/Received" />
                </div>
              )}
              <div className={styles.chat_list}>
                {
                  chat.content?.map((item: { id: string; content: string; media: any[] }, idx: number) => {
                    const _isSelected = isSelected(item.id);
                    return (
                      <div
                        key={idx}
                        className={styles.content_item}
                        data-author={chat.author.id}
                        data-id={item.id}
                      >
                        <div
                          className={styles.chat}
                          data-selected={_isSelected}
                        >
                          {item.content?.split("\n")?.map((part, pIdx) => (
                            <p key={`${idx}-${pIdx}`}>{part}</p>
                          ))}
                        </div>
                        {!!item.media?.length && (
                          <ChatMedia
                            media={item.media}
                            className={styles.chat_media}
                            data-selected={_isSelected}
                          />
                        )}
                      </div>
                    );
                  })
                }
              </div>
              {!!chat.reactions?.length && <Reactions reactions={chat.reactions} />}
              {chat.replies > 0 && (
                <Button
                  variant="tertiary"
                  className={styles.replies_btn}
                >
                  {/* todo: if replies count is same as unread count then don't show like: 4 replies with blue color */}
                  {chat.author.id !== "me" && <ReplyIcon />}
                  {chat.replies} {"Replies"} <span className={styles.separator}>{characters.BULLET}</span> <span className={styles.unread}>{4}{" Unread"}</span>
                  {chat.author.id === "me" && <ReplyIcon />}
                </Button>
              )}
            </div>
          </>
        )
      }
    </div>
  );
};

export default ChatItem;

import Image from "next/image";
import { ComponentProps, MouseEvent } from "react";

import { Avatar } from "@/lib/ui/elements/Avatar";
import { Button } from "@/lib/ui/elements/butttons";
import { ChatMedia } from "@/lib/ui/elements/chat/ChatMedia";
import { ChatQuoteCard } from "@/lib/ui/elements/chat/ChatQuoteCard";
import { QuickActions } from "@/lib/ui/elements/chat/QuickActions";
import { Reactions } from "@/lib/ui/elements/chat/Reactions";
import { RepliesBtn } from "@/lib/ui/elements/chat/RepliesBtn";
import { Progress } from "@/lib/ui/elements/Progress";
import BotMessageIcon from "@/lib/ui/svgs/icons/BotMessageIcon";
import CheckMarkIcon from "@/lib/ui/svgs/icons/CheckMarkIcon";
import ClockwiseIcon from "@/lib/ui/svgs/icons/ClockwiseIcon";
import DoubleCheckIcon from "@/lib/ui/svgs/icons/DoubleCheckIcon";
import PinIcon from "@/lib/ui/svgs/icons/PinIcon";
import StarIcon from "@/lib/ui/svgs/icons/StarIcon";
import { formatTime } from "@/lib/utils/datetime.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatItem.module.scss";

export interface ChatItemProps extends ComponentProps<"div"> {
  chat?: any;
  selectedChats?: string | string[];
  onMediaClick?: (chatId: string, mediaId?: string) => void;
  quickReactions?: string[];
  onQuickActionClick?: (e: MouseEvent, key?: string, chatId?: string) => void;
}

export interface ChatControlsProps {
  loading?: boolean;
  retry?: boolean;
  className?: string;
}

export const ChatControls = ({ loading, retry, className }: ChatControlsProps) => {
  return (
    <div className={classes(styles.chat_controls, className)}>
      {!!loading && (
        <Progress variant="circular" thickness={12} className={styles.progress} />
      )}
      {!!retry && (
        <Button
          variant="quaternary"
          className={styles.retry_btn}
          aria-label="Retry"
          title="Retry"
        >
          <ClockwiseIcon />
        </Button>
      )}
    </div>
  );
};

const ChatItem = ({
  chat, selectedChats, onMediaClick, quickReactions, onQuickActionClick,
  className,
  ...restProps
}: ChatItemProps) => {
  const isSelected = (chatId: string) => {
    if (typeof selectedChats === "string" && selectedChats === chatId) return true;
    if (Array.isArray(selectedChats) && selectedChats?.includes(chatId)) return true;
    return false;
  };

  const handleReactionClick = (e: MouseEvent, key?: string) => {
    onQuickActionClick?.(e, key ?? "ADD_REACTION", chat.id);
  };

  return (
    <div
      data-author={chat.author.id}
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
                    {!!chat.pinned && <PinIcon className={styles.pinned} />}
                    {!!chat.starred && <StarIcon className={styles.starred} />}
                  </div>
                ) : null
              }
              {chat.author.id === "me" && (
                <div className={styles.meta}>
                  {!!chat.starred && <StarIcon className={styles.starred} />}
                  {!!chat.pinned && <PinIcon className={styles.pinned} />}
                  {/* <span>{"Edited"}</span>
                  <span className={styles.separator}>{characters.BULLET}</span> */}
                  <time className={styles.msg_time}>{formatTime(chat.datetime)}</time>
                  {/* <CheckMarkIcon className={styles.msg_status} aria-label="Sent" /> */}
                  <DoubleCheckIcon className={styles.msg_status} aria-label="Read/Received" />
                </div>
              )}
              <div className={styles.chat_list}>
                {
                  chat.content?.map((item: { id: string; content: string; media: any[]; status?: string; quoted?: any }, idx: number) => {
                    const _isSelected = isSelected(item.id);
                    const isTruncated = item.content.length > 500; // && not expanded
                    return (
                      <div
                        key={idx}
                        className={styles.content_item}
                        data-author={chat.author.id}
                        data-id={item.id}
                      >
                        <div className={styles.chat_wrapper}>
                          {item.status === "failed" && <ChatControls retry />}
                          <div
                            // data-loading="true"
                            className={classes(styles.chat, chat.author.id === "me" && styles.green, isTruncated && styles.trunc)}
                            data-selected={_isSelected}
                          >
                            {!!item.quoted && <ChatQuoteCard chat={item.quoted} />}
                            {item.content?.split("\n")?.map((part, pIdx) => (
                              <p key={`${idx}-${pIdx}`}>{part}</p>
                            ))}
                            {isTruncated && (
                              <Button className={styles.show_more_btn}>
                                <span>{"Show More"}</span>
                              </Button>
                            )}
                          </div>
                        </div>
                        {!!item.media?.length && (
                          <ChatMedia
                            chatId={item.id}
                            media={item.media}
                            className={classes(styles.chat_media, chat.author.id === "me" && styles.green)}
                            data-selected={_isSelected}
                            onMediaClick={onMediaClick}
                          />
                        )}
                        <QuickActions
                          quickReactions={quickReactions}
                          onClick={onQuickActionClick ? (e, key) => onQuickActionClick?.(e, key, chat.id) : undefined}
                          className={styles.actions}
                        />
                      </div>
                    );
                  })
                }
              </div>
              {!!chat.reactions?.length && <Reactions reactions={chat.reactions} onClick={handleReactionClick} />}
              {chat.replies > 0 && <RepliesBtn chat={chat} className={styles.replies_btn} />}
            </div>
          </>
        )
      }
    </div>
  );
};

export default ChatItem;

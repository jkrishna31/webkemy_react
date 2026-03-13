"use client";

import { ComponentProps, ReactNode, useCallback, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";

import useFirstRender from "@/lib/hooks/useFirstRender";
import { useLongPress } from "@/lib/hooks/useLongPress";
import { useMutationObserver } from "@/lib/hooks/useMutationObserver";
import { useScroll } from "@/lib/hooks/useScroll";
import { Button } from "@/lib/ui/elements/butttons";
import { ChatSection } from "@/lib/ui/elements/chat/ChatSection";
import { MediaViewer } from "@/lib/ui/elements/chat/MediaViewer";
import { EmojiPicker } from "@/lib/ui/elements/EmojiPicker";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Popover } from "@/lib/ui/elements/Popover";
import AddEmojiIcon from "@/lib/ui/svgs/icons/AddEmojiIcon";
import ChevronsDownIcon from "@/lib/ui/svgs/icons/ChevronsDownIcon";
import CopyIcon from "@/lib/ui/svgs/icons/CopyIcon";
import DeleteIcon from "@/lib/ui/svgs/icons/DeleteIcon";
import EditIcon from "@/lib/ui/svgs/icons/EditIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import PinIcon from "@/lib/ui/svgs/icons/PinIcon";
import ReplyIcon from "@/lib/ui/svgs/icons/ReplyIcon";
import SpoolIcon from "@/lib/ui/svgs/icons/SpoolIcon";
import StarIcon from "@/lib/ui/svgs/icons/StarIcon";
import { compareDateByPrecision } from "@/lib/utils/datetime.utils";
import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatList.module.scss";

const defaultOptions = [
  {
    id: "add_reaction",
    label: "Add Reaction",
    icon: <AddEmojiIcon />,
  },
  {
    id: "quote_reply",
    label: "Quote in Reply",
    icon: <ReplyIcon />,
  },
  {
    id: "edit",
    label: "Edit",
    icon: <EditIcon />,
  },
  {
    id: "more",
    label: "More",
    icon: <EllipsisHIcon />,
  }
];

const otherOptions = [
  {
    id: "thread_reply",
    label: "Reply in Thread",
    icon: <SpoolIcon />,
    disabled: true,
  },
  {
    id: "copy",
    label: "Copy",
    icon: <CopyIcon />,
  },
  {
    id: "pin",
    label: "Pin",
    icon: <PinIcon />,
  },
  {
    id: "star",
    label: "Star",
    icon: <StarIcon />,
  },
  {
    id: "delete",
    label: "Delete",
    icon: <DeleteIcon />,
  },
];

export interface ChatListProps extends ComponentProps<"div"> {
  chats?: any;
  lastReadMsgId?: string;
  onShowReplies?: (chat: any) => void;
  onReact?: () => void;
  onShowReaction?: () => void;
  quickReactions?: string[];
}

const ChatList = ({
  chats, lastReadMsgId, quickReactions,
  onShowReplies,
  ref, className,
  ...restProps
}: ChatListProps) => {
  const _ref = useRef<HTMLDivElement>(null);
  const sentinalRef = useRef<HTMLDivElement>(null);

  const prevChatWindowSize = useRef<{ height: number; width: number; }>({ height: 0, width: 0 });

  // auto scroll to latest message, off when manually scrolled up, reset when reach bottom
  const [autoScroll, setAutoScroll] = useState(true);
  const [showOptionsFor, setShowOptionsFor] = useState<HTMLElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedChats, setSelectedChats] = useState<string | string[]>();
  const [showMedia, setShowMedia] = useState<{ mediaId?: string; chatId?: string; }>();

  const mediaList = useMemo(() => {
    if (showMedia?.chatId) {
      return chats.find((item: any) => item.id === showMedia.chatId).media;
    }
    return [];
  }, [chats, showMedia?.chatId]);

  // TODOS:
  // = handle unread messages on opening chat [if new messages add the unread banner before that]
  // = handle read status [so that sender will know]
  // = if at bottom & new messages comes, then scrolling to bottom
  // = if new messages comes but not at bottom, then show 'new messages' scroll to btn
  // = show the list of individual reactions details on long press
  // = retry btn to send an msg item or any of it's media item
  // = full msg view for large messages

  const { isOnBoundary, handleScroll } = useScroll({ target: _ref, margin: 50, delay: 150, initialState: true });

  const handleScrollToBottom = (behavior: "smooth" | "instant" = "instant") => {
    requestAnimationFrame(() => {
      if (_ref.current && _ref.current.scrollHeight !== _ref.current.clientHeight) {
        _ref.current.scrollTo({
          top: _ref.current.scrollHeight,
          behavior,
        });
        // sentinalRef.current?.scrollIntoView({ block: "end", behavior });
      }
    });
  };

  const closeMenu = () => {
    setShowOptionsFor(null);
    setShowEmojiPicker(false);
    setSelectedChats(undefined);
  };

  const handleChatSelection = useCallback((chatId: string) => {
    // todo: if already selected, then remove from selection [will trigger on chat click]
    setSelectedChats((curr?: string | string[]) => {
      if (!curr || !curr?.length) return chatId;
      if (!curr?.includes(chatId)) return [...curr, chatId];
      return curr;
    });
  }, []);

  const handleMsgContext = useCallback((e: React.MouseEvent | TouchEvent) => {
    const msgElem = (e.target as HTMLElement).closest("[data-author]");
    const msgId = msgElem?.getAttribute("data-id");
    if (msgElem && msgId) {
      e.preventDefault();
      setShowOptionsFor(msgElem as HTMLElement);
      handleChatSelection(msgId);
    }
  }, [handleChatSelection]);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (!showOptionsFor) {
      handleMsgContext(e);
    }
  };

  const handleMenuClick = (key: string) => {
    if (key === "add_reaction") {
      setShowEmojiPicker(true);
    } else if (key === "quote_reply") {
      // on quote show that quoted msg ui or specific selection in the chat composer, & on click of that goto that msg
      // remove btn
    } else if (key === "edit") {
      // append in the chat composer both msg & date; & also highlight the og msg
      // cancel btn
    } else if (key === "copy") {
      // copy from element content with formatting (but how to handle media); or copy from data but lose formatting
    } else if (key === "pin") {

    } else if (key === "star") {

    } else if (key === "delete") {
      // show delete confirmation modal & on confirm delete; after delete show the
    }
  };

  const handleMediaClick = useCallback((chatId: string, mediaId?: string) => {
    setShowMedia({ chatId, mediaId: mediaId });
  }, []);

  // const handleMutation = useCallback((mutations: MutationRecord[]) => {
  //   if (mutations.length && mutations[mutations.length - 1].addedNodes?.length) {
  //     handleScrollToBottom();
  //   }
  // }, []);

  // useMutationObserver(_ref, handleMutation);

  useLongPress(_ref, handleMsgContext);

  const scrollToBottomEvent = useEffectEvent(() => {
    if (autoScroll) handleScrollToBottom();
  });

  useEffect(() => {
    if (chats[chats.length - 1].author.id === "me") handleScrollToBottom();
    else scrollToBottomEvent();
  }, [chats]);

  useEffect(() => {
    setAutoScroll(isOnBoundary ?? false);
  }, [isOnBoundary]);

  useEffect(() => {
    const elem = _ref.current;
    if (elem) {
      const observer = new ResizeObserver((e) => {
        const newSize = e[0].contentRect;
        if (prevChatWindowSize.current.height !== newSize.height || prevChatWindowSize.current.width !== newSize.width) {
          handleScroll();
          prevChatWindowSize.current = { width: newSize.width, height: newSize.height };
        }
      });
      observer.observe(elem);
      return () => observer.disconnect();
    }
  }, [handleScroll]);

  const renderChats = (chats: any, idx: number): ReactNode => {
    if (idx >= chats.length) return null;

    const sec = [];
    let i;
    for (i = idx; i < chats.length; i++) {
      if (!compareDateByPrecision(chats[i].datetime, chats[idx].datetime)) {
        sec.push(chats[i]);
      } else {
        break;
      }
    }

    return (
      <>
        <ChatSection
          chats={sec}
          lastReadMsgId={lastReadMsgId}
          selectedChats={selectedChats}
          onMediaClick={handleMediaClick}
          quickReactions={quickReactions}
        />
        {renderChats(chats, i)}
      </>
    );
  };

  return (
    <>
      <div
        className={classes(styles.wrapper, "scroll_thin", className)}
        {...restProps}
      >
        <div
          className={styles.chats}
          ref={mergeRefs(_ref, ref)}
          onContextMenu={handleContextMenu}
        >
          {renderChats(chats, 0)}
          {/* <div ref={sentinalRef} className={styles.sentinal}></div> */}
        </div>
        <button
          className={styles.to_bottom_btn}
          onClick={() => handleScrollToBottom()}
          aria-hidden={isOnBoundary}
          inert={isOnBoundary}
        >
          {"Scroll to Bottom"}
          <ChevronsDownIcon />
        </button>
      </div>
      {!!showOptionsFor && (
        <Popover
          anchor={showOptionsFor}
          onClose={closeMenu}
          placement="top"
          alignment="right"
          animation="slide"
          className={classes(styles.options_popover, showEmojiPicker ? styles.emoji_popover : styles.all_options_popover)}
          trapFocus
          closeOnEsc
        // overlap
        >
          {showEmojiPicker ? (
            <EmojiPicker />
          ) : (
            <ItemList>
              {defaultOptions.slice(0, -1).map(item => (
                <Item<"button">
                  key={item.id} as="button" scope="list"
                  primary={item.label} icon={item.icon}
                  onClick={() => handleMenuClick(item.id)}
                />
              ))}
              {
                otherOptions.map(item => (
                  <Item<"button">
                    key={item.id} as="button" scope="list"
                    primary={item.label} icon={item.icon}
                    onClick={() => handleMenuClick(item.id)}
                    disabled={item.disabled}
                  />
                ))
              }
            </ItemList>
          )}
        </Popover>
      )}
      {!!showMedia?.chatId && (
        <MediaViewer
          mediaId={showMedia.mediaId}
          media={mediaList}
          open
          onClose={() => setShowMedia(undefined)}
        />
      )}
    </>
  );
};

export default ChatList;

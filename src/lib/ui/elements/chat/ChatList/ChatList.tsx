"use client";

import { ComponentProps, MouseEvent, ReactNode, useCallback, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";

import { useScroll } from "@/lib/hooks/useScroll";
import { ChatSection } from "@/lib/ui/elements/chat/ChatSection";
import { MediaViewer } from "@/lib/ui/elements/chat/MediaViewer";
import { QuickActions } from "@/lib/ui/elements/chat/QuickActions";
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
import { isMobileDevice } from "@/lib/utils/client.utils";
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

  onQuote?: (chat: any) => void;
}

const ChatList = ({
  chats, lastReadMsgId, quickReactions,
  onShowReplies, onQuote,
  ref, className,
  ...restProps
}: ChatListProps) => {
  const _ref = useRef<HTMLDivElement>(null);

  const prevChatWindowSize = useRef<{ height: number; width: number; }>({ height: 0, width: 0 });

  const [autoScroll, setAutoScroll] = useState(true);
  const [showOptionsFor, setShowOptionsFor] = useState<{ coords?: number[]; element?: HTMLElement } | null>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedChats, setSelectedChats] = useState<string | string[]>();
  const [showMedia, setShowMedia] = useState<{ mediaId?: string; chatId?: string; }>();
  const [showAllOptions, setShowAllOptions] = useState(false);

  const mediaList = useMemo(() => {
    if (showMedia?.chatId) {
      return chats.find((item: any) => item.id === showMedia.chatId).media;
    }
    return [];
  }, [chats, showMedia?.chatId]);

  // TODOS:
  // = handle unread messages on opening chat [if new messages add the unread banner before that]
  // = handle read status [so that sender will know]
  // = show the list of individual reactions details on long-press/hover

  const { isOnBoundary, handleScroll } = useScroll({ target: _ref, margin: 50, delay: 150, initialState: true });

  const isMobile = isMobileDevice();

  const handleScrollToBottom = (behavior: "smooth" | "instant" = "instant") => {
    requestAnimationFrame(() => {
      if (_ref.current && _ref.current.scrollHeight !== _ref.current.clientHeight) {
        _ref.current.scrollTo({
          top: _ref.current.scrollHeight,
          behavior,
        });
      }
    });
  };

  const closeMenu = () => {
    setShowOptionsFor(null);
    setShowEmojiPicker(false);
    setShowAllOptions(false);
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
      let coords: number[] = [];
      if ((e as any).pageX != undefined && (e as any).pageY != undefined) coords = [(e as any).pageX, (e as any).pageY];
      else if (typeof TouchEvent !== "undefined" && e instanceof TouchEvent) coords = [e.touches[0].pageX, e.touches[0].pageY];
      handleChatSelection(msgId);
      setShowOptionsFor({ element: msgElem as HTMLElement, coords: [...coords] });
    }
  }, [handleChatSelection]);

  const handleContextMenu = (e: React.MouseEvent) => {
    // if (isMobileDevice()) return;
    if (!showOptionsFor) {
      const selection = window.getSelection();
      if (selection) {
        const removeRanges = [];
        for (let i = 0; i < (selection?.rangeCount ?? 0); i++) {
          const rangeItem = selection?.getRangeAt(i);
          removeRanges.push(rangeItem);
        }
        for (let i = 0; i < removeRanges.length; i++) {
          selection.removeRange(removeRanges[i]);
        }
      }
      handleMsgContext(e);
    } else {
      // setShowOptionsFor(null);
    }
  };

  const handleMenuClick = (key: string) => {
    if (key === "add_reaction") {
      setShowEmojiPicker(true);
    } else if (key === "quote_reply") {
      onQuote?.(selectedChats);
      closeMenu();
    } else if (key === "edit") {

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

  const scrollToBottomEvent = useEffectEvent(() => {
    if (autoScroll) handleScrollToBottom();
  });

  const handleQuickActions = (e: MouseEvent, key?: string, chatId?: string) => {
    if (key === "MORE") {
      setShowAllOptions(true);
    } else if (key === "ADD_REACTION") {
      setShowEmojiPicker(true);
    } else {
      // todo: add reaction
      return;
    }
    if (chatId) {
      handleChatSelection(chatId);
      setShowOptionsFor({
        // coords: (e.clientX || e.clientY) ? [e.clientX, e.clientY] : undefined,
        element: e.target as HTMLElement,
      });
    }
  };

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

  const renderPopoverContent = () => {
    if (showEmojiPicker) {
      return <EmojiPicker />;
    }
    if (isMobile && !showAllOptions) {
      return (
        <QuickActions
          quickReactions={quickReactions}
          onClick={handleQuickActions}
        />
      );
    }
    if (showAllOptions || !isMobile) {
      return (
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
      );
    }
  };

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
          onQuickActionClick={handleQuickActions}
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
        </div>
        <button
          className={styles.to_bottom_btn}
          onClick={() => handleScrollToBottom()}
          aria-hidden={isOnBoundary}
          inert={isOnBoundary}
        >
          {"Scroll to Bottom"}
          {/* {"New Messages"} */}
          <ChevronsDownIcon />
        </button>
      </div>
      {!!showOptionsFor && (
        <Popover
          anchor={showOptionsFor.element}
          coords={showOptionsFor.coords}
          onClose={closeMenu}
          placement="top"
          alignment="right"
          animation="slide"
          className={classes(
            styles.options_popover,
            showEmojiPicker ? styles.emoji_popover : styles.all_options_popover,
            !showEmojiPicker && isMobile && !showAllOptions && styles.mobile_popover,
          )}
          trapFocus
          closeOnEsc
          overlap
        >
          {renderPopoverContent()}
        </Popover>
      )}
      {!!showMedia?.chatId && (
        <MediaViewer
          open
          mediaId={showMedia.mediaId}
          media={mediaList}
          onClose={() => setShowMedia(undefined)}
        />
      )}
    </>
  );
};

export default ChatList;

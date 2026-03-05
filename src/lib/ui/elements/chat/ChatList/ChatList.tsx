"use client";

import { ComponentProps, ReactNode, useCallback, useEffect, useRef, useState } from "react";

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
}

const ChatList = ({
  chats, lastReadMsgId,
  ref, className,
  ...restProps
}: ChatListProps) => {
  const _ref = useRef<HTMLDivElement>(null);
  const prevChatWindowSize = useRef<{ height: number; width: number; }>({ height: 0, width: 0 });

  const [autoScroll, setAutoScroll] = useState(true); // auto scroll to latest message, off when manually scrolled up, reset when reach bottom
  const [showOptionsFor, setShowOptionsFor] = useState<HTMLElement | null>(null);
  const [showAllOptionsFor, setShowAllOptionsFor] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedChats, setSelectedChats] = useState<string | string[]>();
  const [showMedia, setShowMedia] = useState<{ mediaId: string; chatId?: string; }>();

  const { isOnBoundary, handleScroll } = useScroll({ target: _ref, margin: 50, delay: 150, initialState: true });

  const handleScrollToBottom = () => {
    if (_ref.current && _ref.current.scrollHeight !== _ref.current.clientHeight) {
      _ref.current.scrollTo({
        top: _ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleMutation = useCallback((mutations: MutationRecord[]) => {
    if (mutations.length) {
      if (mutations[0].addedNodes?.length) {
        handleScrollToBottom();
      }
    }
  }, []);

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
    }
  };

  useMutationObserver(_ref, handleMutation);

  useLongPress(_ref, handleMsgContext);

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
        <ChatSection chats={sec} lastReadMsgId={lastReadMsgId} selectedChats={selectedChats} />
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
          {/* <div className={styles.actions}>
          {defaultOptions.map((item) => (
            <Button key={item.id} variant="quaternary">
              {item.icon}
            </Button>
          ))}
        </div> */}
          {renderChats(chats, 0)}
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
          media={[]}
          open
          onClose={() => setShowMedia(undefined)}
        />
      )}
    </>
  );
};

export default ChatList;

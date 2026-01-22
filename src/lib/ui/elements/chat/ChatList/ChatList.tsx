"use client";

import { ComponentProps, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { useMutationObserver } from "@/lib/hooks/useMutationObserver";
import { useScroll } from "@/lib/hooks/useScroll";
import { ChatSection } from "@/lib/ui/elements/chat/ChatSection";
import ChevronsDownIcon from "@/lib/ui/svgs/icons/ChevronsDownIcon";
import { compareDateByPrecision } from "@/lib/utils/datetime.utils";
import { mergeRefs } from "@/lib/utils/react.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatList.module.scss";

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

  // as items being scrolled into view, add to the read batch queue using debounce for 3s
  // if new/unread messages & autoScroll is off, then activate scroll to "New Messages"
  // activate "Scroll to Bottom" if margin above the bottom & "Scroll to New Messages" & autoScroll is not active
  // when open the list and there was unread messages ---

  // show message actions popover on (contextmenu, on ellipsis click)
  // message actions - mark read/unread, reaction, edit, delete, quote, branch

  // on reaction [show orted list of all reaction with count, with truncated view or scroll view]
  // on edit [append in chat composer with editing icon & cancel option, and disable the chat being edited optional]
  // on delete [show a deleted msg banner with og date]
  // on quote [quoted msg ui; quote in chat composer with blockquote icon same in quoted msg; multiple quote]
  // on branch [handle in seperate panel; show the branch icon with number of messages]

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

  useMutationObserver(_ref, handleMutation);

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
        <ChatSection chats={sec} lastReadMsgId={lastReadMsgId} />
        {renderChats(chats, i)}
      </>
    );
  };

  return (
    <div
      className={classes(styles.wrapper, "scroll_thin", className)}
      {...restProps}
    >
      <div
        className={styles.chats}
        ref={mergeRefs(_ref, ref)}
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
        <ChevronsDownIcon />
      </button>
    </div>
  );
};

export default ChatList;

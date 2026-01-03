"use client";

import React, { ComponentProps, useRef, useState } from "react";

import { Overlay } from "@/components/common/containers";
import { dummyChats } from "@/data/dummy/chatData";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { ChatComposer } from "@/lib/ui/elements/chat/ChatComposer";
import { ChatList } from "@/lib/ui/elements/chat/ChatList";
import CircleInfoIcon from "@/lib/ui/svgs/icons/CircleInfoIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import MaximizeIcon from "@/lib/ui/svgs/icons/MaximizeIcon";
import MinimizeIcon from "@/lib/ui/svgs/icons/MinimizeIcon";
import SearchIcon from "@/lib/ui/svgs/icons/SearchIcon";
import { getUniqueId } from "@/lib/utils/crypto.utils";

import styles from "./ChatContainer.module.scss";

export interface ChatContainerProps extends ComponentProps<"div"> {
  onClose: any
}

const ChatContainer = ({
  onClose,
}: ChatContainerProps) => {
  const [chats, setChats] = useState<any[]>(dummyChats);
  const [isMaximized, setIsMaximized] = useState(false);

  const mainContainerRef = useRef<HTMLDivElement>(null);

  const onSend = (value?: string) => {
    const timestamp = new Date().toUTCString();
    setChats(currChats => {
      return [
        ...currChats,
        {
          id: getUniqueId(4),
          author: {
            id: "me",
          },
          content: value,
          datetime: timestamp,
        }
      ];
    });
  };

  useFocusTrap(mainContainerRef, true);

  return (
    <>
      {
        isMaximized ? (
          <Overlay open className={styles.overlay} />
        ) : null
      }
      <div
        ref={mainContainerRef}
        className={styles.container}
        data-maximize={isMaximized}
      >
        <div className={styles.header}>
          <h3>{"HelpBot"}</h3>
          <button
            className={styles.info_btn}
          >
            <CircleInfoIcon />
          </button>
          <button
            className={styles.search_btn}
            aria-label="Search"
            title="Search"
          >
            <SearchIcon />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            aria-label={isMaximized ? "Minimize" : "Maximize"}
            title={isMaximized ? "Minimize" : "Maximize"}
            className={styles.size_btn}
          >
            {isMaximized ? <MinimizeIcon /> : <MaximizeIcon />}
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            title="Close"
            data-autofocus
          >
            <CrossIcon />
          </button>
        </div>
        <ChatList chats={chats} />
        <ChatComposer className={styles.footer} onSend={onSend} />
      </div>
    </>
  );
};

export default ChatContainer;

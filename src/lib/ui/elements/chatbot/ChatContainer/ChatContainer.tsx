"use client";

import Image from "next/image";
import React, { ComponentProps, useCallback, useEffect, useRef, useState } from "react";

import { Overlay } from "@/components/common/containers";
import { characters } from "@/constants/characters.const";
import { dummyChats } from "@/data/dummy/chatData";
import { useFiles, useFocusTrap, useMutationObserver, useScroll } from "@/lib/hooks";
import { EmojiPicker } from "@/lib/ui/elements/emojiPicker";
import { FilesPreview } from "@/lib/ui/elements/filesPreview";
import { FileInput, InputFieldWrapper, TextArea } from "@/lib/ui/elements/inputs";
import { Popover } from "@/lib/ui/elements/popper";
import { AddEmojiIcon } from "@/lib/ui/svgs/emojis";
import { BotMessageIcon, ChevronsDownIcon, CircleInfoIcon, CrossIcon, MaximizeIcon, MicIcon, MinimizeIcon, PaperclipIcon, SearchIcon, SendSolidIcon, UploadIcon } from "@/lib/ui/svgs/icons";
import { getUniqueId } from "@/lib/utils/crypto.utils";
import { compareDateByPrecision, formatDate, formatTime } from "@/lib/utils/datetime.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./ChatContainer.module.scss";

export interface ChatContainerProps extends ComponentProps<"div"> {
  onClose: any
}

const ChatCard = ({
  chat,
}: any) => {
  return (
    <div className={styles.card} data-author={chat.author.id}>
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
                {item.split("\n").map((part, pIdx) => (
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

const ChatSection = ({
  chats
}: any) => {
  return (
    <div className={styles.chat_section}>
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
        }, [])?.map((chat: any) => <ChatCard chat={chat} key={chat.id} />)
      }
    </div>
  );
};

const AllChats = ({ chats, idx }: any) => {
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
      <ChatSection chats={sec} />
      <AllChats chats={chats} idx={i} />
    </>
  );
};

const ChatContainer = ({
  onClose,
  ...props
}: ChatContainerProps) => {
  const [chats, setChats] = useState<any[]>(dummyChats);
  const [query, setQuery] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [emojiPickerAnchor, setEmojiPickerAnchor] = useState<HTMLElement | null>(null);

  const mainContainerRef = useRef<HTMLDivElement>(null);
  const chatsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { filelist, setFilelist, deleteFileByName } = useFiles();

  const { isOnBoundary, handleScroll } = useScroll({ target: chatsContainerRef, margin: 50, delay: 150, initialState: true });

  const handleFileInput = (e: any) => {
    setFilelist(e.target.files);
  };

  const handleScrollToBottom = () => {
    if (chatsContainerRef.current && chatsContainerRef.current.scrollHeight !== chatsContainerRef.current.clientHeight) {
      chatsContainerRef.current.scrollTo({
        top: chatsContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleQuerySubmit = () => {
    const timestamp = new Date().toUTCString();
    setChats(currChats => {
      return [
        ...currChats,
        {
          id: getUniqueId(4),
          author: {
            id: "me",
          },
          content: query,
          datetime: timestamp,
        }
      ];
    });
    setQuery("");
    inputRef.current?.focus();
  };

  const handleMutation = useCallback((mutations: MutationRecord[]) => {
    if (mutations.length) {
      if (mutations[0].addedNodes?.length) {
        handleScrollToBottom();
      }
    }
  }, []);

  useMutationObserver(chatsContainerRef, handleMutation);
  useFocusTrap(mainContainerRef, true);

  useEffect(() => {
    handleScroll();
  }, [handleScroll, isMaximized]);

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
        <div className={classes(styles.body, "scroll_thin")} ref={chatsContainerRef}>
          <AllChats chats={chats} idx={0} />
        </div>
        <div className={styles.footer}>
          <button
            className={styles.to_bottom_btn}
            data-visible={!isOnBoundary}
            onClick={() => handleScrollToBottom()}
          >
            {"Scroll to Bottom"}
            <ChevronsDownIcon />
          </button>
          <InputFieldWrapper className={styles.input_wrapper}>
            <FilesPreview
              files={Array.from(filelist?.length ? filelist : [])} mode="file" noHeading
              className={styles.files_preview}
              onDelete={deleteFileByName}
            />
            <TextArea
              rows={1}
              placeholder="Ask your query..."
              value={query}
              onInput={(e: any) => setQuery(e.target.value)}
              ref={inputRef}
              className={styles.input}
              enterKeyHint="send"
            />
            <div className={styles.controls}>
              <FileInput
                files={filelist}
                onInput={handleFileInput}
                multiple
                className={styles.upload_btn}
                minimal
              >
                <PaperclipIcon />
              </FileInput>
              <button
                className={styles.emoji_btn}
                aria-label="Add Emoji"
                title="Add Emoji"
                onClick={(e) => setEmojiPickerAnchor(emojiPickerAnchor ? null : (e.target as HTMLElement).closest("button"))}
              >
                <AddEmojiIcon className={styles.emoji_icon} />
              </button>
              <button
                className={styles.mic_btn}
                aria-label="Speak"
                title="Speak"
              >
                <MicIcon className={styles.mic_icon} />
              </button>
              <button
                className={styles.submit_btn}
                disabled={!query}
                aria-hidden={!query}
                onClick={handleQuerySubmit}
                aria-label="Send Message"
                title="Send (Ctrl+Enter)"
              >
                <SendSolidIcon />
              </button>
            </div>
          </InputFieldWrapper>
          {emojiPickerAnchor ? (
            <Popover
              anchor={emojiPickerAnchor}
              onClose={() => setEmojiPickerAnchor(null)}
              closeOnOutsideClick
              closeOnScroll
              className={styles.emoji_popover}
              useTransform={false}
            >
              <EmojiPicker />
            </Popover>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ChatContainer;

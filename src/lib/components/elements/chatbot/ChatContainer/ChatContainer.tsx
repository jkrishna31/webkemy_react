"use client";

import { ComponentProps, useCallback, useEffect, useRef, useState } from "react";

import { dummyChats, groupDetails } from "@/data/dummy/chatData";
import { Avatar } from "@/lib/components/elements/avatar";
import { ChatComposer, ChatList, ChatQuoteCard, GroupDetails, GroupSettings, MembersPanel, PinnedBanner, PinnedPanel, SearchPanel, SharedPanel, StarredPanel, ThreadsPanel } from "@/lib/components/elements/chat";
import { ThreadPanel } from "@/lib/components/elements/chat/ThreadPanel";
import { Divider } from "@/lib/components/elements/divider";
import { Item, ItemList } from "@/lib/components/elements/list-item";
import { MediaGallery } from "@/lib/components/elements/media-gallery";
import { Overlay } from "@/lib/components/elements/overlay";
import { Popover } from "@/lib/components/elements/popover";
import { useElementRef } from "@/lib/hooks/useElementRef";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import BellOffIcon from "@/lib/svgs/icons/BellOffIcon";
import ChevronLeftIcon from "@/lib/svgs/icons/ChevronLeftIcon";
import CircleInfoIcon from "@/lib/svgs/icons/CircleInfoIcon";
import CrossIcon from "@/lib/svgs/icons/CrossIcon";
import DeleteIcon from "@/lib/svgs/icons/DeleteIcon";
import EllipsisHIcon from "@/lib/svgs/icons/EllipsisHIcon";
import FolderIcon from "@/lib/svgs/icons/FolderIcon";
import GearIcon from "@/lib/svgs/icons/GearIcon";
import LogoutIcon from "@/lib/svgs/icons/LogoutIcon";
import MaximizeIcon from "@/lib/svgs/icons/MaximizeIcon";
import MinimizeIcon from "@/lib/svgs/icons/MinimizeIcon";
import PinIcon from "@/lib/svgs/icons/PinIcon";
import ProhibitedIcon from "@/lib/svgs/icons/ProhibitedIcon";
import SearchIcon from "@/lib/svgs/icons/SearchIcon";
import SpoolIcon from "@/lib/svgs/icons/SpoolIcon";
import StarIcon from "@/lib/svgs/icons/StarIcon";
import UsersIcon from "@/lib/svgs/icons/UsersIcon";
import { generateId } from "@/lib/utils/crypto";
import { compareDateByPrecision } from "@/lib/utils/datetime";
import { classes } from "@/lib/utils/style";

import styles from "./ChatContainer.module.scss";

const personalizedQuickReactions = ["👍️", "💯", "👀", "❤️"];

export interface ChatContainerProps extends ComponentProps<"div"> {
  onClose: any;
}

export const ChatContainer = ({
  onClose,
}: ChatContainerProps) => {
  const [chats, setChats] = useState<any[]>(dummyChats);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showPanel, setShowPanel] = useState<string>();

  const [showThread, setShowThread] = useState<string>();
  const [editMsg, setEditMsg] = useState<any>();
  const [quoteMsg, setQuoteMsg] = useState<any>(); // todo: quote multiple message

  const mainContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const { element: groupElement, ref: groupRef } = useElementRef<HTMLDivElement>();
  const { element: optionsTriggerElement, ref: optionsTriggerRef } = useElementRef<HTMLButtonElement>();

  const lastReadMsgId = "ddaa";

  const handleSend = (value?: string) => {
    const timestamp = new Date().toUTCString();
    setChats(currChats => {
      const newChat: any = {
        id: generateId(4),
        author: {
          id: "me",
          name: "Julia V. Gambuto",
        },
        content: value,
        datetime: timestamp,
      };
      if (quoteMsg) {
        newChat.quoted = {
          ...quoteMsg,
        };
      }
      return [
        ...currChats,
        newChat,
      ];
    });
    setQuoteMsg(undefined);
  };

  const handleOptionClick = (key: string) => {
    setShowOptions(false);
    setShowGroupOptions(false);
    setShowPanel(key);
  };

  const handleQuote = useCallback((chatId: string) => {
    const selectedChat = chats.find(item => item.id === chatId);
    setQuoteMsg(selectedChat);
  }, [chats]);

  useFocusTrap(mainContainerRef, true);

  useEffect(() => {
    if (quoteMsg) chatInputRef.current?.focus();
  }, [quoteMsg]);

  const handleClosePanel = () => {
    setShowPanel(undefined);
  };

  const renderPanel = () => {
    if (showPanel === "search") {
      return (
        <SearchPanel onClose={handleClosePanel} />
      );
    }
    if (showPanel === "details") {
      return (
        <GroupDetails onClose={handleClosePanel} data={groupDetails} />
      );
    } else if (showPanel === "settings") {
      return (
        <GroupSettings />
      );
    } else if (showPanel === "members") {
      return (
        <MembersPanel onClose={handleClosePanel} />
      );
    } else if (showPanel === "pinned") {
      return (
        <PinnedPanel onClose={handleClosePanel} />
      );
    } else if (showPanel === "starred") {
      return (
        <StarredPanel onClose={handleClosePanel} />
      );
    } else if (showPanel === "threads") {
      return (
        <ThreadsPanel onClose={handleClosePanel} />
      );
    } else if (showPanel === "thread") {
      return (
        <ThreadPanel />
      );
    } else if (showPanel === "shared") {
      const media = chats.reduce((acc, item) => {
        item?.media?.forEach((mediaItem: any) => acc.push({ ...mediaItem, user: item.author, createdOn: item.datetime }));
        return acc;
      }, []);
      return (
        <SharedPanel
          data={media}
          onClose={handleClosePanel}
          onShowAll={(key) => setShowPanel(key === "media" ? "gallery" : undefined)}
        />
      );
    } else if (showPanel === "gallery") {
      const media = chats.reduce((acc, item) => {
        item?.media?.forEach((mediaItem: any) => {
          if (mediaItem.type?.startsWith("image") || mediaItem.type?.startsWith("video")) {
            acc.push({ ...mediaItem, user: item.author, createdOn: item.datetime });
          }
        });
        return acc;
      }, []);
      const groupedByDate = [];
      for (let i = 0; i < media.length; i++) {
        const continueDate = media[i === 0 ? i : i - 1].createdOn;
        if (compareDateByPrecision(continueDate, media[i].createdOn) === 0) {
          if (groupedByDate.length) {
            groupedByDate[groupedByDate.length - 1].media.push(media[i]);
          } else {
            groupedByDate.push({
              date: media[i].createdOn,
              media: [media[i]],
            });
          }
        } else {
          groupedByDate.push({
            date: media[i].createdOn,
            media: [media[i]],
          });
        }
      }
      return (
        <MediaGallery media={media} grouped={groupedByDate} />
      );
    }
  };

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
          {!!showPanel && (
            <button
              className={styles.back_btn}
              onClick={() => setShowPanel(undefined)}
            >
              <ChevronLeftIcon />
            </button>
          )}
          <div
            ref={groupRef}
            className={styles.group}
            role="button"
            onClick={() => setShowGroupOptions(!showGroupOptions)}
          >
            <Avatar className={styles.avatar} src={groupDetails.profile} alt={groupDetails.name} />
            <div>
              <h3>{groupDetails.name}</h3>
              <p>{groupDetails.members}{" Members"}</p>
            </div>
          </div>

          <button
            ref={optionsTriggerRef}
            className={styles.more_btn}
            onClick={() => setShowOptions(!showOptions)}
          >
            <EllipsisHIcon />
          </button>
          {!showPanel && (
            <button
              className={styles.search_btn}
              aria-label="Search"
              title="Search"
              onClick={() => setShowPanel("search")}
            >
              <SearchIcon />
            </button>
          )}
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
        {!showPanel && (
          <>
            <PinnedBanner />
            <ChatList
              chats={chats}
              lastReadMsgId={lastReadMsgId}
              quickReactions={personalizedQuickReactions}
              onShowReplies={setShowThread}
              onQuote={handleQuote}
            />
            <ChatComposer
              ref={chatInputRef}
              className={styles.footer}
              onSend={handleSend}
            >
              {!!quoteMsg && (
                <ChatQuoteCard
                  chat={quoteMsg}
                  onCancel={() => setQuoteMsg(undefined)}
                  className={classes(styles.quoted, quoteMsg.author?.id === "me" && styles.green)}
                />
              )}
            </ChatComposer>
          </>
        )}
        {renderPanel()}
      </div>
      {(showGroupOptions && !!groupElement) && (
        <Popover
          anchor={groupElement}
          animation="slide"
          alignment="left"
          onClose={() => setShowGroupOptions(false)}
          className={styles.popover}
        >
          <ItemList>
            <Item
              icon={<CircleInfoIcon />}
              label="Group Details"
              onClick={() => handleOptionClick("details")}
            />
            <Item
              icon={<UsersIcon />}
              label="Manage Members"
              onClick={() => handleOptionClick("members")}
            />
            <Item
              icon={<GearIcon />}
              label="Group Settings"
              onClick={() => handleOptionClick("settings")}
            />

            <Divider style={{ marginBlock: ".4rem" }} />

            <Item
              icon={<BellOffIcon />}
              label="Mute"
              onClick={() => handleOptionClick("mute")}
            />
            <Item
              icon={<DeleteIcon />}
              label="Delete Chat"
              onClick={() => handleOptionClick("delete_chat")}
            />
            <Item
              icon={<LogoutIcon />}
              label="Leave"
              onClick={() => handleOptionClick("leave")}
            />
            <Item
              icon={<ProhibitedIcon />}
              label="Block"
              onClick={() => handleOptionClick("block")}
            />
          </ItemList>
        </Popover>
      )}
      {(showOptions && !!optionsTriggerElement) && (
        <Popover
          anchor={optionsTriggerElement}
          animation="slide"
          onClose={() => setShowOptions(false)}
          className={styles.popover}
        >
          <ItemList>
            <Item label="Search" icon={<SearchIcon />} onClick={() => handleOptionClick("search")} />
            <Item label="Pinned" icon={<PinIcon />} onClick={() => handleOptionClick("pinned")} />
            <Item label="Starred" icon={<StarIcon />} onClick={() => handleOptionClick("starred")} />
            <Item label="Threads" icon={<SpoolIcon />} onClick={() => handleOptionClick("threads")} />
            <Item label="Shared" icon={<FolderIcon />} onClick={() => handleOptionClick("shared")} />
          </ItemList>
        </Popover>
      )}
    </>
  );
};

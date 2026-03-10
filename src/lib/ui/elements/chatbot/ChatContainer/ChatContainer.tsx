"use client";

import Image from "next/image";
import { ComponentProps, useRef, useState } from "react";

import { Overlay } from "@/components/common/containers";
import { dummyChats } from "@/data/dummy/chatData";
import { useElementRef } from "@/lib/hooks/useElementRef";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { Avatar } from "@/lib/ui/elements/Avatar";
import { ChatComposer } from "@/lib/ui/elements/chat/ChatComposer";
import { ChatList } from "@/lib/ui/elements/chat/ChatList";
import { GroupDetails } from "@/lib/ui/elements/chat/GroupDetails";
import { MembersPanel } from "@/lib/ui/elements/chat/MembersPanel";
import { PinnedBanner } from "@/lib/ui/elements/chat/PinnedBanner";
import { PinnedPanel } from "@/lib/ui/elements/chat/PinnedPanel";
import { SearchPanel } from "@/lib/ui/elements/chat/SearchPanel";
import { SharedPanel } from "@/lib/ui/elements/chat/SharedPanel";
import { StarredPanel } from "@/lib/ui/elements/chat/StarredPanel";
import { ThreadsPanel } from "@/lib/ui/elements/chat/ThreadsPanel";
import { Divider } from "@/lib/ui/elements/Divider";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Popover } from "@/lib/ui/elements/Popover";
import ArrowLeftIcon from "@/lib/ui/svgs/icons/ArrowLeftIcon";
import BellOffIcon from "@/lib/ui/svgs/icons/BellOffIcon";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import CircleInfoIcon from "@/lib/ui/svgs/icons/CircleInfoIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import DeleteIcon from "@/lib/ui/svgs/icons/DeleteIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import FolderIcon from "@/lib/ui/svgs/icons/FolderIcon";
import GearIcon from "@/lib/ui/svgs/icons/GearIcon";
import LogoutIcon from "@/lib/ui/svgs/icons/LogoutIcon";
import MaximizeIcon from "@/lib/ui/svgs/icons/MaximizeIcon";
import MinimizeIcon from "@/lib/ui/svgs/icons/MinimizeIcon";
import PinIcon from "@/lib/ui/svgs/icons/PinIcon";
import ProhibitedIcon from "@/lib/ui/svgs/icons/ProhibitedIcon";
import SearchIcon from "@/lib/ui/svgs/icons/SearchIcon";
import SpoolIcon from "@/lib/ui/svgs/icons/SpoolIcon";
import StarIcon from "@/lib/ui/svgs/icons/StarIcon";
import UsersIcon from "@/lib/ui/svgs/icons/UsersIcon";
import { getUniqueId } from "@/lib/utils/crypto.utils";

import styles from "./ChatContainer.module.scss";

const groupDetails = {
  name: "Help",
  profile: "https://images.unsplash.com/photo-1772371272141-0fbd644b65c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnRvb24lMjBwcm9maWxlfGVufDB8fDB8fHww",
  members: 34,
};

export interface ChatContainerProps extends ComponentProps<"div"> {
  onClose: any;
}

const ChatContainer = ({
  onClose,
}: ChatContainerProps) => {
  const [chats, setChats] = useState<any[]>(dummyChats);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showPanel, setShowPanel] = useState<string>();
  const [showThread, setShowThread] = useState<string>();

  const mainContainerRef = useRef<HTMLDivElement>(null);

  const { element: groupElement, ref: groupRef } = useElementRef<HTMLDivElement>();
  const { element: optionsTriggerElement, ref: optionsTriggerRef } = useElementRef<HTMLButtonElement>();

  const lastReadMsgId = "ddaa";

  const handleSend = (value?: string) => {
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

  const handleOptionClick = (key: string) => {
    setShowOptions(false);
    setShowGroupOptions(false);
    setShowPanel(key);
  };

  useFocusTrap(mainContainerRef, true);

  const handleClosePanel = () => {
    setShowPanel(undefined);
  };

  const renderPanel = () => {
    if (showPanel === "search") {
      return <SearchPanel onClose={handleClosePanel} />;
    }
    if (showPanel === "details") {
      return <GroupDetails onClose={handleClosePanel} data={groupDetails} />;
    }
    else if (showPanel === "settings") {
      return null;
    }
    else if (showPanel === "members") {
      return <MembersPanel onClose={handleClosePanel} />;
    }
    else if (showPanel === "pinned") {
      return <PinnedPanel onClose={handleClosePanel} />;
    }
    else if (showPanel === "starred") {
      return <StarredPanel onClose={handleClosePanel} />;
    }
    else if (showPanel === "threads") {
      return <ThreadsPanel onClose={handleClosePanel} />;
    }
    else if (showPanel === "shared") {
      const media = chats.reduce((acc, item) => {
        item?.media?.forEach((mediaItem: any) => acc.push({ ...mediaItem, author: item.author, datetime: item.datetime }));
        return acc;
      }, []);
      return <SharedPanel onClose={handleClosePanel} data={media} />;
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
            <Avatar className={styles.avatar}>
              <Image
                src={groupDetails.profile}
                alt={groupDetails.name} width={34} height={34} objectFit="cover"
              />
            </Avatar>
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
            <ChatList chats={chats} lastReadMsgId={lastReadMsgId} />
            <ChatComposer className={styles.footer} onSend={handleSend} />
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
              scope="list"
              icon={<CircleInfoIcon />}
              primary="Group Details"
              onClick={() => handleOptionClick("details")}
            />
            <Item
              scope="list"
              icon={<UsersIcon />}
              primary="Manage Members"
              onClick={() => handleOptionClick("members")}
            />
            <Item
              scope="list"
              icon={<GearIcon />}
              primary="Group Settings"
              onClick={() => handleOptionClick("settings")}
            />

            <Divider style={{ marginBlock: ".4rem" }} />

            <Item
              scope="list"
              icon={<BellOffIcon />}
              primary="Mute"
              onClick={() => handleOptionClick("mute")}
            />
            <Item
              scope="list"
              icon={<DeleteIcon />}
              primary="Delete Chat"
              onClick={() => handleOptionClick("delete_chat")}
            />
            <Item
              scope="list"
              icon={<LogoutIcon />}
              primary="Leave"
              onClick={() => handleOptionClick("leave")}
            />
            <Item
              scope="list"
              icon={<ProhibitedIcon />}
              primary="Block"
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
            <Item primary="Search" scope="list" icon={<SearchIcon />} onClick={() => handleOptionClick("search")} />
            <Item primary="Pinned" scope="list" icon={<PinIcon />} onClick={() => handleOptionClick("pinned")} />
            <Item primary="Starred" scope="list" icon={<StarIcon />} onClick={() => handleOptionClick("starred")} />
            <Item primary="Threads" scope="list" icon={<SpoolIcon />} onClick={() => handleOptionClick("threads")} />
            <Item primary="Shared" scope="list" icon={<FolderIcon />} onClick={() => handleOptionClick("shared")} />
          </ItemList>
        </Popover>
      )}
    </>
  );
};

export default ChatContainer;

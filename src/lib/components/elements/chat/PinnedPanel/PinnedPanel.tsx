import { dummyChats } from "@/data/dummy/chatData";
import { SearchForm } from "@/lib/components/blocks/search-form";
import { ChatCard } from "@/lib/components/elements/chat/ChatCard";

import styles from "./PinnedPanel.module.scss";
export interface PinnedPanelProps {
  onClose?: () => void;
}

const PinnedPanel = ({
  onClose,
  ...restProps
}: PinnedPanelProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Pinned"}</h3>
      </div>

      <SearchForm className={styles.search_form} placeholder="Search in pinned..." />

      <div className={styles.body}>
        {dummyChats.filter(item => !!item.pinned).map(item => (
          <ChatCard chat={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default PinnedPanel;

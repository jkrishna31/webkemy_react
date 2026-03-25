import { SearchForm } from "@/components/common/forms";
import { dummyChats } from "@/data/dummy/chatData";
import { ChatCard } from "@/lib/components/elements/chat/ChatCard";

import styles from "./StarredPanel.module.scss";

export interface StarredPanelProps {
  onClose?: () => void;
}

const StarredPanel = ({
  onClose,
  ...restProps
}: StarredPanelProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Starred"}</h3>
      </div>

      <SearchForm className={styles.search_form} placeholder="Search in starred..." />

      <div className={styles.body}>
        {dummyChats.filter(item => !!item.starred).map(item => (
          <ChatCard chat={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default StarredPanel;

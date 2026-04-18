import { dummyChats } from "@/data/dummy/chatData";
import { SearchForm } from "@/lib/components/blocks/search-form";
import { Button } from "@/lib/components/elements/butttons";
import { ChatCard } from "@/lib/components/elements/chat/ChatCard";

import styles from "./ThreadsPanel.module.scss";

export interface ThreadsPanelProps {
  onClose?: () => void;
}

const ThreadsPanel = ({
  onClose,
  ...restProps
}: ThreadsPanelProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Threads"}</h3>
      </div>

      <SearchForm className={styles.search_form} placeholder="Search in threads..." />

      <div className={styles.body}>
        {dummyChats.filter(item => !!item.replies).map((item, idx) => (
          <ChatCard
            key={item.id}
            chat={item}
            action={
              <Button
                variant="muted"
                className={styles.follow_btn}
                aria-pressed={!!idx}
              >
                {!!idx ? "Following" : "Follow"}
              </Button>
            }
            className={styles.item}
          />
        ))}
      </div>
    </div>
  );
};

export default ThreadsPanel;

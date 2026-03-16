import { SearchForm } from "@/components/common/forms";
import { dummyChats } from "@/data/dummy/chatData";
import { Button } from "@/lib/ui/elements/butttons";
import { ChatCard } from "@/lib/ui/elements/chat/ChatCard";

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
                variant="tertiary"
                className={styles.follow_btn}
                aria-pressed={!!idx}
              >
                {!!idx ? "Following" : "Follow"}
              </Button>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ThreadsPanel;

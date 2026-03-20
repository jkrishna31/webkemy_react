import { Button } from "@/lib/ui/elements/butttons";

import styles from "./ThreadPanel.module.scss";

export interface ThreadPanelProps {

}

const ThreadPanel = ({
  ...restProps
}: ThreadPanelProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Thread"}</h3>
        <Button
          color="blue"
          variant="secondary"
          className={styles.follow_btn}
        // aria-pressed={true}
        >
          {"Follow"}
        </Button>
      </div>
      {/* chatlist with curr chat > Replies Label > All replies */}
    </div>
  );
};

export default ThreadPanel;

import { Button } from "@/lib/components/elements/buttton";
import ChevronRightIcon from "@/lib/svgs/icons/ChevronRightIcon";
import PinIcon from "@/lib/svgs/icons/PinIcon";

import styles from "./PinnedBanner.module.scss";

export interface PinnedBannerProps {

}

const PinnedBanner = ({

}: PinnedBannerProps) => {
  // todo: media only pinned []
  return (
    <div className={styles.wrapper}>
      <PinIcon className={styles.pin_icon} />
      <p>{"Labore sit iste explicabo, et hic voluptate eius fuga recusandae fugiat iusto optio porro in. Expedita deleniti cum sapiente? Sit enim, modi alias dolor veritatis aut porro velit adipisci voluptate, maiores odit!"}</p>
      <Button
        variant="muted"
        className={styles.all_pinned}
      >
        {"8"}
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default PinnedBanner;

import { Button } from "@/lib/ui/elements/butttons";
import PinIcon from "@/lib/ui/svgs/icons/PinIcon";

import styles from "./PinnedBanner.module.scss";

export interface PinnedBannerProps {

}

const PinnedBanner = ({

}: PinnedBannerProps) => {
  return (
    <div className={styles.wrapper}>
      <PinIcon className={styles.pin_icon} />
      <p>{"Labore sit iste explicabo, et hic voluptate eius fuga recusandae fugiat iusto optio porro in. Expedita deleniti cum sapiente? Sit enim, modi alias dolor veritatis aut porro velit adipisci voluptate, maiores odit!"}</p>
      <Button
        variant="tertiary"
        className={styles.all_pinned}
      >
        {"+8"}
      </Button>
    </div>
  );
};

export default PinnedBanner;

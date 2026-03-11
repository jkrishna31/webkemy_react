import { useAccordion } from "@/lib/hooks/useAccordion";
import { Button } from "@/lib/ui/elements/butttons";
import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import { Checkbox } from "@/lib/ui/elements/inputs/Checkbox";
import ChevronDownIcon from "@/lib/ui/svgs/icons/ChevronDownIcon";
import { formatDate } from "@/lib/utils/datetime.utils";

import styles from "./MediaGallery.module.scss";

export interface MediaGalleryProps {

}

const MediaGallery = ({
  ...restProps
}: MediaGalleryProps) => {
  const { activeSections, updateAccordion } = useAccordion("multiple");

  return (
    <div className={styles.wrapper}>
      <div className={styles.group}>
        <div
          className={styles.header}
          aria-expanded={activeSections.includes("1")}
        >
          <p className={styles.date}>{formatDate(new Date())}</p>
          <Checkbox className={styles.checkbox} />
          <Button
            variant="quaternary"
            className={styles.collapse_btn}
            onClick={() => updateAccordion("1")}
          >
            <ChevronDownIcon />
          </Button>
        </div>
        <CollapsiblePanel open>
          <div className={styles.list}>

          </div>
        </CollapsiblePanel>
      </div>
    </div>
  );
};

export default MediaGallery;

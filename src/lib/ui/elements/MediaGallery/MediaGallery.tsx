import { useState } from "react";

import { SearchForm } from "@/components/common/forms";
import { useAccordion } from "@/lib/hooks/useAccordion";
import { useElementRef } from "@/lib/hooks/useElementRef";
import { Button } from "@/lib/ui/elements/butttons";
import { MediaItem } from "@/lib/ui/elements/chat/ChatMedia";
import { GalleryItem } from "@/lib/ui/elements/chat/GalleryItem";
import { MediaViewer } from "@/lib/ui/elements/chat/MediaViewer";
import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import { Checkbox } from "@/lib/ui/elements/inputs/Checkbox";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Popover } from "@/lib/ui/elements/Popover";
import ChevronDownIcon from "@/lib/ui/svgs/icons/ChevronDownIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import FilterIcon from "@/lib/ui/svgs/icons/FilterIcon";
import { formatDate } from "@/lib/utils/datetime.utils";

import styles from "./MediaGallery.module.scss";

export interface MediaGalleryProps {
  media?: MediaItem[];
  grouped?: { date: string; media: MediaItem[] }[];
}

const MediaGallery = ({
  media, grouped,
  ...restProps
}: MediaGalleryProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showMedia, setShowMedia] = useState<MediaItem>();

  const { activeSections, updateAccordion } = useAccordion("multiple", grouped?.map(item => item.date));

  const { element: filterTriggerElement, ref: filterTriggerRef } = useElementRef<HTMLButtonElement>();
  const { element: optionTriggerElement, ref: optionTriggerRef } = useElementRef<HTMLButtonElement>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <SearchForm className={styles.search_form} placeholder="Search..." />
        <Button
          ref={filterTriggerRef}
          variant="quaternary"
          className={styles.filter_btn}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon />
        </Button>
        <Button
          ref={optionTriggerRef}
          variant="quaternary"
          className={styles.filter_btn}
          onClick={() => setShowOptions(!showOptions)}
        >
          <EllipsisHIcon />
        </Button>
        {!!(showFilters && filterTriggerElement) && (
          <Popover
            anchor={filterTriggerElement}
            animation="slide"
            className={styles.filters_popover}
            onClose={() => setShowFilters(false)}
          >
            <ItemList>
              <Item scope="list" primary="All" />
              <Item scope="list" primary="Image" />
              <Item scope="list" primary="Video" />
              <Item scope="list" primary="Audio" />
            </ItemList>
            {/* date: from,to */}
          </Popover>
        )}
        {!!(showOptions && optionTriggerElement) && (
          <Popover
            anchor={optionTriggerElement}
            animation="slide"
            className={styles.options_popover}
            onClose={() => setShowOptions(false)}
          >
            <ItemList>
              <Item scope="list" primary="Select" />
              <Item scope="list" primary="Settings" />
            </ItemList>
          </Popover>
        )}
      </div>

      {grouped?.toReversed()?.map(item => {
        const isOpen = activeSections.includes(item.date);
        return (
          <div key={item.date} className={styles.group}>
            <div
              className={styles.group_header}
              aria-expanded={isOpen}
            >
              <p className={styles.date}>{formatDate(item.date)}</p>
              <Checkbox className={styles.checkbox} />
              <Button
                variant="quaternary"
                className={styles.collapse_btn}
                onClick={() => updateAccordion(item.date)}
              >
                <ChevronDownIcon />
              </Button>
            </div>
            <CollapsiblePanel
              open={isOpen}
            >
              <div className={styles.list}>
                {item.media?.map(mItem => (
                  <GalleryItem media={mItem} showTime key={mItem.id} onClick={() => setShowMedia(mItem)} />
                ))}
              </div>
            </CollapsiblePanel>
          </div>
        );
      })}

      {!!showMedia && (
        <MediaViewer
          open
          mediaId={showMedia?.id}
          media={grouped?.flatMap(item => item.media) ?? []}
          onClose={() => setShowMedia(undefined)}
        />
      )}
    </div>
  );
};

export default MediaGallery;

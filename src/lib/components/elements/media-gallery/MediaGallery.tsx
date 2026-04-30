import { useState } from "react";

import { SearchForm } from "@/lib/components/blocks/search-form";
import { Badge } from "@/lib/components/elements/badge";
import { Button } from "@/lib/components/elements/buttton";
import { MediaItem } from "@/lib/components/elements/chat/ChatMedia";
import { GalleryItem } from "@/lib/components/elements/chat/GalleryItem";
import { MediaViewer } from "@/lib/components/elements/chat/MediaViewer";
import { Checkbox } from "@/lib/components/elements/checkbox";
import { CollapsiblePanel } from "@/lib/components/elements/collapsible-panel";
import { Divider } from "@/lib/components/elements/divider";
import { Dropdown } from "@/lib/components/elements/dropdown";
import { Item, ItemList } from "@/lib/components/elements/list-item";
import { Popover } from "@/lib/components/elements/popover";
import { Scrollable } from "@/lib/components/elements/scrollable";
import { useAccordion } from "@/lib/hooks/useAccordion";
import { useElementRef } from "@/lib/hooks/useElementRef";
import ChevronDownIcon from "@/lib/svgs/icons/ChevronDownIcon";
import EllipsisHIcon from "@/lib/svgs/icons/EllipsisHIcon";
import SortIcon from "@/lib/svgs/icons/SortIcon";
import { formatDate } from "@/lib/utils/datetime";

import styles from "./MediaGallery.module.scss";

export interface MediaGalleryProps {
  media?: MediaItem[];
  grouped?: { date: string; media: MediaItem[] }[];
}

export const MediaGallery = ({
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
          variant="muted"
          className={styles.filter_btn}
          onClick={() => setShowFilters(!showFilters)}
        >
          <SortIcon />
        </Button>
        <Button
          ref={optionTriggerRef}
          variant="muted"
          className={styles.more_btn}
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
              <Item label="Recent First" />
              <Item label="Oldest First" />
            </ItemList>
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
              <Item label="Select" />
              <Item label="Settings" />
            </ItemList>
          </Popover>
        )}
      </div>

      <Scrollable className={styles.filters}>
        <Dropdown
          dropdown={
            <ItemList>
              <Item label="All" />
              <Divider style={{ marginBlock: ".2rem" }} />
              <Item label="Image" />
              <Item label="Video" />
              <Item label="Audio" />
            </ItemList>
          }
          triggerClass={styles.filter_trigger}
          aria-pressed={true}
        >
          {"Type"}
          <Badge color="blue" float={null}>{"All"}</Badge>
        </Dropdown>
        <Dropdown
          dropdown={
            <ItemList>
              <Item label="Last 7 days" />
              <Item label="Last 15 days" />
              <Item label="Last 1 month" />
              <Item label="Last 3 month" />
              <Item label="Last 6 month" />
              <Divider style={{ marginBlock: ".2rem" }} />
              <Item label="Custom Range" />
            </ItemList>
          }
          triggerClass={styles.filter_trigger}
        >
          {"Date"}
        </Dropdown>
        <Dropdown
          dropdown={
            <div>

            </div>
          }
          triggerClass={styles.filter_trigger}
        >
          {"Person"}
        </Dropdown>
      </Scrollable>

      {grouped?.toReversed()?.map(item => {
        const isOpen = activeSections.includes(item.date);
        return (
          <div key={item.date} className={styles.group}>
            <div
              className={styles.group_header}
              aria-expanded={isOpen}
            >
              <p className={styles.date}>{formatDate(item.date)}</p>
              {/* <Checkbox className={styles.checkbox} /> */}
              <Button
                variant="muted"
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

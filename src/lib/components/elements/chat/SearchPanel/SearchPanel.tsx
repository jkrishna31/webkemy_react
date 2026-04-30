import { useState } from "react";

import { SearchForm } from "@/lib/components/blocks/search-form";
import { Badge } from "@/lib/components/elements/badge";
import { Button } from "@/lib/components/elements/buttton";
import { Divider } from "@/lib/components/elements/divider";
import { Dropdown } from "@/lib/components/elements/dropdown";
import { Item, ItemList } from "@/lib/components/elements/list-item";
import { Scrollable } from "@/lib/components/elements/scrollable";

import styles from "./SearchPanel.module.scss";

export interface SearchPanelProps {
  onClose?: () => void;
}

const SearchPanel = ({
  onClose,
  ...restProps
}: SearchPanelProps) => {
  const [filters, setFilters] = useState<Partial<{
    date: string | string[];
    person: string[];
    hasFiles: string[];
    hasLink: boolean;
    mentionsMe: boolean;
  }>>({});

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Search in this Chat"}</h3>
      </div>

      <div className={styles.head_controls}>
        <SearchForm className={styles.search_form} placeholder="Search" />

        <Scrollable className={styles.filters}>
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
            aria-pressed={true}
          >
            {"Person"}
            <Badge color="blue" float={null}>{"2"}</Badge>
          </Dropdown>
          <Button
            variant="muted"
            className={styles.filter_trigger}
            onClick={() => setFilters({ ...filters, mentionsMe: !filters.mentionsMe })}
            aria-pressed={filters.mentionsMe}
          >
            {"Mentions Me"}
          </Button>
          <Dropdown
            dropdown={
              <ItemList>
                <Item label="Any file" />
                <Item label="PDF" />
                <Item label="Image" />
                <Item label="Video" />
                <Item label="Audio" />
                <Item label="Presentation" />
                <Item label="Spreadsheet" />
              </ItemList>
            }
            triggerClass={styles.filter_trigger}
          >
            {"Has File"}
          </Dropdown>
          <Button
            variant="muted"
            className={styles.filter_trigger}
            onClick={() => setFilters({ ...filters, hasLink: !filters.hasLink })}
            aria-pressed={filters.hasLink}
          >
            {"Has Link"}
          </Button>
        </Scrollable>
      </div>

      <div className={styles.body}>
        <p>{"No results"}</p>
      </div>
    </div>
  );
};

export default SearchPanel;

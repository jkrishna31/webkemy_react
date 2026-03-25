import { useState } from "react";

import { SearchForm } from "@/components/common/forms";
import { Badge } from "@/lib/components/elements/Badge";
import { Button } from "@/lib/components/elements/butttons";
import { Divider } from "@/lib/components/elements/Divider";
import { Dropdown } from "@/lib/components/elements/Dropdown";
import { Item } from "@/lib/components/elements/Item";
import { ItemList } from "@/lib/components/elements/ItemList";
import { Scrollable } from "@/lib/components/elements/Scrollable";

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
                <Item scope="list" primary="Last 7 days" />
                <Item scope="list" primary="Last 15 days" />
                <Item scope="list" primary="Last 1 month" />
                <Item scope="list" primary="Last 3 month" />
                <Item scope="list" primary="Last 6 month" />
                <Divider style={{ marginBlock: ".2rem" }} />
                <Item scope="list" primary="Custom Range" />
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
                <Item scope="list" primary="Any file" />
                <Item scope="list" primary="PDF" />
                <Item scope="list" primary="Image" />
                <Item scope="list" primary="Video" />
                <Item scope="list" primary="Audio" />
                <Item scope="list" primary="Presentation" />
                <Item scope="list" primary="Spreadsheet" />
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

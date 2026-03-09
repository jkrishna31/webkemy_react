import { SearchForm } from "@/components/common/forms";
import { useAccordion } from "@/lib/hooks/useAccordion";
import { Button } from "@/lib/ui/elements/butttons";
import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import { Table } from "@/lib/ui/elements/Table";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import SearchIcon from "@/lib/ui/svgs/icons/SearchIcon";

import styles from "./SharedPanel.module.scss";

export interface SharedPanelProps {
  onClose?: () => void;
}

const SharedPanel = ({
  onClose,
  ...restProps
}: SharedPanelProps) => {
  const { activeSections, updateAccordion } = useAccordion("multiple", ["media", "links"]);

  const isMediaSecOpen = activeSections.includes("media");
  const isLinksSecOpen = activeSections.includes("links");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Shared"}</h3>
        <Button className={styles.search_btn}>
          <SearchIcon />
        </Button>
      </div>

      {/* <SearchForm className={styles.search_form} /> */}

      <div className={styles.section}>
        <div
          className={styles.sec_header}
          aria-expanded={activeSections.includes("media")}
          onClick={() => updateAccordion("media")}
        >
          <h4>{"Media"}</h4>
          <ChevronRightIcon />
        </div>
        <CollapsiblePanel open={isMediaSecOpen}>
          <Table>
            <Table.Header>
              <tr>
                <Table.Cell>{"File"}</Table.Cell>
                <Table.Cell>{"Shared By"}</Table.Cell>
                <Table.Cell></Table.Cell>
              </tr>
            </Table.Header>
            <Table.Body>
              <tr>
                <Table.Cell<"td"> as="td" colSpan={3}>
                  {"No files shared yet."}
                </Table.Cell>
              </tr>
            </Table.Body>
          </Table>
        </CollapsiblePanel>
      </div>

      <div className={styles.section}>
        <div
          className={styles.sec_header}
          aria-expanded={activeSections.includes("links")}
          onClick={() => updateAccordion("links")}
        >
          <h4>{"Links"}</h4>
          <ChevronRightIcon />
        </div>
        <CollapsiblePanel open={isLinksSecOpen}>
          <Table>
            <Table.Header>
              <tr>
                <Table.Cell>{"Name"}</Table.Cell>
                <Table.Cell>{"Shared By"}</Table.Cell>
                <Table.Cell></Table.Cell>
              </tr>
            </Table.Header>
            <Table.Body>
              <tr>
                <Table.Cell<"td"> as="td" colSpan={3}>
                  {"No links shared yet."}
                </Table.Cell>
              </tr>
            </Table.Body>
          </Table>
        </CollapsiblePanel>
      </div>

      {/* col 1 -- filename, filetype, filesize */}
      {/* col 2 -- author profile, author name, date */}
      {/* col 3 -- options: Show in Conversation, */}
    </div>
  );
};

export default SharedPanel;

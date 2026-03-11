import Image from "next/image";

import { useAccordion } from "@/lib/hooks/useAccordion";
import { Avatar } from "@/lib/ui/elements/Avatar";
import { Button } from "@/lib/ui/elements/butttons";
import { MediaItem } from "@/lib/ui/elements/chat/ChatMedia";
import { GallaryItem } from "@/lib/ui/elements/chat/GalleryItem";
import { CollapsiblePanel } from "@/lib/ui/elements/CollapsiblePanel";
import { Table } from "@/lib/ui/elements/Table";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import { formatDate } from "@/lib/utils/datetime.utils";

import styles from "./SharedPanel.module.scss";

export interface SharedPanelProps {
  onClose?: () => void;
  data?: (MediaItem & { author: any; datetime: string; })[];
  onShowAll?: (key: "files" | "links" | "media") => void;
}

const SharedPanel = ({
  data,
  onClose, onShowAll,
  ...restProps
}: SharedPanelProps) => {
  const { activeSections, updateAccordion } = useAccordion("multiple", ["media", "links", "files"]);

  const isFilesSecOpen = activeSections.includes("files");
  const isLinksSecOpen = activeSections.includes("links");
  const isMediaSecOpen = activeSections.includes("media");

  const showAllLinks = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowAll?.("links");
  };

  const showAllMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowAll?.("media");
  };

  const showAllFiles = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowAll?.("files");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{"Shared"}</h3>
      </div>

      <div className={styles.section}>
        <div
          className={styles.sec_header}
          aria-expanded={activeSections.includes("media")}
          onClick={() => updateAccordion("media")}
        >
          <h4>{"Media"}</h4>
          {true && (
            <Button
              variant="secondary"
              className={styles.show_all_btn}
              onClick={showAllMedia}
            >
              {"Show All"}
            </Button>
          )}
          <ChevronRightIcon />
        </div>
        <CollapsiblePanel open={isMediaSecOpen}>
          <div className={styles.media_list}>
            {
              data
                ?.filter(item => item.type?.includes("image") || item.type?.includes("video") || item.type?.includes("audio"))?.slice(1, 5)
                .map(item => (
                  <GallaryItem media={item} user={item.author} datetime={item.datetime} key={item.id} />
                ))
            }
          </div>
        </CollapsiblePanel>
      </div>

      <div className={styles.section}>
        <div
          className={styles.sec_header}
          aria-expanded={activeSections.includes("files")}
          onClick={() => updateAccordion("files")}
        >
          <h4>{"Files"}</h4>
          {true && (
            <Button
              variant="secondary"
              className={styles.show_all_btn}
              onClick={showAllFiles}
            >
              {"Show All"}
            </Button>
          )}
          <ChevronRightIcon />
        </div>
        <CollapsiblePanel open={isFilesSecOpen}>
          <Table className={styles.files_table}>
            <Table.Header>
              <tr>
                <Table.Cell>{"File"}</Table.Cell>
                <Table.Cell>{"Shared By"}</Table.Cell>
                <Table.Cell>{"Shared On"}</Table.Cell>
                <Table.Cell sticky="right" className={styles.last_col}></Table.Cell>
              </tr>
            </Table.Header>
            <Table.Body>
              {!data?.length && (
                <tr>
                  <Table.Cell<"td"> as="td" colSpan={3}>
                    {"No files shared yet."}
                  </Table.Cell>
                </tr>
              )}
              {data?.filter(item => !item.type?.includes("image"))?.map(item => (
                <tr key={item.id}>
                  <Table.Cell<"td"> as="td">
                    {!!item.name && <p className={styles.filename}>{item.name}</p>}
                    <p className={styles.filetype}>{item.type}</p>
                  </Table.Cell>
                  <Table.Cell<"td"> as="td">
                    <div className={styles.author}>
                      <Avatar className={styles.author_avatar}>
                        <Image src={item.author.profile} alt={item.author.name ?? "Me"} width={30} height={30} />
                      </Avatar>
                      <p>{item.author.name ?? "Me"}</p>
                    </div>
                  </Table.Cell>
                  <Table.Cell<"td"> as="td" className={styles.shared_on}>
                    {formatDate(item.datetime)}
                  </Table.Cell>
                  <Table.Cell<"td"> as="td" sticky="right" className={styles.last_col}>
                    <Button variant="quaternary" className={styles.action_btn}>
                      <EllipsisHIcon />
                    </Button>
                  </Table.Cell>
                </tr>
              ))}
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
          {false && (
            <Button
              variant="secondary"
              className={styles.show_all_btn}
              onClick={showAllLinks}
            >
              {"Show All"}
            </Button>
          )}
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

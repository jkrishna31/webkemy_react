import Link from "next/link";
import { useState } from "react";

import { Avatar } from "@/lib/components/elements/Avatar";
import { Button } from "@/lib/components/elements/butttons";
import { MediaItem } from "@/lib/components/elements/chat/ChatMedia";
import { GalleryItem } from "@/lib/components/elements/chat/GalleryItem";
import { MediaViewer } from "@/lib/components/elements/chat/MediaViewer";
import { CollapsiblePanel } from "@/lib/components/elements/CollapsiblePanel";
import { Table } from "@/lib/components/elements/Table";
import { useAccordion } from "@/lib/hooks/useAccordion";
import ChevronRightIcon from "@/lib/svgs/icons/ChevronRightIcon";
import EllipsisHIcon from "@/lib/svgs/icons/EllipsisHIcon";
import { formatDate } from "@/lib/utils/datetime";

import styles from "./SharedPanel.module.scss";

export interface SharedPanelProps {
  onClose?: () => void;
  data?: MediaItem[];
  onShowAll?: (key: "files" | "links" | "media") => void;
}

const SharedPanel = ({
  data,
  onClose, onShowAll,
  ...restProps
}: SharedPanelProps) => {
  const [showMedia, setShowMedia] = useState<MediaItem>();

  const { activeSections, updateAccordion } = useAccordion("multiple", ["media", "links", "files"]);

  const isFilesSecOpen = activeSections.includes("files");
  const isLinksSecOpen = activeSections.includes("links");
  const isMediaSecOpen = activeSections.includes("media");

  const media = data?.filter(item => item.type?.includes("image") || item.type?.includes("video") || item.type?.includes("audio"));
  const files = data?.filter(item => !item.type?.includes("image"));

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
              variant="outlined"
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
              media?.slice(1, 5).map(item => (
                <GalleryItem media={item} key={item.id} onClick={() => setShowMedia(item)} />
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
              variant="outlined"
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
              {files?.map(item => (
                <tr key={item.id}>
                  <Table.Cell<"td"> as="td">
                    {!!item.name && <Link href={item.src} target="_blank" className={styles.filename}>{item.name}</Link>}
                    <p className={styles.filetype}>{item.type}</p>
                  </Table.Cell>
                  <Table.Cell<"td"> as="td">
                    <div className={styles.author}>
                      <Avatar className={styles.author_avatar} src={item.user.profile} alt={item.user.name ?? "Me"} />
                      <p>{item.user.name ?? "Me"}</p>
                    </div>
                  </Table.Cell>
                  <Table.Cell<"td"> as="td" className={styles.shared_on}>
                    {formatDate(item.createdOn)}
                  </Table.Cell>
                  <Table.Cell<"td"> as="td" sticky="right" className={styles.last_col}>
                    <Button
                      variant="muted"
                      className={styles.action_btn}
                    >
                      <EllipsisHIcon />
                      {/* todo: show in conversation */}
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
              variant="outlined"
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

      {!!showMedia && (
        <MediaViewer
          open
          mediaId={showMedia?.id}
          media={data ?? []}
          onClose={() => setShowMedia(undefined)}
        />
      )}
    </div>
  );
};

export default SharedPanel;

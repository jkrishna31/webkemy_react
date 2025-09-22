"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Badge } from "@/lib/ui/elements/badges";
import { TreeView } from "@/lib/ui/elements/tree";
import { FileIcon, FolderIcon, FolderOpenIcon } from "@/lib/ui/svgs/icons";
import { getUniqueId } from "@/lib/utils/crypto.utils";

import styles from "./styles.module.scss";

const virtualIds = Array.from({ length: 2000 }).map((_, idx) => `${idx}-${getUniqueId(6)}`);

const Page = () => {
  const [activeTreeSection, setActiveTreeSection] = useState<string[]>([]);

  const updateActiveTreeSection = (id: string, type?: "open" | "close") => {
    setActiveTreeSection(currATS => {
      if (currATS.includes(id)) {
        return [...currATS.filter(item => item !== id)];
      } else {
        return [...currATS, id];
      }
    });
  };

  const renderIcon = (type: "file" | "folder", open?: boolean) => {
    // return (
    //     <Checkbox />
    // );
    if (type === "file") {
      return (
        <FileIcon className="text-[var(--fg-s-alt)] w-[1.8rem] h-[1.8rem]" />
      );
    }
    if (open) {
      return (
        <FolderOpenIcon className="text-[var(--fg-s-alt)] w-[1.8rem] h-[1.8rem]" />
      );
    }
    return (
      <FolderIcon className="text-[var(--fg-s-alt)] w-[1.8rem] h-[1.8rem]" />
    );
  };

  const renderTreeNode = (
    id: string, label: string, type: "file" | "folder", open?: boolean,
    children?: number,
  ) => {
    return (
      <div
        className="flex items-center gap-[.6rem] py-[.6rem] px-[.8rem] border-solid border-[.1rem] border-transparent hover:border-[var(--border-s)] rounded-[.4rem]"
        onClick={type === "folder" ? () => updateActiveTreeSection(id) : undefined}
      >
        {renderIcon(type, open)}
        {label}
        {
          children ? (
            <Badge float={null}>{children}</Badge>
          ) : null
        }
      </div>
    );
  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="tree-view" />

      <TreeView
        className={styles.tree}
        expandedIds={activeTreeSection}
        tree={[
          {
            id: virtualIds[0],
            render: (open) => renderTreeNode(
              virtualIds[0], "components", "folder", open,
            ),
            onExpand: (id) => updateActiveTreeSection(id),
            children: [
              {
                id: virtualIds[1],
                render: (open) => renderTreeNode(
                  virtualIds[1], "general", "folder", open,
                ),
                onExpand: (id) => updateActiveTreeSection(id),
                children: [
                  {
                    id: virtualIds[2],
                    render: (open) => renderTreeNode(
                      virtualIds[2], "CalendarWidget", "folder", open, 2
                    ),
                    onExpand: (id) => updateActiveTreeSection(id),
                    children: [
                      {
                        id: virtualIds[8],
                        render: renderTreeNode(
                          virtualIds[8], "CalendarWidget.tsx", "file",
                        ),
                      },
                      {
                        id: virtualIds[9],
                        render: renderTreeNode(
                          virtualIds[9], "CalendarWidget.module.scss", "file",
                        ),
                      },
                    ]
                  },
                  {
                    id: virtualIds[3],
                    render: renderTreeNode(
                      virtualIds[3], "index.ts", "file",
                    ),
                  },
                ]
              },
              {
                id: virtualIds[10],
                render: (open) => renderTreeNode(
                  virtualIds[10], "icons", "folder", open, 5
                ),
                onExpand: (id) => updateActiveTreeSection(id),
                children: [
                  {
                    id: virtualIds[11],
                    render: renderTreeNode(
                      virtualIds[11], "ChevronDownIcon.tsx", "file",
                    ),
                  },
                  {
                    id: virtualIds[12],
                    render: renderTreeNode(
                      virtualIds[12], "AddIcon.tsx", "file",
                    ),
                  },
                  {
                    id: virtualIds[13],
                    render: renderTreeNode(
                      virtualIds[13], "ArrowNorthEastIcon.tsx", "file",
                    ),
                  },
                  {
                    id: virtualIds[14],
                    render: renderTreeNode(
                      virtualIds[14], "HomeIcon.tsx", "file",
                    ),
                  },
                  {
                    id: virtualIds[15],
                    render: renderTreeNode(
                      virtualIds[15], "index.ts", "file",
                    ),
                  },
                ],
              },
              {
                id: virtualIds[4],
                render: renderTreeNode(
                  virtualIds[4], "index.ts", "file",
                ),
              },
            ],
          },
          {
            id: virtualIds[5],
            render: (open) => renderTreeNode(
              virtualIds[5], "pages", "folder", open, 2
            ),
            onExpand: (id) => updateActiveTreeSection(id),
            children: [
              {
                id: virtualIds[6],
                render: renderTreeNode(
                  virtualIds[6], "contact_us_page.tsx", "file",
                ),
              },
              {
                id: virtualIds[7],
                render: renderTreeNode(
                  virtualIds[7], "privacy_policy_page.tsx", "file",
                ),
              },
            ]
          }
        ]}
      />
    </main>
  );
};

export default Page;

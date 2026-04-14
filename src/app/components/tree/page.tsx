"use client";

import { PageSetup } from "@/components/managers";
import { Badge } from "@/lib/components/elements/Badge";
import { Tree, TreeNode } from "@/lib/components/elements/Tree";
import { useAccordion } from "@/lib/hooks/useAccordion";
import FileIcon from "@/lib/svgs/icons/FileIcon";
import FolderIcon from "@/lib/svgs/icons/FolderIcon";
import FolderOpenIcon from "@/lib/svgs/icons/FolderOpenIcon";

import styles from "./page.module.scss";


type TNode = TreeNode<TNode>;

const dummyData: TreeNode<TNode>[] = [
  {
    id: "components",
    label: "Components",
    children: [
      {
        id: "general",
        label: "general",
        children: [
          {
            id: "calendar_widget",
            label: "CalendarWidget",
            children: [
              {
                id: "cwtsx",
                label: "CalendarWidget.tsx",
              },
              {
                id: "cwscss",
                label: "CalendarWidget.module.scss",
              },
              {
                id: "cwi",
                label: "index.ts",
              },
            ],
          },
          {
            id: "gi",
            label: "index.ts",
          },
        ],
      },
      {
        id: "icons",
        label: "icons",
        children: [
          {
            id: "cdi",
            label: "ChevronDownIcon.tsx",
          },
          {
            id: "ai",
            label: "AddIcon.tsx",
          },
          {
            id: "anei",
            label: "ArrowNorthEastIcon.tsx",
          },
          {
            id: "hi",
            label: "HomeIcon.tsx",
          },
          {
            id: "ii",
            label: "index.ts",
          },
        ],
      },
      {
        id: "ci",
        label: "index.ts",
      },
    ],
  },
  {
    id: "pages",
    label: "Pages",
    children: [
      {
        id: "cup",
        label: "contact_us_page.tsx",
      },
      {
        id: "ppp",
        label: "privacy_policy_page.tsx",
      },
    ],
  },
];

const Page = () => {
  const { activeSections, updateAccordion } = useAccordion<string>("multiple");

  const renderIcon = (type: "file" | "folder", open?: boolean) => {
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

  const renderNode = (node: TNode, options?: { isExpanded?: boolean; depth?: number; }) => {
    const isFolder = node.children?.length;
    return (
      <div
        className="flex items-center gap-[.6rem] py-[.6rem] px-[.8rem] border-solid border-[.1rem] border-transparent hover:border-[var(--border-s)] rounded-[.4rem]"
      >
        {renderIcon(isFolder ? "folder" : "file", options?.isExpanded)}
        {node.label}
        {
          node.children?.length ? (
            <Badge float={null}>{node.children.length}</Badge>
          ) : null
        }
      </div>
    );
  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="tree" />

      <Tree
        className={styles.tree}
        expandedIds={activeSections}
        renderWhileClosed={false}
        onNodeExpand={updateAccordion}
        renderNode={renderNode}
        tree={dummyData}
      />
    </main>
  );
};

export default Page;

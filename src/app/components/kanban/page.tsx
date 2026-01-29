"use client";

import Image from "next/image";
import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Color } from "@/lib/types/general.types";
import { Avatar } from "@/lib/ui/elements/Avatar";
import { Dropdown } from "@/lib/ui/elements/Dropdown";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Kanban, KanbanColumn, KanbanItem } from "@/lib/ui/elements/Kanban";
import { Tabs } from "@/lib/ui/elements/Tabs";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";

import styles from "./page.module.scss";

const defaultCols: { [key: string]: { id: string; name: string; items: number; color: Color } } = {
  backlog: {
    id: "backlog",
    name: "Backlog",
    items: 21,
    color: "red",
  },
  inProgress: {
    id: "inProgress",
    name: "In Progress",
    items: 3,
    color: "yellow",
  },
  prRaised: {
    id: "prRaised",
    name: "PR Raised",
    items: 2,
    color: "purple",
  },
  qaTesting: {
    id: "qaTesting",
    name: "QA Testing",
    items: 12,
    color: "blue",
  },
  done: {
    id: "done",
    name: "Done",
    items: 18,
    color: "green",
  },
};

const defaultUsers: { [key: string]: { id: string; name: string; profile: string; } } = {
  u1: {
    id: "u1",
    name: "Ethan Brooks",
    profile: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60",
  },
  u2: {
    id: "u2",
    name: "Natalie Kim",
    profile: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=60",
  },
  u3: {
    id: "u3",
    name: "Amelia Green",
    profile: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=500&auto=format&fit=crop&q=60",
  },
  u4: {
    id: "u4",
    name: "Lucille Guadalupe",
    profile: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1631&auto=format&fit=crop",
  },
  u5: {
    id: "u5",
    name: "Yvonne Roosevelt",
    profile: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=687&auto=format&fit=crop",
  },
};

const defaultItems = [
  {
    id: "t1",
    name: "Set up project repository",
    desc: "Initialize Git repository, add README, ESLint, and basic project structure.",
    tags: ["setup", "repo"],
    status: "backlog",
    assigneeId: "u1"
  },
  {
    id: "t2",
    name: "Define coding standards",
    desc: "Document linting rules, naming conventions, and folder structure.",
    tags: ["docs", "standards"],
    status: "backlog",
    assigneeId: "u2"
  },
  {
    id: "t3",
    name: "Design Kanban board UI",
    desc: "Create layout and component structure for the Kanban board.",
    tags: ["ui", "design"],
    status: "inProgress",
    assigneeId: "u3"
  },
  {
    id: "t4",
    name: "Implement column layout",
    desc: "Build column containers and basic card styling.",
    tags: ["frontend", "layout"],
    status: "inProgress",
    assigneeId: "u1"
  },
  {
    id: "t5",
    name: "Create task data model",
    desc: "Define task schema and validation rules.",
    tags: ["backend", "model"],
    status: "prRaised",
    assigneeId: "u4"
  },
  {
    id: "t6",
    name: "Implement task CRUD APIs",
    desc: "Build APIs for creating, updating, and deleting tasks.",
    tags: ["backend", "api"],
    status: "prRaised",
    assigneeId: "u2"
  },
  {
    id: "t7",
    name: "Review API implementation",
    desc: "Perform code review and suggest improvements.",
    tags: ["review", "backend"],
    status: "qaTesting",
    assigneeId: "u5"
  },
  {
    id: "t8",
    name: "Finalize project requirements",
    desc: "Confirm functional and non-functional requirements.",
    tags: ["planning"],
    status: "done",
    assigneeId: "u5"
  },
  {
    id: "t9",
    name: "Integrate drag and drop",
    desc: "Enable drag-and-drop functionality for task movement.",
    tags: ["frontend", "interaction"],
    status: "inProgress",
    assigneeId: "u3"
  },
  {
    id: "t10",
    name: "Add task filters",
    desc: "Filter tasks by status, assignee, and tags.",
    tags: ["frontend", "feature"],
    status: "backlog",
    assigneeId: "u4"
  },
  {
    id: "t11",
    name: "Implement auth middleware",
    desc: "Protect APIs using authentication middleware.",
    tags: ["security", "backend"],
    status: "prRaised",
    assigneeId: "u1"
  },
  {
    id: "t12",
    name: "Fix drag flicker bug",
    desc: "Resolve UI flicker while dragging task cards.",
    tags: ["bugfix", "ui"],
    status: "qaTesting",
    assigneeId: "u3"
  },
  {
    id: "t13",
    name: "Write unit tests",
    desc: "Add unit tests for task reducers and services.",
    tags: ["testing", "unit"],
    status: "inProgress",
    assigneeId: "u2"
  },
  {
    id: "t14",
    name: "Improve task card accessibility",
    desc: "Add ARIA roles and keyboard navigation.",
    tags: ["a11y", "frontend"],
    status: "backlog",
    assigneeId: "u1"
  },
  {
    id: "t15",
    name: "Refactor state management",
    desc: "Simplify task state logic and remove duplication.",
    tags: ["refactor", "state"],
    status: "prRaised",
    assigneeId: "u4"
  },
  {
    id: "t16",
    name: "QA regression testing",
    desc: "Test all flows after recent merges.",
    tags: ["qa", "testing"],
    status: "qaTesting",
    assigneeId: "u5"
  },
  {
    id: "t17",
    name: "Deploy to staging",
    desc: "Deploy latest build and verify environment variables.",
    tags: ["deployment", "devops"],
    status: "done",
    assigneeId: "u2"
  },
  {
    id: "t18",
    name: "Optimize bundle size",
    desc: "Analyze and reduce JS bundle size.",
    tags: ["performance", "frontend"],
    status: "backlog",
    assigneeId: "u3"
  },
  {
    id: "t19",
    name: "Add empty state UI",
    desc: "Show helpful empty states for columns with no tasks.",
    tags: ["ui", "ux"],
    status: "inProgress",
    assigneeId: "u4"
  },
  {
    id: "t20",
    name: "Fix API error handling",
    desc: "Standardize error responses across APIs.",
    tags: ["bugfix", "backend"],
    status: "prRaised",
    assigneeId: "u1"
  },
  {
    id: "t21",
    name: "Verify permissions logic",
    desc: "Ensure users can only modify allowed tasks.",
    tags: ["security", "qa"],
    status: "qaTesting",
    assigneeId: "u2"
  },
  {
    id: "t22",
    name: "Release notes draft",
    desc: "Prepare initial release notes for v1.0.",
    tags: ["docs", "release"],
    status: "backlog",
    assigneeId: "u5"
  },
  {
    id: "t23",
    name: "Clean up console warnings",
    desc: "Remove unused logs and fix warnings.",
    tags: ["cleanup", "frontend"],
    status: "done",
    assigneeId: "u3"
  },
  {
    id: "t24",
    name: "Improve API performance",
    desc: "Add caching and optimize DB queries.",
    tags: ["performance", "backend"],
    status: "inProgress",
    assigneeId: "u2"
  },
  {
    id: "t25",
    name: "Add confirmation modals",
    desc: "Confirm destructive actions like delete.",
    tags: ["ux", "frontend"],
    status: "backlog",
    assigneeId: "u4"
  },
  {
    id: "t26",
    name: "Fix mobile layout issues",
    desc: "Resolve overflow and spacing issues on small screens.",
    tags: ["responsive", "ui"],
    status: "qaTesting",
    assigneeId: "u1"
  },
  {
    id: "t27",
    name: "Finalize UI polish",
    desc: "Spacing, colors, and hover state refinements.",
    tags: ["ui", "polish"],
    status: "prRaised",
    assigneeId: "u3"
  },
  {
    id: "t28",
    name: "Set up monitoring",
    desc: "Add basic logging and error monitoring.",
    tags: ["monitoring", "devops"],
    status: "backlog",
    assigneeId: "u5"
  },
  {
    id: "t29",
    name: "User acceptance testing",
    desc: "Validate features with stakeholders.",
    tags: ["uat", "testing"],
    status: "qaTesting",
    assigneeId: "u4"
  },
  {
    id: "t30",
    name: "Production deployment",
    desc: "Deploy application to production environment.",
    tags: ["deployment", "release"],
    status: "done",
    assigneeId: "u5"
  }
];

const Page = () => {
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");
  const [colsOrder, setColsOrder] = useState<string[]>(["backlog", "inProgress", "prRaised", "qaTesting", "done"]);
  const [collapsedCols, setCollapsedCols] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [showKanbanOptions, setShowKanbanOptions] = useState(false);

  const [items, setItems] = useState(defaultItems);

  // todo:
  // columns (resize, add/remove, reorder)
  // col item (add/remove, reorder, transfer across col)
  // combined view

  const getItems = (userId?: string, status?: string) => {
    return items.filter(item => (userId ? item.assigneeId === userId : true) && (status ? item.status === status : true));
  };

  const updateColsOrder = () => {

  };

  const handleColCollapse = (colKey: string, value: boolean) => {
    if (collapsedCols.includes(colKey)) {
      setCollapsedCols(collapsedCols.filter(key => key !== colKey));
    } else {
      setCollapsedCols([...collapsedCols, colKey]);
    }
  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="kanban" />

      <div className={styles.users_list}>
        <Tabs
          variant="muted"
          activeTab={selectedUser}
          onChange={setSelectedUser}
          tabs={[
            { id: "all", label: "All" },
            ...Object.keys(defaultUsers).map(userKey => {
              const user = defaultUsers[userKey];
              return {
                id: userKey,
                render: (
                  <Avatar className={styles.user_avatar}>
                    <Image src={user.profile} alt={user.name} width={34} height={34} />
                  </Avatar>
                ),
                label: user.name,
              };
            })
          ]}
          tabClass={styles.user_btn}
        />
        <Dropdown
          open={showKanbanOptions}
          onOpenChange={setShowKanbanOptions}
          dropdown={
            <ItemList>
              <Item
                primary={layout === "horizontal" ? "Vertical Layout" : "Horizontal Layout"}
                scope="list"
                onClick={() => {
                  setShowKanbanOptions(false);
                  setLayout(layout === "horizontal" ? "vertical" : "horizontal");
                }}
              />
            </ItemList>
          }
          hintIcon={false}
          triggerClass={styles.layout_btn}
        >
          <EllipsisHIcon />
        </Dropdown>
      </div>

      <Kanban layout={layout}>
        {
          colsOrder.map((colKey) => {
            const col = defaultCols[colKey];
            const colItems = getItems(selectedUser !== "all" ? selectedUser : undefined, colKey);

            return (
              <KanbanColumn
                key={col.id}
                color={col.color as Color}
                name={col.name}
                count={colItems.length ?? 0}
                collapsed={collapsedCols.includes(col.id)}
                onCollapseChange={(value) => handleColCollapse(col.id, value)}
                layout={layout}
              >
                {
                  colItems.map((item, idx) => {
                    return (
                      <KanbanItem
                        key={idx}
                        itemKey={idx}
                      >
                        <div className={styles.item_card}>
                          <h4 className={styles.item_title}>{item.name}</h4>
                          <p className={styles.item_desc}>{item.desc}</p>
                          {selectedUser === "all" && (
                            <div className={styles.assignee}>
                              <Avatar className={styles.user_avatar}>
                                <Image src={defaultUsers[item.assigneeId].profile} alt={defaultUsers[item.assigneeId].name} width={34} height={34} />
                              </Avatar>
                              <p>{defaultUsers[item.assigneeId].name}</p>
                            </div>
                          )}
                        </div>
                      </KanbanItem>
                    );
                  })
                }
              </KanbanColumn>
            );
          })
        }
      </Kanban>
    </main>
  );
};

export default Page;

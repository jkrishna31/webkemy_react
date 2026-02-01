"use client";

import Image from "next/image";
import React, { Fragment, RefObject, useRef, useState } from "react";

import { PageSetup } from "@/components/managers";
import { useAccordion } from "@/lib/hooks/useAccordion";
import { Color } from "@/lib/types/general.types";
import { Avatar } from "@/lib/ui/elements/Avatar";
import { Button } from "@/lib/ui/elements/butttons";
import { Chip } from "@/lib/ui/elements/Chip";
import { Dropdown } from "@/lib/ui/elements/Dropdown";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Kanban, KanbanColumn, KanbanItem } from "@/lib/ui/elements/Kanban";
import { Tabs } from "@/lib/ui/elements/Tabs";
import ChevronDownIcon from "@/lib/ui/svgs/icons/ChevronDownIcon";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./page.module.scss";

const defaultColOrder = ["backlog", "inProgress", "prRaised", "qaTesting", "done"];

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

const defaultTags: { [key: string]: Color } = {
  Setup: "red",
  Docs: "orange",
  UI: "yellow",
  UX: "pink",
  Frontend: "blue",
  Backend: "gray",
  Model: "green",
  API: "blue",
  Review: "purple",
  Planning: "purple",
  Feature: "pink",
  Security: "red",
  Bug: "red",
  Testing: "orange",
  A11y: "pink",
  QA: "blue",
  Deployment: "green",
  DevOps: "blue",
  Performance: "purple",
  Release: "yellow",
  Responsive: "orange",
  Monitoring: "purple",
  UAT: "green",
};

const defaultItems = [
  {
    id: "t1",
    name: "Set up project repository",
    desc: "Initialize Git repository, add README, ESLint, and basic project structure.",
    tags: ["Setup"],
    status: "backlog",
    assigneeId: "u1"
  },
  {
    id: "t2",
    name: "Define coding standards",
    desc: "Document linting rules, naming conventions, and folder structure.",
    tags: ["Docs"],
    status: "backlog",
    assigneeId: "u2"
  },
  {
    id: "t3",
    name: "Design Kanban board UI",
    desc: "Create layout and component structure for the Kanban board.",
    tags: ["UI"],
    status: "inProgress",
    assigneeId: "u3"
  },
  {
    id: "t4",
    name: "Implement column layout",
    desc: "Build column containers and basic card styling.",
    tags: ["Frontend"],
    status: "inProgress",
    assigneeId: "u1"
  },
  {
    id: "t5",
    name: "Create task data model",
    desc: "Define task schema and validation rules.",
    tags: ["Backend", "Model"],
    status: "prRaised",
    assigneeId: "u4"
  },
  {
    id: "t6",
    name: "Implement task CRUD APIs",
    desc: "Build APIs for creating, updating, and deleting tasks.",
    tags: ["Backend", "API"],
    status: "prRaised",
    assigneeId: "u2"
  },
  {
    id: "t7",
    name: "Review API implementation",
    desc: "Perform code review and suggest improvements.",
    tags: ["Review", "Backend"],
    status: "qaTesting",
    assigneeId: "u5"
  },
  {
    id: "t8",
    name: "Finalize project requirements",
    desc: "Confirm functional and non-functional requirements.",
    tags: ["Planning"],
    status: "done",
    assigneeId: "u5"
  },
  {
    id: "t9",
    name: "Integrate drag and drop",
    desc: "Enable drag-and-drop functionality for task movement.",
    tags: ["Frontend"],
    status: "inProgress",
    assigneeId: "u3"
  },
  {
    id: "t10",
    name: "Add task filters",
    desc: "Filter tasks by status, assignee, and tags.",
    tags: ["Frontend", "Feature"],
    status: "backlog",
    assigneeId: "u4"
  },
  {
    id: "t11",
    name: "Implement auth middleware",
    desc: "Protect APIs using authentication middleware.",
    tags: ["Security", "Backend"],
    status: "prRaised",
    assigneeId: "u1"
  },
  {
    id: "t12",
    name: "Fix drag flicker bug",
    desc: "Resolve UI flicker while dragging task cards.",
    tags: ["Bug", "UI"],
    status: "qaTesting",
    assigneeId: "u3"
  },
  {
    id: "t13",
    name: "Write unit tests",
    desc: "Add unit tests for task reducers and services.",
    tags: ["Testing"],
    status: "inProgress",
    assigneeId: "u2"
  },
  {
    id: "t14",
    name: "Improve task card accessibility",
    desc: "Add ARIA roles and keyboard navigation.",
    tags: ["A11y", "Frontend"],
    status: "backlog",
    assigneeId: "u1"
  },
  {
    id: "t15",
    name: "Refactor state management",
    desc: "Simplify task state logic and remove duplication.",
    tags: ["Frontend"],
    status: "prRaised",
    assigneeId: "u4"
  },
  {
    id: "t16",
    name: "QA regression testing",
    desc: "Test all flows after recent merges.",
    tags: ["QA", "Testing"],
    status: "qaTesting",
    assigneeId: "u5"
  },
  {
    id: "t17",
    name: "Deploy to staging",
    desc: "Deploy latest build and verify environment variables.",
    tags: ["Deployment", "DevOps"],
    status: "done",
    assigneeId: "u2"
  },
  {
    id: "t18",
    name: "Optimize bundle size",
    desc: "Analyze and reduce JS bundle size.",
    tags: ["Performance", "Frontend"],
    status: "backlog",
    assigneeId: "u3"
  },
  {
    id: "t19",
    name: "Add empty state UI",
    desc: "Show helpful empty states for columns with no tasks.",
    tags: ["UI", "UX"],
    status: "inProgress",
    assigneeId: "u4"
  },
  {
    id: "t20",
    name: "Fix API error handling",
    desc: "Standardize error responses across APIs.",
    tags: ["Bug", "Backend"],
    status: "prRaised",
    assigneeId: "u1"
  },
  {
    id: "t21",
    name: "Verify permissions logic",
    desc: "Ensure users can only modify allowed tasks.",
    tags: ["Security", "QA"],
    status: "qaTesting",
    assigneeId: "u2"
  },
  {
    id: "t22",
    name: "Release notes draft",
    desc: "Prepare initial release notes for v1.0.",
    tags: ["Docs", "Release"],
    status: "backlog",
    assigneeId: "u5"
  },
  {
    id: "t23",
    name: "Clean up console warnings",
    desc: "Remove unused logs and fix warnings.",
    tags: ["Frontend"],
    status: "done",
    assigneeId: "u3"
  },
  {
    id: "t24",
    name: "Improve API performance",
    desc: "Add caching and optimize DB queries.",
    tags: ["Performance", "Backend"],
    status: "inProgress",
    assigneeId: "u2"
  },
  {
    id: "t25",
    name: "Add confirmation modals",
    desc: "Confirm destructive actions like delete.",
    tags: ["UX", "Frontend"],
    status: "backlog",
    assigneeId: "u4"
  },
  {
    id: "t26",
    name: "Fix mobile layout issues",
    desc: "Resolve overflow and spacing issues on small screens.",
    tags: ["Responsive", "UI"],
    status: "qaTesting",
    assigneeId: "u1"
  },
  {
    id: "t27",
    name: "Finalize UI polish",
    desc: "Spacing, colors, and hover state refinements.",
    tags: ["UI"],
    status: "prRaised",
    assigneeId: "u3"
  },
  {
    id: "t28",
    name: "Set up monitoring",
    desc: "Add basic logging and error monitoring.",
    tags: ["Monitoring", "DevOps"],
    status: "backlog",
    assigneeId: "u5"
  },
  {
    id: "t29",
    name: "User acceptance testing",
    desc: "Validate features with stakeholders.",
    tags: ["UAT", "Testing"],
    status: "qaTesting",
    assigneeId: "u4"
  },
  {
    id: "t30",
    name: "Production deployment",
    desc: "Deploy application to production environment.",
    tags: ["Deployment", "Release"],
    status: "done",
    assigneeId: "u5"
  }
];

const Page = () => {
  const [variant, setVariant] = useState<"separate" | "combined">("combined");
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");
  const [colsOrder, setColsOrder] = useState<string[]>(defaultColOrder);
  const [collapsedCols, setCollapsedCols] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [showKanbanOptions, setShowKanbanOptions] = useState(false);
  const [items, setItems] = useState(defaultItems);

  const [draggingCtx, setDraggingCtx] = useState<{
    type?: "item" | "col",
    srcKey?: string;
    targetKey?: string;
    targetColKey?: string;
    dir?: "before" | "after";
  } | undefined>();

  const isDropped = useRef<boolean>(false);
  const kanbanRef = useRef<HTMLDivElement | HTMLTableElement>(null);

  const { activeSections, updateAccordion } = useAccordion("multiple", Object.keys(defaultUsers));

  const isInsideKanban = (e: React.DragEvent) => {
    if (!kanbanRef.current) return;
    const kanbanRect = kanbanRef.current.getBoundingClientRect();
    if (kanbanRect.top < e.pageY && (kanbanRect.top + kanbanRect.height) > e.pageY && kanbanRect.left < e.pageX && (kanbanRect.left + kanbanRect.width) > e.pageX) return true;
    return;
  };

  const getItems = (userId?: string, status?: string, _items = items) => {
    return _items.filter(item => (userId ? item.assigneeId === userId : true) && (status ? item.status === status : true));
  };

  const updateColsOrder = (srcKey: string, targetKey: string, dir: "before" | "after") => {
    if (srcKey === targetKey) return;

    setColsOrder(currOrder => {
      const newOrder: string[] = [];

      for (let i = 0; i < currOrder.length; i++) {
        if (currOrder[i] === srcKey) continue;
        if (currOrder[i] === targetKey) {
          if (dir === "before") newOrder.push(srcKey);
          newOrder.push(currOrder[i]);
          if (dir === "after") newOrder.push(srcKey);
        } else {
          newOrder.push(currOrder[i]);
        }
      }

      return newOrder;
    });
  };

  const updateItemsOrder = (srcKey: string, targetKey: string, dir: "before" | "after") => {
    if (srcKey === targetKey) return;

    setItems(currItems => {
      const newItems: any[] = [];

      const srcItem = currItems.find(item => item.id === srcKey);
      if (!srcItem) return currItems;

      for (let i = 0; i < currItems.length; i++) {
        if (currItems[i].id === srcKey) continue;
        if (currItems[i].id === targetKey) {
          if (dir === "before") newItems.push({ ...srcItem, status: currItems[i].status });
          newItems.push({ ...currItems[i] });
          if (dir === "after") newItems.push({ ...srcItem, status: currItems[i].status });
        } else {
          newItems.push({ ...currItems[i] });
        }
      }

      return newItems;
    });
  };

  const handleColCollapse = (colKey: string, value?: boolean) => {
    if (collapsedCols.includes(colKey)) {
      setCollapsedCols(collapsedCols.filter(key => key !== colKey));
    } else {
      setCollapsedCols([...collapsedCols, colKey]);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();

    let type: "col" | "item" = "item";
    let item = (e.target as HTMLElement).closest("[data-item-key]");
    if (!item) {
      type = "col";
      item = (e.target as HTMLElement).closest("[data-col-key]");
    }
    const itemKey = item?.getAttribute(`data-${type}-key`);
    if (itemKey) {
      setDraggingCtx({ srcKey: itemKey, type });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    if (draggingCtx?.type === "col") {
      const col = (e.target as HTMLElement).closest("[data-col-key]");
      const colKey = col?.getAttribute("data-col-key") || undefined;

      if (!col) {
        if (!isInsideKanban(e)) {
          setDraggingCtx(curr => ({ ...curr, targetKey: undefined, targetColKey: colKey }));
        }
        return;
      }

      const colRect = col.getBoundingClientRect();
      let dir: "before" | "after";

      if (layout === "horizontal") {
        if (colRect.left <= e.clientX && (colRect.left + colRect.width / 2) >= e.clientX) dir = "before";
        else dir = "after";
      } else {
        if (colRect.top <= e.clientY && (colRect.top + colRect.height / 2) >= e.clientY) dir = "before";
        else dir = "after";
      }

      setDraggingCtx(curr => ({ ...curr, dir, targetKey: undefined, targetColKey: colKey }));
    } else {
      const item = (e.target as HTMLElement).closest("[data-item-key]");
      const itemKey = item?.getAttribute("data-item-key") || undefined;
      const col = (e.target as HTMLElement).closest("[data-col-key]");
      const colKey = col?.getAttribute("data-col-key") || undefined;

      if (!item) {
        if (colKey !== draggingCtx?.targetColKey) {
          setDraggingCtx(curr => ({ ...curr, targetKey: undefined, targetColKey: colKey }));
        }
        return;
      }

      const itemRect = item.getBoundingClientRect();
      let dir: "before" | "after";

      if (layout === "horizontal") {
        if (itemRect.top <= e.clientY && (itemRect.top + itemRect.height / 2) >= e.clientY) dir = "before";
        else dir = "after";
      } else {
        if (itemRect.left <= e.clientX && (itemRect.left + itemRect.width / 2) >= e.clientX) dir = "before";
        else dir = "after";
      }

      setDraggingCtx(curr => ({ ...curr, targetKey: itemKey, dir, targetColKey: colKey }));
    }
  };

  const handleDrop = () => {
    if (!draggingCtx?.srcKey) return;

    isDropped.current = true;

    if (draggingCtx?.type === "col" && draggingCtx?.targetColKey && draggingCtx?.dir) {
      updateColsOrder(draggingCtx.srcKey, draggingCtx.targetColKey, draggingCtx.dir);
    } else if (draggingCtx?.type === "item") {
      if (draggingCtx?.targetKey && draggingCtx?.dir) {
        updateItemsOrder(draggingCtx.srcKey, draggingCtx.targetKey, draggingCtx.dir);
      } else if (draggingCtx?.targetColKey) {
        const newItems: any[] = [];

        const item = items.find(candidate => candidate.id === draggingCtx.srcKey);

        for (let i = 0; i < items.length; i++) {
          if (items[i].id === draggingCtx.srcKey) continue;
          else newItems.push({ ...items[i] });
        }
        newItems.push({ ...item, status: draggingCtx.targetColKey });
        setItems(newItems);
      }
    }

    setDraggingCtx(undefined);
    isDropped.current = false;
  };

  const handleDragEnd = () => {
    if (isDropped.current) {
      isDropped.current = false;
      return;
    }
    setDraggingCtx(undefined);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (isInsideKanban(e)) return;
    setDraggingCtx(curr => ({ ...curr, targetKey: undefined, targetColKey: undefined }));
  };

  // bug: showing item-level placeholder in when hovering over items of other users

  return (
    <main className={styles.main}>
      <PageSetup pageKey="kanban" />

      <div className={styles.controls}>
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
              {variant === "separate" && (
                <Item
                  primary={layout === "horizontal" ? "Vertical Layout" : "Horizontal Layout"}
                  scope="list"
                  onClick={() => {
                    setShowKanbanOptions(false);
                    setLayout(layout === "horizontal" ? "vertical" : "horizontal");
                  }}
                />
              )}
              <Item
                primary={variant === "separate" ? "Combined View" : "Separate View"}
                scope="list"
                onClick={() => {
                  setShowKanbanOptions(false);
                  setVariant(variant === "combined" ? "separate" : "combined");
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

      {variant === "combined" ? (
        <div className={styles.table_wrapper}>
          <table
            ref={kanbanRef as RefObject<HTMLTableElement>}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            className={styles.table}
          >
            <thead>
              <tr>
                {colsOrder.map(colKey => {
                  const colItems = getItems(undefined, colKey);
                  const isColDraggingOverCol = draggingCtx?.type === "col" && draggingCtx?.targetColKey === colKey && draggingCtx.srcKey !== draggingCtx.targetColKey;
                  const isCollapsed = collapsedCols.includes(colKey);

                  return (
                    <Fragment key={colKey}>
                      {(isColDraggingOverCol && draggingCtx.dir === "before") && (
                        <td className={classes(styles.placeholder, styles.ph_col)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></td>
                      )}
                      <th data-col-key={colKey} draggable data-dragging={draggingCtx?.srcKey === colKey}>
                        <div className={styles.header_cell} data-collapsed={isCollapsed}>
                          {!isCollapsed && (
                            <>
                              {defaultCols[colKey].name}
                              <Chip className={styles.chip} color={defaultCols[colKey].color as Color} label={colItems.length} />
                            </>
                          )}
                          <Button
                            variant="quaternary"
                            className={styles.col_collapse_btn}
                            onClick={() => handleColCollapse(colKey)}
                          >
                            <ChevronLeftIcon />
                          </Button>
                        </div>
                      </th>
                      {(isColDraggingOverCol && draggingCtx.dir === "after") && (
                        <td className={classes(styles.placeholder, styles.ph_col)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></td>
                      )}
                    </Fragment>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(defaultUsers).map(userId => {
                  const user = defaultUsers[userId];
                  const userItems = getItems(userId);

                  const isOpen = activeSections.includes(userId);
                  const isDraggingItemBelongsThisUser = userItems.find(item => item.id === draggingCtx?.srcKey);

                  return (
                    <Fragment key={userId}>
                      <tr
                        onClick={() => updateAccordion(userId)}
                        className={styles.user_row}
                        data-collapsed={!isOpen}
                      >
                        <td colSpan={5} className={styles.user_td}>
                          <div className={styles.user_cell}>
                            <div className={styles.user_details}>
                              <ChevronDownIcon />
                              <Avatar className={styles.user_avatar}>
                                <Image src={user.profile} alt={user.name} width={34} height={34} />
                              </Avatar>
                              <p>{user.name}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr>
                          {
                            colsOrder.map(colKey => {
                              const colItems = getItems(undefined, colKey, userItems);
                              const isColCollapsed = collapsedCols.includes(colKey);
                              const isColDraggingOverCol = draggingCtx?.type === "col" && draggingCtx?.targetColKey === colKey && draggingCtx.srcKey !== draggingCtx.targetColKey;

                              return (
                                <Fragment key={colKey}>
                                  {(isColDraggingOverCol && draggingCtx.dir === "before") && (
                                    <td className={classes(styles.placeholder, styles.ph_col)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></td>
                                  )}
                                  {isColCollapsed ? (
                                    <td
                                      key={colKey}
                                      className={classes(styles.col_td, styles.collapsed_col)}
                                      data-col-key={colKey}
                                      data-collapsed={isColCollapsed}
                                      data-dragging-over={draggingCtx?.type === "item" && draggingCtx?.targetColKey === colKey && (!colItems.length || isColCollapsed) && !!isDraggingItemBelongsThisUser}
                                    >
                                      <div className={styles.collapsed_details}>
                                        <Chip className={styles.chip} color={defaultCols[colKey].color as Color} label={colItems.length} />
                                        <p>{defaultCols[colKey].name}</p>
                                      </div>
                                    </td>
                                  ) : (
                                    <td
                                      data-col-key={colKey}
                                      className={styles.col_td}
                                    >
                                      <div className={styles.column_cell}>
                                        {colItems.map(item => {
                                          const isDraggingOverItem = draggingCtx?.type === "item" && draggingCtx?.targetKey === item.id && draggingCtx?.srcKey !== draggingCtx?.targetKey;

                                          return (
                                            <Fragment key={item.id}>
                                              {(isDraggingOverItem && draggingCtx.dir === "before") && (
                                                <div className={classes(styles.placeholder, styles.ph_item)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></div>
                                              )}
                                              <KanbanItem
                                                layout={layout}
                                                itemKey={item.id}
                                                isDraggingOver={isDraggingOverItem}
                                                className={styles.item}
                                              >
                                                <div className={styles.item_card} data-dragging={draggingCtx?.srcKey === item.id}>
                                                  <h4 className={styles.item_title}>{item.name}</h4>
                                                  <p className={styles.item_desc}>{item.desc}</p>
                                                  <div className={styles.tags}>
                                                    {item.tags.map(tag => (
                                                      <Chip key={tag} label={tag} color={defaultTags[tag]} intensity="mid" className={styles.tag} />
                                                    ))}
                                                  </div>
                                                </div>
                                              </KanbanItem>
                                              {(isDraggingOverItem && draggingCtx.dir === "after") && (
                                                <div className={classes(styles.placeholder, styles.ph_item)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></div>
                                              )}
                                            </Fragment>
                                          );
                                        })}
                                      </div>
                                      {draggingCtx?.type === "item" && !draggingCtx?.targetKey && draggingCtx.targetColKey === colKey && isDraggingItemBelongsThisUser && !colItems.find(item => item.id === draggingCtx.srcKey) && (
                                        <div className={classes(styles.placeholder, styles.ph_item)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></div>
                                      )}
                                    </td>
                                  )}
                                  {(isColDraggingOverCol && draggingCtx.dir === "after") && (
                                    <td className={classes(styles.placeholder, styles.ph_col)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></td>
                                  )}
                                </Fragment>
                              );
                            })
                          }
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      ) : (
        <Kanban
          ref={kanbanRef}
          layout={layout}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          {
            colsOrder.map((colKey) => {
              const col = defaultCols[colKey];
              const colItems = getItems(selectedUser !== "all" ? selectedUser : undefined, colKey);

              const isDraggingOverCol = draggingCtx?.type === "col" && draggingCtx?.targetColKey === colKey && draggingCtx.srcKey !== draggingCtx.targetColKey;
              const isCollapsed = collapsedCols.includes(col.id);

              return (
                <Fragment key={col.id}>
                  {(isDraggingOverCol && draggingCtx.dir === "before") && (
                    <div className={classes(styles.placeholder, styles.ph_col)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></div>
                  )}
                  <KanbanColumn
                    colKey={col.id}
                    color={col.color as Color}
                    name={col.name}
                    count={colItems.length ?? 0}
                    collapsed={isCollapsed}
                    onCollapseChange={(value) => handleColCollapse(col.id, value)}
                    layout={layout}
                    isDraggingOver={draggingCtx?.type === "item" && draggingCtx?.targetColKey === colKey && (!colItems.length || isCollapsed)}
                    className={styles.column}
                    data-dragging={draggingCtx?.srcKey === col.id}
                  >
                    {
                      colItems.length ? (
                        <>
                          {colItems.map((item) => {
                            const isDraggingOverItem = draggingCtx?.type === "item" && draggingCtx?.targetKey === item.id && draggingCtx?.srcKey !== draggingCtx?.targetKey;

                            return (
                              <Fragment key={item.id}>
                                {(isDraggingOverItem && draggingCtx.dir === "before") && (
                                  <div className={classes(styles.placeholder, styles.ph_item)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></div>
                                )}
                                <KanbanItem
                                  layout={layout}
                                  itemKey={item.id}
                                  isDraggingOver={isDraggingOverItem}
                                  className={styles.item}
                                >
                                  <div className={styles.item_card} data-dragging={draggingCtx?.srcKey === item.id}>
                                    <h4 className={styles.item_title}>{item.name}</h4>
                                    <p className={styles.item_desc}>{item.desc}</p>
                                    <div className={styles.tags}>
                                      {item.tags.map(tag => (
                                        <Chip key={tag} label={tag} color={defaultTags[tag]} intensity="mid" className={styles.tag} />
                                      ))}
                                    </div>
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
                                {(isDraggingOverItem && draggingCtx.dir === "after") && (
                                  <div className={classes(styles.placeholder, styles.ph_item)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></div>
                                )}
                              </Fragment>
                            );
                          })}
                          {draggingCtx?.type === "item" && !draggingCtx?.targetKey && draggingCtx.targetColKey === col.id && !colItems.find(item => item.id === draggingCtx.srcKey) && (
                            <div className={classes(styles.placeholder, styles.ph_item)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></div>
                          )}
                        </>
                      ) : null
                    }
                  </KanbanColumn>
                  {(isDraggingOverCol && draggingCtx.dir === "after") && (
                    <div className={classes(styles.placeholder, styles.ph_col)} aria-placeholder={draggingCtx.srcKey} data-layout={layout}></div>
                  )}
                </Fragment>
              );
            })
          }
        </Kanban>
      )}
    </main>
  );
};

export default Page;

"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Badge } from "@/lib/ui/elements/badges";
import { Button } from "@/lib/ui/elements/butttons";
import { MenuItem } from "@/lib/ui/elements/menu";
import { CircleIcon, DiamondIcon, RectangleVerticalIcon, SquareIcon, StarIcon, TriangleIcon } from "@/lib/ui/svgs/icons";

import styles from "./styles.module.scss";

const menuItems = [
  {
    key: "1",
    href: "#",
    primary: "Triangle",
    icon: <TriangleIcon className={styles.icon} />,
    subMenu: [
      {
        key: "11",
        href: "#",
        primary: "Equilateral Triangle",
      },
      {
        key: "12",
        href: "#",
        primary: "Isosceles Triangle",
      },
      {
        key: "13",
        href: "#",
        primary: "Scalene Triangle",
      },
    ]
  },
  {
    key: "2",
    href: "#",
    primary: "Long Rectangle",
    icon: <RectangleVerticalIcon className={styles.icon} />,
  },
  {
    key: "3",
    href: "#",
    primary: "Infinite Circle",
    icon: <CircleIcon className={styles.icon} />,
    badge: (minimized: boolean) => <Badge float={minimized ? "tr" : null} color="blue" style={{ marginLeft: "auto" }}>{"37"}</Badge>,
  },
  {
    key: "4",
    href: "#",
    primary: "Far Star",
    secondary: "Lorem Ipsum Dolor Sit",
    icon: <StarIcon className={styles.icon} />,
  },
  {
    key: "5",
    href: "#",
    primary: "Bright Diamond",
    icon: <DiamondIcon className={styles.icon} />,
  },
  {
    key: "6",
    href: "#",
    primary: "Equal Square",
    icon: <SquareIcon className={styles.icon} />,
    badge: (minimized: boolean) => <Badge float={minimized ? "tr" : null} color="red" animate="ripple" style={{ marginLeft: "auto" }} />,
  },
];

const Page = () => {
  const [active, setActive] = useState<string>();
  const [open, setOpen] = useState(true);

  // cascade menu (outside, or overlap or replace with back btn)
  // collapsible
  // tooltip on cpllapse
  // nested menu items ()

  return (
    <main>
      <PageSetup pageKey="menu" />

      <Button
        variant="secondary"
        style={{ fontSize: "1.4rem" }}
        onClick={() => setOpen(!open)}
      >
        {open ? "Collapse" : "Expand"}
      </Button>
      <div className={styles.menu_section}>
        {
          menuItems?.map((menuItem: any) => {
            return (
              <MenuItem<"button">
                key={menuItem.key}
                primary={menuItem.primary}
                secondary={menuItem.secondary}
                disabled={menuItem.disabled}
                icon={menuItem.icon}
                badge={menuItem.badge}
                minimized={!open}
                active={menuItem.key === active}
                onClick={() => setActive(menuItem.key)}
              />
            );
          })
        }
      </div>
    </main>
  );
};

export default Page;

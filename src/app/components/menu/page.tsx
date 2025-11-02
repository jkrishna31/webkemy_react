"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Badge } from "@/lib/ui/elements/badges";
import { Button } from "@/lib/ui/elements/butttons";
import { Menu, MenuItem } from "@/lib/ui/elements/menu";
import { CircleIcon, ConeIcon, CylinderIcon, DiamondIcon, HexagonIcon, OctagonIcon, PentagonIcon, RectangleVerticalIcon, SquareIcon, StarIcon, TriangleIcon } from "@/lib/ui/svgs/icons";

import styles from "./styles.module.scss";

const menuItems = [
  {
    key: "shapes",
    group: "Shapes",
    collapsible: false,
    menu: [
      {
        key: "3",
        href: "#",
        primary: "Circle",
        icon: <CircleIcon className={styles.icon} />,
      },
      {
        key: "2",
        href: "#",
        primary: "Rectangle",
        icon: <RectangleVerticalIcon className={styles.icon} />,
      },
      {
        key: "1",
        href: "#",
        primary: "Triangle",
        icon: <TriangleIcon className={styles.icon} />,
        badge: (minimized: boolean) => <Badge float={minimized ? "tr" : null} color="blue" style={{ marginLeft: "auto" }}>{"37"}</Badge>,
        menu: [
          {
            key: "11",
            href: "#",
            icon: <PentagonIcon className={styles.icon} />,
            primary: "Equilateral Triangle",
          },
          {
            key: "12",
            href: "#",
            icon: <ConeIcon className={styles.icon} />,
            primary: "Isosceles Triangle",
            menu: [
              {
                key: "121",
                href: "#",
                icon: <HexagonIcon className={styles.icon} />,
                primary: "Hexagon",
                badge: (minimized: boolean) => <Badge float={minimized ? "tr" : null} color="green" animate="ripple" style={{ marginLeft: "auto" }} />,
              },
              {
                key: "122",
                href: "#",
                icon: <OctagonIcon className={styles.icon} />,
                primary: "Octagon",
              },
            ]
          },
          {
            key: "13",
            href: "#",
            icon: <CylinderIcon className={styles.icon} />,
            badge: (minimized: boolean) => <Badge float={minimized ? "tr" : null} color="yellow" style={{ marginLeft: "auto" }}>{"66"}</Badge>,
            primary: "Scalene Triangle",
          },
        ]
      },
      {
        key: "4",
        href: "#",
        primary: "Star",
        secondary: "Lorem Ipsum Dolor Sit",
        icon: <StarIcon className={styles.icon} />,
      },
      {
        key: "5",
        href: "#",
        primary: "Diamond",
        icon: <DiamondIcon className={styles.icon} />,
      },
      {
        key: "6",
        href: "#",
        primary: "Square",
        icon: <SquareIcon className={styles.icon} />,
        badge: (minimized: boolean) => <Badge float={minimized ? "tr" : null} color="red" animate="ripple" style={{ marginLeft: "auto" }} />,
      },
    ]
  }
];

const Page = () => {
  const [activeItem, setActiveItem] = useState<string>();
  const [open, setOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string[]>([]);

  const handleMenuToggle = (menuId: string) => {
    if (openMenu.includes(menuId)) {
      setOpenMenu([...openMenu.filter(item => item !== menuId)]);
    } else {
      setOpenMenu([...openMenu, menuId]);
    }
  };

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
      <Menu minimized={!open}>
        {
          menuItems?.map((menuItem: any) => {
            return (
              <MenuItem<"button">
                {...menuItem}
                key={menuItem.key}
                id={menuItem.key}
                minimized={!open}
                activeItem={activeItem}
                openItems={openMenu}
                onMenuToggle={handleMenuToggle}
                onClick={setActiveItem}
              />
            );
          })
        }
      </Menu>
    </main>
  );
};

export default Page;

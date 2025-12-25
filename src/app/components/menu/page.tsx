"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Badge } from "@/lib/ui/elements/Badge";
import { Button } from "@/lib/ui/elements/butttons";
import { Item } from "@/lib/ui/elements/Item";
import { ItemGroup } from "@/lib/ui/elements/ItemGroup";
import { Menu } from "@/lib/ui/elements/Menu";
import CircleIcon from "@/lib/ui/svgs/icons/CircleIcon";
import ConeIcon from "@/lib/ui/svgs/icons/ConeIcon";
import CylinderIcon from "@/lib/ui/svgs/icons/CylinderIcon";
import DiamondIcon from "@/lib/ui/svgs/icons/DiamondIcon";
import HexagonIcon from "@/lib/ui/svgs/icons/HexagonIcon";
import OctagonIcon from "@/lib/ui/svgs/icons/OctagonIcon";
import PentagonIcon from "@/lib/ui/svgs/icons/PentagonIcon";
import RectangleVerticalIcon from "@/lib/ui/svgs/icons/RectangleVerticalIcon";
import SquareIcon from "@/lib/ui/svgs/icons/SquareIcon";
import StarIcon from "@/lib/ui/svgs/icons/StarIcon";
import TriangleIcon from "@/lib/ui/svgs/icons/TriangleIcon";

import styles from "./styles.module.scss";

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

      <Menu minimized={!open} className={styles.menu}>
        <Item
          as="button"
          icon={<CircleIcon className={styles.icon} />}
          primary="Circle"
          badge={(minimized: boolean) => <Badge float={minimized ? "tr" : null} color="green" style={{ marginLeft: "auto", zIndex: 1 }}>{"NEW"}</Badge>}
          minimized={!open}
          data-tooltip="Circl"
          aria-current={activeItem === "1"}
          onClick={() => setActiveItem("1")}
        />
        <Item
          as="button"
          icon={<RectangleVerticalIcon className={styles.icon} />}
          primary="Rectangle"
          data-tooltip="Rectangle"
          minimized={!open}
          aria-current={activeItem === "2"}
          onClick={() => setActiveItem("2")}
        />
        <ItemGroup
          collapsible
          open={openMenu.includes("3")}
          onCollapsibleChange={() => handleMenuToggle("3")}
          minimized={!open}
          item={
            <Item
              as="button"
              icon={<TriangleIcon className={styles.icon} />}
              primary="Triangle"
              data-tooltip="Triangle"
              badge={(minimized: boolean) => <Badge float={minimized ? "tr" : null} color="blue" style={{ marginLeft: "auto" }}>{"37"}</Badge>}
              minimized={!open}
              aria-current={activeItem === "3"}
              onClick={() => setActiveItem("3")}
            />
          }
        >
          <div className={styles.sub_menu}>
            <Item
              as="button"
              icon={<PentagonIcon className={styles.icon} />}
              primary="Equilateral Triangle"
              data-tooltip="Equilateral Triangle"
              minimized={!open}
              aria-current={activeItem === "4"}
              onClick={() => setActiveItem("4")}
            />
            <ItemGroup
              collapsible
              open={openMenu.includes("-5")}
              onCollapsibleChange={() => handleMenuToggle("-5")}
              minimized={!open}
              item={
                <Item
                  as="button"
                  icon={<ConeIcon className={styles.icon} />}
                  primary="Isosceles Triangle"
                  data-tooltip="Isosceles Triangle"
                  minimized={!open}
                  aria-current={activeItem === "-5"}
                  onClick={() => setActiveItem("-5")}
                />
              }
            >
              <div className={styles.sub_menu}>
                <Item
                  as="button"
                  icon={<HexagonIcon className={styles.icon} />}
                  primary="Hexagon"
                  data-tooltip="Hexagon"
                  badge={(minimized: boolean) => <Badge float={minimized ? "tr" : null} color="green" animate="ripple" style={{ marginLeft: "auto" }} />}
                  minimized={!open}
                  aria-current={activeItem === "5"}
                  onClick={() => setActiveItem("5")}
                />
                <Item
                  as="button"
                  icon={<OctagonIcon className={styles.icon} />}
                  primary="Octagon"
                  data-tooltip="Octagon"
                  minimized={!open}
                  aria-current={activeItem === "6"}
                  onClick={() => setActiveItem("6")}
                />
              </div>
            </ItemGroup>
            <Item
              as="button"
              icon={<CylinderIcon className={styles.icon} />}
              primary="Scalene Triangle"
              data-tooltip="Scalene Triangle"
              badge={(minimized: boolean) => <Badge float={minimized ? "tr" : null} color="yellow" style={{ marginLeft: "auto" }}>{"66"}</Badge>}
              minimized={!open}
              aria-current={activeItem === "7"}
              onClick={() => setActiveItem("7")}
            />
          </div>
        </ItemGroup>
        <Item
          as="button"
          icon={<StarIcon className={styles.icon} />}
          primary="Star"
          data-tooltip="Star"
          secondary="Lorem Ipsum Dolor Sit"
          minimized={!open}
          aria-current={activeItem === "8"}
          onClick={() => setActiveItem("8")}
        />
        <Item
          as="button"
          icon={<DiamondIcon className={styles.icon} />}
          primary="Diamond"
          data-tooltip="Diamond"
          minimized={!open}
          aria-current={activeItem === "9"}
          onClick={() => setActiveItem("9")}
        />
        <Item
          as="button"
          icon={<SquareIcon className={styles.icon} />}
          primary="Square"
          data-tooltip="Square"
          badge={(minimized: boolean) => <Badge float={minimized ? "tr" : null} color="red" animate="ripple" style={{ marginLeft: "auto" }} />}
          minimized={!open}
          aria-current={activeItem === "10"}
          onClick={() => setActiveItem("10")}
        />
      </Menu>
    </main>
  );
};

export default Page;

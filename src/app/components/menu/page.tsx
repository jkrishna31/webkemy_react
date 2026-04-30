"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Badge } from "@/lib/components/elements/badge";
import { Button } from "@/lib/components/elements/buttton";
import { Item, ItemGroup } from "@/lib/components/elements/list-item";
import { Menu } from "@/lib/components/elements/menu";
import CircleIcon from "@/lib/svgs/icons/CircleIcon";
import ConeIcon from "@/lib/svgs/icons/ConeIcon";
import CylinderIcon from "@/lib/svgs/icons/CylinderIcon";
import DiamondIcon from "@/lib/svgs/icons/DiamondIcon";
import HexagonIcon from "@/lib/svgs/icons/HexagonIcon";
import OctagonIcon from "@/lib/svgs/icons/OctagonIcon";
import PentagonIcon from "@/lib/svgs/icons/PentagonIcon";
import RectangleVerticalIcon from "@/lib/svgs/icons/RectangleVerticalIcon";
import SquareIcon from "@/lib/svgs/icons/SquareIcon";
import StarIcon from "@/lib/svgs/icons/StarIcon";
import TriangleIcon from "@/lib/svgs/icons/TriangleIcon";

import styles from "./page.module.scss";

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
        variant="outlined"
        style={{ fontSize: "1.4rem" }}
        onClick={() => setOpen(!open)}
      >
        {open ? "Collapse" : "Expand"}
      </Button>

      <Menu minimized={!open} className={styles.menu}>
        <Item
          as="button"
          icon={<CircleIcon className={styles.icon} />}
          label="Circle"
          badge={(minimized: boolean) => <Badge float={minimized ? "tr" : null} color="green" style={{ marginLeft: "auto", zIndex: 1 }}>{"NEW"}</Badge>}
          minimized={!open}
          data-tooltip="Circle"
          aria-current={activeItem === "1"}
          onClick={() => setActiveItem("1")}
        />
        <Item
          as="button"
          icon={<RectangleVerticalIcon className={styles.icon} />}
          label="Rectangle"
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
              label="Triangle"
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
              label="Equilateral Triangle"
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
                  label="Isosceles Triangle"
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
                  label="Hexagon"
                  data-tooltip="Hexagon"
                  badge={(minimized: boolean) => <Badge float={minimized ? "tr" : null} color="green" animate="ripple" style={{ marginLeft: "auto" }} />}
                  minimized={!open}
                  aria-current={activeItem === "5"}
                  onClick={() => setActiveItem("5")}
                />
                <Item
                  as="button"
                  icon={<OctagonIcon className={styles.icon} />}
                  label="Octagon"
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
              label="Scalene Triangle"
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
          label="Star"
          data-tooltip="Star"
          description="Lorem Ipsum Dolor Sit"
          minimized={!open}
          aria-current={activeItem === "8"}
          onClick={() => setActiveItem("8")}
        />
        <Item
          as="button"
          icon={<DiamondIcon className={styles.icon} />}
          label="Diamond"
          data-tooltip="Diamond"
          minimized={!open}
          aria-current={activeItem === "9"}
          onClick={() => setActiveItem("9")}
        />
        <Item
          as="button"
          icon={<SquareIcon className={styles.icon} />}
          label="Square"
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

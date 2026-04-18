"use client";

import { ComponentProps, useEffect } from "react";

import { menuItems } from "@/components/common/app/AppMenu";
import { useActivePage, useLayoutActions, useSidebar, useWindowSize } from "@/data/stores";
import { Item, ItemGroup } from "@/lib/components/elements/list-item";
import { Menu } from "@/lib/components/elements/menu";
import ChevronLeftIcon from "@/lib/svgs/icons/ChevronLeftIcon";
import { classes } from "@/lib/utils/style";

import styles from "./AppSidebar.module.scss";

export interface AppSidebarProps extends ComponentProps<"div"> {

}

const AppSidebar = ({
  className, children,
  ...props
}: AppSidebarProps) => {
  const sidebar = useSidebar();
  const windowSize = useWindowSize();
  const page = useActivePage();
  const { setField } = useLayoutActions();

  const toggleSidebar = () => {
    setField("sidebar", sidebar === "expanded" ? "collapsed" : "expanded");
  };

  useEffect(() => {
    if (windowSize[0] > 768) {
      setField("sidebar", "expanded");
    }
  }, [setField, windowSize]);

  return (
    <div
      className={classes(styles.sidebar, className)}
      style={{ width: sidebar === "collapsed" ? "auto" : "32rem" }}
      {...props}
    >
      <button
        className={styles.close_btn}
        aria-pressed={sidebar === "collapsed"}
        onClick={toggleSidebar}
        aria-label={sidebar === "collapsed" ? "Open Sidebar" : "Close Sidebar"}
        title={sidebar === "collapsed" ? "Open Sidebar" : "Close Sidebar"}
      >
        <ChevronLeftIcon />
      </button>

      <Menu
        minimized={sidebar === "collapsed"}
        className={styles.menu}
      >
        {
          menuItems?.map((group) => (
            <ItemGroup group={group.group} key={group.key} minimized={sidebar === "collapsed"}>
              <div className={styles.list}>
                {
                  group.menu?.map((item) => (
                    <Item<"a">
                      as="a"
                      {...item}
                      key={item.key}
                      aria-current={item.key === page}
                      minimized={sidebar === "collapsed"}
                      data-tooltip={item.label}
                      className={styles.menu_item}
                    />
                  ))
                }
              </div>
            </ItemGroup>
          ))
        }
      </Menu>
    </div>
  );
};

export default AppSidebar;

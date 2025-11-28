"use client";

import React, { ComponentProps, useEffect } from "react";

import { menuItems } from "@/components/common/general/AppMenu";
import { useActivePage, useLayoutActions, useSidebar, useWindowSize } from "@/data/stores";
import { Menu, MenuItem } from "@/lib/ui/elements/menu";
import { ChevronLeftIcon } from "@/lib/ui/svgs/icons";
import { classes } from "@/lib/utils/style.utils";

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
        className={styles.wrapper}
      >
        {
          menuItems.map((item: any) => {
            return (
              <MenuItem
                as={item.group ? "button" : "a"}
                {...item}
                key={item.key}
                id={item.key}
                activeItem={page}
                minimized={sidebar === "collapsed"}
              />
            );
          })
        }
      </Menu>
    </div>
  );
};

export default AppSidebar;

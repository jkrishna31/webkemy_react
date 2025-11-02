"use client";

import React, { ComponentProps, useEffect } from "react";

import { menuItems } from "@/components/common/general/AppMenu";
import { useActivePage, useLayoutActions, useSidebar, useWindowSize } from "@/data/stores";
import { Menu, MenuItem } from "@/lib/ui/elements/menu";
import { ChevronsLeftIcon } from "@/lib/ui/svgs/icons";

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
    <div className={`${styles.sidebar} ${className}`} style={{ width: sidebar === "collapsed" ? "fit-content" : "32rem" }}>
      <button className={styles.close_btn} aria-pressed={sidebar === "collapsed"} onClick={toggleSidebar}>
        <ChevronsLeftIcon />
      </button>

      <Menu minimized={sidebar === "collapsed"} className={styles.wrapper}>
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

"use client";

import React, { ComponentProps, useEffect } from "react";

import { menuItems } from "@/components/common/general/AppMenu";
import { useActivePage, useLayoutActions, useSidebar, useWindowSize } from "@/data/stores";
import { MenuGroup, MenuItem } from "@/lib/ui/elements/menu";
import { ChevronsLeftIcon, ChevronsRightIcon } from "@/lib/ui/svgs/icons";

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
    <div className={`${styles.sidebar} ${className}`}>
      <button className={styles.close_btn} onClick={toggleSidebar}>
        {
          sidebar === "expanded" ? (
            <ChevronsLeftIcon />
          ) : (
            <ChevronsRightIcon />
          )
        }
      </button>

      <div className={styles.wrapper}>
        {
          menuItems.map((item: any) => {
            return (
              <MenuGroup
                key={item.group} title={item.group}
                headerClass={styles.menu_group}
              >
                {
                  item.children?.map((menuItem: any) => {
                    return (
                      <MenuItem<"a">
                        as="a"
                        key={menuItem.key}
                        id={menuItem.key}
                        activeItem={page}
                        href={menuItem.href}
                        primary={menuItem.primary}
                        secondary={menuItem.secondary}
                        icon={menuItem.icon}
                        badge={menuItem.badge}
                        disabled={menuItem.disabled}
                      />
                    );
                  })
                }
              </MenuGroup>
            );
          })
        }
      </div>
    </div>
  );
};

export default AppSidebar;

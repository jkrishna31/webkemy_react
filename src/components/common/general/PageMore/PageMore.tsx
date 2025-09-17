"use client";

import React, { ComponentProps, useCallback, useState } from "react";

import { Dropdown, DropdownList, SelectOption } from "@/lib/ui/elements/dropdowns";
import { EllipsisHIcon } from "@/lib/ui/svgs/icons";

import styles from "./PageMore.module.scss";

export interface PageMoreProps extends ComponentProps<"div"> {
    wrapperClass?: string
    btnClass?: string
    iconClass?: string
    listClass?: string
    options?: SelectOption[]
    onSelect?: any
    xPos?: "left" | "right"
}

const PageMore = ({
    options = [], onSelect, children,
    wrapperClass, btnClass, iconClass, listClass,
    ...props
}: PageMoreProps) => {
    const [open, setOpen] = useState(false);

    const openDd = () => {
        setOpen(true);
    };

    const closeDd = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <Dropdown
            className={`${styles.container} ${wrapperClass}`}
            open={open}
            onOpen={openDd}
            btnClass={`${styles.more_btn} ${btnClass}`}
            onMouseLeave={closeDd}
            // onMouseEnter={openDd}
            dropdown={
                <DropdownList options={options} />
            }
            // title="More"
            {...props}
        >
            {
                children
                    ? children
                    : <EllipsisHIcon className={`${styles.more_btn_icon} ${iconClass}`} />
            }
        </Dropdown>
    );
};

export default PageMore;

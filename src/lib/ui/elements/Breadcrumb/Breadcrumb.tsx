import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

import { RippleLoader } from "@/lib/ui/elements/loaders";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Breadcrumb.module.scss";

export interface Crumb {
    key?: string;
    label?: ReactNode;
    render?: ReactNode;
    loading?: boolean;
    link?: string;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
}

export interface BreadcrumbProps extends ComponentProps<"div"> {
    crumbs?: Crumb[]
}

const Breadcrumb = ({
    crumbs,
}: BreadcrumbProps) => {

    return (
        <ol className={classes("scroll_invisible", styles.list)}>
            {
                crumbs?.map((crumb, idx) => (
                    <li key={crumb.key} className={styles.list_item}>
                        {crumb.render}
                        {
                            crumb.link ? (
                                <Link
                                    href={crumb.link}
                                    data-active={crumb.active}
                                    data-disabled={crumb.disabled}
                                    className={styles.item}
                                    aria-current={crumb.active}
                                    aria-hidden={crumb.disabled}
                                >
                                    {crumb.label}
                                </Link>
                            ) : null
                        }
                        {
                            crumb.onClick ? (
                                <button
                                    onClick={crumb.onClick}
                                    data-active={crumb.active}
                                    data-disabled={crumb.disabled}
                                    disabled={crumb.disabled}
                                    className={styles.item}
                                    aria-current={crumb.active}
                                >
                                    {crumb.label}
                                </button>
                            ) : null
                        }
                        {
                            crumb.loading ? (
                                <RippleLoader className={styles.loader} />
                            ) : null
                        }
                        {
                            idx < (crumbs.length - 1) ? (
                                <ChevronRightIcon className={styles.separator} />
                            ) : null
                        }
                    </li>
                ))
            }
        </ol>
    );
};

export default Breadcrumb;

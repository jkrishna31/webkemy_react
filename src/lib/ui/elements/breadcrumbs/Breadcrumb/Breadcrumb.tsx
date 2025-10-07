import Link from "next/link";
import { ComponentProps, Fragment, ReactNode } from "react";

import { RippleLoader } from "@/lib/ui/elements/loaders";
import { ChevronRightIcon } from "@/lib/ui/svgs/icons";

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
    // todo: minimize the middle section

    return (
        <div className={`scroll_invisible ${styles.list}`}>
            {
                crumbs?.map((crumb, idx) => (
                    <Fragment key={crumb.key}>
                        {crumb.render}
                        {
                            crumb.link ? (
                                <Link
                                    href={crumb.link}
                                    data-active={crumb.active}
                                    data-disabled={crumb.disabled}
                                    className={styles.item}
                                    aria-current={crumb.active}
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
                    </Fragment>
                ))
            }
        </div>
    );
};

export default Breadcrumb;

"use client";

import { ComponentProps } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { NumberInput } from "@/lib/ui/elements/inputs";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "@/lib/ui/svgs/icons";

import styles from "./Pagination.module.scss";

export interface PaginationProps extends ComponentProps<"div"> {
    totalRecords?: number;
    currentPage?: number;
    recordsPerPage: number;
}

const Pagination = ({
    totalRecords = 0, currentPage = 1, recordsPerPage,
    children,
    className,
    ...props
}: PaginationProps) => {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    return (
        <div className={`${styles.pagination_bar} ${className}`}>
            <Button variant="primary" className={styles.pagination_btn} title="Previous">
                <ChevronLeftIcon className={styles.chevron_icon} />
                <span className={styles.btn_label}>{"Prev"}</span>
            </Button>
            <Button variant="secondary" className={styles.page_boundary_btn} title="First Page">
                <ChevronsLeftIcon className={styles.chevron_icon} />
                {1}
            </Button>
            <form className={styles.pagination_form}>
                <NumberInput value={currentPage} className={styles.input} />
                <Button variant="primary" className={`${styles.go_btn}`}>
                    {"Go"}
                </Button>
            </form>
            <Button variant="secondary" className={styles.page_boundary_btn} title="Last Page">
                {totalPages}
                <ChevronsRightIcon className={styles.chevron_icon} />
            </Button>
            <Button variant="primary" className={styles.pagination_btn} title="Next">
                <span className={styles.btn_label}>{"Next"}</span>
                <ChevronRightIcon className={styles.chevron_icon} />
            </Button>
        </div>
    );
};

export default Pagination;

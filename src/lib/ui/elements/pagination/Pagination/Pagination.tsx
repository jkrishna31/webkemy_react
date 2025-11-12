"use client";

import { ComponentProps, useEffect, useState } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { NumberInput } from "@/lib/ui/elements/inputs";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "@/lib/ui/svgs/icons";

import styles from "./Pagination.module.scss";

export interface PaginationProps extends ComponentProps<"div"> {
    totalRecords?: number;
    currentPage?: number;
    recordsPerPage: number;
    onPageChange?: (newPage: number) => void;
    min?: number;
    max?: number;
}

const Pagination = ({
    totalRecords = 0, currentPage = 1, recordsPerPage, onPageChange,
    min, max,
    children,
    className,
    ...props
}: PaginationProps) => {
    const [value, setValue] = useState(currentPage);

    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const handleChange = (newPage: number) => {
        setValue(newPage);
        onPageChange?.(newPage);
    };

    useEffect(() => {
        setValue(currentPage);
    }, [currentPage]);

    return (
        <div className={`${styles.pagination_bar} ${className}`}>
            <Button
                variant="primary" className={styles.pagination_btn} title="Previous"
                onClick={() => handleChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon className={styles.chevron_icon} />
                <span className={styles.btn_label}>{"Prev"}</span>
            </Button>
            <Button
                variant="secondary" className={styles.page_boundary_btn} title="First Page"
                onClick={() => handleChange(1)}
                disabled={currentPage === 1}
            >
                {/* <ChevronsLeftIcon className={styles.chevron_icon} /> */}
                {1}
            </Button>
            <form
                className={styles.pagination_form}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleChange(value);
                }}
            >
                <NumberInput
                    value={value} onInput={e => setValue(Number((e.target as HTMLInputElement).value))}
                    className={styles.input_wrapper} min={1} max={totalPages}
                    enclosedControls
                />
                <Button
                    variant="primary" type="submit" disabled={currentPage === value}
                    className={`${styles.go_btn}`}
                    hidden
                >
                    {"Go"}
                </Button>
            </form>
            <Button
                variant="secondary" className={styles.page_boundary_btn} title="Last Page"
                onClick={() => handleChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                {totalPages}
                {/* <ChevronsRightIcon className={styles.chevron_icon} /> */}
            </Button>
            <Button
                variant="primary" className={styles.pagination_btn} title="Next"
                onClick={() => handleChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <span className={styles.btn_label}>{"Next"}</span>
                <ChevronRightIcon className={styles.chevron_icon} />
            </Button>
        </div>
    );
};

export default Pagination;

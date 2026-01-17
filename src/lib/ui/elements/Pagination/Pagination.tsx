"use client";

import { ComponentProps, useEffectEvent, useLayoutEffect, useState } from "react";

import { Button } from "@/lib/ui/elements/butttons";
import { NumberInput } from "@/lib/ui/elements/inputs/NumberInput";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./Pagination.module.scss";

const getPagesAroundCurrent = (current: number, sibling: number, total: number) => {
    const _pages: number[] = [];
    for (let i = current - sibling; i <= current + sibling; i++) {
        if (i > 1 && i < total) {
            _pages.push(i);
        }
    }
    return _pages;
};

export interface PaginationProps extends ComponentProps<"div"> {
    totalRecords?: number;
    currentPage?: number;
    recordsPerPage: number;
    onPageChange?: (newPage: number) => void;
    min?: number;
    max?: number;
    siblingCount?: number;
}

const Pagination = ({
    totalRecords = 0, currentPage = 1, recordsPerPage, onPageChange,
    min, max, siblingCount = 0,
    children,
    className,
    ...props
}: PaginationProps) => {
    const [value, setValue] = useState(currentPage);

    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const pagesAroundCurrent = getPagesAroundCurrent(currentPage, siblingCount, totalPages);

    const moreBefore = pagesAroundCurrent[0] - 1 > 1;
    const moreAfter = totalPages - pagesAroundCurrent[pagesAroundCurrent.length - 1] > 1;

    const handleChange = (newPage: number) => {
        setValue(newPage);
        onPageChange?.(newPage);
    };

    const updateValue = useEffectEvent((val: number) => {
        setValue(val);
    });

    useLayoutEffect(() => {
        updateValue(currentPage);
    }, [currentPage]);

    return (
        <div className={classes(styles.pagination, className)}>
            <Button
                variant="primary" className={classes(styles.pagination_btn, styles.prev)} title="Previous"
                onClick={() => handleChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon className={styles.chevron_icon} />
                {"Prev"}
            </Button>
            <div className={styles.all_pages}>
                <Button
                    variant="secondary"
                    className={styles.page_boundary_btn}
                    title="First Page"
                    onClick={() => handleChange(1)}
                    disabled={currentPage === 1}
                >
                    {/* <ChevronsLeftIcon className={"chevron_icon"} /> */}
                    {1}
                </Button>
                {
                    siblingCount ? (
                        <div className={styles.pages}>
                            {moreBefore && <EllipsisHIcon className={styles.more} />}
                            {
                                pagesAroundCurrent.map((page) => {
                                    const key = `${page < currentPage ? "p" : page > currentPage ? "n" : "c"}-${page}`;
                                    return (
                                        <Button
                                            key={key}
                                            variant="secondary"
                                            aria-pressed={currentPage === page}
                                            className={styles.page}
                                            onClick={() => handleChange(page)}
                                        >
                                            {page}
                                        </Button>
                                    );
                                })
                            }
                            {moreAfter && <EllipsisHIcon className={styles.more} />}
                        </div>
                    ) : (
                        <form
                            className={styles.pagination_form}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleChange(value);
                            }}
                        >
                            <NumberInput
                                value={value}
                                onInput={e => setValue(Number((e.target as HTMLInputElement).value))}
                                className={styles.input_wrapper} min={1} max={totalPages}
                                enclosedControls
                                aria-label="Page Number"
                            />
                            {currentPage !== value && (
                                <Button
                                    variant="primary" type="submit" disabled={currentPage === value}
                                    className={styles.go_btn}
                                    hidden
                                >
                                    {"Go"}
                                </Button>
                            )}
                        </form>
                    )
                }
                <Button
                    variant="secondary" className={styles.page_boundary_btn} title="Last Page"
                    onClick={() => handleChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    {totalPages}
                    {/* <ChevronsRightIcon className={"chevron_icon"} /> */}
                </Button>
            </div>
            <Button
                variant="primary" className={classes(styles.pagination_btn, styles.next)} title="Next"
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

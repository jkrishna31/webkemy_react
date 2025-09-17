import { ComponentProps } from "react";

import { characters } from "@/constants/characters.const";

import styles from "./Checklist.module.scss";

export interface ChecklistProps extends ComponentProps<"div"> {
    checks: { key: string | number, status: number, label: string }[]
}

const Checklist = ({ checks, ...props }: ChecklistProps) => {
    // show when the field is touched or contains atleast 1 char
    return (
        <div className={styles.component}>
            <ul className={styles.list}>
                {
                    checks?.map((check, idx) => (
                        <li className={styles.check_item} key={check.key}>
                            <span className={styles.status} data-status={check.status}>{check.status ? characters.CHECKMARK : null}</span>
                            <span className={styles.label}>{check.label}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Checklist;

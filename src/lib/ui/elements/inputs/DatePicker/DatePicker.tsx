"use client";

import React from "react";

import { Button } from "@/lib/ui/elements/butttons";

import styles from "./DatePicker.module.scss";

const DatePicker = ({ title, selected, containerClass, ...props }: any) => {
    return (
        <div className={`${styles.container} ${containerClass}`}>
            {/* use month view */}
            <section className={styles.bottom_section}>
                <Button variant="secondary" className={`${styles.control_btn} ${styles.btn_secondary}`}>{"Cancel"}</Button>
                <Button variant="primary" className={`${styles.control_btn}`}>{"Confirm"}</Button>
            </section>
        </div>
    );
};

export default DatePicker;

"use client";

import React, { useState } from "react";

import { Checkbox } from "@/lib/ui/elements/inputs";

import styles from "./TimePicker.module.scss";

const TimePicker = ({ containerClass, ...props }: any) => {
    const [selectedTime, setSelectedTime] = useState({ hourIndex: 11, minuteIndex: 0 });
    const [format24, setFormat24] = useState(false);
    const [am, setAm] = useState(true);

    const handleFormat24 = () => {
        setFormat24(!format24);
    };

    const handleAM = () => {
        setAm(!am);
    };

    const getListFromRange = (from: number, to: number, step: number): string[] => {
        const resultList: string[] = [];
        for (let i = from; i <= to; i += step) {
            resultList.push(i < 10 ? ("0" + i) : (i.toString()));
        }
        return resultList;
    };

    const handleTimePick = (key: string, value: number) => {
        if (key == "hour") {
            setSelectedTime({ ...selectedTime, hourIndex: value });
        } else if (key == "minute") {
            setSelectedTime({ ...selectedTime, minuteIndex: value });
        }
    };

    return (
        <div className={`${styles.container} ${containerClass}`}>
            {
                format24 ? null : (
                    <div className={styles.format_controls}>
                        <Checkbox onChange={handleFormat24} />
                        <div className={`${styles.am_pm_toggle} ${am ? styles.am : styles.pm}`}>
                            <label htmlFor="am" className={`${styles.am_label}`}>
                                <span className={styles.label_text}>{"AM"}</span>
                                <input type="radio" id="am" name="am_pm" className={styles.ampm_radio} checked={am} onChange={(e) => setAm(e.target.checked)} />
                            </label>
                            <label htmlFor="pm" className={`${styles.pm_label}`}>
                                <span className={styles.label_text}>{"PM"}</span>
                                <input type="radio" id="pm" name="am_pm" className={styles.ampm_radio} checked={!am} onChange={(e) => setAm(!e.target.checked)} />
                            </label>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default TimePicker;

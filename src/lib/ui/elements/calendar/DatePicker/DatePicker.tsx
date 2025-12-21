"use client";

import React, { ComponentProps, useEffect, useState } from "react";

import { months, monthsOrder } from "@/data/general/datetime";
import { Button } from "@/lib/ui/elements/butttons";
import { MonthView } from "@/lib/ui/elements/calendar/MonthView";
import { SelectDropdown } from "@/lib/ui/elements/dropdowns";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import ChevronsRightIcon from "@/lib/ui/svgs/icons/ChevronsRightIcon";
import CrossIcon from "@/lib/ui/svgs/icons/CrossIcon";
import { updateDatetime } from "@/lib/utils/datetime.utils";

import styles from "./DatePicker.module.scss";

const monthsOptions = monthsOrder.map(month => months[month]);

const dateFieldMapping = {
  year: 0,
  month: 1,
  day: 2,
};

const today = new Date();

export interface DatePickerProps extends ComponentProps<"input"> {
  range?: boolean
}

const DatePicker = ({
  range, value, onInput, onChange,
  min, max,
  ...props
}: DatePickerProps) => {
  const [_value, setValue] = useState<Array<number[]>>([]);
  const [activeType, setActiveType] = useState<"start" | "end">("start");

  const activeDay = ((range && activeType === "end") ? _value?.[1]?.[2] : _value?.[0]?.[2]);
  const activeMonth = ((range && activeType === "end") ? _value?.[1]?.[1] : _value?.[0]?.[1]);
  const activeYear = ((range && activeType === "end") ? _value?.[1]?.[0] : _value?.[0]?.[0]);

  const startDateSelected = _value?.[0]?.filter(Boolean)?.length === 3;
  const endDateSelected = _value?.[1]?.filter(Boolean)?.length === 3;

  const updateDateField = (newDateField: number, type: "month" | "year" | "day") => {
    if (range) {
      setValue(currValue => {
        const newValue = [
          [...(currValue[0] ?? [])],
          [...(currValue[1] ?? [])],
        ];
        const idx = activeType === "end" ? 1 : 0;
        const finalFieldValue = newDateField + (type === "month" ? 1 : 0);
        newValue[idx][dateFieldMapping[type]] = finalFieldValue;
        if (!idx && !endDateSelected && (type === "month" || type === "year")) {
          newValue[1][dateFieldMapping[type]] = finalFieldValue;
        }
        return newValue;
      });
    } else {
      setValue(currValue => [[
        type === "year" ? newDateField : currValue[0]?.[0],
        type === "month" ? (newDateField + 1) : currValue[0]?.[1],
        type === "day" ? newDateField : currValue[0]?.[2],
      ]]);
    }
  };

  const clearDate = (type: "start" | "end") => {
    if (range) {
      setValue(currValue => {
        const newValue = [[...(currValue[0] ?? [])], [...(currValue[1] ?? [])]];
        const idx = type === "end" ? 1 : 0;
        newValue[idx] = [today.getUTCFullYear(), today.getUTCMonth() + 1,];
        return newValue;
      });
    }
  };

  const navPrevNext = (offset: number) => {
    const newDatetime = updateDatetime(new Date(activeYear, activeMonth), offset, "month");
    const newMonth = newDatetime.getUTCMonth();
    const newYear = newDatetime.getUTCFullYear();
    updateDateField(newMonth, "month");
    updateDateField(newYear, "year");
  };

  useEffect(() => {
    if (!startDateSelected && !endDateSelected) {
      const year = today.getUTCFullYear();
      const month = today.getUTCMonth() + 1;
      if (range) {
        setValue([[year, month], [year, month]]);
      } else {
        setValue([[year, month,]]);
      }
    }
  }, [endDateSelected, range, startDateSelected]);

  useEffect(() => {
    if (startDateSelected || endDateSelected) {
      onInput?.({ target: { value: _value } } as any);
      onChange?.({ target: { value: _value } } as any);
    }
  }, [_value, endDateSelected, onChange, onInput, startDateSelected]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button
          variant="tertiary" className={styles.nav_btn}
          aria-label="Previous Month"
          title="Previous Month"
          onClick={() => navPrevNext(-1)}
        >
          <ChevronLeftIcon />
        </Button>
        <div>
          <SelectDropdown
            selected={activeMonth - 1}
            onOptionSelect={(item) => updateDateField(item.value as number, "month")}
            transformSelected={op => op?.label.slice(0, 3)}
            options={monthsOptions}
            allowSearch
            xPos="left"
          />
          <SelectDropdown
            selected={activeYear}
            onOptionSelect={(item) => updateDateField(item.value as number, "year")}
            options={Array.from({ length: 10 }).map((_, idx: number) => ({ label: `${2020 + idx}`, value: 2020 + idx }))}
            allowSearch
            xPos="left"
          />
        </div>
        <Button
          variant="tertiary" className={styles.nav_btn}
          onClick={() => navPrevNext(1)}
          aria-label="Next Month"
          title="Next Month"
        >
          <ChevronRightIcon />
        </Button>
      </div>

      <MonthView
        mode="mini"
        day={activeDay} month={activeMonth - 1} year={activeYear}
        onAdd={(item: any) => {
          updateDateField(item.year as number, "year");
          updateDateField(item.month as number, "month");
          updateDateField(item.day as number, "day");
        }}
        disable={range ? [[
          (endDateSelected && activeType === "start") ? _value[1].join("-") : undefined,
          (startDateSelected && activeType === "end") ? _value[0].join("-") : undefined,
        ]] : undefined}
      />

      {
        range ? (
          <div className={styles.footer}>
            <div className={styles.entry} data-active={activeType === "start"} data-value={startDateSelected}>
              <button
                onClick={() => setActiveType("start")}
                className={styles.date_value}
              >
                {startDateSelected ? _value[0].join("-") : "Start Date"}
              </button>
              {
                startDateSelected ? (
                  <button
                    className={styles.clear_btn}
                    onClick={() => clearDate("start")}
                  >
                    <CrossIcon />
                  </button>
                ) : null
              }
            </div>
            <ChevronsRightIcon />
            <div className={styles.entry} data-active={activeType === "end"} data-value={endDateSelected}>
              <button
                onClick={() => setActiveType("end")}
                className={styles.date_value}
              >
                {endDateSelected ? _value[1].join("-") : "End Date"}
              </button>
              {
                endDateSelected ? (
                  <button
                    className={styles.clear_btn}
                    onClick={() => clearDate("end")}
                  >
                    <CrossIcon />
                  </button>
                ) : null
              }
            </div>
          </div>
        ) : null
      }
    </div>
  );
};

export default DatePicker;

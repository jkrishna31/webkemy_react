import React, { ComponentProps, ReactNode } from "react";

import { PageMore } from "@/components/common/general";
import { months, monthsOrder } from "@/data/general/datetime";
import { useActiveDay, useActiveMonth, useActiveWeek, useActiveYear, useCalendarActions, useCalendarMode, useShowOutsideDays, useTimeFormat, useWeekDayStart } from "@/data/stores";
import { GeneralDropdown, SelectDropdown } from "@/lib/ui/elements/dropdowns";
import { NumberInput } from "@/lib/ui/elements/inputs/NumberInput";
import { TabList } from "@/lib/ui/elements/TabList";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import { updateDatetime } from "@/lib/utils/datetime.utils";
import { classes } from "@/lib/utils/style.utils";

import styles from "./CalendarHeader.module.scss";

const tabs = [
  {
    label: "Day",
    id: "day",
  },
  {
    label: "Week",
    id: "week",
  },
  {
    label: "Month",
    id: "month",
  },
  {
    label: "Year",
    id: "year",
  },
];

const monthsOptions = monthsOrder.map(month => months[month]);

export interface CalendarHeaderProps extends ComponentProps<"div"> {
  headerLeft?: ReactNode
  headerRight?: ReactNode
}

const CalendarHeader = ({
  headerLeft, headerRight,
  className, children,
}: CalendarHeaderProps) => {
  const calendarMode = useCalendarMode();
  const activeDay = useActiveDay();
  const activeWeek = useActiveWeek();
  const activeMonth = useActiveMonth();
  const activeYear = useActiveYear();
  const weekDayStart = useWeekDayStart();
  const timeFormat = useTimeFormat();
  const showOutsideDays = useShowOutsideDays();
  const { setField, setStore } = useCalendarActions();

  const daysInCurrentMonth = new Date(Date.UTC(activeYear, activeMonth + 1, 0)).getUTCDate();

  const calendarMoreOpts = [
    {
      label: "Toggle Start of Week", value: 0,
      onClick: () => setField("weekDayStart", Number(!weekDayStart)),
    },
    {
      label: "Toggle Time Format", value: 1,
      onClick: () => setField("timeFormat", timeFormat === "12h" ? "24h" : "12h"),
    },
    {
      label: "Toggle Overlapping Days", value: 1,
      onClick: () => setField("showOutsideDays", !showOutsideDays),
    },
  ];

  const handleDateControls = (step: number) => {
    if (calendarMode === "day") {
      const newDatetime = updateDatetime(
        new Date(activeYear, activeMonth, activeDay), step, "day");
      setStore({
        activeDay: newDatetime.getDate(),
        activeMonth: newDatetime.getMonth(),
        activeYear: newDatetime.getFullYear(),
      });
    } else if (calendarMode === "month" || calendarMode === "week") {
      const newDatetime = updateDatetime(
        new Date(activeYear, activeMonth), step, "month");
      setStore({
        activeMonth: newDatetime.getMonth(),
        activeYear: newDatetime.getFullYear(),
      });
    } else if (calendarMode === "year") {
      const newDatetime = updateDatetime(new Date(activeYear, 0), step, "year");
      setStore({
        activeYear: newDatetime.getFullYear(),
      });
    }
  };

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.container_left}>
        <button className={styles.ctrl_btn} onClick={() => handleDateControls(-1)}>
          <ChevronLeftIcon />
        </button>
        {
          calendarMode === "day" ? (
            <SelectDropdown
              selected={activeDay}
              options={
                Array.from({ length: daysInCurrentMonth }).map((_, idx: number) => ({
                  label: String(idx + 1), value: idx + 1
                }))
              }
              onOptionSelect={(item) => setField("activeDay", (item.value as number) + 1)}
              allowSearch
              xPos="left"
            />
          ) : null
        }
        {
          calendarMode === "week" ? (
            <SelectDropdown
              selected={activeWeek}
              options={
                Array.from({ length: 6 }).map((_, idx: number) => ({
                  label: `Week ${idx + 1}`, value: idx + 1
                }))
              }
              onOptionSelect={(item) => setField("activeWeek", item.value as number)}
              allowSearch
              xPos="left"
            />
          ) : null
        }
        {
          calendarMode !== "year" ? (
            <SelectDropdown
              selected={activeMonth}
              transformSelected={op => op?.label.slice(0, 3)}
              options={monthsOptions}
              onOptionSelect={(item) => setField("activeMonth", item.value)}
              allowSearch
              xPos="left"
            />
          ) : null
        }
        <GeneralDropdown
          value={activeYear}
          dropdownContent={
            <NumberInput
              value={activeYear} onInput={e => setField("activeYear", Number((e.target as HTMLInputElement).value))}
              className={styles.year_input}
            />
          }
          xPos={calendarMode === "year" ? "left" : "right"}
        />
        <button className={styles.ctrl_btn} onClick={() => handleDateControls(1)}>
          <ChevronRightIcon />
        </button>
        {headerLeft}
      </div>
      <div className={styles.container_right}>
        <TabList
          activeTab={calendarMode}
          onChange={(id: string) => setField("mode", id)}
          tabs={tabs}
          showScrollBtns={true}
        />
        <PageMore
          options={calendarMoreOpts}
          onSelect={() => { }}
          btnClass={styles.more_btn}
        />
        {headerRight}
      </div>
      {children}
    </div>
  );
};

export default CalendarHeader;

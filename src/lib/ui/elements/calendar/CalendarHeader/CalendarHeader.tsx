import React, { ComponentProps, ReactNode } from "react";

import { months, monthsOrder } from "@/data/general/datetime";
import { useActiveDay, useActiveMonth, useActiveWeek, useActiveYear, useCalendarActions, useCalendarMode, useShowOutsideDays, useTimeFormat, useWeekDayStart } from "@/data/stores";
import { Dropdown } from "@/lib/ui/elements/Dropdown";
import { NumberInput } from "@/lib/ui/elements/inputs/NumberInput";
import { Item } from "@/lib/ui/elements/Item";
import { ItemList } from "@/lib/ui/elements/ItemList";
import { Tabs } from "@/lib/ui/elements/Tabs";
import ChevronLeftIcon from "@/lib/ui/svgs/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/lib/ui/svgs/icons/ChevronRightIcon";
import EllipsisHIcon from "@/lib/ui/svgs/icons/EllipsisHIcon";
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
      label: "Toggle Start of Week",
      onClick: () => setField("weekDayStart", Number(!weekDayStart)),
    },
    {
      label: "Toggle Time Format",
      onClick: () => setField("timeFormat", timeFormat === "12h" ? "24h" : "12h"),
    },
    {
      label: "Toggle Overlapping Days",
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
            <Dropdown
              dropdown={
                <ItemList className={styles.dropdown_list}>
                  {
                    Array.from({ length: daysInCurrentMonth }).map((_, idx: number) => ({
                      label: String(idx + 1), value: idx + 1
                    })).map(item => (
                      <Item
                        key={item.value}
                        primary={item.label}
                        onClick={() => setField("activeDay", (item.value as number))}
                        selected={item.value === activeDay}
                      />
                    ))
                  }
                </ItemList>
              }
            >
              {activeDay}
            </Dropdown>
          ) : null
        }
        {
          calendarMode === "week" ? (
            <Dropdown
              dropdown={
                <ItemList className={styles.dropdown_list}>
                  {
                    Array.from({ length: 6 }).map((_, idx: number) => ({
                      label: `Week ${idx + 1}`, value: idx + 1
                    })).map(item => (
                      <Item
                        key={item.value}
                        primary={item.label}
                        onClick={() => setField("activeWeek", item.value as number)}
                        selected={item.value === activeWeek}
                      />
                    ))
                  }
                </ItemList>
              }
            >
              {"Week "}{activeWeek}
            </Dropdown>
          ) : null
        }
        {
          calendarMode !== "year" ? (
            <Dropdown
              dropdown={
                <ItemList className={styles.dropdown_list}>
                  {
                    monthsOptions.map(item => (
                      <Item
                        key={item.value}
                        primary={item.label}
                        onClick={() => setField("activeMonth", item.value)}
                        selected={item.value === activeMonth}
                      />
                    ))
                  }
                </ItemList>
              }
            >
              {monthsOptions.find(item => item.value === activeMonth)?.label?.slice(0, 3)}
            </Dropdown>
          ) : null
        }
        <Dropdown
          dropdown={
            <NumberInput
              value={activeYear} onInput={e => setField("activeYear", Number((e.target as HTMLInputElement).value))}
              className={styles.year_input}
            />
          }
        >
          {activeYear}
        </Dropdown>
        <button className={styles.ctrl_btn} onClick={() => handleDateControls(1)}>
          <ChevronRightIcon />
        </button>
        {headerLeft}
      </div>
      <div className={styles.container_right}>
        <Tabs
          activeTab={calendarMode}
          onChange={(id: string) => setField("mode", id)}
          tabs={tabs}
          showScrollBtns={true}
        />
        <Dropdown
          dropdown={
            <ItemList>
              {
                calendarMoreOpts.map(item => (
                  <Item<"button"> as="button" key={item.label} primary={item.label} onClick={item.onClick} />
                ))
              }
            </ItemList>
          }
          triggerClass={styles.more_btn}
          hintIcon={null}
        >
          <EllipsisHIcon />
        </Dropdown>
        {headerRight}
      </div>
      {children}
    </div>
  );
};

export default CalendarHeader;

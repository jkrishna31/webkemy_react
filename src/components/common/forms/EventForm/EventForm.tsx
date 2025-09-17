"use client";

import React, { ComponentProps, useState } from "react";

import { weekDays, weekDaysOrder } from "@/data/general/datetime";
import { DateInput, GeneralInput, InputFieldWrapper, InputItem, Select, Switch, TagsInput, TextArea, TimeInput } from "@/lib/ui/elements/inputs";
import { Text } from "@/lib/ui/elements/text";

import { FormControls } from "..";
import styles from "./EventForm.module.scss";

const repeatOptions = [
  { name: "Day", value: "day" },
  { name: "Week", value: "week" },
  { name: "Month", value: "month" },
  { name: "Custom", value: "custom" },
];

const weekdayOptions = weekDaysOrder.map(key => ({ ...weekDays[key], value: key }));

const colorOptions = [
  {
    name: "Green", value: "green",
    icon: (
      <div className={`${styles.color_icon} ${styles.green}`}></div>
    ),
  },
  {
    name: "Blue", value: "blue",
    icon: (
      <div className={`${styles.color_icon} ${styles.blue}`}></div>
    ),
  },
  {
    name: "Red", value: "red",
    icon: (
      <div className={`${styles.color_icon} ${styles.red}`}></div>
    ),
  },
  {
    name: "Yellow", value: "yellow",
    icon: (
      <div className={`${styles.color_icon} ${styles.yellow}`}></div>
    ),
  },
  {
    name: "Orange", value: "orange",
    icon: (
      <div className={`${styles.color_icon} ${styles.orange}`}></div>
    ),
  },
];

export interface EventFormProps extends ComponentProps<"form"> {
  onCancel?: any
}

const EventForm = ({
  onCancel,
  ...props
}: EventFormProps) => {
  const [repeat, setRepeat] = useState(false);

  return (
    <form className={styles.form}>
      <InputItem>
        <Text<"label"> as="label" htmlFor="title">{"Title"}</Text>
        <InputFieldWrapper>
          <GeneralInput id="title" />
        </InputFieldWrapper>
      </InputItem>

      <InputItem>
        <Text<"label"> as="label" htmlFor="desc">{"Description"}</Text>
        <InputFieldWrapper>
          <TextArea id="desc" />
        </InputFieldWrapper>
      </InputItem>

      <InputItem>
        <Text<"label"> as="label" htmlFor="tags">{"Tags"}</Text>
        <TagsInput id="tags" tags={[]} />
      </InputItem>

      <InputItem>
        <Text<"label"> as="label" htmlFor="color">{"Color"}</Text>
        <Select id="color" options={colorOptions} labelKey="name" />
      </InputItem>

      <InputItem inline={true} className={styles.date_time_wrapper}>
        <InputItem>
          <Text<"label"> as="label" htmlFor="start_date">{"Start Date"}</Text>
          <DateInput id="start_date" />
        </InputItem>
        <InputItem>
          <Text<"label"> as="label" htmlFor="start_time">{"Start Time"}</Text>
          <TimeInput id="start_time" />
        </InputItem>
      </InputItem>

      <InputItem inline={true} className={styles.date_time_wrapper}>
        <InputItem>
          <Text<"label"> as="label" htmlFor="end_date">{"End Date"}</Text>
          <DateInput id="end_date" />
        </InputItem>
        <InputItem>
          <Text<"label"> as="label" htmlFor="end_time">{"End Time"}</Text>
          <TimeInput id="end_time" />
        </InputItem>
      </InputItem>

      {/* <InputItem>
        <Text<"label"> as="label" htmlFor="duration">{"Duration"}</Text>
        <NumberInput id="duration" />
      </InputItem> */}

      <InputItem inline>
        <Switch id="repeat" onChange={() => setRepeat(!repeat)} />
        <Text<"label"> as="label" inline htmlFor="repeat">{"Repeat"}</Text>
      </InputItem>

      {
        repeat ? (
          <InputItem inline={true} className={styles.date_time_wrapper}>
            <InputItem>
              <Text<"label"> as="label" htmlFor="repeat_every">{"Repeat Every"}</Text>
              <Select
                labelKey="name"
                options={repeatOptions}
                id="repeat_every"
              />
            </InputItem>
            <InputItem>
              <Text<"label"> as="label" htmlFor="repeat_on">{"On (Week) Day"}</Text>
              <Select
                labelKey="label"
                options={weekdayOptions}
                id="repeat_on"
              />
            </InputItem>
          </InputItem>
        ) : null
      }

      <InputItem inline>
        <Switch id="all_day" />
        <Text<"label"> as="label" inline htmlFor="all_day">{"All Day"}</Text>
      </InputItem>

      {/* repeat - daily, weekly (which weekday - mo, tu, ...), monthly (which day) */}

      <FormControls onCancel={onCancel} />
    </form>
  );
};

export default EventForm;

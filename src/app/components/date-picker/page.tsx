"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { DatePicker } from "@/lib/ui/elements/calendar";
import { InputItem } from "@/lib/ui/elements/inputs/InputItem";
import { Switch } from "@/lib/ui/elements/inputs/Switch";
import { Text } from "@/lib/ui/elements/Text";

import styles from "./styles.module.scss";

const Page = () => {
  const [range, setRange] = useState(false);

  return (
    <main>
      <PageSetup pageKey="date-picker" />
      <InputItem inline className={styles.input}>
        <Text<"label"> as="label" inline htmlFor="range">{"Range"}</Text>
        <Switch onChange={() => setRange(!range)} checked={range} id="range" />
      </InputItem>
      <DatePicker range={range} />
    </main>
  );
};

export default Page;

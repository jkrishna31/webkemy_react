"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { DatePicker } from "@/lib/components/elements/calendar";
import { InputItem } from "@/lib/components/elements/inputs/InputItem";
import { Switch } from "@/lib/components/elements/inputs/Switch";
import { Text } from "@/lib/components/elements/Text";

import styles from "./page.module.scss";

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

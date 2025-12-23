"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { Chip } from "@/lib/ui/elements/Chip";
import { Select } from "@/lib/ui/elements/inputs/Select";

import styles from "./styles.module.scss";

const options = [
  { label: "Option 1", value: "1", disabled: true },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4", disabled: true },
  { label: "Option 5", value: "5" },
  { label: "Option 6", value: "6" },
  { label: "Option 7", value: "7" },
  { label: "Option 8", value: "8" },
  { label: "Option 9", value: "9" },
  { label: "Option 10", value: "10", disabled: true },
  { label: "Option 11", value: "11", disabled: true },
  { label: "Option 12", value: "12" },
  { label: "Option 13", value: "13" },
  { label: "Option 14", value: "14" },
  { label: "Option 15", value: "15" },
  { label: "Option 16", value: "16" },
  { label: "Option 17", value: "17" },
  { label: "Option 18", value: "18" },
  { label: "Option 19", value: "19" },
  { label: "Option 20", value: "20", disabled: true },
];

const Page = () => {
  const [selected1, setSelected1] = useState<string>();
  const [selected2, setSelected2] = useState<string[]>([]);

  const getLabel = (value: string) => {
    return options.find(item => item.value === value)?.label;
  };

  const handleRemove = (value: string) => {
    setSelected2(currSelected => [...currSelected.filter(item => item !== value)]);
  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="select" />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Select
          value={selected1}
          onChange={(e: any) => {
            setSelected1(e.target.value);
          }}
          options={options}
          className={styles.input}
          aria-label="Select"
          placeholder="Select (single)"
          styles={{ root: { marginBottom: "2rem" } }}
        />
        <Select
          defaultValue="5"
          value={selected2}
          onChange={(e: any) => {
            setSelected2(e.target.value);
          }}
          multiple
          options={options}
          className={styles.input}
          aria-label="Select"
          placeholder="Select (multiple)"
        />
        {!!selected2.length && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".8rem", marginTop: "2rem", maxWidth: "40rem" }}>
            {
              selected2.map((item) => (
                <Chip key={item} label={getLabel(item)} onRemove={() => handleRemove(item)} />
              ))
            }
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;

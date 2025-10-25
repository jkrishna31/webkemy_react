"use client";

import React from "react";

import { PageSetup } from "@/components/managers";
import { Badge } from "@/lib/ui/elements/badges";
import { Chip } from "@/lib/ui/elements/chip";

import styles from "./styles.module.scss";

const Page = () => {
  const handleRemove = () => {

  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="chip" />

      <Chip label="Active" onRemove={handleRemove} />
      <Chip color="orange" label="Inactive" onRemove={handleRemove} />
      <Chip color="blue" label="Processing" onRemove={handleRemove} />
      <Chip color="red" label="Cancelled" onRemove={handleRemove} />
      <Chip color="green" label="Successful" onRemove={handleRemove} />
      <Chip color="yellow" style={{ padding: ".5rem 1rem .5rem .7rem", borderRadius: "var(--br-pill)" }}>
        <Badge color="yellow" float={null} animate="ripple" style={{ marginRight: ".5rem" }} />
        {"Pending"}
      </Chip>
    </main>
  );
};

export default Page;

"use client";


import { PageSetup } from "@/components/managers";
import { Badge } from "@/lib/components/elements/badge";
import { Chip } from "@/lib/components/elements/chip";

import styles from "./page.module.scss";

const Page = () => {
  const handleRemove = () => {

  };

  return (
    <main className={styles.main}>
      <PageSetup pageKey="chip" />

      <Chip label="Active" onRemove={handleRemove} />

      <div className={styles.chips}>
        <Chip variant="muted" color="gray" label="Testing" onRemove={handleRemove} />
        <Chip color="gray" label="Testing" onRemove={handleRemove} />
        <Chip color="gray" intensity="mid" label="Testing" onRemove={handleRemove} />
      </div>

      <div className={styles.chips}>
        <Chip variant="muted" color="orange" label="Inactive" onRemove={handleRemove} />
        <Chip color="orange" label="Inactive" onRemove={handleRemove} />
        <Chip color="orange" intensity="mid" label="Inactive" onRemove={handleRemove} />
      </div>

      <div className={styles.chips}>
        <Chip variant="muted" color="blue" label="Processing" onRemove={handleRemove} />
        <Chip color="blue" label="Processing" onRemove={handleRemove} />
        <Chip color="blue" intensity="mid" label="Processing" onRemove={handleRemove} />
      </div>

      <div className={styles.chips}>
        <Chip variant="muted" color="red" label="Cancelled" onRemove={handleRemove} />
        <Chip color="red" label="Cancelled" onRemove={handleRemove} />
        <Chip color="red" intensity="mid" label="Cancelled" onRemove={handleRemove} />
      </div>

      <div className={styles.chips}>
        <Chip variant="muted" color="green" label="Successful" onRemove={handleRemove} />
        <Chip color="green" label="Successful" onRemove={handleRemove} />
        <Chip color="green" intensity="mid" label="Successful" onRemove={handleRemove} />
      </div>

      <div className={styles.chips}>
        <Chip variant="muted" color="yellow" style={{ padding: ".5rem 1rem .5rem .7rem", borderRadius: "var(--br-pill)" }}>
          <Badge color="yellow" float={null} animate="ripple" style={{ marginRight: ".5rem" }} />
          {"Pending"}
        </Chip>
        <Chip color="yellow" style={{ padding: ".5rem 1rem .5rem .7rem", borderRadius: "var(--br-pill)" }}>
          <Badge color="yellow" float={null} animate="ripple" style={{ marginRight: ".5rem" }} />
          {"Pending"}
        </Chip>
        <Chip color="yellow" intensity="mid" style={{ padding: ".5rem 1rem .5rem .7rem", borderRadius: "var(--br-pill)" }}>
          <Badge color="yellow" float={null} animate="ripple" style={{ marginRight: ".5rem" }} />
          {"Pending"}
        </Chip>
      </div>

      <div className={styles.chips}>
        <Chip variant="muted" color="purple" label="Archived" onRemove={handleRemove} />
        <Chip color="purple" label="Archived" onRemove={handleRemove} />
        <Chip color="purple" intensity="mid" label="Archived" onRemove={handleRemove} />
      </div>

      <div className={styles.chips}>
        <Chip variant="muted" color="pink" label="Done" onRemove={handleRemove} />
        <Chip color="pink" label="Done" onRemove={handleRemove} />
        <Chip color="pink" intensity="mid" label="Done" onRemove={handleRemove} />
      </div>
    </main>
  );
};

export default Page;

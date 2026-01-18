"use client";

import { PageSetup } from "@/components/managers";
import useGrid from "@/lib/hooks/useGrid";
import { DynamicGrid, GridItem } from "@/lib/ui/elements/DynamicGrid";

import styles from "./page.module.scss";

const Page = () => {
  const { rows, cols, canMove, canResize, } = useGrid();

  // using canMove/canResize add respective event listeners
  // on drop swap the items dimensions
  // on dragging also show the ghost of the empty candidate (calc the dim. of all empty cells on size change itself)

  return (
    <main>
      <PageSetup pageKey="dynamic-grid" />

      <DynamicGrid className={styles.grid}>
        <GridItem className={styles.grid_item}>{"1"}</GridItem>
        <GridItem className={styles.grid_item}>{"2"}</GridItem>
        <GridItem className={styles.grid_item}>{"3"}</GridItem>
        <GridItem className={styles.grid_item}>{"4"}</GridItem>
        <GridItem className={styles.grid_item}>{"5"}</GridItem>
        <GridItem className={styles.grid_item}>{"6"}</GridItem>
      </DynamicGrid>
    </main>
  );
};

export default Page;

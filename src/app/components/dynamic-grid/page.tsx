"use client";

import { PageSetup } from "@/components/managers";
import useGrid from "@/lib/hooks/useGrid";
import { DynamicGrid, GridItem } from "@/lib/ui/elements/DynamicGrid";

import styles from "./page.module.scss";

const Page = () => {
  const { items, rows, cols, canMove, canResize, getResizers } = useGrid({
    i1: { row: [4, 8], col: [1, 3] },
    i2: { row: [1, 7], col: [9, 12] },
    i3: { row: [4, 8], col: [3, 6] },
    i4: { row: [1, 4], col: [1, 6] },
    i5: { row: [1, 6], col: [6, 9] },
    i6: { col: [6, 11] },
  });

  // using canMove/canResize add respective event listeners
  // on drop swap the items dimensions
  // on dragging also show the ghost of the empty candidate (calc the dim. of all empty cells on size change itself)

  // TODO order:
  // 1. dnd
  // 2. resize

  return (
    <main>
      <PageSetup pageKey="dynamic-grid" />

      <DynamicGrid className={styles.grid}>
        <GridItem
          className={styles.grid_item}
          position={items.i1}
          resizers={getResizers("i1")}
        >
          {"1"}
        </GridItem>
        <GridItem
          className={styles.grid_item}
          position={items.i2}
          resizers={getResizers("i2")}
        >
          {"2"}
        </GridItem>
        <GridItem
          className={styles.grid_item}
          position={items.i3}
          resizers={getResizers("i3")}
        >
          {"3"}
        </GridItem>
        <GridItem
          className={styles.grid_item}
          position={items.i4}
          resizers={getResizers("i4")}
        >
          {"4"}
        </GridItem>
        <GridItem
          className={styles.grid_item}
          position={items.i5}
          resizers={getResizers("i5")}
        >
          {"5"}
        </GridItem>
        <GridItem
          className={styles.grid_item}
          position={items.i6}
          resizers={getResizers("i6")}
        >
          {"6"}
        </GridItem>
      </DynamicGrid>
    </main>
  );
};

export default Page;

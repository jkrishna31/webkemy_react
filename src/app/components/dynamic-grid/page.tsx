import { PageSetup } from "@/components/managers";
import { DynamicGrid, GridItem } from "@/lib/ui/elements/DynamicGrid";

import styles from "./page.module.scss";

const Page = () => {
  // approach
  // 1: as children (can handle any positioning?)
  // 2: render props

  return (
    <main>
      <PageSetup pageKey="dynamic-grid" />

      <DynamicGrid>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
      </DynamicGrid>
    </main>
  );
};

export default Page;

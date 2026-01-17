import { PageSetup } from "@/components/managers";
import { BarsLoader, DotsLoader, LineLoader, RippleLoader, SkeletonLoader } from "@/lib/ui/elements/loaders";

import styles from "./page.module.scss";

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="loader" />

      <RippleLoader />
      <BarsLoader />
      <DotsLoader />
      {/* <LineLoader /> */}

      <div
        style={{
          display: "grid", alignItems: "center", gap: ".6rem 1.2rem", gridTemplateColumns: "auto 1fr", gridTemplateRows: "1fr 1fr"
        }}
      >
        <SkeletonLoader
          loading
          style={{ gridRow: "1/-1", width: "4rem", height: "4rem", borderRadius: "var(--br-pill)", padding: ".2rem" }}
        >
        </SkeletonLoader>
        <SkeletonLoader<"p">
          as="p"
          loading
          style={{ width: "fit-content", height: "fit-content", borderRadius: "var(--br-pill)", padding: ".2rem" }}
        >
          {"John Doe (Developer)"}
        </SkeletonLoader>
        <SkeletonLoader<"p">
          as="p"
          loading
          style={{ height: "fit-content", borderRadius: ".4rem", padding: ".2rem" }}
        >
          {"Lorem ipsum dolor sit amet, inventore."}
        </SkeletonLoader>
      </div>
    </main>
  );
};

export default page;

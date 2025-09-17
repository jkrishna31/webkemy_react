import React from "react";

import { PageSetup } from "@/components/managers";
import { BarsLoader, DotsLoader, LineLoader, RippleLoader, SkeletonLoader } from "@/lib/ui/elements/loaders";

const page = () => {
  return (
    <main>
      <PageSetup pageKey="loader" />

      <RippleLoader />
      <BarsLoader />
      <DotsLoader />
      <SkeletonLoader />
      <LineLoader />
    </main>
  );
};

export default page;

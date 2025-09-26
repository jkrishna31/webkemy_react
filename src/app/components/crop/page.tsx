import React from "react";

import { PageSetup } from "@/components/managers";
import { ImageCrop } from "@/lib/ui/elements/crop";

const Page = () => {
  return (
    <main>
      <PageSetup pageKey="crop" />
      <ImageCrop />
    </main>
  );
};

export default Page;

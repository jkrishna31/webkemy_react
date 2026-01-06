import React from "react";

import { PageSetup } from "@/components/managers";
import { Divider } from "@/lib/ui/elements/Divider";

const Page = () => {
  return (
    <main className="py-[2rem]">
      <PageSetup pageKey="divider" />

      <Divider />
      <Divider label="Label" />
      <Divider label="Label" labelAlignment="center" />
      <Divider label="Label" labelAlignment="right" />
      <div className="flex items-center gap-[1.6rem]">
        <span>{"Left"}</span>
        <Divider orientation="vertical" />
        <span>{"Center"}</span>
        <Divider orientation="vertical" label="Divider Middle" />
        <span>{"Right"}</span>
        <Divider orientation="vertical" />
        <span>{"None"}</span>
      </div>
    </main>
  );
};

export default Page;

import { PageSetup } from "@/components/managers";
import TriangleWarningIcon from "@/lib/ui/svgs/icons/TriangleWarningIcon";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main>
      <PageSetup pageKey="popover" />

      <div className="flex flex-col items-center justify-center gap-[1rem] text-[var(--yellow-2)]">
        <TriangleWarningIcon />
        <p>{"Under Construction!"}</p>
      </div>
    </main>
  );
};

export default Page;

import { PageSetup } from "@/components/managers";
import { Clock } from "@/lib/components/elements/Clock";

const page = () => {
  return (
    <main>
      <PageSetup pageKey="clock" />

      <Clock />
    </main>
  );
};

export default page;

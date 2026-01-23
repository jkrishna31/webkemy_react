import { PageSetup } from "@/components/managers";
import { PricingPlans } from "@/lib/ui/blocks/PricingPlans";

const page = () => {
  return (
    <main>
      <PageSetup pageKey="pricing-plans" />

      <PricingPlans />
    </main>
  );
};

export default page;

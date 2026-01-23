import { PricingCard } from "@/lib/ui/blocks/PricingPlans/PricingCard";

import styles from "./PricingPlans.module.scss";

const PricingPlans = () => {
  return (
    <div className={styles.wrapper}>
      <PricingCard
        planName="Starter"
        description="Lorem ipsum dolor sit amet consecutor."
        billed="month"
        currency="$"
        features={[
          "Market data and news",
          "Basic portfolio tracking",
          "Access to educational resources",
          "Limited customer support",
        ]}
        price={49}
      />
      <PricingCard
        planName="Professional"
        description="Lorem ipsum dolor sit amet consecutor."
        billed="month"
        currency="$"
        features={[
          "All features from the starter plan",
          "Advanced portfolio analysis",
          "Personalized investment recommendations",
          "Priority customer support",
          "Access to a community of investors",
          "Olixer AI Assistant",
        ]}
        price={199}
        color="green"
      />
      <PricingCard
        planName="Genius"
        description="Lorem ipsum dolor sit amet consecutor."
        billed="month"
        currency="$"
        features={[
          "All features from the professional plan",
          "Exclusive access to investment research & analysis",
          "Private personal letter news",
          "Personalized wealth management services",
          "Dedicated account manager",
          "Access to exclusive investment opportunities",
          "Exclusive company investing Account"
        ]}
        price={549}
      />
    </div>
  );
};

export default PricingPlans;

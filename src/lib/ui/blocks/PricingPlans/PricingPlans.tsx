import { ComponentProps } from "react";

import { PricingCard } from "@/lib/ui/blocks/PricingPlans/PricingCard";
import { classes } from "@/lib/utils/style.utils";

import styles from "./PricingPlans.module.scss";

export interface PricingPlansProps extends ComponentProps<"div"> {
  plans: any[];
  billed: "month" | "year";
}

const PricingPlans = ({
  plans, billed,
  className,
  ...restProps
}: PricingPlansProps) => {
  return (
    <div className={classes(styles.wrapper, className)} {...restProps}>
      {
        plans.map(plan => (
          <PricingCard
            key={plan.id}
            className={styles[plan.id]}
            {...plan}
            billed={billed}
            color={
              plan.id === "pro" ?
                "red" :
                // plan.id === "genius" ?
                //   "red" :
                //   "green"
                undefined
            }
            special={plan.id === "pro"}
          />
        ))
      }
    </div>
  );
};

export default PricingPlans;

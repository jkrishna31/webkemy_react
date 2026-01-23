import { ReactNode } from "react";

import { Color } from "@/lib/types/general.types";
import { Button } from "@/lib/ui/elements/butttons";
import { Divider } from "@/lib/ui/elements/Divider";
import CheckmarkBadgeIcon from "@/lib/ui/svgs/icons/CheckmarkBadgeIcon";
import StarIcon from "@/lib/ui/svgs/icons/StarIcon";

import styles from "./PricingCard.module.scss";

export interface PricingCardProps {
  planName: ReactNode;
  description: ReactNode;
  features: string[];
  price: number;
  currency: string;
  billed: string;
  color?: Color;
}

const PricingCard = ({
  planName, description, features, price, currency, billed, color,
}: PricingCardProps) => {
  return (
    <div className={styles.card} data-color={color}>
      <div className={styles.card_inner}>
        <h3 className={styles.plan_name}>
          {planName}
        </h3>
        <p className={styles.plan_desc}>{description}</p>
        <p><span className={styles.price}>{currency}{price}</span><span className={styles.billed}>{" /"}{billed}</span></p>
        <Button variant="primary" className={styles.cta}>{"Get "}{planName}</Button>
        <Divider
          label={
            <>
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </>
          }
          labelAlignment="center"
          className={styles.divider}
        />

        <ul className={styles.features}>
          {
            features.map((item, idx) => (
              <li key={idx}>
                <span className={styles.marker}>
                  <CheckmarkBadgeIcon />
                </span>
                {item}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;

import { ComponentProps, ReactNode } from "react";

import { Color } from "@/lib/types/general.types";
import { Button } from "@/lib/ui/elements/butttons";
import { Divider } from "@/lib/ui/elements/Divider";
import CheckmarkBadgeIcon from "@/lib/ui/svgs/icons/CheckmarkBadgeIcon";
import StarIcon from "@/lib/ui/svgs/icons/StarIcon";
import { classes } from "@/lib/utils/style.utils";

import styles from "./PricingCard.module.scss";

export interface PricingCardProps extends ComponentProps<"div"> {
  planName: ReactNode;
  description: ReactNode;
  features: string[];
  price: number;
  ogPrice?: number;
  currency: string;
  billed: string;
  color?: Color;
  special?: boolean;
}

const PricingCard = ({
  planName, description, features, price, ogPrice, currency, billed, color, special,
  className,
  ...restProps
}: PricingCardProps) => {
  return (
    <div className={classes(styles.card, className)} data-color={color} {...restProps}>
      <div className={styles.card_inner}>
        {<div className={styles.presentation}><div></div></div>}
        {!!special && <div className={styles.chip}>{"Recommended"}</div>}
        <h3 className={styles.plan_name}>{planName}</h3>
        <p className={styles.plan_desc}>{description}</p>
        <p>
          {!!ogPrice && <span className={styles.og_price}><sup className={styles.currency}>{currency}</sup><del>{ogPrice}</del></span>}
          &nbsp;
          <span className={styles.price}><sup className={styles.currency}>{currency}</sup>{price}</span>
          <span className={styles.billed}>{" USD /"}{billed}</span>
        </p>
        <Button variant="primary" className={styles.cta}>{"Get "}{planName}</Button>
        <p className={styles.trial}>{"Start "}<span>{"Free 1 Month"}</span>{" Trial"}</p>
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

        <div className={styles.footer}>

        </div>
      </div>
    </div>
  );
};

export default PricingCard;

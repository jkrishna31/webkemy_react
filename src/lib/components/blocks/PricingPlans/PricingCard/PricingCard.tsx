import { ComponentProps, ReactNode } from "react";

import { Button } from "@/lib/components/elements/butttons";
import { Divider } from "@/lib/components/elements/Divider";
import { Characters } from "@/lib/constants/characters";
import CheckmarkBadgeIcon from "@/lib/svgs/icons/CheckmarkBadgeIcon";
import StarIcon from "@/lib/svgs/icons/StarIcon";
import { TColor } from "@/lib/types/general";
import { classes } from "@/lib/utils/style";

import styles from "./PricingCard.module.scss";

export interface PricingCardProps extends ComponentProps<"div"> {
  planName: ReactNode;
  description: ReactNode;
  features: string[];
  price: number;
  ogPrice?: number;
  currency: string;
  billed: string;
  color?: TColor;
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
        <Button variant="solid" className={styles.cta}>{"Get "}{planName}</Button>
        <p className={styles.trial}>{"Start "}<span>{"Free 1 Month"}</span>{" Trial"}</p>
        <Divider
          label={<p style={{ fontSize: "2.2rem" }}>{Characters.PENTAGRAM} {Characters.PENTAGRAM} {Characters.PENTAGRAM}</p>}
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

import { PageSetup } from "@/components/managers";
import { Marquee } from "@/lib/components/elements/marquee";
import { Amex, ApplePay, Bitcoin, DinersClub, Discover, GooglePay, Jcb, Mastercard, Paypal, Sepa, Stripe, Visa } from "@/lib/svgs/payments";

import styles from "./page.module.scss";

const bannerItems = [
  { render: <Amex /> },
  { render: <ApplePay /> },
  { render: <GooglePay /> },
  { render: <DinersClub /> },
  { render: <Discover /> },
  { render: <Paypal /> },
  { render: <Jcb /> },
  { render: <Sepa /> },
  { render: <Bitcoin /> },
  { render: <Stripe /> },
  { render: <Mastercard /> },
  { render: <Visa /> },
];

const page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="banner" />

      <Marquee className={styles.banner}>
        {
          bannerItems.map((item, idx) => (
            <li key={idx} style={{ contain: "content" }}>{item.render}</li>
          ))
        }
      </Marquee>
      <Marquee className={styles.banner} direction="right">
        {
          bannerItems.map((item, idx) => (
            <li key={idx} style={{ contain: "content" }}>{item.render}</li>
          ))
        }
      </Marquee>

      <div style={{ display: "flex", gap: "2rem" }}>
        <Marquee className={styles.banner_vertical} direction="up">
          {
            bannerItems.map((item, idx) => (
              <li key={idx} style={{ contain: "content" }}>{item.render}</li>
            ))
          }
        </Marquee>

        <Marquee className={styles.banner_vertical} direction="down">
          {
            bannerItems.map((item, idx) => (
              <li key={idx} style={{ contain: "content" }}>{item.render}</li>
            ))
          }
        </Marquee>
      </div>
    </main>
  );
};

export default page;

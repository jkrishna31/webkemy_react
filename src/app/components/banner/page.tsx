import { PageSetup } from "@/components/managers";
import { InfiniteScrollBanner } from "@/lib/components/elements/InfiniteScrollBanner";
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

      <InfiniteScrollBanner className={styles.banner}>
        {
          bannerItems.map((item, idx) => (
            <li key={idx} style={{ contain: "content" }}>{item.render}</li>
          ))
        }
      </InfiniteScrollBanner>
      <InfiniteScrollBanner className={styles.banner} direction="right">
        {
          bannerItems.map((item, idx) => (
            <li key={idx} style={{ contain: "content" }}>{item.render}</li>
          ))
        }
      </InfiniteScrollBanner>

      <div style={{ display: "flex", gap: "2rem" }}>
        <InfiniteScrollBanner className={styles.banner_vertical} direction="up">
          {
            bannerItems.map((item, idx) => (
              <li key={idx} style={{ contain: "content" }}>{item.render}</li>
            ))
          }
        </InfiniteScrollBanner>

        <InfiniteScrollBanner className={styles.banner_vertical} direction="down">
          {
            bannerItems.map((item, idx) => (
              <li key={idx} style={{ contain: "content" }}>{item.render}</li>
            ))
          }
        </InfiniteScrollBanner>
      </div>
    </main>
  );
};

export default page;

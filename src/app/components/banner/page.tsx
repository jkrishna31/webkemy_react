import { PageSetup } from "@/components/managers";
import { InfiniteScrollBanner } from "@/lib/ui/elements/InfiniteScrollBanner";
import { AmexIcon, ApplePayIcon, BitcoinIcon, DinersClubIcon, DiscoverIcon, GooglePayIcon, JcbIcon, MastercardIcon, PaypalIcon, SepaIcon, StripeIcon, VisaIcon } from "@/lib/ui/svgs/payments";

import styles from "./page.module.scss";

const bannerItems = [
  { render: <AmexIcon /> },
  { render: <ApplePayIcon /> },
  { render: <GooglePayIcon /> },
  { render: <DinersClubIcon /> },
  { render: <DiscoverIcon /> },
  { render: <PaypalIcon /> },
  { render: <JcbIcon /> },
  { render: <SepaIcon /> },
  { render: <BitcoinIcon /> },
  { render: <StripeIcon /> },
  { render: <MastercardIcon /> },
  { render: <VisaIcon /> },
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

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

      <InfiniteScrollBanner className="max-w-[100rem]" repeat={2}>
        {
          bannerItems.map((item, idx) => (
            <li key={idx} style={{ contain: "content" }}>{item.render}</li>
          ))
        }
      </InfiniteScrollBanner>
    </main>
  );
};

export default page;

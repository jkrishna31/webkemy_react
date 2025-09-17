import React from "react";

import { PageSetup } from "@/components/managers";
import { BannerItem, InfiniteScrollBanner } from "@/lib/ui/elements/banners";
import { AmexIcon, ApplePayIcon, BitcoinIcon, DinersClubIcon, DiscoverIcon, GooglePayIcon, JcbIcon, MastercardIcon, PaypalIcon, SepaIcon, StripeIcon, VisaIcon } from "@/lib/ui/svgs/payments";

import styles from "./styles.module.scss";

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
            <BannerItem key={idx}>{item.render}</BannerItem>
          ))
        }
      </InfiniteScrollBanner>
    </main>
  );
};

export default page;

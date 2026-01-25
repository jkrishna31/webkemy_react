"use client";

import { useState } from "react";

import { PageSetup } from "@/components/managers";
import { PricingPlans } from "@/lib/ui/blocks/PricingPlans";
import { Tabs } from "@/lib/ui/elements/Tabs";

import styles from "./page.module.scss";

const plans = [
  {
    id: "starter",
    planName: "Starter",
    description: "Lorem ipsum dolor sit amet consecutor.",
    billed: "month",
    currency: "$",
    features: [
      "Market data and news",
      "Basic portfolio tracking",
      "Access to educational resources",
      "Limited customer support",
    ],
    price: 49,
  },
  {
    id: "pro",
    planName: "Professional",
    description: "Lorem ipsum dolor sit amet consecutor.",
    billed: "month",
    currency: "$",
    features: [
      "All features from the starter plan",
      "Advanced portfolio analysis",
      "Personalized investment recommendations",
      "Priority customer support",
      "Access to a community of investors",
      "Olixer AI Assistant",
    ],
    price: 199,
    ogPrice: 249,
  },
  {
    id: "genius",
    planName: "Genius",
    description: "Lorem ipsum dolor sit amet consecutor.",
    billed: "month",
    currency: "$",
    features: [
      "All features from the professional plan",
      "Exclusive access to investment research & analysis",
      "Private personal letter news",
      "Personalized wealth management services",
      "Dedicated account manager",
      "Access to exclusive investment opportunities",
      "Exclusive company investing Account"
    ],
    price: 549,
  },
];

const tabs = [
  { id: "month", label: "Monthly" },
  { id: "year", label: "Yearly" },
];

const Page = () => {
  const [billed, setBilled] = useState<"month" | "year">("month");

  return (
    <main className={styles.main}>
      <PageSetup pageKey="pricing-plans" />

      <Tabs
        tabs={tabs} activeTab={billed} onChange={setBilled}
        variant="muted"
        className={styles.tabs}
      />
      <PricingPlans plans={plans} billed={billed} />
    </main>
  );
};

export default Page;

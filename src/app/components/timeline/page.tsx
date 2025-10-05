"use client";

import React, { useState } from "react";

import { PageSetup } from "@/components/managers";
import { InputItem, Switch } from "@/lib/ui/elements/inputs";
import { Text } from "@/lib/ui/elements/text";
import { Timeline } from "@/lib/ui/elements/timeline";

import styles from "./styles.module.scss";

const Page = () => {
  const [timelineFlow, setTimelineFlow] = useState<"x" | "y">("y");

  return (
    <main className={styles.main}>
      <PageSetup pageKey="timeline" />

      <InputItem inline style={{ width: "fit-content", marginBottom: "2rem" }}>
        <Text<"label"> as="label" inline htmlFor="hflow">{"Horizontal Flow"}</Text>
        <Switch id="hflow" checked={timelineFlow === "x"} onChange={() => setTimelineFlow(timelineFlow === "x" ? "y" : "x")} />
      </InputItem>
      <Timeline
        flow={timelineFlow}
        timeline={[
          {
            id: "1",
            status: "success",
            left: (
              <div className="text-nowrap text-[1.2rem] md:text-[1.3rem] min-w-[8.5rem] text-[var(--fg-s)] pr-[1.6rem]">
                <p>
                  {"08 Jun '24"}
                </p>
                <p className="mt-[.2rem]">
                  {"4:00 pm"}
                </p>
              </div>
            ),
            right: (
              <div className="">
                <p className="text-[1.6rem] font-medium">
                  {"Order Placed"}
                </p>
                <p className="text-[1.4rem] leading-[1.3] max-w-[36rem] mt-[.8rem] mb-[1.6rem] text-[var(--fg-s)]">
                  {"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, repudiandae."}
                </p>
              </div>
            ),
            subEntries: [
              {
                id: "1.1",
                status: "success",
                left: (
                  <div className="text-nowrap text-[1.2rem] md:text-[1.3rem] min-w-[8.5rem] text-[var(--fg-s)] pr-[1.6rem]">
                    <p>
                      {"4:15 pm"}
                    </p>
                  </div>
                ),
                right: (
                  <div className="">
                    <p className="text-[1.4rem] leading-[1.3] max-w-[36rem] mb-[1.2rem] text-[var(--fg-s)]">
                      {"Your order has been received and processed."}
                    </p>
                  </div>
                )
              },
              {
                id: "1.2",
                status: "success",
                left: (
                  <div className="text-nowrap text-[1.2rem] md:text-[1.3rem] min-w-[8.5rem] text-[var(--fg-s)] pr-[1.6rem]">
                    <p>
                      {"4:45 pm"}
                    </p>
                  </div>
                ),
                right: (
                  <div className="">
                    <p className="text-[1.4rem] leading-[1.3] max-w-[36rem] mb-[1.2rem] text-[var(--fg-s)]">
                      {"Waiting to be shipped."}
                    </p>
                  </div>
                )
              },
            ]
          },
          {
            id: "2",
            status: "success",
            left: (
              <div className="text-nowrap text-[1.2rem] md:text-[1.3rem] min-w-[8.5rem] text-[var(--fg-s)] pr-[1.6rem]">
                <p>
                  {"09 Jun '24"}
                </p>
                <p className="mt-[.2rem]">
                  {"10:00 am"}
                </p>
              </div>
            ),
            right: (
              <div className="">
                <p className="text-[1.6rem] font-medium">
                  {"Order Shipped"}
                </p>
                <p className="text-[1.4rem] leading-[1.3] max-w-[36rem] mt-[.8rem] mb-[1.6rem] text-[var(--fg-s)]">
                  {"Your order has been dispatched from random warehouse."}
                </p>
              </div>
            ),
          },
          {
            id: "3",
            status: "current",
            left: (
              <div className="text-nowrap text-[1.2rem] md:text-[1.3rem] min-w-[8.5rem] text-[var(--fg-s)] pr-[1.6rem]">
                <p>
                  {"11 Jun '24"}
                </p>
                <p className="mt-[.2rem]">
                  {"7:00 pm"}
                </p>
              </div>
            ),
            right: (
              <div className="">
                <p className="text-[1.6rem] font-medium">
                  {"Order Received at nearest Location"}
                </p>
                <p className="text-[1.4rem] leading-[1.3] max-w-[36rem] mt-[.8rem] mb-[1.6rem] text-[var(--fg-s)]">
                  {"Your order has been received at the nearest delivery center."}
                </p>
              </div>
            ),
          },
          {
            id: "4",
            status: "fail",
            left: (
              <div className="text-nowrap text-[1.2rem] md:text-[1.3rem] min-w-[8.5rem] text-[var(--fg-s)] pr-[1.6rem]">
                <p>
                  {"12 Jun '24"}
                </p>
                <p className="mt-[.2rem]">
                  {"8:00 am"}
                </p>
              </div>
            ),
            right: (
              <div className="">
                <p className="text-[1.6rem] font-medium">
                  {"Out for Delivery"}
                </p>
                <p className="text-[1.4rem] leading-[1.3] max-w-[36rem] mt-[.8rem] mb-[1.6rem] text-[var(--fg-s)]">
                  {"Your order is on the way to be delivered by today."}
                </p>
              </div>
            ),
            subEntries: [
              {
                id: "45",
                left: (
                  <div className="text-nowrap text-[1.2rem] md:text-[1.3rem] min-w-[8.5rem] text-[var(--fg-s)] pr-[1.6rem]">
                    <p>
                      {"11:30 pm"}
                    </p>
                  </div>
                ),
                right: (
                  <div className="">
                    <p className="text-[1.4rem] leading-[1.3] max-w-[36rem] mb-[1.2rem] text-[var(--fg-s)]">
                      {"Lorem ipsum dolor sit amet."}
                    </p>
                  </div>
                )
              }
            ]
          },
          {
            id: "5",
            left: (
              <div className="text-nowrap text-[1.2rem] md:text-[1.3rem] min-w-[8.5rem] text-[var(--fg-s)] pr-[1.6rem]">
                <p>
                  {"12 Jun '24"}
                </p>
              </div>
            ),
            right: (
              <div className="">
                <p className="text-[1.6rem] font-medium">
                  {"Order Delivered"}
                </p>
                <p className="text-[1.4rem] leading-[1.3] max-w-[36rem] mt-[.8rem] mb-[1.6rem] text-[var(--fg-s)]">
                  {"Your order has been delivered."}
                </p>
              </div>
            ),
          },
        ]}
      />
    </main>
  );
};

export default Page;

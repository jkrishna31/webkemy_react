import "./globals.scss";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";

import { FrontendObservability } from "@/components/managers";
import { THEME_BG_DARK, THEME_BG_LIGHT } from "@/constants/colors.const";

export const metadata: Metadata = {
  title: "Webkemy React",
  description: "Webkemy React",
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: THEME_BG_LIGHT,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: THEME_BG_DARK,
    },
  ],
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    // suppressHydrationWarning
    >
      <GoogleAnalytics gaId="G-RTNS9WR6PR" />
      <body
        className="antialiased"
      >
        <FrontendObservability />
        {children}
      </body>
      <SpeedInsights />
      <Analytics />
      <GoogleTagManager gtmId="GTM-5RW3C2QH" />
    </html>
  );
}

import "./globals.scss";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";

import { FrontendObservability } from "@/components/managers";

export const metadata: Metadata = {
  title: "Webkemy React",
  description: "Webkemy React",
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "rgb(252, 254, 255)",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "rgb(26, 28, 29)"
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
      <GoogleAnalytics gaId="" />
      <body
        className="antialiased"
      >
        <FrontendObservability />
        {children}
      </body>
      <SpeedInsights />
      <Analytics />
      <GoogleTagManager gtmId="" />
    </html>
  );
}

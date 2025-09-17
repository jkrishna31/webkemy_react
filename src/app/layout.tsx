import "./globals.scss";

import type { Metadata, Viewport } from "next";

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
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { Providers } from "@/components/shared/providers";

export const metadata: Metadata = {
  title: "Cargo Trace System Tracking",
  description: "Production-ready delivery and shipment tracking MVP for logistics operations.",
  icons: {
    icon: [
      { url: "/cargo-trace-logo-banner.png", type: "image/png" },
      { url: "/cargo-trace-logo.png", type: "image/png" },
    ],
    shortcut: ["/cargo-trace-logo-banner.png"],
    apple: ["/cargo-trace-logo-banner.png"],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

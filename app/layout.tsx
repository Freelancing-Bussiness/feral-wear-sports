import type { Metadata } from "next";
import "./globals.css";
import "./hero-slider.css";
import "./order-demo.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.feralwearsports.com"),
  title: "FERAL Wear — Unlock Your Feral",
  description: "Performance wear, focused supplements and practical nutrition guidance for the relentlessly consistent.",
  icons: { icon: "/feral-logo.png", shortcut: "/feral-logo.png" },
  openGraph: { title: "FERAL Wear", description: "Built for the relentless.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "FERAL Wear — Unlock Your Feral" }] },
  twitter: { card: "summary_large_image", title: "FERAL Wear", description: "Built for the relentless.", images: ["/og.png"] },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

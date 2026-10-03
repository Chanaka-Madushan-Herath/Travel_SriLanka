import type { Metadata } from "next";
import { SiteFrame } from "@/components/SiteFrame";
import "./globals.css";

const fontHref =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,640&family=Noto+Sans+JP:wght@400;600;700&family=Noto+Sans+SC:wght@400;600;700&family=Noto+Sans:wght@400;600;700&family=Outfit:wght@400;500;600&display=swap";

export const metadata: Metadata = {
  title: {
    default: "Ceylon Trails",
    template: "%s · Ceylon Trails",
  },
  description:
    "Day-by-day Sri Lanka routes for the Cultural Triangle, the hill railway, and both coasts, with seasons and practical notes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontHref} />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}

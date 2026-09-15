import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_TITLE = "Alice in Boyabağı | Glamping & Kamp · Karaburun, İzmir";
const SITE_DESCRIPTION =
  "İzmir Karaburun Boyabağı'nda sakin, romantik ve aile dostu glamping & kamp deneyimi. Plaj, bar ve doğanın ortasında lüks konaklamanın adresi.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1200&h=630&fit=crop&auto=format";

export const metadata: Metadata = {
  // Yayında gerçek domain ile değiştir (örn. https://aliceinboyabagi.com)
  metadataBase: new URL("https://camp-nature-site-jqiz.vercel.app"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Alice in Boyabağı",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Alice in Boyabağı Glamping" }],
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

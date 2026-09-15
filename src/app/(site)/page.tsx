import Hero from "@/components/sections/Hero";
import Hakkinda from "@/components/sections/Hakkinda";
import Konaklama from "@/components/sections/Konaklama";
import Galeri from "@/components/sections/Galeri";
import Etkinlikler from "@/components/sections/Etkinlikler";
import SSS from "@/components/sections/SSS";
import Iletisim from "@/components/sections/Iletisim";
import { getStays } from "@/lib/stays";
import type { Metadata } from "next";

/** Studio’dan yayınlanan içeriklerin ana sayfada görünmesi için (en geç ~60 sn). */
export const revalidate = 60;

const OG_IMAGE =
  "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1200&h=630&fit=crop&auto=format";

export const metadata: Metadata = {
  title: "Alice in Boyabağı | Glamping & Kamp · Karaburun, İzmir",
  description:
    "İzmir Karaburun Boyabağı'nda sakin, romantik ve aile dostu glamping & kamp deneyimi. Plaj, bar ve doğanın ortasında lüks konaklamanın adresi.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    title: "Alice in Boyabağı | Glamping & Kamp · Karaburun, İzmir",
    description:
      "İzmir Karaburun Boyabağı'nda sakin, romantik ve aile dostu glamping & kamp deneyimi. Plaj, bar ve doğanın ortasında lüks konaklamanın adresi.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Alice in Boyabağı kamp alanı" }],
  },
};

export default async function Home() {
  const stays = await getStays();

  return (
    <main className="bg-stone-950 text-stone-100">
      <Hero />
      <Hakkinda />
      <Konaklama stays={stays} />
      <Galeri />
      <Etkinlikler />
      <SSS />
      <Iletisim stays={stays} />
    </main>
  );
}

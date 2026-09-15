import { client } from "@/sanity/lib/client";
import { allStaysQuery } from "@/sanity/lib/queries";

export type StayCategory = "Glamping" | "Kamp";
export type StayPriceUnit = "gecelik" | "kisi-gecelik";

export type Stay = {
  _id: string;
  title: string;
  price: number;
  priceUnit: StayPriceUnit;
  description: string;
  category: StayCategory;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cover?: any;
  sortOrder?: number;
};

/** Sanity boşsa / hata varsa — kodla seed değil, sadece fallback. */
export const FALLBACK_STAYS: Stay[] = [
  {
    _id: "static-tas-ev",
    title: "Taş Ev",
    price: 5000,
    priceUnit: "gecelik",
    description:
      "Özgün taş mimarisiyle en lüks seçeneğimiz; geniş aileler ve unutulmaz özel konaklamalar için.",
    category: "Glamping",
  },
  {
    _id: "static-ihlamur-ev",
    title: "Ihlamur Ev",
    price: 4000,
    priceUnit: "gecelik",
    description:
      "Ihlamur ağaçlarının gölgesinde huzur dolu bir kaçış; çiftler ve küçük aileler için ideal.",
    category: "Glamping",
  },
  {
    _id: "static-sakiz-ev",
    title: "Sakız Ev",
    price: 4500,
    priceUnit: "gecelik",
    description:
      "Sakız ağaçlarıyla çevrili romantik ev; çiftlere özel sakin ve özgün bir konaklama deneyimi.",
    category: "Glamping",
  },
  {
    _id: "static-kamp-alani-cadiri",
    title: "Kamp Alanı Çadırı",
    price: 1500,
    priceUnit: "gecelik",
    description:
      "Hazır kurulu çadır ile kamp ateşi başında yıldızlar altında bir gece; doğa tutkunları için.",
    category: "Kamp",
  },
  {
    _id: "static-kendi-cadiriniz",
    title: "Kendi Çadırınız",
    price: 1000,
    priceUnit: "kisi-gecelik",
    description:
      "Kendi ekipmanlarınızla gelin, alanımızda tüm olanakları kullanın; en özgür kamp deneyimi.",
    category: "Kamp",
  },
];

export function formatPrice(n: number) {
  return new Intl.NumberFormat("tr-TR").format(n);
}

export function priceNote(unit: StayPriceUnit) {
  return unit === "kisi-gecelik"
    ? "/ kişi / gecelik · KDV dahil"
    : "/ gecelik · KDV dahil";
}

export function stayLabel(stay: Stay) {
  return `${stay.title} — ${formatPrice(stay.price)} ₺`;
}

export async function getStays(): Promise<Stay[]> {
  try {
    const stays = await client.fetch<Stay[]>(
      allStaysQuery,
      {},
      process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : { next: { revalidate: 60 } }
    );
    return Array.isArray(stays) ? stays : [];
  } catch (err) {
    console.error("[Konaklama] Sanity fetch hatası:", err);
    return [];
  }
}

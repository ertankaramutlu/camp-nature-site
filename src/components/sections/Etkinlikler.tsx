import { MessageCircle } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { allEventsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const WA_BASE = "https://wa.me/905543343722";

/* ── Tip tanımları ── */
type Badge = "Doğa" | "Sosyal" | "Deniz";

type SanityEvent = {
  _id: string;
  title: string;
  description: string;
  dateLabel: string;
  badge: Badge;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cover?: any;
};

/* ── Badge → stil + emoji eşlemesi ── */
const BADGE_MAP: Record<Badge, { color: string; badgeCls: string; emoji: string }> = {
  Doğa: {
    color: "border-amber-800/40 bg-amber-950/40",
    badgeCls: "bg-amber-900/60 text-amber-300 border-amber-700/40",
    emoji: "🌅",
  },
  Sosyal: {
    color: "border-orange-800/40 bg-orange-950/40",
    badgeCls: "bg-orange-900/60 text-orange-300 border-orange-700/40",
    emoji: "🔥",
  },
  Deniz: {
    color: "border-emerald-800/40 bg-emerald-950/40",
    badgeCls: "bg-emerald-900/60 text-emerald-300 border-emerald-700/40",
    emoji: "🏖️",
  },
};

/* ── Statik fallback (Sanity boşsa veya hata varsa) ── */
const STATIC_EVENTS: SanityEvent[] = [
  {
    _id: "static-1",
    title: "Gün Batımı Seyri",
    description: "Karaburun'un eşsiz ufkundan Ege'ye batan güneşi izleyin; şarap kadehiyle baş başa bir an.",
    dateLabel: "Her akşam • Hava müsait olduğunda",
    badge: "Doğa",
  },
  {
    _id: "static-2",
    title: "Ateş Başı Gecesi",
    description: "Yıldızlı gökyüzünün altında kamp ateşi çevresinde toplanın; müzik, sohbet ve marshmallow keyfi.",
    dateLabel: "Cuma & Cumartesi geceleri",
    badge: "Sosyal",
  },
  {
    _id: "static-3",
    title: "Plaj Günü",
    description: "Özel plaj alanımızda kristal Ege sularında yüzün, kano yapın, güneşin ve barın tadını çıkarın.",
    dateLabel: "Tüm gün • Nisan – Ekim",
    badge: "Deniz",
  },
];

/* ── Kart bileşeni ── */
function EventCard({ ev }: { ev: SanityEvent }) {
  const style = BADGE_MAP[ev.badge] ?? BADGE_MAP["Doğa"];
  const waText = encodeURIComponent(
    `Merhaba! Alice in Boyabağı - ${ev.title} etkinliği hakkında bilgi almak istiyorum.`
  );

  const coverUrl = ev.cover
    ? urlFor(ev.cover).width(600).height(280).auto("format").url()
    : null;

  return (
    <div className={`flex flex-col rounded-2xl border ${style.color} overflow-hidden`}>
      {/* Kapak görseli (varsa) */}
      {coverUrl && (
        <div className="aspect-[16/9] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt={ev.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Kart içeriği */}
      <div className="flex flex-col flex-1 p-6">
        {/* Emoji + Badge */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-4xl">{style.emoji}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${style.badgeCls}`}>
            {ev.badge}
          </span>
        </div>

        <h3 className="text-xl font-bold text-stone-100 mb-2">{ev.title}</h3>
        <p className="text-stone-400 text-sm leading-relaxed mb-4 flex-1">{ev.description}</p>
        {ev.dateLabel && (
          <p className="text-stone-500 text-xs mb-5 italic">{ev.dateLabel}</p>
        )}

        {/* WhatsApp CTA */}
        <a
          href={`${WA_BASE}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/60 text-[#25D366] font-semibold text-sm py-3 px-4 rounded-xl transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp&apos;tan sor
        </a>
      </div>
    </div>
  );
}

/* ── Ana section (async server component) ── */
export default async function Etkinlikler() {
  let events: SanityEvent[] = [];
  try {
    events = await client.fetch<SanityEvent[]>(
      allEventsQuery,
      {},
      process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : { next: { revalidate: 60 } }
    );
  } catch (err) {
    console.error("[Etkinlikler] Sanity fetch hatası:", err);
  }

  const displayed = events.length > 0 ? events : STATIC_EVENTS;

  return (
    <section id="etkinlikler" className="bg-stone-900 text-stone-100 py-24 px-4">
      <div className="container mx-auto max-w-5xl">

        <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 text-center">
          Etkinlikler
        </p>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-4">
          Aktiviteler &amp; Deneyimler
        </h2>
        <p className="text-stone-400 text-base text-center max-w-xl mx-auto mb-14">
          Alice in Boyabağı&apos;nda her gün yeni bir deneyim sizi bekliyor. Katılmak için WhatsApp&apos;tan bilgi alın.
        </p>

        <div className={`grid grid-cols-1 gap-6 ${displayed.length <= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {displayed.map((ev) => (
            <EventCard key={ev._id} ev={ev} />
          ))}
        </div>

      </div>
    </section>
  );
}

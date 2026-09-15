import { MessageCircle } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import {
  type Stay,
  FALLBACK_STAYS,
  formatPrice,
  priceNote,
} from "@/lib/stays";

const WA_BASE = "https://wa.me/905543343722";

const CATEGORY_STYLE: Record<
  Stay["category"],
  { emoji: string; badgeCls: string }
> = {
  Glamping: {
    emoji: "🏡",
    badgeCls: "bg-emerald-900/70 text-emerald-300 border-emerald-700/50",
  },
  Kamp: {
    emoji: "⛺",
    badgeCls: "bg-amber-900/70 text-amber-300 border-amber-700/50",
  },
};

export default function Konaklama({ stays }: { stays: Stay[] }) {
  const displayed = stays.length > 0 ? stays : FALLBACK_STAYS;

  return (
    <section id="konaklama" className="bg-stone-900 text-stone-100 py-24 px-4">
      <div className="container mx-auto max-w-5xl">

        <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 text-center">
          Konaklama
        </p>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-4 text-balance">
          Konaklamanızı Seçin
        </h2>
        <p className="text-stone-400 text-base sm:text-lg text-center max-w-xl mx-auto mb-14">
          Lüks glamping evlerinden özgür kamp alanına — her bütçeye ve ruhsale uygun seçeneğimiz var.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((acc) => {
            const style = CATEGORY_STYLE[acc.category] ?? CATEGORY_STYLE.Glamping;
            const waText = encodeURIComponent(
              `Merhaba! Alice in Boyabağı - ${acc.title} (${formatPrice(acc.price)} ₺) konaklama hakkında bilgi almak istiyorum.`
            );
            const coverUrl = acc.cover
              ? urlFor(acc.cover).width(600).height(338).auto("format").url()
              : null;

            return (
              <div
                key={acc._id}
                className="flex flex-col bg-stone-950/70 border border-stone-800/60 rounded-2xl overflow-hidden hover:border-emerald-800/60 transition-all hover:shadow-lg hover:shadow-emerald-950/30"
              >
                {coverUrl && (
                  <div className="aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverUrl}
                      alt={acc.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{style.emoji}</span>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${style.badgeCls}`}
                    >
                      {acc.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-100 mb-2">{acc.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-5 flex-1">
                    {acc.description}
                  </p>

                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-stone-500 text-xs">itibaren</span>
                      <span className="text-2xl font-extrabold text-amber-400">
                        {formatPrice(acc.price)}
                        <span className="text-amber-500 font-bold"> ₺</span>
                      </span>
                    </div>
                    <p className="text-stone-500 text-xs mt-0.5">{priceNote(acc.priceUnit)}</p>
                  </div>

                  <a
                    href={`${WA_BASE}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/60 text-[#25D366] font-semibold text-sm py-3 px-4 rounded-xl transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp ile sor
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

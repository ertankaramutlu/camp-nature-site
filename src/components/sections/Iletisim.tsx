"use client";

import { useState } from "react";
import { MessageCircle, Calendar, Users, BedDouble, User, Phone, Send, MapPin } from "lucide-react";
import Link from "next/link";
import { type Stay, FALLBACK_STAYS, formatPrice, stayLabel } from "@/lib/stays";
import { Reveal } from "@/components/Reveal";

const WA_BASE = "https://wa.me/905543343722";
const MAP_EMBED =
  "https://maps.google.com/maps?q=Boyaba%C4%9F%C4%B1+K%C3%B6y%C3%BC%2C+Karaburun%2C+%C4%B0zmir%2C+Turkey&output=embed&hl=tr&z=13";

export default function Iletisim({ stays }: { stays: Stay[] }) {
  const options = stays.length > 0 ? stays : FALLBACK_STAYS;
  const today = new Date().toISOString().split("T")[0];

  /* ── Rezervasyon formu ── */
  const [giris, setGiris] = useState("");
  const [cikis, setCikis] = useState("");
  const [kisi, setKisi] = useState(2);
  const [stayId, setStayId] = useState(options[0]?._id ?? "");
  const [showMap, setShowMap] = useState(false);
  const [kvkkRez, setKvkkRez] = useState(false);
  const [kvkkIletisim, setKvkkIletisim] = useState(false);

  const selected = options.find((s) => s._id === stayId) ?? options[0];
  const isValid = Boolean(giris && cikis && giris < cikis && selected && kvkkRez);

  const handleRezervasyonSend = () => {
    if (!selected || !kvkkRez) return;
    const text = encodeURIComponent(
      `Alice in Boyabağı rezervasyon: ${selected.title}, ${formatPrice(selected.price)} ₺, ${giris}-${cikis}, ${kisi} kişi`
    );
    window.open(`${WA_BASE}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  /* ── İletişim formu ── */
  const [ad, setAd] = useState("");
  const [telefon, setTelefon] = useState("");
  const [mesaj, setMesaj] = useState("");

  const handleIletisimSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kvkkIletisim) return;
    const text = encodeURIComponent(
      `Merhaba! Alice in Boyabağı iletişim formu:\nAd: ${ad}\nTelefon: ${telefon}\nMesaj: ${mesaj}`
    );
    window.open(`${WA_BASE}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "bg-stone-900 border border-stone-700 text-stone-200 placeholder-stone-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all w-full";

  return (
    <section id="iletisim" className="bg-stone-900 text-stone-100 py-24 px-4">
      {/* Hero "Rezervasyon" anchor */}
      <span id="rezervasyon" className="-mt-20 pt-20 block" aria-hidden />

      <div className="container mx-auto max-w-5xl space-y-20">

        <Reveal>
        {/* ── Rezervasyon Paneli ── */}
        <div>
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 text-center">
            Rezervasyon
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">Yerinizi Ayırtın</h2>
          <p className="text-stone-400 text-base text-center max-w-md mx-auto mb-10">
            Formu doldurun — WhatsApp&apos;ta hazır mesajla bize ulaşın.
          </p>

          <div className="bg-stone-950/80 border border-stone-800/60 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/30 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-stone-300 text-sm font-semibold">
                  <Calendar className="w-4 h-4 text-emerald-400" />Giriş Tarihi
                </label>
                <input type="date" min={today} value={giris}
                  onChange={(e) => { setGiris(e.target.value); if (cikis && e.target.value >= cikis) setCikis(""); }}
                  className={`${inputCls} [color-scheme:dark]`} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-stone-300 text-sm font-semibold">
                  <Calendar className="w-4 h-4 text-amber-400" />Çıkış Tarihi
                </label>
                <input type="date" min={giris || today} value={cikis}
                  onChange={(e) => setCikis(e.target.value)}
                  className={`${inputCls} [color-scheme:dark]`} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-stone-300 text-sm font-semibold">
                  <Users className="w-4 h-4 text-emerald-400" />Kişi Sayısı
                </label>
                <input type="number" min={1} max={20} value={kisi}
                  onChange={(e) => setKisi(Math.max(1, Number(e.target.value)))}
                  className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-stone-300 text-sm font-semibold">
                  <BedDouble className="w-4 h-4 text-amber-400" />Konaklama Tipi
                </label>
                <select value={stayId} onChange={(e) => setStayId(e.target.value)}
                  className={`${inputCls} appearance-none cursor-pointer`}>
                  {options.map((s) => (
                    <option key={s._id} value={s._id}>{stayLabel(s)}</option>
                  ))}
                </select>
              </div>
            </div>

            {(giris || cikis) && (
              <div className="mt-5 bg-stone-900/60 border border-stone-700/40 rounded-xl px-4 py-3 text-stone-400 text-xs">
                <span className="text-stone-500">Önizleme: </span>
                <span className="text-stone-300">
                  Alice in Boyabağı rezervasyon: {selected?.title}, {selected ? formatPrice(selected.price) : "?"} ₺, {giris || "?"}-{cikis || "?"}, {kisi} kişi
                </span>
              </div>
            )}

            <label className="mt-5 flex items-start gap-3 text-stone-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={kvkkRez}
                onChange={(e) => setKvkkRez(e.target.checked)}
                className="mt-1 size-4 accent-emerald-600 shrink-0"
              />
              <span>
                <Link href="/gizlilik" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                  Gizlilik metnini
                </Link>{" "}
                okudum.
              </span>
            </label>

            <button onClick={handleRezervasyonSend} disabled={!isValid}
              className="mt-6 w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] disabled:bg-stone-700 disabled:text-stone-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-base shadow-md transition-all hover:scale-[1.02] active:scale-100">
              <MessageCircle className="w-5 h-5" />
              WhatsApp&apos;tan rezervasyon gönder
            </button>

            {!isValid && giris && cikis && (
              <p className="text-red-400 text-xs text-center mt-2">Çıkış tarihi giriş tarihinden sonra olmalıdır.</p>
            )}
          </div>
        </div>
        </Reveal>

        <Reveal>
        {/* ── İletişim Formu + Harita ── */}
        <div>
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 text-center">
            İletişim
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">Bize Ulaşın</h2>
          <p className="text-stone-400 text-base text-center max-w-md mx-auto mb-10">
            Sorularınız veya özel talepleriniz için formu doldurun.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Form */}
            <form onSubmit={handleIletisimSend}
              className="bg-stone-950/80 border border-stone-800/60 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/30 space-y-5">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-stone-300 text-sm font-semibold">
                  <User className="w-4 h-4 text-emerald-400" />Adınız
                </label>
                <input type="text" placeholder="Alice" required value={ad}
                  onChange={(e) => setAd(e.target.value)} className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-stone-300 text-sm font-semibold">
                  <Phone className="w-4 h-4 text-amber-400" />Telefon
                </label>
                <input type="tel" placeholder="+90 5xx xxx xx xx" value={telefon}
                  onChange={(e) => setTelefon(e.target.value)} className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-stone-300 text-sm font-semibold">
                  <Send className="w-4 h-4 text-emerald-400" />Mesajınız
                </label>
                <textarea rows={4} placeholder="Merhaba, sormak istediğim..." required value={mesaj}
                  onChange={(e) => setMesaj(e.target.value)}
                  className={`${inputCls} resize-none`} />
              </div>
              <label className="flex items-start gap-3 text-stone-400 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={kvkkIletisim}
                  onChange={(e) => setKvkkIletisim(e.target.checked)}
                  className="mt-1 size-4 accent-emerald-600 shrink-0"
                />
                <span>
                  <Link href="/gizlilik" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                    Gizlilik metnini
                  </Link>{" "}
                  okudum.
                </span>
              </label>
              <button type="submit" disabled={!kvkkIletisim}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] disabled:bg-stone-700 disabled:text-stone-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-base shadow-md transition-all hover:scale-[1.02] active:scale-100">
                <MessageCircle className="w-5 h-5" />
                WhatsApp&apos;tan gönder
              </button>
              <p className="text-stone-600 text-xs text-center">
                Gönder&apos;e bastığınızda WhatsApp açılır; backend kullanılmaz.
              </p>
            </form>

            {/* Harita + Adres */}
            <div className="flex flex-col gap-5">
              {/* Google Maps Embed */}
              <div>
                <div className="rounded-2xl overflow-hidden border border-stone-800/60 shadow-xl shadow-black/30 aspect-video bg-stone-950">
                  {showMap ? (
                    <iframe
                      title="Alice in Boyabağı Konumu"
                      src={MAP_EMBED}
                      className="w-full h-full"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowMap(true)}
                      className="relative w-full h-full group cursor-pointer text-left"
                      aria-label="Haritayı göster, Boyabağı Karaburun"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-900/30" />
                      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3 px-4">
                        <MapPin className="w-8 h-8 text-emerald-400" />
                        <p className="text-stone-100 font-semibold">Boyabağı, Karaburun</p>
                        <span className="bg-emerald-700 group-hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                          Haritayı göster
                        </span>
                      </div>
                    </button>
                  )}
                </div>
                <p className="text-stone-600 text-xs mt-2 px-1">
                  Google Haritalar üçüncü taraf bir hizmettir; haritayı açınca Google&apos;a istek gider.
                </p>
              </div>

              {/* Adres Kartı */}
              <div className="bg-stone-950/80 border border-stone-800/60 rounded-2xl p-6">
                <p className="text-stone-400 text-sm font-semibold uppercase tracking-widest mb-3">Adres</p>
                <p className="text-stone-200 font-semibold text-base mb-1">Alice in Boyabağı</p>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Boyabağı Köyü<br />
                  Karaburun, İzmir<br />
                  Türkiye
                </p>
                <div className="mt-4 pt-4 border-t border-stone-800/60">
                  <a href={`${WA_BASE}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5d] text-sm font-semibold transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp ile yol tarifi al
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
        </Reveal>

      </div>
    </section>
  );
}

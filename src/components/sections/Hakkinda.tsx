import { Tent, Waves, Wine, Flame } from "lucide-react";

const features = [
  {
    icon: Tent,
    title: "Glamping Çadırları",
    desc: "Yıldızları seyrederken lüks bir yatakta uyumak artık mümkün. Tam donanımlı glamping çadırlarımız ile konforu doğanın içine taşıyoruz.",
    color: "text-emerald-400",
    bg: "bg-emerald-950/60",
    border: "border-emerald-800/40",
  },
  {
    icon: Waves,
    title: "Plaj & Deniz",
    desc: "Karaburun'un el değmemiş koyları ayağınızın altında. Kristal berraklığındaki Ege sularında yüzün, güneşin tadını çıkarın.",
    color: "text-amber-400",
    bg: "bg-amber-950/60",
    border: "border-amber-800/40",
  },
  {
    icon: Flame,
    title: "Kamp & Ateş",
    desc: "Geleneksel kamp çadırları ve açık kamp alanlarında ateş etrafında buluşun. Marshmallow kavurun, hikâye anlatın.",
    color: "text-orange-400",
    bg: "bg-orange-950/60",
    border: "border-orange-800/40",
  },
  {
    icon: Wine,
    title: "Doğal Bar",
    desc: "Serinletici kokteyller, yerel içecekler ve atıştırmalıklar için doğanın ortasındaki barımız gün batımından gece yarısına dek açık.",
    color: "text-rose-400",
    bg: "bg-rose-950/60",
    border: "border-rose-800/40",
  },
];

export default function Hakkinda() {
  return (
    <section
      id="hakkinda"
      className="bg-stone-950 text-stone-100 py-24 px-4"
    >
      <div className="container mx-auto max-w-5xl">

        {/* Üst Etiket */}
        <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 text-center">
          Hakkımızda
        </p>

        {/* Başlık */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-6 text-balance leading-tight">
          Boyabağı&apos;nın Kalbinde{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">
            Sihirli Bir Kaçış
          </span>
        </h2>

        {/* Açıklama */}
        <p className="text-stone-400 text-base sm:text-lg text-center max-w-2xl mx-auto mb-6 leading-relaxed">
          İzmir&apos;in batısında, Karaburun yarımadasının en güzel köylerinden Boyabağı&apos;nda, doğanın
          içinde büyüleyici bir deneyim sizi bekliyor. Alice in Boyabağı; çiftlere, ailelere ve doğayı
          seven herkese özgün bir konaklama ve tatil deneyimi sunuyor.
        </p>
        <p className="text-stone-400 text-base sm:text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Ege kıyısında sakin bir köy atmosferinde; glamping çadırlarımız, açık kamp alanımız, özel plajımız
          ve barımızla tam anlamıyla bir kaçış noktasıyız. İstanbul ya da İzmir&apos;in gürültüsünü birkaç
          saatte geride bırakarak Boyabağı&apos;nın huzuruna ulaşabilirsiniz.
        </p>

        {/* Özellik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl border ${f.border} ${f.bg} p-6 flex gap-4 items-start backdrop-blur-sm`}
            >
              <div className={`mt-1 shrink-0 ${f.color}`}>
                <f.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-stone-100 mb-1">{f.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Alt Stat Bantı */}
        <div className="mt-16 pt-10 border-t border-stone-800/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "Karaburun", label: "Yarımadası" },
            { value: "Boyabağı", label: "Köy, İzmir" },
            { value: "4 Mevsim", label: "Açık Kamp Alanı" },
            { value: "Ege", label: "Denizi Kıyısında" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold text-emerald-400 mb-1">{s.value}</p>
              <p className="text-stone-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

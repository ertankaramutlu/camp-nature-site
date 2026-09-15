import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Compass, Star, Trees } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900 text-stone-100">
      {/* Arka Plan Görseli ve Karartma Katmanı */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=2000&auto=format&fit=crop"
          alt="Alice in Boyabağı Glamping Kamp Alanı"
          fill
          priority
          className="object-cover object-center opacity-40 transition-transform duration-1000 scale-105 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
      </div>

      {/* İçerik Konteynırı */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center flex flex-col items-center max-w-4xl">

        {/* Konum Rozeti */}
        <Badge
          variant="outline"
          className="mb-6 px-4 py-1.5 border-emerald-500/40 bg-emerald-950/60 text-emerald-300 backdrop-blur-md text-xs sm:text-sm font-medium rounded-full flex items-center gap-2"
        >
          <Trees className="w-4 h-4 text-emerald-400" />
          <span>İzmir · Karaburun · Boyabağı</span>
        </Badge>

        {/* Ana Başlık */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 text-balance drop-shadow-sm">
          Alice in Boyabağı
        </h1>
        <p className="text-2xl sm:text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-200 to-emerald-200">
          Karaburun&apos;un Saklı Cenneti
        </p>

        {/* Alt Açıklama */}
        <p className="text-stone-300 text-base sm:text-lg md:text-xl max-w-2xl mb-10 text-balance leading-relaxed">
          İzmir&apos;in eşsiz yarımadası Karaburun&apos;da, Boyabağı köyünün bağrında; glamping çadırları, plaj,
          kamp ateşi ve doğal bar ile sizi bekleyen sakin, romantik ve aile dostu bir kaçış noktası.
        </p>

        {/* Aksiyon Butonları */}
        <div className="relative z-20 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="#rezervasyon"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/30 transition-all"
          >
            <Calendar className="w-5 h-5" />
            Rezervasyon Yap
          </a>

          <a
            href="#hakkinda"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-stone-700 bg-stone-900/50 hover:bg-stone-800 text-stone-200 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all"
          >
            <Compass className="w-5 h-5 text-amber-400" />
            Alanı Keşfet
          </a>
        </div>

        {/* Değerlendirme */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 flex items-center gap-6 text-stone-400 text-sm">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="font-medium text-stone-300">4.9 / 5.0</span>
          <span className="text-stone-500">•</span>
          <span>Yüzlerce Mutlu Konuk</span>
        </div>

      </div>
    </section>
  );
}

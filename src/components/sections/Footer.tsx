import { Leaf, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";

const WA_URL = "https://wa.me/905543343722";

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800/60 text-stone-400 py-12 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Üst satır */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-stone-800/60">

          {/* Marka + Slogan */}
          <div>
            <div className="flex items-center gap-2 text-stone-100 font-bold text-lg mb-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <span>Alice in Boyabağı</span>
            </div>
            <p className="text-stone-500 text-sm">Sakin, romantik ve aile dostu glamping deneyimi.</p>
          </div>

          {/* Adres */}
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-stone-300 font-medium">Boyabağı Köyü</p>
              <p className="text-stone-500">Karaburun, İzmir, Türkiye</p>
            </div>
          </div>

          {/* WhatsApp */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/60 text-[#25D366] font-semibold text-sm px-5 py-3 rounded-xl transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp İletişim
          </a>
        </div>

        {/* Alt satır */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <p>© {new Date().getFullYear()} Alice in Boyabağı · Tüm hakları saklıdır.</p>
          <Link href="/gizlilik" className="text-stone-500 hover:text-emerald-400 transition-colors">
            Gizlilik / KVKK
          </Link>
          <p>Boyabağı Köyü · Karaburun · İzmir</p>
        </div>

      </div>
    </footer>
  );
}

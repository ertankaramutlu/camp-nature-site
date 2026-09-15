import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/sections/WhatsAppFab";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-stone-950 text-stone-100 min-h-screen pt-24 pb-20 px-4 flex items-center">
        <div className="container mx-auto max-w-lg text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-950/70 border border-emerald-800/50 mb-6">
            <Leaf className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
            404
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Sayfa bulunamadı
          </h1>
          <p className="text-stone-400 text-base mb-10">
            Bu adres Alice in Boyabağı&apos;nda yok. Ana sayfaya veya konaklamaya dönebilirsiniz.
          </p>
          <nav className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Ana sayfa
            </Link>
            <Link
              href="/#konaklama"
              className="w-full sm:w-auto border border-stone-700 hover:border-emerald-700/60 text-stone-200 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Konaklama
            </Link>
            <Link
              href="/blog"
              className="w-full sm:w-auto border border-stone-700 hover:border-emerald-700/60 text-stone-200 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

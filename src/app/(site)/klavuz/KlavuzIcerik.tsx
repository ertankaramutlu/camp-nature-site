import Link from "next/link";
import { logout } from "./actions";

export default function KlavuzIcerik() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 pt-24 pb-20 px-4">
      <article className="container mx-auto max-w-2xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Yalnızca işletme
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Alice in Boyabağı — sahip kılavuzu
            </h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="shrink-0 text-stone-400 hover:text-stone-200 text-sm border border-stone-700 hover:border-stone-500 px-3 py-2 rounded-xl transition-colors"
            >
              Çıkış
            </button>
          </form>
        </div>

        <p className="text-amber-200/90 text-sm bg-amber-950/40 border border-amber-800/40 rounded-xl px-4 py-3 mb-10">
          Bu sayfa menüde ve arama motorlarında görünmez. Adresi misafirlere vermeyin.
        </p>

        <div className="space-y-8 text-stone-300 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Adresler</h2>
            <p>
              Site:{" "}
              <a
                href="https://camp-nature-site-jqiz.vercel.app"
                className="text-emerald-400 hover:text-emerald-300 break-all"
              >
                https://camp-nature-site-jqiz.vercel.app
              </a>
            </p>
            <p className="mt-2">
              İçerik paneli:{" "}
              <a
                href="https://camp-nature-site-jqiz.vercel.app/studio"
                className="text-emerald-400 hover:text-emerald-300 break-all"
              >
                https://camp-nature-site-jqiz.vercel.app/studio
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Rezervasyon</h2>
            <p>
              Sitede ödeme yoktur. Misafir formu doldurunca WhatsApp açılır; konuşmayı orada
              tamamlarsınız.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Panele giriş</h2>
            <p>
              Panel adresini açın, hesabınızla giriş yapın. Sol menü: <strong className="text-stone-100">Yazılar</strong>,{" "}
              <strong className="text-stone-100">Etkinlikler</strong>,{" "}
              <strong className="text-stone-100">Konaklama</strong>.
            </p>
            <p className="mt-3">
              <strong className="text-stone-100">Draft (taslak)</strong> sitede görünmez.{" "}
              <strong className="text-stone-100">Publish</strong> basınca görünür. Değişiklikten sonra
              sitede birkaç dakika bekleyin veya sayfayı yenileyin.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Konaklama ve fiyat</h2>
            <p>
              Konaklama → kaydı açın. Fiyat alanına yalnızca rakam yazın: <strong className="text-stone-100">5000</strong>{" "}
              (nokta veya ₺ yok). Sitede 5.000 ₺ görünür.
            </p>
            <p className="mt-3">
              Birim: gecelik veya kişi / gecelik. Sıralama: küçük sayı önde (0, 1, 2…).{" "}
              <strong className="text-stone-100">Publish</strong> şart.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Etkinlikler</h2>
            <p>
              Etkinlikler → + . Başlık, kısa açıklama, tarih yazısı (ör. “Cuma geceleri”),
              kategori (Doğa / Sosyal / Deniz), isteğe bağlı kapak, sıra.{" "}
              <strong className="text-stone-100">Publish</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Yazılar (blog)</h2>
            <p>
              Yazılar → + . Başlık, Slug’da <strong className="text-stone-100">Generate</strong>, yayın
              tarihi, özet, kapak, içerik. <strong className="text-stone-100">Publish</strong> olmadan
              /blog’da çıkmaz.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Fotoğraflar</h2>
            <p>
              Kapak için alana tıklayıp <strong className="text-stone-100">Upload</strong>. Ana sayfa
              Hero ve galeri bu panelden değişmez; onlar için Ertan’a yazın.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Yapmayın</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Paneldeki Ayarlar / API / diğer menülere girmeyin.</li>
              <li>Studio (panel) linkini misafire, Instagram’a veya hikâyeye koymayın.</li>
              <li>Bu kılavuz adresini paylaşmayın.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Bir şey görünmüyorsa</h2>
            <div className="overflow-x-auto rounded-xl border border-stone-800/60">
              <table className="w-full text-sm text-left">
                <thead className="bg-stone-900 text-stone-400">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Sorun</th>
                    <th className="px-4 py-2 font-semibold">Ne yapın</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  <tr>
                    <td className="px-4 py-2.5">Sitede yok</td>
                    <td className="px-4 py-2.5">Publish’e bastınız mı? Sayfayı yenileyin, 1 dk bekleyin.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">Fiyat garip</td>
                    <td className="px-4 py-2.5">Sadece rakam: 5000. Nokta, virgül, ₺ yazmayın.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">Sıra yanlış</td>
                    <td className="px-4 py-2.5">Sıralama sayısını küçültün (0 en başta).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">Kapak yok</td>
                    <td className="px-4 py-2.5">Upload + Publish.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">Hero / galeri</td>
                    <td className="px-4 py-2.5">Panelden olmaz. Ertan.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">Panel açılmıyor</td>
                    <td className="px-4 py-2.5">Adresi kontrol edin, tekrar giriş yapın. Olmazsa Ertan.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <p className="mt-12">
          <Link href="/" className="text-stone-500 hover:text-emerald-400 text-sm transition-colors">
            ← Ana sayfaya dön
          </Link>
        </p>
      </article>
    </main>
  );
}

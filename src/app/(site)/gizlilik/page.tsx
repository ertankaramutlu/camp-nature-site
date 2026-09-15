import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik ve KVKK Aydınlatma | Alice in Boyabağı",
  description:
    "Alice in Boyabağı gizlilik ve KVKK aydınlatma metni. Toplanan veriler, amaç, WhatsApp aktarımı ve haklarınız.",
  robots: { index: true, follow: true },
};

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 pt-24 pb-20 px-4">
      <article className="container mx-auto max-w-2xl">
        <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4">
          Yasal
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight">
          Gizlilik ve KVKK Aydınlatma
        </h1>

        <p className="text-amber-200/90 text-sm bg-amber-950/40 border border-amber-800/40 rounded-xl px-4 py-3 mb-10">
          Bu metin bir şablondur; hukuki tavsiye değildir. İşletme unvanı, vergi bilgisi ve
          iletişim kanalları ile güncellenmelidir.
        </p>

        <div className="space-y-8 text-stone-300 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Veri sorumlusu</h2>
            <p>
              Alice in Boyabağı, Boyabağı Köyü, Karaburun, İzmir adresindeki glamping ve kamp
              işletmesidir. Bu sitede paylaştığınız kişisel veriler rezervasyon ve iletişim
              amacıyla işlenir.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Hangi veriler toplanır?</h2>
            <p>
              Formlar ve WhatsApp üzerinden ad, telefon, mesaj metni, rezervasyon giriş–çıkış
              tarihleri, kişi sayısı ve seçilen konaklama tipi alınabilir.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Amaç</h2>
            <p>
              Veriler yalnızca sizinle iletişim kurmak, müsaitlik bildirmek ve rezervasyonu
              yürütmek için kullanılır. Pazarlama listesi veya profilleme yapılmaz.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Aktarım</h2>
            <p>
              Gönder butonuna basınca mesajınız WhatsApp (Meta Platforms) üzerinden iletilir.
              WhatsApp kendi gizlilik politikasına tabidir.
            </p>
            <p className="mt-3">
              Google Haritalar yalnızca “Haritayı göster”e tıkladığınızda yüklenir; aksi halde
              Google’a harita isteği gitmez.
            </p>
            <p className="mt-3">
              Blog, etkinlik ve konaklama içerikleri Sanity üzerinde tutulur. Bu içerikler
              kamuya açık metin ve görsellerdir; form veriniz Sanity’ye yazılmaz.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Çerezler</h2>
            <p>
              Bu sitede kendi reklam veya izleme çerezimiz yoktur. Tarayıcınızın zorunlu
              teknik çerezleri ve sizin açtığınız üçüncü taraf hizmetler (WhatsApp, Google
              Haritalar) kendi çerezlerini kullanabilir.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">Haklarınız</h2>
            <p>
              6698 sayılı KVKK kapsamında verilerinize erişme, düzeltme, silme ve işlemeye
              itiraz etme haklarınız vardır. Talepleriniz için WhatsApp üzerinden yazmanız
              yeterlidir.
            </p>
          </section>

          <section>
            <h2 className="text-stone-100 font-bold text-lg mb-2">İletişim</h2>
            <p>
              WhatsApp:{" "}
              <a
                href="https://wa.me/905543343722"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300"
              >
                wa.me/905543343722
              </a>
            </p>
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

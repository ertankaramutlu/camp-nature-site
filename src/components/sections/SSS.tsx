"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "Check-in ve check-out saatleri nedir?",
    a: "Check-in saatimiz 14:00, check-out saatimiz 12:00'dir. Erken check-in veya geç check-out talebiniz için lütfen önceden WhatsApp üzerinden bizimle iletişime geçin; imkânlar dahilinde yardımcı olmaya çalışırız.",
  },
  {
    q: "Çocuklar için konaklama uygun mu?",
    a: "Evet, Alice in Boyabağı aile dostudur. Taş Ev ve Ihlamur Ev geniş aileler için uygundur. Çocuklar için güvenli kamp alanı, plaj ve etkinliklerimiz mevcuttur. Bebek için özel ihtiyaçlarınız varsa önceden belirtmeniz yeterli.",
  },
  {
    q: "Evcil hayvanlar kabul ediliyor mu?",
    a: "Evcil hayvanlarınızla gelmek istiyorsanız lütfen önceden WhatsApp üzerinden bilgi alın. Belirli konaklama tiplerinde ve belirli dönemlerde kabul edilebilmektedir. Her durumda önceden onay gerekmektedir.",
  },
  {
    q: "Plaj ve bar ne zaman açık?",
    a: "Plajımız nisan başından ekim sonuna kadar her gün gün doğumundan itibaren açıktır. Barımız öğle saatlerinden gece yarısına kadar hizmet vermektedir. Kış aylarında talebe göre açılış yapılabilir.",
  },
  {
    q: "Kendi çadırımı getirebilir miyim?",
    a: "Evet, kendi çadırınızla gelebilirsiniz. Kamp alanımızda yer tahsis edilir. Fiyat 1.000 TL / kişi / gecelik olup kamp alanındaki tüm olanakları (WC, duş, ortak alan, bar) kullanabilirsiniz.",
  },
  {
    q: "İptal politikası nedir?",
    a: "Rezervasyonunuzu en geç 7 gün öncesine kadar ücretsiz iptal edebilirsiniz. 7 günden az kalan iptallerde bir gecelik ücret kesilir. Detaylar için WhatsApp üzerinden bizimle iletişime geçebilirsiniz.",
  },
  {
    q: "Rezervasyon nasıl yapılır?",
    a: "Rezervasyon tamamen WhatsApp üzerinden yapılmaktadır. Bu sayfadaki Rezervasyon formunu doldurup gönderin ya da doğrudan WhatsApp numaramıza mesaj atın. En kısa sürede dönüş yapar, müsaitlik ve detayları paylaşırız.",
  },
];

export default function SSS() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="sss" className="bg-stone-950 text-stone-100 py-24 px-4">
      <div className="container mx-auto max-w-3xl">

        {/* Başlık */}
        <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4 text-center">
          SSS
        </p>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-4">
          Sık Sorulan Sorular
        </h2>
        <p className="text-stone-400 text-base text-center max-w-xl mx-auto mb-14">
          Aklınızdaki soruların cevabını bulamadıysanız WhatsApp&apos;tan bize yazın!
        </p>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
                  isOpen
                    ? "border-emerald-700/60 bg-emerald-950/30"
                    : "border-stone-800/60 bg-stone-900/40 hover:border-stone-700"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-stone-100 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-emerald-400"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-stone-400 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

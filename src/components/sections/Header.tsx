"use client";

import { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "Hakkında", href: "/#hakkinda" },
  { label: "Konaklama", href: "/#konaklama" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Etkinlikler", href: "/#etkinlikler" },
  { label: "SSS", href: "/#sss" },
  { label: "İletişim", href: "/#iletisim" },
  { label: "Blog", href: "/blog" },
];

function scrollToHash(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    fromMenu = false,
  ) => {
    const hashAt = href.indexOf("#");
    const isHash = hashAt !== -1;

    if (fromMenu) {
      setIsOpen(false);
    }

    if (!isHash) return;

    e.preventDefault();
    const id = href.slice(hashAt + 1);
    const onHome = pathname === "/" || pathname === "";

    const go = () => {
      if (onHome) {
        scrollToHash(id);
        history.pushState(null, "", `/#${id}`);
      } else {
        router.push(`/#${id}`);
      }
    };

    if (fromMenu) {
      requestAnimationFrame(() => requestAnimationFrame(go));
    } else {
      go();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-950/95 backdrop-blur-md shadow-md shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Marka Adı */}
        <a
          href="#"
          className="flex items-center gap-2 text-stone-100 font-bold text-lg tracking-tight hover:text-emerald-300 transition-colors"
        >
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span>Alice in Boyabağı</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
              className="text-stone-300 hover:text-emerald-300 text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="/#rezervasyon"
            onClick={(e) => onNavClick(e, "/#rezervasyon")}
            className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg px-5 h-8 text-sm"
          >
            Rezervasyon
          </a>
        </div>

        {/* Mobil Menü Toggle */}
        <button
          className="md:hidden text-stone-200 p-2 rounded-md hover:bg-stone-800 transition-colors"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Menüyü aç/kapat"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobil Menü — unmount etme; tıklama iptal olmasın */}
      <div
        className={`md:hidden bg-stone-950/98 backdrop-blur-md border-t border-stone-800/60 px-4 pb-6 pt-4 ${
          isOpen ? "" : "hidden"
        }`}
      >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => onNavClick(e, link.href, true)}
                className="text-stone-300 hover:text-emerald-300 hover:bg-stone-800/50 text-base font-medium py-3 px-3 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-stone-800/60">
            <a
              href="/#rezervasyon"
              onClick={(e) => onNavClick(e, "/#rezervasyon", true)}
              className="flex w-full items-center justify-center bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg h-10 text-sm"
            >
              Rezervasyon Yap
            </a>
          </div>
        </div>
    </header>
  );
}

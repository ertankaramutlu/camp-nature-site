"use client";

import { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Hakkında", href: "/#hakkinda" },
  { label: "Konaklama", href: "/#konaklama" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Etkinlikler", href: "/#etkinlikler" },
  { label: "SSS", href: "/#sss" },
  { label: "İletişim", href: "/#iletisim" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

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
              className="text-stone-300 hover:text-emerald-300 text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a href="/#rezervasyon">
            <Button
              size="sm"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg px-5 cursor-pointer"
            >
              Rezervasyon
            </Button>
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

      {/* Mobil Menü */}
      {isOpen && (
        <div className="md:hidden bg-stone-950/98 backdrop-blur-md border-t border-stone-800/60 px-4 pb-6 pt-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-stone-300 hover:text-emerald-300 hover:bg-stone-800/50 text-base font-medium py-3 px-3 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-stone-800/60">
            <a href="/#rezervasyon" onClick={closeMenu}>
              <Button className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg cursor-pointer">
                Rezervasyon Yap
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

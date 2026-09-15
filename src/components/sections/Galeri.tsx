"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&auto=format&fit=crop",
    alt: "Glamping çadırı gün batımında",
  },
  {
    src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500&auto=format&fit=crop",
    alt: "Kamp ateşi başında akşam",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop",
    alt: "Boyabağı sahili ve Ege",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop",
    alt: "Yıldızlı gece gökyüzü",
  },
  {
    src: "https://images.unsplash.com/photo-1540541338537-3173e2f29af1?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1540541338537-3173e2f29af1?w=500&auto=format&fit=crop",
    alt: "Lüks glamping iç mekânı",
  },
  {
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&auto=format&fit=crop",
    alt: "Doğal bar ve içkiler",
  },
  {
    src: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=500&auto=format&fit=crop",
    alt: "Aile kamp keyfi",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=500&auto=format&fit=crop",
    alt: "Karaburun gün batımı",
  },
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&auto=format&fit=crop",
    alt: "Ege kıyısı manzarası",
  },
  {
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop",
    alt: "Doğa ve orman",
  },
  {
    src: "https://images.unsplash.com/photo-1525811902-f2342640856e?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1525811902-f2342640856e?w=500&auto=format&fit=crop",
    alt: "Hamakta dinlenme",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop",
    alt: "Açık hava yemeği",
  },
];

export default function Galeri() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() =>
    setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)), []);
  const next = useCallback(() =>
    setLightbox((i) => (i !== null ? (i + 1) % photos.length : null)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-galeri-card]");
    const step = (card?.offsetWidth ?? 280) + 12;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if ((e.target as HTMLElement).closest("[data-galeri-arrow]")) return;
    const el = stripRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = stripRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const onPointerUp = () => {
    drag.current.active = false;
  };

  return (
    <section id="galeri" className="bg-stone-950 text-stone-100 py-24 overflow-x-hidden">
      <div className="container mx-auto max-w-5xl px-4">
        <Reveal>
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4 text-center">
            Galeri
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-4">
            Boyabağı&apos;ndan Kareler
          </h2>
          <p className="text-stone-400 text-base text-center max-w-xl mx-auto mb-10">
            Kamp ateşinden sahile, glamping çadırından gün batımına — Alice in Boyabağı&apos;ndan anlık görüntüler.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.06}>
        <div className="relative container mx-auto max-w-5xl">
          <button
            type="button"
            data-galeri-arrow
            onClick={() => scrollByCard(-1)}
            className="absolute left-1 sm:left-2 top-1/2 z-10 -translate-y-1/2 hidden sm:flex items-center justify-center size-10 rounded-full bg-stone-950/80 border border-stone-700 text-stone-100 hover:bg-stone-800"
            aria-label="Önceki fotoğraflar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            data-galeri-arrow
            onClick={() => scrollByCard(1)}
            className="absolute right-1 sm:right-2 top-1/2 z-10 -translate-y-1/2 hidden sm:flex items-center justify-center size-10 rounded-full bg-stone-950/80 border border-stone-700 text-stone-100 hover:bg-stone-800"
            aria-label="Sonraki fotoğraflar"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={stripRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 py-1 cursor-grab active:cursor-grabbing select-none touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {photos.map((photo, i) => (
              <button
                key={i}
                type="button"
                data-galeri-card
                onClick={() => {
                  if (drag.current.moved) return;
                  setLightbox(i);
                }}
                className="group relative shrink-0 h-[220px] sm:h-[248px] md:h-[268px] aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label={`Fotoğrafı büyüt: ${photo.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.thumb}
                  alt={photo.alt}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/25 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 px-3 py-1 rounded-full">
                    {photo.alt}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10"
            aria-label="Kapat"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] px-14" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <p className="text-stone-300 text-sm text-center mt-3">
              {photos[lightbox].alt}
              <span className="text-stone-600 ml-3">{lightbox + 1} / {photos.length}</span>
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}

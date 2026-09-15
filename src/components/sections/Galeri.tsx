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

const DRAG_PX = 10;

function zoomBox(card: HTMLElement | null) {
  const cw = card?.offsetWidth ?? 293;
  const ch = card?.offsetHeight ?? 220;
  let w = cw * 4;
  let h = ch * 4;
  const s = Math.min(1, (window.innerWidth * 0.92) / w, (window.innerHeight * 0.86) / h);
  return { w: Math.round(w * s), h: Math.round(h * s) };
}

export default function Galeri() {
  const [zoom, setZoom] = useState<number | null>(null);
  const [anim, setAnim] = useState(false);
  const [box, setBox] = useState({ w: 400, h: 300 });
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const ignoreClose = useRef(false);
  const press = useRef({
    x: 0,
    scroll: 0,
    i: null as number | null,
    dragging: false,
    mouse: false,
  });

  const close = useCallback(() => {
    if (ignoreClose.current) return;
    setAnim(false);
    window.setTimeout(() => setZoom(null), 180);
  }, []);

  const open = useCallback((i: number) => {
    ignoreClose.current = true;
    setAnim(false);
    setBox(zoomBox(stripRef.current?.querySelector("[data-galeri-card]") ?? null));
    setZoom(i);
    requestAnimationFrame(() => setAnim(true));
    window.setTimeout(() => {
      ignoreClose.current = false;
    }, 350);
  }, []);
  const prev = useCallback(() =>
    setZoom((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)), []);
  const next = useCallback(() =>
    setZoom((i) => (i !== null ? (i + 1) % photos.length : null)), []);

  useEffect(() => {
    if (zoom === null) {
      setAnim(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const onResize = () =>
      setBox(zoomBox(stripRef.current?.querySelector("[data-galeri-card]") ?? null));
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [zoom, close, prev, next]);

  const updateArrows = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    const imgs = el.querySelectorAll("img");
    imgs.forEach((img) => img.addEventListener("load", updateArrows));
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
      imgs.forEach((img) => img.removeEventListener("load", updateArrows));
    };
  }, [updateArrows]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-galeri-card]");
    const step = (card?.offsetWidth ?? 280) + 12;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-galeri-arrow]")) return;
    const el = stripRef.current;
    if (!el) return;
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-galeri-card]");
    const i = card ? Number(card.dataset.index) : null;
    const mouse = e.pointerType !== "touch";
    press.current = {
      x: e.clientX,
      scroll: el.scrollLeft,
      i: Number.isFinite(i) ? i : null,
      dragging: false,
      mouse,
    };
    if (mouse) el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (!el) return;
    const dx = e.clientX - press.current.x;
    if (Math.abs(dx) > DRAG_PX) press.current.dragging = true;
    if (press.current.mouse && el.hasPointerCapture(e.pointerId)) {
      el.scrollLeft = press.current.scroll - dx;
    } else if (Math.abs(el.scrollLeft - press.current.scroll) > DRAG_PX) {
      press.current.dragging = true;
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (el && Math.abs(el.scrollLeft - press.current.scroll) > DRAG_PX) {
      press.current.dragging = true;
    }
    if (el && press.current.mouse) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
    const { dragging, i } = press.current;
    press.current.i = null;
    press.current.mouse = false;
    if (!dragging && i !== null) open(i);
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
          {canScrollLeft && (
            <button
              type="button"
              data-galeri-arrow
              onClick={() => scrollByCard(-1)}
              className="absolute left-1 sm:left-2 top-1/2 z-10 -translate-y-1/2 hidden sm:flex items-center justify-center size-10 rounded-full bg-stone-950/80 border border-stone-700 text-stone-100 hover:bg-stone-800"
              aria-label="Önceki fotoğraflar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              data-galeri-arrow
              onClick={() => scrollByCard(1)}
              className="absolute right-1 sm:right-2 top-1/2 z-10 -translate-y-1/2 hidden sm:flex items-center justify-center size-10 rounded-full bg-stone-950/80 border border-stone-700 text-stone-100 hover:bg-stone-800"
              aria-label="Sonraki fotoğraflar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

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
                data-index={i}
                className="group relative shrink-0 h-[220px] sm:h-[248px] md:h-[268px] aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Fotoğrafı büyüt"
                onClick={() => {
                  if (press.current.dragging) return;
                  open(i);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.thumb}
                  alt={photo.alt}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {zoom !== null && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-md transition-opacity duration-[250ms] ${
            anim ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full z-10"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 sm:left-6 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full z-10"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            className={`relative overflow-hidden rounded-xl shadow-2xl transition-transform duration-[250ms] ease-out ${
              anim ? "scale-100" : "scale-[0.25]"
            }`}
            style={{ width: box.w, height: box.h }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[zoom].src}
              alt={photos[zoom].alt}
              className="w-full h-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 sm:right-6 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full z-10"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}

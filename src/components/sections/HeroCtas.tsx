"use client";

import { Calendar, Compass } from "lucide-react";
import { scrollToHash } from "@/lib/scrollToHash";

function onHashClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const hashAt = href.indexOf("#");
  if (hashAt === -1) return;
  e.preventDefault();
  const id = href.slice(hashAt + 1);
  if (!id) return;
  scrollToHash(id);
  history.pushState(null, "", `/#${id}`);
}

export default function HeroCtas() {
  return (
    <div className="relative z-20 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <a
        href="#rezervasyon"
        onClick={(e) => onHashClick(e, "#rezervasyon")}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/30 transition-all"
      >
        <Calendar className="w-5 h-5" />
        Rezervasyon Yap
      </a>

      <a
        href="#hakkinda"
        onClick={(e) => onHashClick(e, "#hakkinda")}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-stone-700 bg-stone-900/50 hover:bg-stone-800 text-stone-200 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all"
      >
        <Compass className="w-5 h-5 text-amber-400" />
        Alanı Keşfet
      </a>
    </div>
  );
}

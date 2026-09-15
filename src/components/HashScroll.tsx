"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Blog gibi başka bir sayfadan /#section gelince hash’e yumuşak kaydır. */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }, 50);

    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}

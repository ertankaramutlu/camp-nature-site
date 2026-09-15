"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollToHash } from "@/lib/scrollToHash";

const STORAGE_KEY = "alice-hash-scroll";

/** Blog gibi başka bir sayfadan gelince ease-out kaydır. */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" && pathname !== "") return;

    let id = "";
    try {
      id = sessionStorage.getItem(STORAGE_KEY) ?? "";
      if (id) sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      id = "";
    }
    if (!id) id = window.location.hash.replace("#", "");
    if (!id) return;

    history.replaceState(null, "", `/#${id}`);
    const t = window.setTimeout(() => scrollToHash(id), 40);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}

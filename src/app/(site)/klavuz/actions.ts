"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "crypto";

const COOKIE = "klavuz";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 gün

function sifreEslesir(girilen: string, beklenen: string) {
  const a = Buffer.from(girilen);
  const b = Buffer.from(beklenen);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function login(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const beklenen = process.env.KLAVUZ_SIFRE;
  if (!beklenen) {
    return { error: "Kılavuz yapılandırılmadı." };
  }

  const girilen = String(formData.get("sifre") ?? "");
  if (!sifreEslesir(girilen, beklenen)) {
    return { error: "Şifre hatalı" };
  }

  const jar = await cookies();
  jar.set(COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });

  redirect("/klavuz");
}

export async function logout() {
  const jar = await cookies();
  jar.delete({ name: COOKIE, path: "/" });
  redirect("/klavuz");
}

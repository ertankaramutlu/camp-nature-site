"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function KlavuzGiris({ yapilandirilmadi }: { yapilandirilmadi: boolean }) {
  const [state, action, pending] = useActionState(login, null);

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-md">
        <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4">
          Yalnızca işletme
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
          Kılavuz girişi
        </h1>
        <p className="text-stone-400 text-sm mb-8">
          Bu sayfa misafirler için değildir. Şifreyi Ertan verdiyse aşağıya yazın.
        </p>

        {yapilandirilmadi ? (
          <p className="text-amber-200/90 text-sm bg-amber-950/40 border border-amber-800/40 rounded-xl px-4 py-3">
            Kılavuz yapılandırılmadı. Canlı sitede şifre tanımlanmadan metin gösterilmez.
          </p>
        ) : (
          <form action={action} className="space-y-4">
            <label className="flex flex-col gap-2">
              <span className="text-stone-300 text-sm font-semibold">Şifre</span>
              <input
                type="password"
                name="sifre"
                required
                autoComplete="current-password"
                className="bg-stone-900 border border-stone-700 text-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </label>
            {state?.error && (
              <p className="text-red-400 text-sm">{state.error}</p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-emerald-700 hover:bg-emerald-600 disabled:bg-stone-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {pending ? "Kontrol…" : "Giriş"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

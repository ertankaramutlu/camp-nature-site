import type { Metadata } from "next";
import { cookies } from "next/headers";
import KlavuzGiris from "./KlavuzGiris";
import KlavuzIcerik from "./KlavuzIcerik";

export const metadata: Metadata = {
  title: "Sahip kılavuzu | Alice in Boyabağı",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function KlavuzPage() {
  const yapilandirilmadi = !process.env.KLAVUZ_SIFRE;
  const jar = await cookies();
  const girisVar = jar.get("klavuz")?.value === "1";

  if (!yapilandirilmadi && girisVar) {
    return <KlavuzIcerik />;
  }

  return <KlavuzGiris yapilandirilmadi={yapilandirilmadi} />;
}

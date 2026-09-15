import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/sections/WhatsAppFab";
import HashScroll from "@/components/HashScroll";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HashScroll />
      <Header />
      {children}
      <Footer />
      <WhatsAppFab />
    </>
  );
}

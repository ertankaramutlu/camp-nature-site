import { MessageCircle } from "lucide-react";

const WA_URL = "https://wa.me/905543343722";

export default function WhatsAppFab() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-200"
    >
      <MessageCircle className="w-7 h-7 fill-white stroke-none" />
    </a>
  );
}

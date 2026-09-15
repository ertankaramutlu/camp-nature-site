# Alice in Boyabağı — Blog Yönetim Rehberi

## Studio'ya nasıl gidilir?

Siteyi çalıştırdıktan sonra tarayıcıda şu adresi açın:

```
http://localhost:3000/studio   ← geliştirme ortamı
https://sitenizin-adresi/studio  ← yayında
```

Studio'ya ilk girişte Sanity hesabınızla oturum açmanız istenecektir.

---

## Yeni yazı nasıl eklenir?

1. Studio'yu açın.
2. Sol menüde **"Yazılar"** seçeneğine tıklayın.
3. Sağ üst köşedeki **"+"** butonuna basın.
4. Şu alanları doldurun:
   - **Başlık** — Yazının başlığı (zorunlu)
   - **Slug** — URL adresi; Başlık'tan otomatik oluşur, "Generate" butonuna basın
   - **Yayın Tarihi** — Boş bırakırsanız yazı sitede görünmez
   - **Özet** — Blog listesinde görünen kısa açıklama (1–2 cümle)
   - **Kapak Görseli** — Yatay (16:9 oran) görsel önerilir
   - **İçerik** — Yazının tam metni
5. Sağ üst köşedeki **"Publish"** butonuna basın → Yazı sitede yayınlanır.

> ⚠️ "Publish" basmadan yazı sitede görünmez.

---

## Kapak görseli nasıl yüklenir?

"Kapak Görseli" alanına tıklayın → **"Upload"** ile bilgisayarınızdan görsel seçin.

---

## İlk kurulum (bir seferlik, teknik)

1. [sanity.io](https://sanity.io) adresinden ücretsiz hesap oluşturun.
2. **"New Project"** oluşturun; dataset adı `production` olsun.
3. Projenin **Project ID**'sini kopyalayın (Settings → API).
4. Proje klasöründe `.env.local` dosyası oluşturun:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=buraya-proje-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

5. **`.env.local` değiştirdikten sonra mutlaka dev sunucusunu yeniden başlatın:**

   ```bash
   # Çalışıyorsa Ctrl+C ile durdurun, sonra:
   npm run dev
   ```

6. `http://localhost:3000/studio` adresine gidip oturum açın.

---

## Yazı güncelleme / silme

- Studio'da yazıya tıklayıp düzenleyin, tekrar **"Publish"** basın.
- Silmek için yazıyı açıp sağ üst "…" menüsünden **"Delete"** seçin.

---

## Etkinlik ekleme

1. Studio → **Etkinlikler** → **+**
2. Başlık, açıklama, tarih bilgisi, kategori (Doğa / Sosyal / Deniz) doldurun; kapak isteğe bağlı.
3. **Publish** basın — taslak sitede görünmez.
4. Ana sayfada **#etkinlikler** bölümünde kart çıkar.
5. Sırayı “Sıralama (küçük = önde)” ile ayarlayın; silmek için yazıyı açıp **Delete**.

---

## Konaklama ve fiyat

1. Studio → **Konaklama** → **+**
2. İlk kayıtlar (kodla eklenmez, siz yazın): Taş Ev 5000 gecelik · Ihlamur Ev 4000 · Sakız Ev 4500 · Kamp Alanı Çadırı 1500 · Kendi Çadırınız 1000 kişi/gecelik.
3. **Publish** basın. Taslak sitede görünmez.
4. Ana sayfa **#konaklama** kartları ve rezervasyon select aynı listeden gelir.
5. Fiyatı değiştirip Publish → sayfayı yenileyin; kart ve WhatsApp mesajı güncellenir.

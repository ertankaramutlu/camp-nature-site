import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  title: "Etkinlikler",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (Rule) => Rule.required().error("Başlık zorunludur."),
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 3,
      description: "Kısa açıklama — kart üzerinde görünür (1–2 cümle).",
    }),
    defineField({
      name: "dateLabel",
      title: "Tarih / Zaman Bilgisi",
      type: "string",
      description: 'Örn. "Cuma & Cumartesi geceleri" veya "Her akşam".',
    }),
    defineField({
      name: "badge",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "🌿 Doğa", value: "Doğa" },
          { title: "🔥 Sosyal", value: "Sosyal" },
          { title: "🌊 Deniz", value: "Deniz" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Kapak Görseli (isteğe bağlı)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sortOrder",
      title: "Sıralama (küçük = önde)",
      type: "number",
      description: "0, 1, 2 … şeklinde sıra belirleyin.",
      initialValue: 0,
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın Tarihi",
      type: "datetime",
      description: "Boş veya gelecekte → sitede görünmez.",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "title", badge: "badge", media: "cover" },
    prepare({ title, badge, media }) {
      return {
        title: title ?? "İsimsiz Etkinlik",
        subtitle: badge ?? "",
        media,
      };
    },
  },
});

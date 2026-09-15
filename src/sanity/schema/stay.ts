import { defineType, defineField } from "sanity";

export const stay = defineType({
  name: "stay",
  title: "Konaklama",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (Rule) => Rule.required().error("Başlık zorunludur."),
    }),
    defineField({
      name: "price",
      title: "Fiyat (TL)",
      type: "number",
      description: "Sitede 5.000 gibi yazılır. Sadece rakam girin (5000).",
      validation: (Rule) =>
        Rule.required().error("Fiyat zorunludur.").min(0).error("Fiyat 0 veya daha büyük olmalı."),
    }),
    defineField({
      name: "priceUnit",
      title: "Fiyat Birimi",
      type: "string",
      options: {
        list: [
          { title: "Gecelik", value: "gecelik" },
          { title: "Kişi / gecelik", value: "kisi-gecelik" },
        ],
        layout: "radio",
      },
      initialValue: "gecelik",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 3,
      description: "Kart üzerinde görünen kısa açıklama (1–2 cümle).",
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Glamping", value: "Glamping" },
          { title: "Kamp", value: "Kamp" },
        ],
        layout: "radio",
      },
      initialValue: "Glamping",
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
  ],
  preview: {
    select: { title: "title", price: "price", category: "category", media: "cover" },
    prepare({ title, price, category, media }) {
      const formatted =
        typeof price === "number"
          ? new Intl.NumberFormat("tr-TR").format(price) + " ₺"
          : "";
      return {
        title: title ?? "İsimsiz Konaklama",
        subtitle: [formatted, category].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});

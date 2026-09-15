import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Yazılar",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (Rule) => Rule.required().error("Başlık zorunludur."),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Başlıktan otomatik oluşturulur. Değiştirmek için düzenleyin.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required().error("Slug zorunludur."),
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın Tarihi",
      type: "datetime",
      description: "Bu tarih gelecekte ise yazı sitede görünmez.",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Özet",
      type: "text",
      rows: 3,
      description: "Blog listesinde görünen kısa açıklama (1–2 cümle).",
    }),
    defineField({
      name: "cover",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
      description: "Yatay (16:9) görsel önerilir.",
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Başlık 2", value: "h2" },
            { title: "Başlık 3", value: "h3" },
            { title: "Alıntı", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Kalın", value: "strong" },
              { title: "Eğik", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Bağlantı",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", media: "cover" },
    prepare({ title, media }) {
      return { title: title ?? "İsimsiz Yazı", media };
    },
  },
});

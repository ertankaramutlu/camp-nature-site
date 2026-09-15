import { groq } from "next-sanity";

/** Yayınlanmış tüm yazılar — liste sayfası */
export const allPostsQuery = groq`
  *[_type == "post"
    && defined(publishedAt)
    && publishedAt <= now()
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    cover
  }
`;

/** Tek yazı slug'a göre */
export const postBySlugQuery = groq`
  *[_type == "post"
    && slug.current == $slug
    && defined(publishedAt)
    && publishedAt <= now()
  ][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    cover,
    body
  }
`;

/** generateStaticParams için slug listesi */
export const allSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`;

/** İlgili yazılar (mevcut hariç, en yeni 2) */
export const relatedPostsQuery = groq`
  *[_type == "post"
    && slug.current != $slug
    && defined(publishedAt)
    && publishedAt <= now()
  ] | order(publishedAt desc)[0..1] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    cover
  }
`;

/** Tüm etkinlikler — publishedAt zorunlu değil. sortOrder ↑ sonra publishedAt ↓ */
export const allEventsQuery = groq`
  *[_type == "event"] | order(sortOrder asc, publishedAt desc) {
    _id,
    title,
    description,
    dateLabel,
    badge,
    cover,
    sortOrder
  }
`;

/** Tüm konaklamalar — Publish yeterli, publishedAt yok. sortOrder ↑ */
export const allStaysQuery = groq`
  *[_type == "stay"] | order(sortOrder asc) {
    _id,
    title,
    price,
    priceUnit,
    description,
    category,
    cover,
    sortOrder
  }
`;

import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type PostRow = { slug: string; publishedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://camp-nature-site-jqiz.vercel.app";

  let posts: PostRow[] = [];
  try {
    posts = await client.fetch<PostRow[]>(allPostsQuery);
  } catch (err) {
    console.error("[sitemap] Sanity fetch hatası:", err);
  }

  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...posts
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}

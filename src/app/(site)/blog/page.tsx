import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Alice in Boyabağı",
  description:
    "Karaburun Boyabağı hakkında yazılar: glamping deneyimleri, doğa rehberleri ve aile tatili ipuçları.",
};

type PostCard = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cover: any;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogListPage() {
  let posts: PostCard[] = [];
  try {
    posts = await client.fetch<PostCard[]>(allPostsQuery);
  } catch {
    // Sanity yapılandırılmamışsa boş liste
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Başlık */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4">Blog</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
            Boyabağı&apos;ndan Yazılar
          </h1>
          <p className="text-stone-400 text-base sm:text-lg max-w-xl mx-auto">
            Glamping deneyimleri, Karaburun rehberleri ve aile tatili ilhamı.
          </p>
        </div>

        {/* Kart Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post) => {
              const coverUrl = post.cover
                ? urlFor(post.cover).width(600).height(338).auto("format").url()
                : null;

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-stone-900/60 border border-stone-800/60 rounded-2xl overflow-hidden hover:border-emerald-700/60 hover:shadow-lg hover:shadow-emerald-950/30 transition-all duration-300"
                >
                  {/* Kapak */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-800">
                    {coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={coverUrl}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-600 text-sm">
                        Görsel yok
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent" />
                  </div>

                  {/* İçerik */}
                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-amber-400/80 text-xs font-medium mb-2">
                      {formatDate(post.publishedAt)}
                    </p>
                    <h2 className="text-stone-100 font-bold text-lg leading-snug mb-3 group-hover:text-emerald-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-stone-400 text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="text-emerald-400 text-sm font-semibold flex items-center gap-1 group-hover:text-emerald-300 transition-colors">
                      Devamını oku
                      <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-stone-600 py-20">
            <p className="text-lg">Henüz yayınlanmış yazı yok.</p>
            <p className="text-sm mt-2">Studio&apos;dan ilk yazınızı ekleyip yayınlayın.</p>
          </div>
        )}

        {/* Ana Sayfaya Dön */}
        <div className="mt-16 text-center">
          <Link href="/" className="text-stone-500 hover:text-emerald-400 text-sm transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
}

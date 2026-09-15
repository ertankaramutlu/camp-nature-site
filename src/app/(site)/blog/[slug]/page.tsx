import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, relatedPostsQuery, allSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const WA_BASE = "https://wa.me/905543343722";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

type Post = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cover: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
};

type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cover: any;
};

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(allSlugsQuery);
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await client.fetch<Post | null>(postBySlugQuery, { slug });
    if (!post) return {};
    const coverUrl = post.cover ? urlFor(post.cover).width(1200).url() : undefined;
    return {
      title: `${post.title} | Alice in Boyabağı`,
      description: post.excerpt,
      openGraph: coverUrl ? { images: [{ url: coverUrl }] } : undefined,
    };
  } catch {
    return {};
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-extrabold text-stone-100 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-stone-100 mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-stone-300 leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-600 pl-5 italic text-stone-400 my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-stone-100 font-bold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 text-stone-300 mb-5 space-y-1.5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 text-stone-300 mb-5 space-y-1.5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-stone-300 leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-stone-300 leading-relaxed">{children}</li>,
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post: Post | null = null;
  try {
    post = await client.fetch<Post | null>(postBySlugQuery, { slug });
  } catch {
    notFound();
  }
  if (!post) notFound();

  let relatedPosts: RelatedPost[] = [];
  try {
    relatedPosts = await client.fetch<RelatedPost[]>(relatedPostsQuery, { slug });
  } catch {
    // sessizce geç
  }

  const coverUrl = post.cover
    ? urlFor(post.cover).width(1200).height(525).auto("format").url()
    : null;

  const waText = encodeURIComponent(
    `Merhaba! "${post.title}" yazısını okudum, Alice in Boyabağı hakkında bilgi almak istiyorum.`
  );

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-stone-500 text-sm mb-10">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-stone-400 truncate max-w-[180px]">{post.title}</span>
        </nav>

        {/* Başlık */}
        <p className="text-amber-400/80 text-sm font-medium mb-3">{formatDate(post.publishedAt)}</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-balance mb-8">
          {post.title}
        </h1>

        {/* Kapak */}
        {coverUrl && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-stone-800/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl}
              alt={post.title}
              className="w-full aspect-[16/7] object-cover"
            />
          </div>
        )}

        {/* Portable Text İçerik */}
        <article className="max-w-none">
          {post.body?.length > 0 ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-stone-500 italic">İçerik henüz eklenmemiş.</p>
          )}
        </article>

        {/* WhatsApp CTA */}
        <div className="mt-14 p-6 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl text-center">
          <p className="text-stone-300 text-base mb-4">
            Bu yazıyı okuduktan sonra aklında bir soru mu takıldı?
          </p>
          <a
            href={`${WA_BASE}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-7 py-4 rounded-xl text-base shadow-md transition-all hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp ile yer sor
          </a>
        </div>

        {/* İlgili Yazılar */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-stone-800/60">
            <h3 className="text-stone-400 text-sm font-semibold tracking-widest uppercase mb-7">
              İlgili Yazılar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedPosts.map((p) => {
                const relCover = p.cover
                  ? urlFor(p.cover).width(600).height(338).auto("format").url()
                  : null;
                return (
                  <Link
                    key={p._id}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col bg-stone-900/60 border border-stone-800/60 rounded-2xl overflow-hidden hover:border-emerald-700/60 transition-all"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-stone-800">
                      {relCover && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={relCover}
                          alt={p.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-amber-400/70 text-xs mb-1">{formatDate(p.publishedAt)}</p>
                      <p className="text-stone-200 font-semibold text-sm group-hover:text-emerald-300 transition-colors leading-snug">
                        {p.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/blog" className="text-stone-500 hover:text-emerald-400 text-sm transition-colors">
            ← Tüm yazılara dön
          </Link>
        </div>

      </div>
    </main>
  );
}

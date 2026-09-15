import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
};

export type Post = PostMeta & {
  htmlContent: string;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data } = matter(raw);
      return {
        slug: (data.slug as string) || slug,
        title: (data.title as string) || "",
        date: (data.date as string) || "",
        excerpt: (data.excerpt as string) || "",
        cover: (data.cover as string) || "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(BLOG_DIR)) return null;
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const postSlug = (data.slug as string) || filename.replace(/\.md$/, "");

    if (postSlug === slug) {
      const htmlContent = marked.parse(content, { async: false }) as string;
      return {
        slug: postSlug,
        title: (data.title as string) || "",
        date: (data.date as string) || "",
        excerpt: (data.excerpt as string) || "",
        cover: (data.cover as string) || "",
        htmlContent,
      };
    }
  }
  return null;
}

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { post } from "./src/sanity/schema/post";
import { event } from "./src/sanity/schema/event";
import { stay } from "./src/sanity/schema/stay";

export default defineConfig({
  name: "alice-in-boyabagi",
  title: "Alice in Boyabağı — Yönetim",

  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("İçerik")
          .items([
            S.documentTypeListItem("post").title("Yazılar"),
            S.documentTypeListItem("event").title("Etkinlikler"),
            S.documentTypeListItem("stay").title("Konaklama"),
          ]),
    }),
  ],

  schema: {
    types: [post, event, stay],
  },
});

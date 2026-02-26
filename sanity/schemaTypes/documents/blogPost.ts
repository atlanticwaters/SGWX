import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post (Spotlight)",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "tag", type: "string", title: "Tag (e.g., Featured Work, Insights, Process)" }),
    defineField({ name: "excerpt", type: "text", title: "Short Description" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }, { type: "image" }], title: "Body" }),
    defineField({ name: "thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
});

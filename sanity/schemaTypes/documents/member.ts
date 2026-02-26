import { defineType, defineField } from "sanity";

export default defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Full Name", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "name" } }),
    defineField({ name: "title", type: "string", title: "Title / Specialties" }),
    defineField({ name: "mantra", type: "string", title: "Mantra" }),
    defineField({ name: "characterMetaphor", type: "string", title: "Character Metaphor" }),
    defineField({ name: "bio", type: "text", title: "Bio" }),
    defineField({ name: "favoriteTools", type: "string", title: "Favorite Tools" }),
    defineField({ name: "photo", type: "image", title: "Photo", options: { hotspot: true } }),
    defineField({ name: "link", type: "object", fields: [
      defineField({ name: "label", type: "string" }),
      defineField({ name: "url", type: "url" }),
    ]}),
    defineField({ name: "isFeatured", type: "boolean", title: "Featured Member?" }),
    defineField({ name: "order", type: "number", title: "Display Order" }),
  ],
});

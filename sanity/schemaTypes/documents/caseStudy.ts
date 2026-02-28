import { defineType, defineField } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "client", type: "string", title: "Client Name" }),
    defineField({ name: "category", type: "string", title: "Category" }),
    defineField({ name: "year", type: "string", title: "Year" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "shortDescription", type: "text", title: "Short Description (100 words)" }),
    defineField({ name: "longDescription", type: "array", of: [{ type: "block" }], title: "Long Description" }),
    defineField({ name: "thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "galleryImages", type: "array", title: "Gallery Images", of: [
      { type: "image", options: { hotspot: true }, fields: [
        defineField({ name: "alt", type: "string", title: "Alt Text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ]},
    ]}),
    defineField({ name: "testimonial", type: "object", fields: [
      defineField({ name: "quote", type: "text" }),
      defineField({ name: "author", type: "string" }),
      defineField({ name: "role", type: "string" }),
    ]}),
    defineField({ name: "order", type: "number" }),
  ],
});

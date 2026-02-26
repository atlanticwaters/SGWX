import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Site Title" }),
    defineField({ name: "description", type: "text", title: "Site Description" }),
    defineField({
      name: "navigation",
      type: "array",
      title: "Main Navigation",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "URL" }),
            defineField({ name: "isCta", type: "boolean", title: "Is CTA?" }),
          ],
        },
      ],
    }),
    defineField({
      name: "footer",
      type: "object",
      fields: [
        defineField({ name: "copyright", type: "string" }),
        defineField({
          name: "socialLinks",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "platform", type: "string" }),
                defineField({ name: "url", type: "url" }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
});

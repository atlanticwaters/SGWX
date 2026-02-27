import { defineType, defineField } from "sanity";

export default defineType({
  name: "sectionBackground",
  title: "Section Background",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Descriptive label for this background (e.g. 'Dark Mountain')",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Identifier",
      description: "Used to assign this background to a section in code",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Background Image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "credit",
      type: "string",
      title: "Photo Credit",
      description: "Photographer name / source (e.g. 'Unsplash / John Doe')",
    }),
    defineField({
      name: "sourceUrl",
      type: "url",
      title: "Source URL",
      description: "Link to original image on Unsplash or similar",
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});

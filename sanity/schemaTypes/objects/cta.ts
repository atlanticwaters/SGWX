import { defineType, defineField } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string" }),
    defineField({ name: "href", type: "string" }),
    defineField({ name: "variant", type: "string", options: { list: ["primary", "secondary", "ghost"] } }),
  ],
});

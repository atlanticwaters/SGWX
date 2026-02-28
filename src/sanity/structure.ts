import type { StructureResolver } from 'sanity/structure'

const SINGLETONS = ['siteSettings']

const MANUALLY_ORGANIZED = [
  ...SINGLETONS,
  'page',
  'landingPage',
  'caseStudy',
  'blogPost',
  'author',
  'service',
  'member',
  'testimonial',
  'category',
  'sectionBackground',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sageworx Content')
    .items([
      // ── Singletons ──────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // ── Pages ───────────────────────────────────────────
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentTypeListItem('page').title('Pages'),
              S.documentTypeListItem('landingPage').title('Landing Pages'),
            ])
        ),

      S.divider(),

      // ── Content ─────────────────────────────────────────
      S.listItem()
        .title('Work')
        .child(S.documentTypeList('caseStudy').title('Case Studies')),

      S.listItem()
        .title('Spotlights')
        .child(
          S.list()
            .title('Spotlights')
            .items([
              S.documentTypeListItem('blogPost').title('Blog Posts'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),

      S.listItem()
        .title('Services')
        .child(S.documentTypeList('service').title('Services')),

      S.divider(),

      // ── People ──────────────────────────────────────────
      S.documentTypeListItem('member').title('Members'),
      S.documentTypeListItem('testimonial').title('Testimonials'),

      S.divider(),

      // ── Taxonomy & Media ────────────────────────────────
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('sectionBackground').title('Section Backgrounds'),

      // ── Remaining (auto-generated, filtered) ────────────
      ...S.documentTypeListItems().filter(
        (listItem) => !MANUALLY_ORGANIZED.includes(listItem.getId() as string)
      ),
    ])

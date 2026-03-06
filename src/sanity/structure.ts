import type { StructureResolver } from 'sanity/structure'

const SINGLETONS = ['siteSettings', 'homepage', 'modelPage', 'processPage', 'membersPage', 'workPage', 'spotlightsPage', 'styleGuidePage', 'animationsPage']

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
  'cardStyle',
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

      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Homepage')
        ),

      S.listItem()
        .title('Model Page')
        .child(
          S.document()
            .schemaType('modelPage')
            .documentId('modelPage')
            .title('Model Page')
        ),

      S.listItem()
        .title('Process Page')
        .child(
          S.document()
            .schemaType('processPage')
            .documentId('processPage')
            .title('Process Page')
        ),

      S.listItem()
        .title('Members Page')
        .child(
          S.document()
            .schemaType('membersPage')
            .documentId('membersPage')
            .title('Members Page')
        ),

      S.listItem()
        .title('Work Page')
        .child(
          S.document()
            .schemaType('workPage')
            .documentId('workPage')
            .title('Work Page')
        ),

      S.listItem()
        .title('Spotlights Page')
        .child(
          S.document()
            .schemaType('spotlightsPage')
            .documentId('spotlightsPage')
            .title('Spotlights Page')
        ),

      S.listItem()
        .title('Style Guide Page')
        .child(
          S.document()
            .schemaType('styleGuidePage')
            .documentId('styleGuidePage')
            .title('Style Guide Page')
        ),

      S.listItem()
        .title('Animations Page')
        .child(
          S.document()
            .schemaType('animationsPage')
            .documentId('animationsPage')
            .title('Animations Page')
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
      S.documentTypeListItem('cardStyle').title('Card Styles'),

      // ── Remaining (auto-generated, filtered) ────────────
      ...S.documentTypeListItems().filter(
        (listItem) => !MANUALLY_ORGANIZED.includes(listItem.getId() as string)
      ),
    ])

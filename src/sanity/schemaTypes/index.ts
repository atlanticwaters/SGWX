import type { SchemaTypeDefinition } from 'sanity'

// Documents
import { siteSettings } from './documents/site-settings'
import { caseStudy } from './documents/case-study'
import { blogPost } from './documents/blog-post'
import { member } from './documents/member'
import { sectionBackground } from './documents/section-background'
import { author } from './documents/author'
import { category } from './documents/category'
import { service } from './documents/service'
import { page } from './documents/page'
import { landingPage } from './documents/landing-page'
import { testimonial } from './documents/testimonial'
import { cardStyle } from './documents/card-style'
import { homepage } from './documents/homepage'
import { modelPage } from './documents/model-page'
import { processPage } from './documents/process-page'
import { membersPage } from './documents/members-page'
import { workPage } from './documents/work-page'
import { spotlightsPage } from './documents/spotlights-page'
import { styleGuidePage } from './documents/style-guide-page'
import { animationsPage } from './documents/animations-page'

// Objects
import { seo } from './objects/seo'
import { link } from './objects/link'
import { callToAction } from './objects/call-to-action'
import { testimonialEmbed } from './objects/testimonial-embed'
import { socialLink } from './objects/social-link'
import { galleryImage } from './objects/gallery-image'
import { stat } from './objects/stat'
import { comparisonRow } from './objects/comparison-row'
import { processStage } from './objects/process-stage'
import { richText } from './objects/rich-text'

// Page Builder Blocks
import { heroStatement } from './blocks/hero-statement'
import { featureCards } from './blocks/feature-cards'
import { comparisonTable } from './blocks/comparison-table'
import { clientSegments } from './blocks/client-segments'
import { statsGrid } from './blocks/stats-grid'
import { contentSplit } from './blocks/content-split'
import { spotlightsFeed } from './blocks/spotlights-feed'
import { caseStudyFeed } from './blocks/case-study-feed'
import { richTextSection } from './blocks/rich-text-section'
import { logoWall } from './blocks/logo-wall'
import { callToActionBanner } from './blocks/call-to-action-banner'
import { processOverview } from './blocks/process-overview'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  siteSettings,
  caseStudy,
  blogPost,
  member,
  sectionBackground,
  author,
  category,
  service,
  page,
  landingPage,
  testimonial,
  cardStyle,
  homepage,
  modelPage,
  processPage,
  membersPage,
  workPage,
  spotlightsPage,
  styleGuidePage,
  animationsPage,
  // Objects
  seo,
  link,
  callToAction,
  testimonialEmbed,
  socialLink,
  galleryImage,
  stat,
  comparisonRow,
  processStage,
  richText,
  // Page Builder Blocks
  heroStatement,
  featureCards,
  comparisonTable,
  clientSegments,
  statsGrid,
  contentSplit,
  spotlightsFeed,
  caseStudyFeed,
  richTextSection,
  logoWall,
  callToActionBanner,
  processOverview,
]

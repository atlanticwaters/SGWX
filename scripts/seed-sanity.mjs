import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-25",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function blockText(text) {
  return text.split("\n\n").map((para, i) => ({
    _type: "block",
    _key: `block-${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `span-${i}`, text: para.trim(), marks: [] }],
  }));
}

// ─── Site Settings ───────────────────────────────────────────────────────────
const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: "Sageworx | Go Further. Faster.",
  description:
    "We bring together seasoned marketing and creative experts\u2014bespoke teams who understand your work, thrive on the challenge and deliver when it counts. No agency bloat. No freelancer roulette.",
  navigation: [
    { _key: "nav-1", label: "Model", href: "/model", isCta: false },
    { _key: "nav-2", label: "Members", href: "/members", isCta: false },
    { _key: "nav-3", label: "Process", href: "/process", isCta: false },
    { _key: "nav-4", label: "Work", href: "/work", isCta: false },
    { _key: "nav-5", label: "Spotlights", href: "/spotlights", isCta: false },
    { _key: "nav-6", label: "Let\u2019s Chat!", href: "/contact", isCta: true },
  ],
  footer: {
    copyright: "\u00A9 2026 Sageworx, LLC.",
    socialLinks: [],
  },
};

// ─── Members ─────────────────────────────────────────────────────────────────
const members = [
  {
    _id: "member-sara",
    _type: "member",
    name: "Sara Ann MacFarlane",
    slug: { _type: "slug", current: "sara-macfarlane" },
    title: "Behavioral Scientist | Research Director | Campaign Strategist",
    mantra: "Let the problem inform the solution.",
    characterMetaphor:
      "If the Fundamental Fysiks Group and Sarah Mclachlan had a Love Child",
    bio: "Sara is a behavioral scientist who sees the world through a unique lens, combining psychology, economics, and art to understand the beautiful complexity of human behavior. With over 15 years in research and marketing, she has a rare talent for translating big-picture findings into actionable brand strategies. She\u2019s the strategist who can design a custom quantitative study for a fintech giant, then lead a creative planning workshop for a local non-profit, all while helping clients forge a deeper, more meaningful relationship with their consumers.",
    favoriteTools:
      "A well-designed mixed methodology study, a collaborative Miro board, and a healthy dose of intellectual curiosity.",
    isFeatured: true,
    order: 1,
  },
  {
    _id: "member-ama",
    _type: "member",
    name: "Ann Marie Almariei",
    slug: { _type: "slug", current: "ann-marie-almariei" },
    title: "Content Creator | Creative Director | Vibe Marketer",
    mantra:
      "Adaptation at any stage of a company\u2019s development takes commitment. Executives must be willing to stand firm in their direction and roll up their sleeves to execute.",
    characterMetaphor:
      "If the Bionic Woman had a major firmware update powered by AI and blockchain",
    bio: "AMA operates at the intersection of web2, web3, and AI-enhanced marketing. With deep experience across creative direction, community growth, and content strategy for video and social, she brings a rare, hands-on perspective to emerging digital ecosystems. She\u2019s the creative leader who has developed forward-thinking content and campaigns for iconic brands like 800-FLOWERS, Black & Decker, and JCPenney, but is equally at home helping a web3 startup find its voice. She doesn\u2019t just strategize; she rolls up her sleeves and makes it happen.",
    favoriteTools:
      "A deep understanding of community dynamics, a wallet full of NFTs, and the courage to be an early adopter.",
    isFeatured: true,
    order: 2,
  },
  {
    _id: "member-james",
    _type: "member",
    name: "James Petrossi",
    slug: { _type: "slug", current: "james-petrossi" },
    title: "Brand Strategist | Transformation Leader | Cultural Activist",
    mantra: "Create a more consciously connected world.",
    characterMetaphor: "If Steve Jobs\u2019 Heart Was as Big as His Ego",
    bio: "James has built his career on a simple but powerful idea: transforming how people connect\u2014with their work, with each other, and with brands. As the founder of PTNL, he helps companies transcend the chaos and evolve their culture with purpose. He\u2019s a behavioral strategist who has led creative ideation for global giants like Marriott and Under Armour, but he\u2019s also an author, an explorer of consciousness, and the host of the \u201CKnow Your True Self\u201D podcast. He brings a unique blend of business acumen and life-skills education to every project, a skill he honed working alongside his father to train tens of thousands of professionals worldwide.",
    favoriteTools:
      "Insightful questions, a well-facilitated workshop, and the willingness to have a courageous conversation.",
    isFeatured: true,
    order: 3,
  },
  {
    _id: "member-andrew",
    _type: "member",
    name: "Andrew Waters",
    slug: { _type: "slug", current: "andrew-waters" },
    title: "Photographer | Art Director | AI Engineer",
    mantra:
      "The perfect shot and the perfect user experience have one thing in common: a relentless pursuit of the details.",
    characterMetaphor: "If Markiplier Had a Mindmeld with Chris Burkard",
    bio: "Andrew is an adrenaline junkie with a penchant for sharp turns, steep drops, and snapping the perfect action shot. But don\u2019t let the mud on his MTBs fool you\u2014he\u2019s just as comfortable in a photography studio or behind a computer screen, manipulating the raw elements of light and shadow to tell a visual story. With over 20 years of experience, he\u2019s the award-winning creative who has led identity and web design for giants like Turner Sports and Warner Media, built a design system for Hyatt Hotels, and helped shape the Peacock Sports Pass brand from the ground up. He\u2019s a relentless advocate for human-centered design, a passionate mentor, and a self-proclaimed geek who\u2019s always exploring what\u2019s next\u2014whether it\u2019s state-of-the-art photography equipment, innovative bike tech, or the latest design software.",
    favoriteTools:
      "A well-worn camera, a clean design system, and a powerful new AI model to push creative boundaries.",
    isFeatured: true,
    order: 4,
  },
];

// ─── Case Studies ────────────────────────────────────────────────────────────
const caseStudies = [
  {
    _id: "case-zenpep",
    _type: "caseStudy",
    title: "ZENPEP\u00AE Racing Game",
    slug: { _type: "slug", current: "zenpep" },
    client: "Nestl\u00E9 Health Science",
    category: "Pharma / HCP Engagement",
    tags: [
      "Pharma",
      "HCP Engagement",
      "Experiential Learning",
      "Game Design + Production",
    ],
    shortDescription:
      "How do you make complex ZENPEP\u00AE dosing data memorable for busy HCPs? Invivo Brands engaged Sageworx to help them solve the challenge for Nestl\u00E9 Health Science by building an interactive game instead of another slide deck. Ready, Set ZENPEP! is a fast, arcade-style driving game that helps sales reps communicate key clinical insights in a compliance-safe way.",
    longDescription: blockText(
      `Gamifying Clinical Education for Deeper Engagement

Static slides don\u2019t cut it with busy healthcare professionals. When a leading pharmaceutical company needed to reframe the conversation around dosing, it faced a big hurdle: how to make complex clinical data stick in fast-paced field sales and conference environments.

Sageworx partnered with leading game developer MOTR to design and produce an interactive experience that trades passive detailing for active participation. We bypassed the slide deck and built a first-person, arcade-style driving game that transforms clinical education into a memorable, compliance-safe tool.

Built as an iPad-first WebGL Progressive Web App, the game is zero-friction for sales reps. It launches instantly, works offline, and requires no installation, making it a ready-to-go asset for any HCP conversation. Inside a stylized pancreas, players navigate a raceway, collecting power up tokens to fight chronic disease and hitting checkpoints that trigger quiz moments.

Each interaction reinforces critical prescribing considerations\u2014from patient variability to the correct dosing\u2014while keeping approved safety information visible. A competitive leaderboard fuels repeat engagement, turning a clinical tool into a peer-to-peer challenge. The result is a high-performance platform that empowers sales reps and makes complex science digestible.

The game launched at major trade events in February 2026, setting a new standard for interactive pharmaceutical education. The single player game was such a hit that multiplayer versions are now in development.`
    ),
    testimonial: {
      quote:
        "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. With ZENPEP, they allowed us to offer a solution that included game design and development\u2014expanding our core offerings and unlocking a new revenue stream with one of our top clients. Sageworx is a smart, scalable way to solve complex problems without adding overhead.",
      author: "Will Morel",
      role: "Creative Producer, Invivo Brands",
    },
    order: 1,
  },
  {
    _id: "case-nflst",
    _type: "caseStudy",
    title: "NFL Sunday Ticket\u00AE Logo for Business",
    slug: { _type: "slug", current: "nfl-sunday-ticket" },
    client: "EverPass Media",
    category: "Sports Media / Brand & Product Identity",
    tags: [
      "Sports Media",
      "Brand Architecture",
      "Logo Design",
      "Product Identity Systems",
    ],
    shortDescription:
      "EverPass Media needed to evolve the NFL Sunday Ticket\u00AE brand for the commercial streaming market\u2014while clearly differentiating it from residential YouTube packages. Sageworx was engaged to design a new logo system that balanced NFL equity, EverPass growth, and legal precision.",
    longDescription: blockText(
      `NFL Sunday Ticket\u00AE for Business \u2013 Redefining a Legendary Brand for Commercial Streaming

When EverPass Media acquired the commercial distribution rights for NFL Sunday Ticket\u00AE, the opportunity was massive, and so was the challenge. With YouTube carrying the consumer product, EverPass needed a brand identity that clearly signaled business-only access, while maintaining the integrity, authority, and equity of one of the most recognizable brands in sports.

EverPass engaged Sageworx to help them lead the evolution. As a fast-growing sports media company operating alongside giants like the NFL, ESPN and NBC Universal, EverPass required seasoned creative leadership capable of navigating brand hierarchy, legal constraints, and real-world commercial use cases. This was not just a logo refresh\u2014it was a strategic redesign.

Sageworx developed a broad range of logo concepts rooted in the game itself, exploring tickets, screens, stadium architecture, shields, and field-driven iconography. Each direction was designed to modernize NFL Sunday Ticket\u00AE for today\u2019s streaming environment while clearly differentiating the commercial offering from the consumer YouTube package.

The resulting identity system was engineered for versatility and scale, performing across digital platforms, print, and high-visibility bar and venue environments. The final mark communicates premium access, legitimacy, and professionalism\u2014positioning EverPass as the definitive commercial home of NFL Sunday Ticket\u00AE.`
    ),
    testimonial: {
      quote:
        "To operate at the level of brands like the NFL, NBC Universal, ESPN and other sports giants, we need partners who can work at that altitude. Sageworx brought senior-level strategy and design talent that helped us evolve NFL Sunday Ticket identity for the commercial market without compromising brand integrity.",
      author: "Christi De Ved",
      role: "VP of Marketing, EverPass Media",
    },
    order: 2,
  },
];

// ─── Blog Posts (Spotlights) ─────────────────────────────────────────────────
const blogPosts = [
  {
    _id: "post-zenpep-game",
    _type: "blogPost",
    title: "Gamifying Pharma Education for Deeper Engagement",
    slug: { _type: "slug", current: "zenpep-racing-game" },
    tag: "Featured Work",
    excerpt:
      "How do you make complex clinical data memorable for busy healthcare professionals? A leading pharmaceutical company needed to find a better way than another slide deck.",
    body: blockText(
      `How do you make complex clinical data memorable for busy healthcare professionals? A leading pharmaceutical company needed to find a better way than another slide deck.

Sageworx was engaged to create the interactive solution. Working with game design partner MOTR, the team developed an arcade-style driving game that transforms complex dosing information into an engaging, educational experience. Set inside a stylized human pancreas, the game uses a visual metaphor for the product\u2019s function while reinforcing key prescribing considerations in a compliance-safe way.

Built as an iPad-first web app, the game launches instantly and works offline, fitting seamlessly into any sales rep\u2019s conversation with an HCP. As players navigate the raceway, they pick up power tokens representing power boosts to help cure the disease and hit checkpoints that trigger short quiz moments. Each interaction reinforces critical clinical insights, from patient variability to symptom-driven needs.

The team designed both single-player and multi-player versions to maximize engagement at trade shows and conferences. The single-player mode works for one-on-one conversations and with self-play modes, while the multi-player version amps up the competitive theater at trade shows and conferences. A leaderboard drives repeat play and peer-to-peer competition, turning a clinical tool into an active, memorable experience.

The project successfully replaced passive detailing with active participation, setting a new standard for interactive pharmaceutical education.`
    ),
    publishedAt: "2026-02-15T12:00:00Z",
  },
  {
    _id: "post-end-of-aor",
    _type: "blogPost",
    title: "Vibe Marketing in the Age of Automation",
    slug: { _type: "slug", current: "end-of-aor-model" },
    tag: "Insights",
    excerpt:
      "Where to upskill and invest time and money, and where to stay nimble and agile.",
    body: blockText(
      `The marketing landscape is shifting faster than ever. Automation, AI, and new platforms are reshaping how brands connect with audiences. But in the rush to adopt every new tool, something essential gets lost: the human element.

Vibe marketing isn\u2019t about rejecting technology\u2014it\u2019s about using it in service of authentic connection. The best brands understand that automation handles the repetitive, but strategy, creativity, and cultural instinct remain distinctly human advantages.

The question isn\u2019t whether to automate. It\u2019s where to invest deeply in human judgment and where to let the machines handle the mechanics. Get this balance right, and you don\u2019t just keep up\u2014you set the pace.

Smart leaders are upskilling their teams in AI literacy while doubling down on strategic thinking, creative craft, and cross-functional collaboration. They\u2019re building organizations that can move fast without losing the plot.

The future belongs to teams that combine the speed of automation with the soul of human creativity. That\u2019s not a trend\u2014it\u2019s a competitive necessity.`
    ),
    publishedAt: "2026-02-01T12:00:00Z",
  },
  {
    _id: "post-behind-brief",
    _type: "blogPost",
    title:
      "Behind the Brief: Putting the Sageworx Strategic Process To Work",
    slug: { _type: "slug", current: "building-teams-that-scale" },
    tag: "Process",
    excerpt:
      "How a strong brief sets the tone and keeps teams focused from start to finish.",
    body: blockText(
      `Every successful project starts with a strong brief. Not a deck full of aspirational language\u2014a living document that aligns stakeholders, defines constraints, and sets clear success markers from day one.

At Sageworx, the Project Brief is the north star of every engagement. It\u2019s the first deliverable, and it\u2019s revisited at every stage. This isn\u2019t a formality\u2014it\u2019s a discipline that prevents the drift, scope creep, and miscommunication that derail most projects.

A strong brief answers the hard questions upfront: What does success look like? What are the real constraints? Who makes the final call? When these are documented and agreed upon, teams move faster because they\u2019re not guessing.

The brief also serves as an accountability tool. When priorities shift or new ideas emerge, the team checks them against the brief. Does this serve the objective? Does it fit within constraints? If yes, proceed. If not, have the conversation before burning cycles.

The result is work that builds on itself\u2014each sprint informed by the last, each decision anchored to real goals rather than shifting preferences. It\u2019s not glamorous, but it\u2019s the single most effective tool for delivering outcomes that matter.`
    ),
    publishedAt: "2026-01-20T12:00:00Z",
  },
];

// ─── Seed ────────────────────────────────────────────────────────────────────
async function seed() {
  const allDocs = [siteSettings, ...members, ...caseStudies, ...blogPosts];

  console.log(`Seeding ${allDocs.length} documents to Sanity...`);

  const transaction = client.transaction();
  for (const doc of allDocs) {
    transaction.createOrReplace(doc);
  }

  const result = await transaction.commit();
  console.log(`Done! Transaction ID: ${result.transactionId}`);
  console.log(`  - 1 siteSettings`);
  console.log(`  - ${members.length} members`);
  console.log(`  - ${caseStudies.length} case studies`);
  console.log(`  - ${blogPosts.length} blog posts`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

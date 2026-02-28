import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-25",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// ─── Update existing case studies with industry verticals ─────────────────────

const industryPatches = [
  { _id: "cs-nfl-sunday-ticket", industry: "Sports" },
  { _id: "cs-zenpep", industry: "Healthcare" },
  { _id: "cs-everpass-media", industry: "Technology" },
  { _id: "cs-fintech-rebrand", industry: "Finance" },
  { _id: "cs-wellness-campaign", industry: "Healthcare" },
];

// ─── New case studies for uncovered verticals ─────────────────────────────────

const newCaseStudies = [
  {
    _id: "cs-polestar-launch",
    title: "Polestar 5 Launch Campaign",
    slug: "polestar-launch",
    client: "Polestar",
    category: "Brand Campaign",
    industry: "Automotive",
    year: "2025",
    tags: ["Campaign", "Brand Strategy", "Experiential"],
    shortDescription:
      "A multi-market launch campaign for Polestar's flagship GT that positioned the brand as the thinking person's EV — blending performance marketing with environmental credibility.",
    longDescription: [
      {
        _type: "block", _key: "p1", style: "normal",
        children: [{ _type: "span", text: "Polestar needed to differentiate in an increasingly crowded EV market where every brand claims sustainability. We developed a campaign built around 'precision over promise' — letting engineering excellence speak louder than green marketing." }],
      },
      {
        _type: "block", _key: "p2", style: "normal",
        children: [{ _type: "span", text: "The multi-channel campaign spanned experiential pop-ups, cinematic content, and a digital configurator that let customers feel the car before seeing it. Launch weekend exceeded reservation targets by 180%." }],
      },
    ],
    testimonial: {
      quote: "Sageworx understood that our audience doesn't want to be sold to — they want to be convinced. The campaign respected that intelligence.",
      author: "Henrik Mattsson",
      role: "Head of Brand, Polestar North America",
    },
    order: 6,
  },
  {
    _id: "cs-nike-community",
    title: "Nike Run Club Community Activation",
    slug: "nike-run-club",
    client: "Nike",
    category: "Community & Engagement",
    industry: "Sports",
    year: "2024",
    tags: ["Community", "Activation", "Influencer", "Social"],
    shortDescription:
      "Scaled Nike Run Club from a fitness app feature to a cultural movement — building ambassador networks across 12 cities and driving 3x membership growth.",
    longDescription: [
      {
        _type: "block", _key: "n1", style: "normal",
        children: [{ _type: "span", text: "Nike Run Club had strong brand recognition but inconsistent community engagement. Local chapters operated independently, creating fragmented experiences that didn't reflect the Nike standard." }],
      },
      {
        _type: "block", _key: "n2", style: "normal",
        children: [{ _type: "span", text: "We designed a community operating model with standardized playbooks, ambassador training programs, and a content engine that turned every local run into shareable content. The result was a 3x increase in active membership and a 40% jump in run frequency among existing members." }],
      },
    ],
    order: 7,
  },
  {
    _id: "cs-spotify-creators",
    title: "Spotify Creator Collective",
    slug: "spotify-creators",
    client: "Spotify",
    category: "Creator Strategy",
    industry: "Entertainment",
    year: "2025",
    tags: ["Creator Economy", "Content Strategy", "Platform"],
    shortDescription:
      "Built Spotify's creator partnership framework from the ground up — connecting independent artists with brand sponsors through a curated marketplace.",
    longDescription: [
      {
        _type: "block", _key: "s1", style: "normal",
        children: [{ _type: "span", text: "Spotify wanted to become the platform where independent creators build sustainable careers — not just distribute music. We designed a partnership ecosystem that matches creators with brand sponsors based on audience alignment, not just follower count." }],
      },
      {
        _type: "block", _key: "s2", style: "normal",
        children: [{ _type: "span", text: "The Creator Collective launched with 200 founding artists and 15 brand partners, generating $2.4M in creator revenue in the first quarter. The framework has since expanded to podcasters and video creators." }],
      },
    ],
    testimonial: {
      quote: "They built something that actually works for creators — not just another marketplace that extracts value.",
      author: "Priya Desai",
      role: "Director of Creator Partnerships, Spotify",
    },
    order: 8,
  },
  {
    _id: "cs-dr-squatch",
    title: "Dr. Squatch — Bathwater Bliss",
    slug: "dr-squatch-bathwater",
    client: "Dr. Squatch",
    category: "Influencer Activation",
    industry: "CPG",
    year: "2024",
    tags: ["Influencer", "Product Launch", "Social", "CPG"],
    shortDescription:
      "A 5,000-bar limited drop with Sydney Sweeney — influencer activation, creator content strategy, and managed legal/reputational risk that sold out instantly and trended nationally.",
    longDescription: [
      {
        _type: "block", _key: "ds1", style: "normal",
        children: [{ _type: "span", text: "Dr. Squatch wanted to break through the noise in men's grooming with a product launch that would generate organic cultural conversation. We partnered with Sydney Sweeney for a limited-edition 'Bathwater Bliss' bar that walked the line between provocative and playful." }],
      },
      {
        _type: "block", _key: "ds2", style: "normal",
        children: [{ _type: "span", text: "Beyond the celebrity partnership, we built a full creator content strategy with 50+ micro-influencers, managed complex legal/reputational considerations, and orchestrated a drop mechanic that created artificial scarcity. The 5,000-bar run sold out in under an hour, trended across social platforms, and earned mentions on late-night television." }],
      },
    ],
    order: 9,
  },
  {
    _id: "cs-mindstrong-summit",
    title: "Mindstrong Corporate Summit",
    slug: "mindstrong-summit",
    client: "Mindstrong",
    category: "Experiential & Events",
    industry: "Healthcare",
    year: "2024",
    tags: ["Events", "Internal Communications", "Culture"],
    shortDescription:
      "Designed and produced an in-person summit for a distributed healthcare/tech company — achieving 91% satisfaction and 95% connection scores vs 55% pre-summit.",
    longDescription: [
      {
        _type: "block", _key: "ms1", style: "normal",
        children: [{ _type: "span", text: "Mindstrong, a healthcare technology company, was struggling with cultural cohesion after two years of fully remote work. Employee connection scores had dropped to 55%, and leadership recognized that Slack channels couldn't replace the bonds formed through shared experience." }],
      },
      {
        _type: "block", _key: "ms2", style: "normal",
        children: [{ _type: "span", text: "We designed a three-day summit that balanced strategic alignment sessions with genuine human connection moments. Every element — from the venue selection to the breakout session design — was engineered to rebuild trust and shared purpose. Post-event surveys showed 91% satisfaction and connection scores jumped to 95%." }],
      },
    ],
    order: 10,
  },
  {
    _id: "cs-airbnb-experiences",
    title: "Airbnb Experiences Expansion",
    slug: "airbnb-experiences",
    client: "Airbnb",
    category: "Product Marketing",
    industry: "Real Estate",
    year: "2025",
    tags: ["Product Marketing", "Growth Strategy", "Content"],
    shortDescription:
      "Strategic repositioning of Airbnb Experiences from a secondary feature to a primary booking driver — creating a content-led growth engine across 8 new markets.",
    longDescription: [
      {
        _type: "block", _key: "ab1", style: "normal",
        children: [{ _type: "span", text: "Airbnb Experiences had plateaued. Despite strong product-market fit, the feature was buried in the app hierarchy and treated as an afterthought by both hosts and guests. We led the strategic repositioning that elevated Experiences into a standalone booking category." }],
      },
      {
        _type: "block", _key: "ab2", style: "normal",
        children: [{ _type: "span", text: "Our approach combined content-led marketing (documentary-style host profiles), revised information architecture, and a host recruitment campaign targeting professional guides and local experts. The initiative launched across 8 new markets with a 45% lift in Experiences bookings within the first quarter." }],
      },
    ],
    order: 11,
  },
  {
    _id: "cs-google-ai-studio",
    title: "Google AI Studio Launch",
    slug: "google-ai-studio",
    client: "Google",
    category: "Product Launch",
    industry: "Technology",
    year: "2025",
    tags: ["Product Launch", "Developer Marketing", "AI"],
    shortDescription:
      "Go-to-market strategy and developer community activation for Google's AI Studio platform — from developer documentation to launch event production.",
    longDescription: [
      {
        _type: "block", _key: "g1", style: "normal",
        children: [{ _type: "span", text: "Google needed to cut through an increasingly noisy AI tools market with a launch that spoke directly to developers — not just executives reading press releases. We designed a go-to-market strategy that prioritized developer experience over enterprise sales collateral." }],
      },
      {
        _type: "block", _key: "g2", style: "normal",
        children: [{ _type: "span", text: "The launch included interactive documentation, a 48-hour hackathon with 5,000+ participants, and a content series featuring real developers building real applications. Developer adoption exceeded targets by 200% in the first 90 days." }],
      },
    ],
    order: 12,
  },
  {
    _id: "cs-julabo-campaign",
    title: "JULABO USA — One Degree Campaign",
    slug: "julabo-one-degree",
    client: "JULABO USA",
    category: "Video & Content",
    industry: "Technology",
    year: "2024",
    tags: ["Video Production", "Content Strategy", "B2B"],
    shortDescription:
      "Cinematic video campaign fusing AI-enhanced visuals with human storytelling for aerospace and defense audiences — creating a scalable brand content system for B2B tech.",
    longDescription: [
      {
        _type: "block", _key: "j1", style: "normal",
        children: [{ _type: "span", text: "JULABO USA makes precision temperature control equipment for laboratories and industrial applications. The challenge: how do you make temperature control compelling to engineers and procurement teams who've seen every 'innovative solution' pitch?" }],
      },
      {
        _type: "block", _key: "j2", style: "normal",
        children: [{ _type: "span", text: "We created 'One Degree Can Change Everything' — a cinematic content series that shows the real-world consequences of temperature precision across aerospace, defense, and pharmaceutical applications. AI-enhanced visuals brought microscopic processes to life while human stories anchored the narrative in real impact." }],
      },
    ],
    order: 13,
  },
  {
    _id: "cs-edtech-platform",
    title: "LearnForward Platform Launch",
    slug: "learnforward-platform",
    client: "LearnForward",
    category: "Digital Product",
    industry: "Education",
    year: "2025",
    tags: ["Product Design", "EdTech", "UX Strategy"],
    shortDescription:
      "End-to-end brand and product design for an adaptive learning platform serving 50,000+ K-12 students — from identity to launch-ready product.",
    longDescription: [
      {
        _type: "block", _key: "lf1", style: "normal",
        children: [{ _type: "span", text: "LearnForward had a powerful adaptive learning engine but no brand, no product design, and no go-to-market strategy. We provided the full stack — brand identity, product UX, and launch campaign — in a compressed 16-week engagement." }],
      },
      {
        _type: "block", _key: "lf2", style: "normal",
        children: [{ _type: "span", text: "The platform launched to 50,000 students across 120 schools, with teacher adoption rates of 85% — well above the industry average of 40% for new EdTech tools. The key was designing for teachers first, not students — understanding that adoption gates through the educator experience." }],
      },
    ],
    order: 14,
  },
  {
    _id: "cs-retail-activation",
    title: "Nordstrom Pop-Up Experience",
    slug: "nordstrom-popup",
    client: "Nordstrom",
    category: "Experiential Retail",
    industry: "Retail",
    year: "2024",
    tags: ["Experiential", "Retail", "Brand Activation"],
    shortDescription:
      "A series of immersive pop-up retail experiences that bridged digital discovery and physical shopping — driving 4x foot traffic and 60% conversion rates.",
    longDescription: [
      {
        _type: "block", _key: "nd1", style: "normal",
        children: [{ _type: "span", text: "Nordstrom wanted to reimagine the in-store experience for a generation that discovers brands on TikTok but still values tactile shopping. We designed a rotating pop-up concept that transformed underutilized floor space into curated brand discovery zones." }],
      },
      {
        _type: "block", _key: "nd2", style: "normal",
        children: [{ _type: "span", text: "Each pop-up featured AR try-on capabilities, creator-led styling sessions, and seamless checkout integration. The program drove 4x foot traffic to participating stores and achieved a 60% conversion rate — more than triple the department store average." }],
      },
    ],
    order: 15,
  },
];

// ─── Blog posts ───────────────────────────────────────────────────────────────

const blogPosts = [
  {
    _id: "bp-fractional-leadership",
    title: "Why Fractional Leadership Is the Future of Marketing",
    slug: "fractional-leadership-future",
    tag: "Strategy",
    industry: "Technology",
    excerpt: "The traditional CMO model is breaking down. Here's why smart companies are building flexible leadership structures that scale with their ambitions.",
    publishedAt: "2026-02-15T10:00:00Z",
    body: [
      { _type: "block", _key: "fl1", style: "normal", children: [{ _type: "span", text: "The average CMO tenure is now just 40 months — the shortest of any C-suite role. Companies are spending more time searching for marketing leaders than actually being led by them. This revolving door doesn't just waste executive search fees; it creates strategic whiplash that cascades through every team and campaign." }] },
      { _type: "block", _key: "fl2", style: "normal", children: [{ _type: "span", text: "Fractional leadership offers a different model: senior strategic guidance that scales with your needs, without the risk and overhead of a full-time executive hire. The best fractional leaders bring pattern recognition from multiple industries and company stages — something a single-company CMO simply can't match." }] },
    ],
  },
  {
    _id: "bp-sports-marketing-ai",
    title: "How AI Is Reshaping Sports Marketing in 2026",
    slug: "ai-sports-marketing-2026",
    tag: "AI & Innovation",
    industry: "Sports",
    excerpt: "From personalized fan experiences to real-time campaign optimization, AI is transforming how sports brands connect with audiences. Here's what's working.",
    publishedAt: "2026-02-10T10:00:00Z",
    body: [
      { _type: "block", _key: "sm1", style: "normal", children: [{ _type: "span", text: "Sports marketing has always been about moments — the game-winning shot, the buzzer-beater, the underdog story. AI doesn't replace those moments; it amplifies them. Brands that understand this distinction are winning, while those treating AI as a content factory are producing forgettable noise." }] },
      { _type: "block", _key: "sm2", style: "normal", children: [{ _type: "span", text: "The most effective sports marketing AI applications we've seen focus on three areas: real-time content personalization during live events, predictive audience modeling for sponsorship activation, and automated highlight generation that feeds social channels within seconds of a key play." }] },
    ],
  },
  {
    _id: "bp-healthcare-brand",
    title: "Building Trust in Healthcare: Brand Strategy Beyond Compliance",
    slug: "healthcare-brand-trust",
    tag: "Brand Strategy",
    industry: "Healthcare",
    excerpt: "Healthcare brands often confuse compliance with trust. Here's how to build genuine brand authority while navigating regulatory requirements.",
    publishedAt: "2026-01-28T10:00:00Z",
    body: [
      { _type: "block", _key: "hb1", style: "normal", children: [{ _type: "span", text: "Every healthcare brand claims to 'put patients first.' The phrase has become so ubiquitous it's meaningless. Real trust in healthcare branding comes from specificity — showing exactly how you're different, not just saying you care." }] },
      { _type: "block", _key: "hb2", style: "normal", children: [{ _type: "span", text: "The brands winning in healthcare today are the ones brave enough to acknowledge complexity. They don't promise easy answers; they demonstrate deep understanding of the problem. That's a harder brand to build, but it's one that earns genuine loyalty." }] },
    ],
  },
  {
    _id: "bp-ev-brand-wars",
    title: "The EV Brand Wars: Differentiation Beyond Sustainability",
    slug: "ev-brand-differentiation",
    tag: "Automotive",
    industry: "Automotive",
    excerpt: "Every EV brand claims to save the planet. The ones winning market share have found something more compelling to talk about.",
    publishedAt: "2026-01-20T10:00:00Z",
    body: [
      { _type: "block", _key: "ev1", style: "normal", children: [{ _type: "span", text: "The EV market has a differentiation crisis. When every brand leads with sustainability, none of them stand out. The brands breaking through — Polestar, Rivian, Lucid — have found unique positioning that treats environmental responsibility as a baseline, not a headline." }] },
      { _type: "block", _key: "ev2", style: "normal", children: [{ _type: "span", text: "Polestar leads with design precision. Rivian owns adventure. Lucid claims luxury technology. Each has carved a territory that makes sustainability feel like a given, not a pitch. This is the future of automotive branding: purpose as foundation, not facade." }] },
    ],
  },
  {
    _id: "bp-cpg-dtc",
    title: "The DTC Reckoning: What CPG Brands Should Learn",
    slug: "dtc-reckoning-cpg",
    tag: "Growth",
    industry: "CPG",
    excerpt: "The DTC boom taught CPG brands valuable lessons about customer relationships. Now the smart ones are applying those lessons at scale.",
    publishedAt: "2026-01-12T10:00:00Z",
    body: [
      { _type: "block", _key: "cpg1", style: "normal", children: [{ _type: "span", text: "The DTC wave showed traditional CPG brands what a direct customer relationship actually looks like. But as DTC darlings struggle with rising CAC and logistics costs, the lesson isn't 'go direct' — it's 'get closer to your customer regardless of channel.'" }] },
      { _type: "block", _key: "cpg2", style: "normal", children: [{ _type: "span", text: "Smart CPG brands are now building hybrid models: retail distribution for reach, direct channels for data and loyalty, and creator partnerships for cultural relevance. The brands winning aren't choosing one channel — they're orchestrating all of them." }] },
    ],
  },
  {
    _id: "bp-entertainment-creator",
    title: "Creator Economy 3.0: From Influence to Infrastructure",
    slug: "creator-economy-infrastructure",
    tag: "Creator Economy",
    industry: "Entertainment",
    excerpt: "The creator economy is maturing from individual influence to scalable infrastructure. Here's what entertainment brands need to understand.",
    publishedAt: "2026-02-05T10:00:00Z",
    body: [
      { _type: "block", _key: "ce1", style: "normal", children: [{ _type: "span", text: "Creator Economy 1.0 was about reach. 2.0 was about monetization. 3.0 is about infrastructure — the tools, platforms, and partnerships that let creators build sustainable businesses, not just audiences." }] },
      { _type: "block", _key: "ce2", style: "normal", children: [{ _type: "span", text: "Entertainment brands that treat creators as media channels are already behind. The forward-thinking brands are treating creators as product collaborators, co-investors, and distribution partners. The relationship is becoming symmetrical — and that changes everything about how deals get structured." }] },
    ],
  },
  {
    _id: "bp-fintech-trust",
    title: "Why Fintech Brands Keep Failing at Trust",
    slug: "fintech-trust-gap",
    tag: "Fintech",
    industry: "Finance",
    excerpt: "Fintech has a trust problem — and better UI won't fix it. Here's what financial brands need to get right about building credibility.",
    publishedAt: "2026-01-05T10:00:00Z",
    body: [
      { _type: "block", _key: "ft1", style: "normal", children: [{ _type: "span", text: "Fintech brands invest millions in sleek interfaces and assume trust will follow. It doesn't. Trust in financial services is earned through transparency, consistency, and demonstrated competence over time — not through gradient buttons and friendly illustrations." }] },
      { _type: "block", _key: "ft2", style: "normal", children: [{ _type: "span", text: "The fintech brands building real trust are the ones willing to be specific about risk, honest about limitations, and patient about growth. They're not trying to disrupt trust — they're trying to earn it the old-fashioned way, just with better technology underneath." }] },
    ],
  },
  {
    _id: "bp-retail-experience",
    title: "The Store Isn't Dead — It's Evolving",
    slug: "retail-store-evolution",
    tag: "Retail",
    industry: "Retail",
    excerpt: "Physical retail isn't dying — it's being reimagined as experience infrastructure. The brands getting this right are seeing record engagement.",
    publishedAt: "2025-12-20T10:00:00Z",
    body: [
      { _type: "block", _key: "re1", style: "normal", children: [{ _type: "span", text: "The 'retail apocalypse' narrative was always oversimplified. What died wasn't physical retail — it was uninspired physical retail. The stores thriving today are the ones that give people a reason to show up that a website can't replicate." }] },
      { _type: "block", _key: "re2", style: "normal", children: [{ _type: "span", text: "We're seeing a new generation of retail experiences that blend discovery, community, and entertainment. Pop-ups that feel like galleries. Flagship stores that function as content studios. Neighborhood shops that serve as community centers. The common thread: they all prioritize experience over transaction." }] },
    ],
  },
  {
    _id: "bp-edtech-adoption",
    title: "EdTech Adoption: Why Teachers Are the Real Gatekeepers",
    slug: "edtech-teacher-adoption",
    tag: "EdTech",
    industry: "Education",
    excerpt: "Most EdTech fails not because the product is bad, but because it ignores the person who decides whether it gets used: the teacher.",
    publishedAt: "2025-12-10T10:00:00Z",
    body: [
      { _type: "block", _key: "ed1", style: "normal", children: [{ _type: "span", text: "EdTech companies spend millions on features students love and administrators approve — then watch usage flatline because teachers won't adopt it. The adoption gap in education technology is almost always a teacher experience problem, not a student engagement problem." }] },
      { _type: "block", _key: "ed2", style: "normal", children: [{ _type: "span", text: "The EdTech products with the highest sustained adoption share three traits: they save teachers time (not add tasks), they integrate with existing workflows (not replace them), and they make teachers look good (not feel replaced). Design for the teacher first, and student engagement follows." }] },
    ],
  },
  {
    _id: "bp-real-estate-brand",
    title: "Proptech Is Boring — And That's the Opportunity",
    slug: "proptech-branding-opportunity",
    tag: "Real Estate",
    industry: "Real Estate",
    excerpt: "Real estate technology is drowning in forgettable brands. The companies that invest in distinctive positioning now will own the category later.",
    publishedAt: "2025-11-28T10:00:00Z",
    body: [
      { _type: "block", _key: "pr1", style: "normal", children: [{ _type: "span", text: "Proptech has a branding problem. Scroll through any real estate technology directory and you'll find an ocean of blue logos, stock photography of happy families, and taglines about 'reimagining' or 'transforming' the industry. Nobody stands out because nobody is willing to stand for something specific." }] },
      { _type: "block", _key: "pr2", style: "normal", children: [{ _type: "span", text: "This is a massive opportunity for any proptech company willing to invest in distinctive brand positioning. In a category where every competitor looks the same, being memorably different is a sustainable competitive advantage that compounds over time." }] },
    ],
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    _id: "test-christi-deved",
    quote: "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. With ZENPEP, they allowed us to offer a solution that included game design and development — expanding our core offerings and unlocking a new revenue stream with one of our top clients.",
    authorName: "Christi De Ved",
    role: "VP of Marketing",
    company: "EverPass Media",
    industry: "Technology",
  },
  {
    _id: "test-will-morel",
    quote: "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. Sageworx gives us a smart, scalable way to solve complex problems without adding overhead.",
    authorName: "Will Morel",
    role: "Creative Producer",
    company: "Invivo Brands",
    industry: "Healthcare",
  },
  {
    _id: "test-marcus-chen",
    quote: "Sageworx brought a level of strategic clarity that transformed how we approached the launch. They didn't just execute — they challenged our assumptions and made the campaign better for it.",
    authorName: "Marcus Chen",
    role: "VP of Marketing",
    company: "YouTube Sports",
    industry: "Sports",
  },
  {
    _id: "test-sarah-kim",
    quote: "They gave us a voice we didn't know we had. Our content finally sounds like us — not like every other wellness brand on the shelf.",
    authorName: "Sarah Kim",
    role: "CMO",
    company: "Vitalix Health",
    industry: "Healthcare",
  },
  {
    _id: "test-henrik-mattsson",
    quote: "Sageworx understood that our audience doesn't want to be sold to — they want to be convinced. The campaign respected that intelligence and the results showed it.",
    authorName: "Henrik Mattsson",
    role: "Head of Brand",
    company: "Polestar North America",
    industry: "Automotive",
  },
  {
    _id: "test-priya-desai",
    quote: "They built something that actually works for creators — not just another marketplace that extracts value. That philosophical alignment made all the difference.",
    authorName: "Priya Desai",
    role: "Director of Creator Partnerships",
    company: "Spotify",
    industry: "Entertainment",
  },
  {
    _id: "test-james-liu",
    quote: "Most agencies pitch disruption. Sageworx delivered credibility. In financial services, that's worth more than any clever campaign.",
    authorName: "James Liu",
    role: "Chief Marketing Officer",
    company: "Meridian Financial",
    industry: "Finance",
  },
  {
    _id: "test-rachel-santos",
    quote: "The pop-up program didn't just drive foot traffic — it changed how our team thinks about the purpose of physical retail. That shift in mindset was the real deliverable.",
    authorName: "Rachel Santos",
    role: "VP of Brand Experience",
    company: "Nordstrom",
    industry: "Retail",
  },
  {
    _id: "test-david-okafor",
    quote: "Sageworx designed for teachers first, and that made all the difference. Our adoption rates are 2x the industry average because the product actually fits into a teacher's day.",
    authorName: "David Okafor",
    role: "CEO",
    company: "LearnForward",
    industry: "Education",
  },
  {
    _id: "test-lisa-park",
    quote: "In a market where every brand looks the same, Sageworx helped us look like ourselves. Our brand recall scores doubled within six months of the rebrand.",
    authorName: "Lisa Park",
    role: "Head of Marketing",
    company: "Airbnb Experiences",
    industry: "Real Estate",
  },
  {
    _id: "test-mike-brennan",
    quote: "The limited drop strategy was flawless — from influencer seeding to the actual launch mechanics. Selling out in under an hour was the outcome, but the cultural conversation it started was the real win.",
    authorName: "Mike Brennan",
    role: "VP of Brand Partnerships",
    company: "Dr. Squatch",
    industry: "CPG",
  },
];

// ─── Seed Function ────────────────────────────────────────────────────────────

async function seed() {
  console.log("=== SGWX Content Seed ===\n");

  // 1. Patch existing case studies with industry
  console.log("--- Patching existing case studies with industry verticals ---");
  for (const patch of industryPatches) {
    try {
      await client.patch(patch._id).set({ industry: patch.industry }).commit();
      console.log(`  [OK] ${patch._id} -> ${patch.industry}`);
    } catch (err) {
      console.log(`  [SKIP] ${patch._id} (may not exist yet): ${err.message}`);
    }
  }

  // 2. Create new case studies (no images for speed — add later in Studio)
  console.log("\n--- Creating new case studies ---");
  for (const cs of newCaseStudies) {
    try {
      const doc = {
        _id: cs._id,
        _type: "caseStudy",
        title: cs.title,
        slug: { _type: "slug", current: cs.slug },
        client: cs.client,
        category: cs.category,
        industry: cs.industry,
        year: cs.year,
        tags: cs.tags,
        shortDescription: cs.shortDescription,
        longDescription: cs.longDescription,
        testimonial: cs.testimonial || undefined,
        order: cs.order,
      };
      await client.createOrReplace(doc);
      console.log(`  [OK] ${cs.title} (${cs.industry})`);
    } catch (err) {
      console.error(`  [FAIL] ${cs.title}: ${err.message}`);
    }
  }

  // 3. Create blog posts
  console.log("\n--- Creating blog posts ---");
  for (const bp of blogPosts) {
    try {
      const doc = {
        _id: bp._id,
        _type: "blogPost",
        title: bp.title,
        slug: { _type: "slug", current: bp.slug },
        tag: bp.tag,
        industry: bp.industry,
        excerpt: bp.excerpt,
        publishedAt: bp.publishedAt,
        body: bp.body,
      };
      await client.createOrReplace(doc);
      console.log(`  [OK] ${bp.title} (${bp.industry})`);
    } catch (err) {
      console.error(`  [FAIL] ${bp.title}: ${err.message}`);
    }
  }

  // 4. Create testimonials
  console.log("\n--- Creating testimonials ---");
  for (const t of testimonials) {
    try {
      const doc = {
        _id: t._id,
        _type: "testimonial",
        quote: t.quote,
        authorName: t.authorName,
        role: t.role,
        company: t.company,
        industry: t.industry,
      };
      await client.createOrReplace(doc);
      console.log(`  [OK] ${t.authorName} — ${t.company} (${t.industry})`);
    } catch (err) {
      console.error(`  [FAIL] ${t.authorName}: ${err.message}`);
    }
  }

  console.log("\n=== Seed complete! ===");
  console.log(`  Case studies: ${newCaseStudies.length} new + ${industryPatches.length} patched`);
  console.log(`  Blog posts: ${blogPosts.length}`);
  console.log(`  Testimonials: ${testimonials.length}`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

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

async function uploadImageFromUrl(url, filename) {
  console.log(`  Fetching: ${filename}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status} - ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    contentType: res.headers.get("content-type") || "image/jpeg",
    filename: `${filename}.jpg`,
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const caseStudies = [
  {
    _id: "cs-nfl-sunday-ticket",
    title: "NFL Sunday Ticket",
    slug: "nfl-sunday-ticket",
    client: "NFL / YouTube",
    category: "Brand Strategy",
    year: "2024",
    tags: ["Strategy", "Campaign", "Digital Experience"],
    shortDescription:
      "Reimagining the fan experience for NFL Sunday Ticket's transition to YouTube — from strategic positioning to creative execution.",
    longDescription: [
      {
        _type: "block", _key: "a1", style: "normal",
        children: [{ _type: "span", text: "The NFL Sunday Ticket migration to YouTube represented one of the biggest shifts in sports media history. Our team shaped the narrative and creative direction for the launch campaign, ensuring the transition felt like an upgrade rather than a disruption." }],
      },
      {
        _type: "block", _key: "a2", style: "normal",
        children: [{ _type: "span", text: "We developed a multi-channel strategy that spoke to die-hard fans and casual viewers alike, driving record sign-ups in the platform's first season." }],
      },
    ],
    testimonial: {
      quote: "Sageworx brought a level of strategic clarity that transformed how we approached the launch.",
      author: "Marcus Chen",
      role: "VP of Marketing, YouTube Sports",
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
    heroUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1920&q=80",
    galleryUrls: [
      { url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1400&q=80", alt: "Stadium atmosphere" },
      { url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=80", alt: "Fan experience" },
      { url: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1400&q=80", alt: "Digital screens" },
      { url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&q=80", alt: "Content creation" },
      { url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1400&q=80", alt: "Code and strategy" },
      { url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&q=80", alt: "Data visualization" },
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80", alt: "Analytics dashboard" },
    ],
    order: 1,
  },
  {
    _id: "cs-zenpep",
    title: "ZENPEP Racing Game",
    slug: "zenpep",
    client: "Nestl\u00e9 Health Science",
    category: "Game Design & Development",
    year: "2024",
    tags: ["Game Design", "Development", "Interactive", "Healthcare"],
    shortDescription:
      "An educational racing game that transforms patient education into an engaging interactive experience for children.",
    longDescription: [
      {
        _type: "block", _key: "b1", style: "normal",
        children: [{ _type: "span", text: "Patient education in pediatric healthcare faces a fundamental challenge: how do you communicate complex medical information to children in a way that sticks? We proposed something different \u2014 a racing game that embeds educational content directly into the gameplay mechanics." }],
      },
      {
        _type: "block", _key: "b2", style: "normal",
        children: [{ _type: "span", text: "Fuel management becomes enzyme timing, pit stops become meal planning. The result was a game that kids actually wanted to play, and that parents and providers could trust." }],
      },
    ],
    testimonial: {
      quote: "Sageworx is our first call when solutions push beyond our core capabilities. They integrate seamlessly and deliver beyond expectations.",
      author: "Will Morel",
      role: "Creative Producer, Invivo Brands",
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    heroUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80",
    galleryUrls: [
      { url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1400&q=80", alt: "Game interface" },
      { url: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1400&q=80", alt: "Interactive elements" },
      { url: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=1400&q=80", alt: "UI components" },
      { url: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1400&q=80", alt: "Design system" },
      { url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80", alt: "Development process" },
      { url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1400&q=80", alt: "Prototyping" },
      { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80", alt: "User testing" },
    ],
    order: 2,
  },
  {
    _id: "cs-everpass-media",
    title: "EverPass Media Platform",
    slug: "everpass-media",
    client: "EverPass Media",
    category: "Digital Product",
    year: "2025",
    tags: ["Product Design", "UX Strategy", "Development", "Media"],
    shortDescription:
      "A next-generation media distribution platform connecting content owners with enterprise venues through unified content management.",
    longDescription: [
      {
        _type: "block", _key: "c1", style: "normal",
        children: [{ _type: "span", text: "EverPass Media needed to consolidate a fragmented content distribution ecosystem into a single platform. Enterprise venues were managing multiple dashboards, content feeds, and licensing agreements across dozens of providers." }],
      },
      {
        _type: "block", _key: "c2", style: "normal",
        children: [{ _type: "span", text: "We designed a platform architecture that abstracts complexity into an intuitive, venue-centric interface. The platform launched with 40+ venue partners and reduced content onboarding time from weeks to hours." }],
      },
    ],
    testimonial: {
      quote: "Sageworx didn't just design a platform \u2014 they redesigned how we think about content distribution.",
      author: "Christi De Ved",
      role: "VP of Marketing, EverPass Media",
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    heroUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
    galleryUrls: [
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80", alt: "Dashboard design" },
      { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&q=80", alt: "Analytics view" },
      { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80", alt: "Enterprise deployment" },
      { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80", alt: "Team collaboration" },
      { url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&q=80", alt: "Platform architecture" },
      { url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1400&q=80", alt: "Interface detail" },
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80", alt: "User research" },
      { url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&q=80", alt: "Mobile experience" },
    ],
    order: 3,
  },
  {
    _id: "cs-fintech-rebrand",
    title: "Meridian Financial Rebrand",
    slug: "meridian-financial",
    client: "Meridian Financial",
    category: "Brand Identity",
    year: "2025",
    tags: ["Brand Strategy", "Visual Identity", "Design System", "Fintech"],
    shortDescription:
      "A complete brand transformation for a fintech challenger moving from B2B infrastructure to consumer-facing products.",
    longDescription: [
      {
        _type: "block", _key: "d1", style: "normal",
        children: [{ _type: "span", text: "Meridian had spent five years building reliable payment infrastructure for enterprise clients. As they prepared to launch consumer products, their brand spoke exclusively to CTOs and procurement teams \u2014 not to the people who would actually use the product." }],
      },
      {
        _type: "block", _key: "d2", style: "normal",
        children: [{ _type: "span", text: "We led a comprehensive rebrand that preserved trust signals for enterprise clients while introducing warmth and accessibility for consumer audiences. The new identity system adapts across touchpoints \u2014 from mobile onboarding flows to investor presentations." }],
      },
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
    heroUrl: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1920&q=80",
    galleryUrls: [
      { url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=80", alt: "Brand guidelines" },
      { url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1400&q=80", alt: "App identity" },
      { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80", alt: "Typography system" },
      { url: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1400&q=80", alt: "Color palette" },
      { url: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1400&q=80", alt: "Design tokens" },
      { url: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1400&q=80", alt: "Stationery" },
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80", alt: "Digital presence" },
    ],
    order: 4,
  },
  {
    _id: "cs-wellness-campaign",
    title: "Vitalix Wellness Campaign",
    slug: "vitalix-wellness",
    client: "Vitalix Health",
    category: "Content & Campaign",
    year: "2024",
    tags: ["Campaign Strategy", "Content Production", "Social", "Wellness"],
    shortDescription:
      "A multi-channel content campaign that drove 340% increase in organic engagement and established thought leadership in preventive health.",
    longDescription: [
      {
        _type: "block", _key: "e1", style: "normal",
        children: [{ _type: "span", text: "The wellness space is crowded with aspirational messaging that sounds identical across brands. Vitalix needed a voice, not just content." }],
      },
      {
        _type: "block", _key: "e2", style: "normal",
        children: [{ _type: "span", text: "We developed a content strategy built around 'credible contrarianism' \u2014 taking evidence-based positions that challenge popular wellness narratives. Instead of chasing trends, Vitalix became the brand that contextualized them." }],
      },
    ],
    testimonial: {
      quote: "They gave us a voice we didn\u2019t know we had. Our content finally sounds like us.",
      author: "Sarah Kim",
      role: "CMO, Vitalix Health",
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    heroUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80",
    galleryUrls: [
      { url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=1400&q=80", alt: "Content strategy" },
      { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80", alt: "Social campaign" },
      { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80", alt: "Lifestyle photography" },
      { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&q=80", alt: "Brand photography" },
      { url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1400&q=80", alt: "Editorial content" },
      { url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&q=80", alt: "Team workshop" },
      { url: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1400&q=80", alt: "Digital touchpoints" },
    ],
    order: 5,
  },
];

async function seed() {
  console.log(`Seeding ${caseStudies.length} case studies to Sanity...\n`);

  for (const cs of caseStudies) {
    console.log(`[${cs.title}]`);
    try {
      const thumbnail = await uploadImageFromUrl(cs.thumbnailUrl, `${cs.slug}-thumb`);
      const heroImage = await uploadImageFromUrl(cs.heroUrl, `${cs.slug}-hero`);

      const galleryImages = [];
      for (let i = 0; i < cs.galleryUrls.length; i++) {
        const gi = cs.galleryUrls[i];
        const img = await uploadImageFromUrl(gi.url, `${cs.slug}-gallery-${i}`);
        galleryImages.push({
          _type: "image",
          _key: `gallery-${i}`,
          asset: img.asset,
          alt: gi.alt,
        });
      }

      const doc = {
        _id: cs._id,
        _type: "caseStudy",
        title: cs.title,
        slug: { _type: "slug", current: cs.slug },
        client: cs.client,
        category: cs.category,
        year: cs.year,
        tags: cs.tags,
        shortDescription: cs.shortDescription,
        longDescription: cs.longDescription,
        thumbnail,
        heroImage,
        galleryImages,
        testimonial: cs.testimonial,
        order: cs.order,
      };

      await client.createOrReplace(doc);
      console.log(`  -> Created: ${cs.slug} (${galleryImages.length} gallery images)\n`);
    } catch (err) {
      console.error(`  -> FAILED: ${err.message}\n`);
    }
  }

  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

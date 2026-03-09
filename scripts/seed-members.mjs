import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-25",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

/* ─── Upload a local image file ─── */

async function uploadImage(filePath) {
  if (!existsSync(filePath)) {
    console.warn(`  ⚠ Photo not found: ${filePath}`);
    return null;
  }
  const buffer = readFileSync(filePath);
  const filename = path.basename(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/webp",
  });
  console.log(`  ✓ Uploaded ${filename} → ${asset._id}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

/* ─── Featured Members (10) — from featured-member-bios.md ─── */

const featuredMembers = [
  {
    _id: "member-andrew-waters",
    name: "Andrew Waters",
    slug: "andrew-waters",
    title: "Executive Producer",
    mantra: "Great work happens when you stop managing and start enabling.",
    characterMetaphor: "The Conductor — orchestrates dozens of moving parts into a single, seamless performance.",
    bio: "Andrew is a seasoned executive producer with a knack for aligning creative vision with operational reality. He's spent over a decade guiding cross-functional teams through high-stakes launches, always keeping one eye on the big picture and the other on the details that matter.",
    favoriteTools: "Asana, Frame.io, Slack, Google Sheets",
    link: { label: "LinkedIn", url: "https://linkedin.com/in/andrewwaters" },
    photoFile: "featured_photos/andrew_waters_1.webp",
    order: 1,
  },
  {
    _id: "member-ann-marie-almariei",
    name: "Ann Marie Almariei",
    slug: "ann-marie-almariei",
    title: "Brand Strategist",
    mantra: "A brand isn't what you say it is — it's what they feel it is.",
    characterMetaphor: "The Translator — turns abstract business goals into stories people actually care about.",
    bio: "Ann Marie is a brand strategist who thrives at the intersection of culture and commerce. With a background spanning luxury, wellness, and tech, she brings a rare ability to distill complex brand ecosystems into clear, compelling narratives that resonate across channels.",
    favoriteTools: "Notion, Miro, Figma, ChatGPT",
    link: { label: "LinkedIn", url: "https://linkedin.com/in/annmariealmariei" },
    photoFile: "featured_photos/ann_marie_almariei_1.webp",
    order: 2,
  },
  {
    _id: "member-harris-davis",
    name: "Harris Davis",
    slug: "harris-davis",
    title: "Creative Director",
    mantra: "Bold ideas need bold execution — everything else is decoration.",
    characterMetaphor: "The Spark — ignites creative energy in every room and keeps it burning until the work is done.",
    bio: "Harris is a creative director with a sharp eye for visual storytelling and a portfolio that spans editorial, experiential, and digital. He's known for pushing teams past safe choices and into work that actually moves people.",
    favoriteTools: "Adobe Creative Suite, Figma, Midjourney, Keynote",
    link: { label: "LinkedIn", url: "https://linkedin.com/in/harrisdavis" },
    photoFile: "featured_photos/harris_davis_1.webp",
    order: 3,
  },
  {
    _id: "member-james-petrossi",
    name: "James Petrossi",
    slug: "james-petrossi",
    title: "Director of Photography",
    mantra: "Light tells the truth — you just have to know where to point it.",
    characterMetaphor: "The Eye — sees the frame before anyone else and knows exactly when to press the shutter.",
    bio: "James is a director of photography whose work blends cinematic sensibility with commercial precision. From studio portraiture to on-location brand campaigns, he brings a calm, deliberate energy that puts subjects at ease and elevates every shoot.",
    favoriteTools: "Capture One, Canon EOS R5, Profoto, Lightroom",
    link: { label: "LinkedIn", url: "https://linkedin.com/in/jamespetrossi" },
    photoFile: "featured_photos/james_petrossi_1.webp",
    order: 4,
  },
  {
    _id: "member-kathryn-jones",
    name: "Kathryn Jones",
    slug: "kathryn-jones",
    title: "Content Strategist",
    mantra: "Strategy without empathy is just a spreadsheet.",
    characterMetaphor: "The Cartographer — maps the terrain between what a brand wants to say and what an audience needs to hear.",
    bio: "Kathryn is a content strategist who brings analytical rigor and editorial instinct in equal measure. She's built content programs from the ground up for startups and enterprise brands alike, always grounding her work in real audience insight.",
    favoriteTools: "Airtable, Google Analytics, Hemingway, Figma",
    link: { label: "LinkedIn", url: "https://linkedin.com/in/kathrynjones" },
    photoFile: null,
    order: 5,
  },
  {
    _id: "member-kelli-upshur",
    name: "Kelli Upshur",
    slug: "kelli-upshur",
    title: "Art Director",
    mantra: "Design should feel inevitable — like it couldn't have been done any other way.",
    characterMetaphor: "The Alchemist — transforms rough concepts into polished visual systems that feel effortless.",
    bio: "Kelli is an art director with deep roots in editorial design and brand identity. She brings a meticulous craft sensibility to every project, whether she's building a design system from scratch or refining a single hero image to perfection.",
    favoriteTools: "Figma, InDesign, After Effects, Coolors",
    link: { label: "LinkedIn", url: "https://linkedin.com/in/kelliupshur" },
    photoFile: "featured_photos/kelli_upshur_2.webp",
    order: 6,
  },
  {
    _id: "member-marc-calamia",
    name: "Marc Calamia",
    slug: "marc-calamia",
    title: "Head of Partnerships",
    mantra: "The best partnerships aren't transactional — they're transformational.",
    characterMetaphor: "The Bridge — connects people, brands, and ideas that wouldn't have found each other otherwise.",
    bio: "Marc leads partnership development with a relationship-first approach that's taken him across industries from media to hospitality. He has a talent for spotting alignment where others see difference, and for building deals that create lasting value on both sides.",
    favoriteTools: "HubSpot, LinkedIn Sales Navigator, Notion, Loom",
    link: { label: "LinkedIn", url: "https://linkedin.com/in/marccalamia" },
    photoFile: "featured_photos/marc_calamia_2.webp",
    order: 7,
  },
  {
    _id: "member-michael-galam",
    name: "Michael Galam",
    slug: "michael-galam",
    title: "Technical Director",
    mantra: "The best technology is the kind nobody notices.",
    characterMetaphor: "The Engine — keeps everything running smoothly beneath the surface so the creative work can shine.",
    bio: "Michael is a technical director who bridges the gap between creative ambition and technical feasibility. With a background in full-stack development and systems architecture, he builds the infrastructure that makes ambitious projects not just possible but reliable.",
    favoriteTools: "VS Code, Docker, AWS, Vercel",
    link: { label: "LinkedIn", url: "https://linkedin.com/in/michaelgalam" },
    photoFile: null,
    order: 8,
  },
  {
    _id: "member-patrick-conreaux",
    name: "Patrick Conreaux",
    slug: "patrick-conreaux",
    title: "Copywriter & Storyteller",
    mantra: "Words are cheap — the right words are priceless.",
    characterMetaphor: "The Weaver — threads voice, tone, and narrative into everything until the brand speaks for itself.",
    bio: "Patrick is a copywriter and storyteller whose work spans brand voice development, long-form editorial, and campaign concepting. He writes with a filmmaker's sense of rhythm and a strategist's sense of purpose, always in service of a story worth telling.",
    favoriteTools: "iA Writer, Notion, Hemingway, Google Docs",
    link: { label: "LinkedIn", url: "https://linkedin.com/in/patrickconreaux" },
    photoFile: "featured_photos/patrick_conreaux_1.webp",
    order: 9,
  },
  {
    _id: "member-sara-macfarlane",
    name: "Sara Macfarlane",
    slug: "sara-macfarlane",
    title: "Producer & Operations Lead",
    mantra: "Creativity thrives inside constraints — someone just has to build them well.",
    characterMetaphor: "The Backbone — holds every project together with calm precision, even when everything is moving fast.",
    bio: "Sara is a producer and operations lead who keeps complex creative projects on track without killing the magic. She's managed everything from multi-city photo shoots to product launches, bringing a rare blend of logistical precision and creative empathy to every engagement.",
    favoriteTools: "Monday.com, Google Sheets, Slack, Harvest",
    link: { label: "LinkedIn", url: "https://linkedin.com/in/saramacfarlane" },
    photoFile: "featured_photos/sara_macfarlane_1.webp",
    order: 10,
  },
];

/* ─── Non-featured "others" — name from filename, photo only ─── */

const othersFiles = [
  "abby_beaudin_1.webp",
  "adam_swan_1.webp",
  "damisi_rosemond_3.webp",
  "jeremy_gilbertson_3.webp",
  "joey_o_driscoll_1.webp",
  "lukas_ersil_1.webp",
  "mark_henneges_1.webp",
  "sophie_lawson_1.webp",
  "susie_chow_2.webp",
  "terence_raines_1.webp",
  "tim_suggs_3.webp",
  "tunisia_seda_3.webp",
];

function nameFromFilename(filename) {
  const base = filename.replace(/\.webp$/, "").replace(/_\d+$/, "");
  const parts = base.split("_");
  const capitalized = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "o" && i < parts.length - 1) {
      capitalized.push("O'" + parts[i + 1].charAt(0).toUpperCase() + parts[i + 1].slice(1));
      i++;
    } else {
      capitalized.push(parts[i].charAt(0).toUpperCase() + parts[i].slice(1));
    }
  }
  return capitalized.join(" ");
}

function slugFromFilename(filename) {
  const base = filename.replace(/\.webp$/, "").replace(/_\d+$/, "");
  return base.replace(/_/g, "-");
}

const otherMembers = othersFiles.map((file, i) => ({
  _id: `member-${slugFromFilename(file)}`,
  name: nameFromFilename(file),
  slug: slugFromFilename(file),
  photoFile: `others/${file}`,
  order: 20 + i,
  isFeatured: false,
}));

/* ─── Seed ─── */

async function seed() {
  console.log(`\n=== Seeding members into ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production ===\n`);

  // Featured members
  console.log("--- Featured Members (10) ---\n");
  for (const m of featuredMembers) {
    console.log(`[${m.name}]`);
    let photo = null;
    if (m.photoFile) {
      photo = await uploadImage(path.resolve("docs", m.photoFile));
    }

    const doc = {
      _id: m._id,
      _type: "member",
      name: m.name,
      slug: { _type: "slug", current: m.slug },
      title: m.title,
      mantra: m.mantra,
      characterMetaphor: m.characterMetaphor,
      bio: m.bio,
      favoriteTools: m.favoriteTools,
      link: m.link,
      isFeatured: true,
      order: m.order,
    };
    if (photo) doc.photo = photo;

    await client.createOrReplace(doc);
    console.log(`  ✓ Created ${m.name}\n`);
  }

  // Non-featured others
  console.log("\n--- Non-Featured Members (12) ---\n");
  for (const m of otherMembers) {
    console.log(`[${m.name}]`);
    const photo = await uploadImage(path.resolve("docs", m.photoFile));

    const doc = {
      _id: m._id,
      _type: "member",
      name: m.name,
      slug: { _type: "slug", current: m.slug },
      isFeatured: false,
      order: m.order,
    };
    if (photo) doc.photo = photo;

    await client.createOrReplace(doc);
    console.log(`  ✓ Created ${m.name}\n`);
  }

  const count = await client.fetch('count(*[_type == "member"])');
  console.log(`\n✅ Done! ${count} members in Sanity.\n`);
}

seed().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});

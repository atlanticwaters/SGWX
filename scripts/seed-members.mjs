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
  console.log(`  Fetching portrait: ${filename}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed: ${res.status} - ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    contentType: res.headers.get("content-type") || "image/jpeg",
    filename: `${filename}.jpg`,
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

// ─── Featured Members (full profiles + photos) ──────────────────────────────

const featuredMembers = [
  {
    _id: "member-marcus-reid",
    name: "Marcus Reid",
    slug: "marcus-reid",
    title: "Founder & Chief Strategist",
    mantra: "Strategy without execution is a daydream. Execution without strategy is a nightmare.",
    characterMetaphor: "The Architect — sees the whole blueprint before the first nail is driven, but isn't afraid to pick up a hammer.",
    bio: "Marcus founded Sageworx after 15 years leading brand and growth strategy at agencies in New York and Los Angeles. He saw the same problem everywhere: brilliant creative work that died on the vine because nobody connected it to business outcomes. Sageworx was built to close that gap — a collective of specialists who think in systems, not silos. Marcus holds an MBA from Columbia and a BFA from RISD, which he says makes him 'dangerously bilingual' between boardrooms and studios.",
    favoriteTools: "Miro, Notion, Arc Browser, a Moleskine notebook",
    link: { label: "LinkedIn", url: "https://linkedin.com" },
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    isFeatured: true,
    order: 1,
  },
  {
    _id: "member-elena-vasquez",
    name: "Elena Vasquez",
    slug: "elena-vasquez",
    title: "Creative Director",
    mantra: "Good design is invisible. Great design is unforgettable.",
    characterMetaphor: "The Conductor — she doesn't play every instrument, but the orchestra wouldn't sound right without her.",
    bio: "Elena leads creative across every Sageworx engagement, from identity systems to immersive digital experiences. Before joining the collective, she was a senior designer at Pentagram and art directed campaigns for Nike, Spotify, and The New York Times. Her work has been recognized by D&AD, Communication Arts, and the Type Directors Club. She believes constraints are gifts and that the best creative work comes from understanding people, not just pixels.",
    favoriteTools: "Figma, After Effects, Procreate, Pen & Ink",
    link: { label: "Portfolio", url: "https://dribbble.com" },
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    isFeatured: true,
    order: 2,
  },
  {
    _id: "member-james-okafor",
    name: "James Okafor",
    slug: "james-okafor",
    title: "Head of Engineering",
    mantra: "Ship it, measure it, improve it. Perfection is the enemy of progress.",
    characterMetaphor: "The Bridge Builder — connects the island of design intent to the mainland of production reality.",
    bio: "James oversees all technical execution at Sageworx, from performant web applications to complex CMS architectures and data pipelines. He spent a decade at Google and Vercel before going independent, drawn to the challenge of making beautifully designed things actually work at scale. He's a core contributor to several open-source projects and speaks regularly at Next.js Conf and Jamstack Conf. His teams consistently ship on time because he plans for what can go wrong, not just what should go right.",
    favoriteTools: "Next.js, TypeScript, Vercel, Linear, Neovim",
    link: { label: "GitHub", url: "https://github.com" },
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    isFeatured: true,
    order: 3,
  },
  {
    _id: "member-sofia-chen",
    name: "Sofia Chen",
    slug: "sofia-chen",
    title: "Director of Experience Design",
    mantra: "Every interaction is a conversation. Make sure you're saying something worth hearing.",
    characterMetaphor: "The Translator — turns complex business logic into experiences that feel effortless.",
    bio: "Sofia designs the end-to-end experience layer for Sageworx clients, from research and journey mapping to interaction design and usability testing. She previously led UX at Airbnb's Luxe division and ran her own consultancy focused on healthcare and fintech. She holds a Master's in Human-Computer Interaction from Carnegie Mellon and is a certified accessibility specialist. Sofia is relentless about user research — she says you can't design for people you haven't listened to.",
    favoriteTools: "Figma, Maze, Dovetail, Optimal Workshop",
    link: { label: "LinkedIn", url: "https://linkedin.com" },
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    isFeatured: true,
    order: 4,
  },
  {
    _id: "member-david-kim",
    name: "David Kim",
    slug: "david-kim",
    title: "Growth & Analytics Lead",
    mantra: "Data tells you what happened. Insight tells you what to do next.",
    characterMetaphor: "The Cartographer — maps the terrain so the expedition knows where it's going.",
    bio: "David runs growth strategy and analytics for the collective, turning raw data into actionable roadmaps. He built and sold a marketing analytics startup before joining Sageworx, and spent time at HubSpot leading their enterprise analytics team. He's obsessed with attribution modeling, cohort analysis, and finding the one metric that actually matters for each client. David holds a PhD in Applied Mathematics from MIT, which he insists is 'just pattern recognition with extra steps.'",
    favoriteTools: "Mixpanel, Looker, Python, dbt, Google Sheets",
    link: { label: "LinkedIn", url: "https://linkedin.com" },
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    isFeatured: true,
    order: 5,
  },
  {
    _id: "member-aria-thompson",
    name: "Aria Thompson",
    slug: "aria-thompson",
    title: "Content & Brand Strategist",
    mantra: "Words are the cheapest and most powerful tool in your arsenal. Use them wisely.",
    characterMetaphor: "The Storyteller — finds the narrative thread that ties everything together and makes people care.",
    bio: "Aria shapes voice, messaging, and narrative strategy for Sageworx clients. She spent years as a journalist at The Atlantic and Wired before moving into brand strategy at Ogilvy. She's written brand platforms for startups and Fortune 500s alike, and she approaches every project the same way: by listening first. Aria believes the best brand strategy doesn't sound like marketing — it sounds like truth. She's also a published novelist and teaches a masterclass on storytelling for business.",
    favoriteTools: "iA Writer, Notion, ChatGPT, Hemingway Editor",
    link: { label: "Writing", url: "https://medium.com" },
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    isFeatured: true,
    order: 6,
  },
  {
    _id: "member-rafael-santos",
    name: "Rafael Santos",
    slug: "rafael-santos",
    title: "Motion & 3D Director",
    mantra: "Movement is meaning. Every animation should earn its place.",
    characterMetaphor: "The Choreographer — every element knows its entrance, its moment, and its exit.",
    bio: "Rafael brings interfaces and brand experiences to life through motion design, 3D visualization, and interactive storytelling. He trained as an architect in São Paulo before pivoting to motion design, working on campaigns for Apple, Mercedes-Benz, and Netflix. At Sageworx, he bridges the gap between static design and living, breathing digital experiences. His work has won multiple Awwwards and FWA awards. Rafael believes that animation isn't decoration — it's communication.",
    favoriteTools: "After Effects, Blender, Three.js, GSAP, Framer Motion",
    link: { label: "Showreel", url: "https://vimeo.com" },
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    isFeatured: true,
    order: 7,
  },
  {
    _id: "member-maya-patel",
    name: "Maya Patel",
    slug: "maya-patel",
    title: "Operations & Client Success",
    mantra: "The best process is the one nobody notices because everything just works.",
    characterMetaphor: "The Air Traffic Controller — keeps every project on course, on time, and incident-free.",
    bio: "Maya runs operations and client relationships for the collective, making sure the right people are on the right projects and everything ships when it should. She spent a decade in management consulting at McKinsey before deciding she'd rather build things than advise on them. She designed Sageworx's project methodology from scratch — a hybrid of agile and traditional delivery that adapts to each client's pace. Maya holds a PMP certification and an MBA from Wharton, but says her real superpower is a spreadsheet.",
    favoriteTools: "Linear, Notion, Slack, Loom, Google Sheets",
    link: { label: "LinkedIn", url: "https://linkedin.com" },
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    isFeatured: true,
    order: 8,
  },
];

// ─── Gallery Members (lighter profiles, still with photos) ──────────────────

const galleryMembers = [
  {
    _id: "member-alex-rivera",
    name: "Alex Rivera",
    slug: "alex-rivera",
    title: "Senior Developer",
    mantra: "Clean code is kind code.",
    bio: "Full-stack engineer specializing in React, Node, and cloud infrastructure. Previously at Stripe.",
    favoriteTools: "VS Code, TypeScript, AWS, Docker",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
    isFeatured: false,
    order: 9,
  },
  {
    _id: "member-priya-sharma",
    name: "Priya Sharma",
    slug: "priya-sharma",
    title: "Visual Designer",
    mantra: "Details are not details — they make the design.",
    bio: "Multidisciplinary designer with a focus on identity systems and editorial design. RISD alum.",
    favoriteTools: "Figma, Illustrator, Blender",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    isFeatured: false,
    order: 10,
  },
  {
    _id: "member-connor-wright",
    name: "Connor Wright",
    slug: "connor-wright",
    title: "SEO & Performance Lead",
    mantra: "If they can't find it, it doesn't exist.",
    bio: "Technical SEO specialist who's grown organic traffic 10x for multiple SaaS companies.",
    favoriteTools: "Ahrefs, Screaming Frog, Google Search Console",
    photoUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&q=80",
    isFeatured: false,
    order: 11,
  },
  {
    _id: "member-zara-mitchell",
    name: "Zara Mitchell",
    slug: "zara-mitchell",
    title: "Copywriter",
    mantra: "Say it once. Say it right.",
    bio: "Brand copywriter and naming specialist. Former journalist turned creative, with clients including Patagonia and Mailchimp.",
    favoriteTools: "iA Writer, Grammarly, Thesaurus.com",
    photoUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    isFeatured: false,
    order: 12,
  },
  {
    _id: "member-omar-hassan",
    name: "Omar Hassan",
    slug: "omar-hassan",
    title: "DevOps Engineer",
    mantra: "Automate everything you do more than twice.",
    bio: "Cloud infrastructure and CI/CD specialist. Keeps the lights on and the deploys smooth.",
    favoriteTools: "Terraform, GitHub Actions, Datadog, Kubernetes",
    photoUrl: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=800&q=80",
    isFeatured: false,
    order: 13,
  },
  {
    _id: "member-lily-nguyen",
    name: "Lily Nguyen",
    slug: "lily-nguyen",
    title: "UX Researcher",
    mantra: "Listen harder than you talk.",
    bio: "Mixed-methods researcher who turns user insights into product direction. Previously at Meta and IDEO.",
    favoriteTools: "Dovetail, Maze, UserTesting, Miro",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    isFeatured: false,
    order: 14,
  },
  {
    _id: "member-ethan-cole",
    name: "Ethan Cole",
    slug: "ethan-cole",
    title: "Illustrator & Visual Artist",
    mantra: "Every brand deserves a face, not just a logo.",
    bio: "Editorial and brand illustrator whose work has appeared in The New Yorker and Bloomberg Businessweek.",
    favoriteTools: "Procreate, Photoshop, Pen & Ink",
    photoUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&q=80",
    isFeatured: false,
    order: 15,
  },
  {
    _id: "member-nadia-cruz",
    name: "Nadia Cruz",
    slug: "nadia-cruz",
    title: "Social & Community Strategist",
    mantra: "Brands don't build communities. People do.",
    bio: "Social media strategist who builds engaged audiences from scratch. Grew three brands past 1M followers.",
    favoriteTools: "Sprout Social, Canva, CapCut, Buffer",
    photoUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&q=80",
    isFeatured: false,
    order: 16,
  },
  {
    _id: "member-theo-park",
    name: "Theo Park",
    slug: "theo-park",
    title: "Frontend Engineer",
    mantra: "Performance is a feature.",
    bio: "Specializes in animation-heavy, accessible React applications. Next.js enthusiast and open-source contributor.",
    favoriteTools: "Next.js, Framer Motion, Tailwind, Storybook",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
    isFeatured: false,
    order: 17,
  },
  {
    _id: "member-isabella-reed",
    name: "Isabella Reed",
    slug: "isabella-reed",
    title: "Video Producer",
    mantra: "The first three seconds decide everything.",
    bio: "Video producer and director specializing in brand films, product launches, and documentary-style content.",
    favoriteTools: "Premiere Pro, DaVinci Resolve, Frame.io",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    isFeatured: false,
    order: 18,
  },
  {
    _id: "member-kai-tanaka",
    name: "Kai Tanaka",
    slug: "kai-tanaka",
    title: "Sound Designer",
    mantra: "Sound is the invisible layer that makes everything feel real.",
    bio: "Audio branding and sound design specialist. Creates sonic identities, UI sounds, and immersive audio experiences.",
    favoriteTools: "Ableton Live, Pro Tools, Logic Pro",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80",
    isFeatured: false,
    order: 19,
  },
  {
    _id: "member-sarah-blake",
    name: "Sarah Blake",
    slug: "sarah-blake",
    title: "Project Manager",
    mantra: "A good plan today beats a perfect plan tomorrow.",
    bio: "Agile project manager who keeps complex, multi-team engagements running smoothly. Certified Scrum Master.",
    favoriteTools: "Linear, Notion, Slack, Loom",
    photoUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
    isFeatured: false,
    order: 20,
  },
];

const allMembers = [...featuredMembers, ...galleryMembers];

async function seed() {
  console.log(`=== Seeding ${allMembers.length} members ===\n`);

  for (const member of allMembers) {
    console.log(`[${member.name}] (${member.isFeatured ? "FEATURED" : "gallery"})`);
    try {
      // Upload portrait
      let photo = undefined;
      if (member.photoUrl) {
        photo = await uploadImageFromUrl(
          member.photoUrl,
          member.slug + "-portrait"
        );
      }

      // Build document
      const doc = {
        _id: member._id,
        _type: "member",
        name: member.name,
        slug: { _type: "slug", current: member.slug },
        title: member.title,
        isFeatured: member.isFeatured,
        order: member.order,
      };

      if (member.mantra) doc.mantra = member.mantra;
      if (member.characterMetaphor) doc.characterMetaphor = member.characterMetaphor;
      if (member.bio) doc.bio = member.bio;
      if (member.favoriteTools) doc.favoriteTools = member.favoriteTools;
      if (member.link) doc.link = member.link;
      if (photo) doc.photo = photo;

      await client.createOrReplace(doc);
      console.log(`  -> Done\n`);
    } catch (err) {
      console.error(`  -> FAILED: ${err.message}\n`);
    }
  }

  console.log("=== Member seed complete! ===");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

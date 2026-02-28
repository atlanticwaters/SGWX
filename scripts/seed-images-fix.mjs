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
  if (!res.ok) throw new Error(`Failed: ${res.status} - ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    contentType: res.headers.get("content-type") || "image/jpeg",
    filename: `${filename}.jpg`,
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

// Fixed URLs for the 4 that failed
const fixes = [
  {
    _id: "cs-polestar-launch",
    thumb: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1400&q=80", alt: "EV charging" },
      { url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0abb?w=1400&q=80", alt: "Road driving" },
      { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80", alt: "Car design" },
      { url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=80", alt: "Vehicle exterior" },
      { url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80", alt: "Luxury automotive" },
    ],
  },
  {
    _id: "cs-nike-community",
    thumb: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80", alt: "Group fitness" },
      { url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=80", alt: "Training" },
      { url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1400&q=80", alt: "Running community" },
      { url: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=1400&q=80", alt: "Event activation" },
      { url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=80", alt: "Workout session" },
    ],
  },
  {
    _id: "cs-mindstrong-summit",
    thumb: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&q=80", alt: "Team gathering" },
      { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=80", alt: "Conference" },
      { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80", alt: "Event space" },
      { url: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1400&q=80", alt: "Networking" },
      { url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80", alt: "Team collaboration" },
    ],
  },
  {
    _id: "cs-julabo-campaign",
    thumb: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=80", alt: "Lab equipment" },
      { url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1400&q=80", alt: "Scientific precision" },
      { url: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1400&q=80", alt: "Cinematic production" },
      { url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&q=80", alt: "Video production" },
      { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80", alt: "Technology detail" },
    ],
  },
];

async function seed() {
  console.log(`=== Fixing images for ${fixes.length} case studies ===\n`);

  for (const cs of fixes) {
    console.log(`[${cs._id}]`);
    try {
      const slug = cs._id.replace("cs-", "");
      const thumbnail = await uploadImageFromUrl(cs.thumb, `${slug}-thumb`);
      const heroImage = await uploadImageFromUrl(cs.hero, `${slug}-hero`);

      const galleryImages = [];
      for (let i = 0; i < cs.gallery.length; i++) {
        const gi = cs.gallery[i];
        const img = await uploadImageFromUrl(gi.url, `${slug}-gallery-${i}`);
        galleryImages.push({
          _type: "image",
          _key: `gallery-${i}`,
          asset: img.asset,
          alt: gi.alt,
        });
      }

      await client
        .patch(cs._id)
        .set({ thumbnail, heroImage, galleryImages })
        .commit();

      console.log(`  -> Done (${galleryImages.length} gallery images)\n`);
    } catch (err) {
      console.error(`  -> FAILED: ${err.message}\n`);
    }
  }

  console.log("=== Fix complete! ===");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

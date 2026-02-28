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

// Each entry: case study _id, thumbnail URL, hero URL, gallery URLs
const imageData = [
  {
    _id: "cs-polestar-launch",
    thumb: "https://images.unsplash.com/photo-1617886903355-9354e7290a4e?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1617886903355-9354e7290a4e?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1400&q=80", alt: "EV charging station" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1400&q=80", alt: "Automotive showroom" },
      { url: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1400&q=80", alt: "Vehicle detail" },
      { url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0abb?w=1400&q=80", alt: "Road driving" },
      { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80", alt: "Car design" },
    ],
  },
  {
    _id: "cs-nike-community",
    thumb: "https://images.unsplash.com/photo-1461896836934-bd45ba7b5f53?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1461896836934-bd45ba7b5f53?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1400&q=80", alt: "Runners at sunset" },
      { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80", alt: "Group fitness" },
      { url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=80", alt: "Training session" },
      { url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1400&q=80", alt: "Running community" },
      { url: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=1400&q=80", alt: "Event activation" },
    ],
  },
  {
    _id: "cs-spotify-creators",
    thumb: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1400&q=80", alt: "Recording studio" },
      { url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1400&q=80", alt: "Music production" },
      { url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&q=80", alt: "Concert atmosphere" },
      { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&q=80", alt: "Live performance" },
      { url: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=1400&q=80", alt: "Creator workspace" },
    ],
  },
  {
    _id: "cs-dr-squatch",
    thumb: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=1400&q=80", alt: "Product photography" },
      { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1400&q=80", alt: "Social content" },
      { url: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=1400&q=80", alt: "Influencer campaign" },
      { url: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=1400&q=80", alt: "Brand packaging" },
      { url: "https://images.unsplash.com/photo-1563910295-1deaa6dca83d?w=1400&q=80", alt: "Limited drop" },
    ],
  },
  {
    _id: "cs-mindstrong-summit",
    thumb: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&q=80", alt: "Team gathering" },
      { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=80", alt: "Conference setup" },
      { url: "https://images.unsplash.com/photo-1587825140708-dfaf18c4abba?w=1400&q=80", alt: "Workshop session" },
      { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80", alt: "Event space" },
      { url: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1400&q=80", alt: "Networking" },
    ],
  },
  {
    _id: "cs-airbnb-experiences",
    thumb: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1400&q=80", alt: "Travel experience" },
      { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80", alt: "Nature exploration" },
      { url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&q=80", alt: "Local guide" },
      { url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1400&q=80", alt: "Outdoor adventure" },
      { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=80", alt: "Unique stays" },
    ],
  },
  {
    _id: "cs-google-ai-studio",
    thumb: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80", alt: "Code on screen" },
      { url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1400&q=80", alt: "Developer workspace" },
      { url: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1400&q=80", alt: "AI visualization" },
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80", alt: "Data dashboard" },
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80", alt: "Hackathon event" },
    ],
  },
  {
    _id: "cs-julabo-campaign",
    thumb: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=80", alt: "Laboratory equipment" },
      { url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1400&q=80", alt: "Scientific precision" },
      { url: "https://images.unsplash.com/photo-1582719471384-894fbb16f159?w=1400&q=80", alt: "Research facility" },
      { url: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1400&q=80", alt: "Cinematic production" },
      { url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&q=80", alt: "Video production" },
    ],
  },
  {
    _id: "cs-edtech-platform",
    thumb: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1400&q=80", alt: "Classroom tech" },
      { url: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1400&q=80", alt: "Students learning" },
      { url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1400&q=80", alt: "Digital learning" },
      { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80", alt: "Education tools" },
      { url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1400&q=80", alt: "Graduation" },
    ],
  },
  {
    _id: "cs-retail-activation",
    thumb: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1400&q=80", alt: "Retail storefront" },
      { url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&q=80", alt: "Shopping experience" },
      { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80", alt: "Pop-up concept" },
      { url: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1400&q=80", alt: "Store interior" },
      { url: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=1400&q=80", alt: "Brand activation" },
    ],
  },
];

async function seed() {
  console.log(`=== Seeding images for ${imageData.length} case studies ===\n`);

  for (const cs of imageData) {
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

  console.log("=== Image seed complete! ===");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

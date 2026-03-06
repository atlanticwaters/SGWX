import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    // Map document types to the paths they affect
    const paths = getPathsForType(body._type, body.slug?.current);

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      paths,
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}

function getPathsForType(type: string, slug?: string): string[] {
  switch (type) {
    // Singletons — each controls one page
    case "homepage":
      return ["/"];
    case "modelPage":
      return ["/model"];
    case "processPage":
      return ["/process"];
    case "membersPage":
      return ["/members"];
    case "workPage":
      return ["/work"];
    case "spotlightsPage":
      return ["/spotlights"];
    case "styleGuidePage":
      return ["/style-guide"];
    case "animationsPage":
      return ["/animations"];
    case "siteSettings":
      // Settings affect the layout (header/footer) on every page
      return ["/"];

    // Collection documents — revalidate their listing + detail page
    case "caseStudy":
      return slug ? ["/work", `/work/${slug}`, "/"] : ["/work", "/"];
    case "blogPost":
      return slug ? ["/spotlights", `/spotlights/${slug}`, "/"] : ["/spotlights", "/"];
    case "member":
      return slug ? ["/members", `/members/${slug}`] : ["/members"];
    case "landingPage":
      return slug ? ["/landing-pages", `/${slug}`] : ["/landing-pages"];

    // Shared content that can appear on multiple pages
    case "sectionBackground":
      return ["/", "/work", "/model", "/process", "/members", "/spotlights"];
    case "testimonial":
      return ["/"];
    case "service":
      return ["/model"];

    default:
      // Unknown type — revalidate homepage as a safe default
      return ["/"];
  }
}

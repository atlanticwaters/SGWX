import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface FeaturedMember {
  name: string;
  slug: string;
  title: string;
  mantra: string;
  bio: string;
  favoriteTools: string;
  photoUrl?: string;
  link?: { label: string; url: string };
}

interface FeaturedMemberCardProps {
  member: FeaturedMember;
}

export type { FeaturedMember };

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

export default function FeaturedMemberCard({ member }: FeaturedMemberCardProps) {
  return (
    <Card hover className="h-full flex flex-col">
      {/* Photo */}
      <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-xl bg-sgwx-surface">
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.name}
            fill
            className="object-cover"
            style={{ filter: "brightness(0.9) contrast(1.05) saturate(0.85)" }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-bold text-sgwx-text-dim">
              {getInitials(member.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-sgwx-bg/80 via-transparent to-transparent" />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-sgwx-text">{member.name}</h3>

      {/* Title */}
      <p className="mt-1 font-mono text-[12px] tracking-widest uppercase text-sgwx-green">
        {member.title}
      </p>

      {/* Mantra / Quote */}
      <p className="mt-3 flex-1 text-sm italic leading-relaxed text-sgwx-text-muted">
        &ldquo;{member.mantra}&rdquo;
      </p>

      {/* View Profile Button */}
      <div className="mt-4">
        <Button href={`/members/${member.slug}`} variant="secondary" className="w-full text-center">
          View Profile
        </Button>
      </div>
    </Card>
  );
}

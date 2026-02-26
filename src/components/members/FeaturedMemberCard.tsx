import Link from "next/link";
import Card from "@/components/ui/Card";

interface FeaturedMember {
  name: string;
  title: string;
  mantra: string;
  bio: string;
  favoriteTools: string;
  linkText: string;
  linkHref: string;
  initials: string;
}

interface FeaturedMemberCardProps {
  member: FeaturedMember;
}

export type { FeaturedMember };

export default function FeaturedMemberCard({ member }: FeaturedMemberCardProps) {
  return (
    <Card hover className="h-full">
      {/* Photo placeholder */}
      <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-xl bg-sgwx-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-sgwx-bg/80 via-transparent to-transparent" />
        <div className="flex h-full items-center justify-center">
          <span className="text-5xl font-bold text-sgwx-text-dim">
            {member.initials}
          </span>
        </div>
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-sgwx-text">{member.name}</h3>

      {/* Title */}
      <p className="mt-1 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
        {member.title}
      </p>

      {/* Mantra */}
      <p className="mt-4 italic text-sgwx-text-muted">
        &ldquo;{member.mantra}&rdquo;
      </p>

      {/* Bio */}
      <p className="mt-4 text-sm leading-relaxed text-sgwx-text-muted">
        {member.bio}
      </p>

      {/* Favorite Tools */}
      <div className="mt-4">
        <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
          Favorite Tools
        </p>
        <p className="mt-1 text-sm leading-relaxed text-sgwx-text-muted">
          {member.favoriteTools}
        </p>
      </div>

      {/* Link */}
      <Link
        href={member.linkHref}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sgwx-green transition-colors hover:text-sgwx-green-bright"
      >
        {member.linkText}
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </Card>
  );
}

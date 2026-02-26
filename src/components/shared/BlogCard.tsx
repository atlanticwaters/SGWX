import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface BlogCardProps {
  tag: string;
  title: string;
  description: string;
  href: string;
}

export default function BlogCard({ tag, title, description, href }: BlogCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-4 aspect-video rounded-lg bg-sgwx-bg" />
      <Badge variant="neutral">{tag}</Badge>
      <h3 className="mt-3 text-lg font-semibold text-sgwx-text">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-sgwx-text-muted">
        {description}
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sgwx-green transition-colors hover:text-sgwx-green-bright"
      >
        Read More <span aria-hidden="true">&rarr;</span>
      </Link>
    </Card>
  );
}

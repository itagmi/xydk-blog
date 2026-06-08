import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/dev-note/MarkdownContent";
import SitePageShell from "@/components/layout/SitePageShell";
import { getPublishedPostBySlug } from "@/lib/posts";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "500"] });

export const revalidate = 60;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return (
    <SitePageShell maxWidth="680">
      <Link
        href="/development-note"
        className="mb-12 inline-block cursor-pointer text-[11px] uppercase tracking-[0.12em] text-white/30 no-underline transition-colors hover:text-white/60"
      >
        ← Dev Notes
      </Link>

      <header className="mb-12">
        <h1
          className={`${bricolage.className} mb-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-tight tracking-[-0.02em] text-white/90`}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.1em] text-white/25">
            {new Date(post.createdAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.tags.map((t) => (
            <span key={t.id} className="text-[11px] uppercase tracking-[0.1em] text-white/20">
              {t.name}
            </span>
          ))}
        </div>
      </header>

      <MarkdownContent content={post.content} />
    </SitePageShell>
  );
}

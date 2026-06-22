export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminPageShell from "@/components/admin/AdminPageShell";
import MarkdownContent from "@/components/dev-note/MarkdownContent";
import { ButtonLink } from "@/components/ui/Button";

export default async function ViewPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { tags: true },
  });

  if (!post || post.category !== "dev_note") notFound();

  return (
    <AdminPageShell
      title={post.title}
      maxWidth="780"
      titleSize="section"
      actions={
        <>
          {post.published && (
            <ButtonLink
              href={`/development-note/${post.slug}`}
              variant="ghost"
              target="_blank"
            >
              View live
            </ButtonLink>
          )}
          <ButtonLink href={`/admin/posts/${post.id}/edit`} variant="primary">
            Edit
          </ButtonLink>
          <ButtonLink href="/admin" variant="ghost">
            Back
          </ButtonLink>
        </>
      }
    >
      <div className="mb-10 flex flex-wrap items-center gap-4 border-b border-white/[0.06] pb-6">
        <span
          className={`text-[10px] uppercase tracking-[0.1em] ${
            post.published ? "text-white/40" : "text-white/20"
          }`}
        >
          {post.published ? "Live" : "Draft"}
        </span>
        <span className="text-[11px] uppercase tracking-[0.1em] text-white/25">
          {new Date(post.createdAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag.id}
            className="text-[11px] uppercase tracking-[0.1em] text-white/20"
          >
            {tag.name}
          </span>
        ))}
        <span className="text-[11px] uppercase tracking-[0.1em] text-white/20">
          {post.views} views
        </span>
      </div>

      <MarkdownContent content={post.content} />
    </AdminPageShell>
  );
}

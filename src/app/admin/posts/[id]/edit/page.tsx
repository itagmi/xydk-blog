export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePost } from "@/app/actions/posts";
import AdminPageShell from "@/components/admin/AdminPageShell";
import PostEditor from "@/components/dev-note/PostEditor";
import { ButtonLink } from "@/components/ui/Button";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id }, include: { tags: true } });
  if (!post) notFound();

  return (
    <AdminPageShell
      title="Edit Post"
      maxWidth="780"
      titleSize="section"
      actions={
        <ButtonLink href="/admin" variant="ghost">
          Cancel
        </ButtonLink>
      }
    >
      <PostEditor
        action={updatePost.bind(null, post.id)}
        defaultValues={{
          title: post.title,
          content: post.content,
          tags: post.tags.map((t) => t.name).join(", "),
          published: post.published,
        }}
        submitLabel="Update Post"
      />
    </AdminPageShell>
  );
}

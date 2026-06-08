export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { logout } from "@/app/actions/auth";
import { deletePost, togglePublish } from "@/app/actions/posts";
import AdminPageShell from "@/components/admin/AdminPageShell";
import Pagination from "@/components/ui/Pagination";
import { Button, ButtonLink } from "@/components/ui/Button";
import { getPaginationMeta, parsePage } from "@/lib/pagination";
import AdminTabs from "@/components/admin/AdminTabs";

export default async function AdminUiuxPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);

  const total = await prisma.post.count({ where: { category: "ui_ux" } });
  const { totalPages, currentPage, skip, perPage } = getPaginationMeta(total, page);

  const posts = await prisma.post.findMany({
    where: { category: "ui_ux" },
    orderBy: { createdAt: "desc" },
    include: { tags: true },
    skip,
    take: perPage,
  });

  return (
    <AdminPageShell
      title="UI/UX Thought"
      actions={
        <>
          <ButtonLink href="/admin/uiux/posts/new" variant="primary">
            New Post
          </ButtonLink>
          <form action={logout}>
            <Button type="submit" variant="ghost">
              Sign out
            </Button>
          </form>
        </>
      }
    >
      <AdminTabs current="/admin/uiux" />
      {total === 0 ? (
        <p className="text-sm text-white/30">No posts yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-white/[0.06]">
          {posts.map((post) => (
            <li key={post.id} className="flex items-center justify-between gap-4 py-5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] uppercase tracking-[0.1em] ${
                      post.published ? "text-white/40" : "text-white/20"
                    }`}
                  >
                    {post.published ? "Live" : "Draft"}
                  </span>
                  <span className="truncate text-sm text-white/75">{post.title}</span>
                </div>
                {post.tags.length > 0 && (
                  <div className="mt-1 flex gap-2">
                    {post.tags.map((t) => (
                      <span key={t.id} className="text-[10px] uppercase tracking-[0.08em] text-white/25">
                        {t.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <form action={togglePublish.bind(null, post.id, !post.published)}>
                  <Button type="submit" variant="action">
                    {post.published ? "Unpublish" : "Publish"}
                  </Button>
                </form>
                <ButtonLink href={`/admin/uiux/posts/${post.id}/edit`} variant="action">
                  Edit
                </ButtonLink>
                <form action={deletePost.bind(null, post.id)}>
                  <Button type="submit" variant="danger">
                    Delete
                  </Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Pagination basePath="/admin/uiux" currentPage={currentPage} totalPages={totalPages} />
    </AdminPageShell>
  );
}

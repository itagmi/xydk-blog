import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { uiuxHref } from "@/lib/posts";
import { getPaginationMeta, parsePage } from "@/lib/pagination";
import SitePageShell from "@/components/layout/SitePageShell";
import Pagination from "@/components/ui/Pagination";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "500"] });

export const dynamic = "force-dynamic";

export default async function UiuxPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);
  const where = { published: true, category: "ui_ux" };

  const total = await prisma.post.count({ where });
  const { totalPages, currentPage, skip, perPage } = getPaginationMeta(total, page);

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { tags: true },
    skip,
    take: perPage,
  });

  return (
    <SitePageShell>
      <h1
        className={`${bricolage.className} mb-10 text-[clamp(2rem,4vw,3rem)] font-medium leading-tight tracking-[-0.02em] text-white/90`}
      >
        UI/UX Thought
      </h1>

      {total === 0 ? (
        <p className="text-sm text-white/30">Nothing here yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-white/[0.06]">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={uiuxHref(post.slug)}
                className="group flex items-center justify-between gap-4 py-5 no-underline transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-white/75 transition-colors group-hover:text-white/90">
                    {post.title}
                  </span>
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
                <span className="shrink-0 text-[11px] uppercase tracking-[0.1em] text-white/25">
                  {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Pagination basePath="/ui-ux-thought" currentPage={currentPage} totalPages={totalPages} />
    </SitePageShell>
  );
}

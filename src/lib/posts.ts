import { prisma } from "@/lib/prisma";

export function postHref(slug: string) {
  return `/development-note/${encodeURIComponent(slug)}`;
}

export function uiuxHref(slug: string) {
  return `/ui-ux-thought/${encodeURIComponent(slug)}`;
}

export async function getPublishedPostBySlug(slug: string) {
  const decoded = decodeURIComponent(slug);
  return prisma.post.findFirst({
    where: { slug: decoded, published: true, category: "dev_note" },
    include: { tags: true },
  });
}

export async function getPublishedUiuxPostBySlug(slug: string) {
  const decoded = decodeURIComponent(slug);
  return prisma.post.findFirst({
    where: { slug: decoded, published: true, category: "ui_ux" },
    include: { tags: true },
  });
}

export async function incrementViews(slug: string) {
  await prisma.post.updateMany({
    where: { slug: decodeURIComponent(slug), published: true },
    data: { views: { increment: 1 } },
  });
}

export const POSTS_PER_PAGE = 5;

export function parsePage(value: string | undefined): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

export function getPaginationMeta(
  total: number,
  page: number,
  perPage = POSTS_PER_PAGE,
) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const skip = (currentPage - 1) * perPage;

  return { totalPages, currentPage, skip, perPage };
}

export function paginationHref(basePath: string, page: number): string {
  if (page <= 1) return basePath;
  return `${basePath}?page=${page}`;
}

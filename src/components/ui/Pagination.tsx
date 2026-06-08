import { ButtonLink } from "@/components/ui/Button";
import { paginationHref } from "@/lib/pagination";

type PaginationProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

const disabledClass =
  "inline-flex cursor-default items-center justify-center px-3 py-1.5 text-xs uppercase tracking-[0.1em] border border-transparent text-white/10";

export default function Pagination({ basePath, currentPage, totalPages }: PaginationProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between border-t border-white/[0.06] pt-8"
    >
      {hasPrev ? (
        <ButtonLink href={paginationHref(basePath, currentPage - 1)} variant="pagination">
          ← Prev
        </ButtonLink>
      ) : (
        <span aria-disabled="true" className={disabledClass}>
          ← Prev
        </span>
      )}

      <span className="text-[11px] uppercase tracking-[0.1em] text-white/30">
        {currentPage} / {totalPages}
      </span>

      {hasNext ? (
        <ButtonLink href={paginationHref(basePath, currentPage + 1)} variant="pagination">
          Next →
        </ButtonLink>
      ) : (
        <span aria-disabled="true" className={disabledClass}>
          Next →
        </span>
      )}
    </nav>
  );
}

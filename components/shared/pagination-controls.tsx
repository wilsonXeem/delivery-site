import Link from "next/link";
import { cn } from "@/lib/utils";

type PaginationControlsProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
  query?: string;
};

function buildHref(basePath: string, page: number, query?: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page > 1) params.set("page", page.toString());
  const s = params.toString();
  return s ? `${basePath}?${s}` : basePath;
}

export function PaginationControls({ basePath, currentPage, totalPages, query }: PaginationControlsProps) {
  const btn = "inline-flex h-8 items-center rounded-lg border border-line-strong bg-surface px-3 text-xs font-semibold text-foreground transition hover:border-brand/40 hover:text-brand";

  return (
    <div className="flex items-center justify-between border-t border-line pt-4">
      <p className="text-xs text-muted">
        Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
        <span className="font-semibold text-foreground">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <Link
          aria-disabled={currentPage <= 1}
          className={cn(btn, currentPage <= 1 && "pointer-events-none opacity-40")}
          href={buildHref(basePath, Math.max(1, currentPage - 1), query)}
        >
          ← Previous
        </Link>
        <Link
          aria-disabled={currentPage >= totalPages}
          className={cn(btn, currentPage >= totalPages && "pointer-events-none opacity-40")}
          href={buildHref(basePath, Math.min(totalPages, currentPage + 1), query)}
        >
          Next →
        </Link>
      </div>
    </div>
  );
}

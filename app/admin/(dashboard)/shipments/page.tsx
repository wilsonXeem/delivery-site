import Link from "next/link";

import { ShipmentTable } from "@/components/admin/shipment-table";
import { DatabaseUnavailableState } from "@/components/shared/database-unavailable-state";
import { PageHeader } from "@/components/shared/page-header";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { getShipments } from "@/lib/data";

export const dynamic = "force-dynamic";

type ShipmentsPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function ShipmentsPage({ searchParams }: ShipmentsPageProps) {
  const resolved = await searchParams;
  const query = resolved.q?.trim() ?? "";
  const parsedPage = Number(resolved.page ?? "1");
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  try {
    const result = await getShipments({ query, page });

    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Shipments"
          title="Shipment register"
          description="Search and manage all shipments."
          action={
            <Link
              href="/admin/shipments/new"
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold !text-white transition hover:bg-brand-strong active:scale-[0.98]"
            >
              + New shipment
            </Link>
          }
        />

        {/* Search */}
        <form className="flex gap-2">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search by tracking number, title, sender, or receiver…"
            className="h-9 flex-1 rounded-lg border border-line-strong bg-surface px-3 text-sm text-foreground shadow-[var(--shadow-xs)] outline-none placeholder:text-subtle focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
          />
          {page > 1 ? <input name="page" type="hidden" value="1" /> : null}
          <button
            type="submit"
            className="inline-flex h-9 items-center rounded-lg bg-navy px-4 text-sm font-semibold !text-white transition hover:bg-navy-mid"
          >
            Search
          </button>
          {query ? (
            <Link
              href="/admin/shipments"
              className="inline-flex h-9 items-center rounded-lg border border-line-strong bg-surface px-4 text-sm font-semibold text-muted transition hover:text-foreground"
            >
              Clear
            </Link>
          ) : null}
        </form>

        <div className="space-y-4">
          <ShipmentTable shipments={result.shipments} />
          <PaginationControls
            basePath="/admin/shipments"
            currentPage={result.pagination.page}
            query={result.pagination.query}
            totalPages={result.pagination.totalPages}
          />
        </div>
      </div>
    );
  } catch {
    return (
      <DatabaseUnavailableState
        actionHref="/admin/shipments"
        actionLabel="Retry shipment register"
        description="The shipment register cannot load because the database is unavailable. Start MongoDB or update MONGODB_URI in .env.local, then refresh."
        title="Shipment register unavailable"
      />
    );
  }
}

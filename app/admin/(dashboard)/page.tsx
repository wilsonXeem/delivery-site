import Link from "next/link";
import { CheckCircle2, Clock3, Package, Truck } from "lucide-react";

import { ShipmentTable } from "@/components/admin/shipment-table";
import { DatabaseUnavailableState } from "@/components/shared/database-unavailable-state";
import { StatsCard } from "@/components/admin/stats-card";
import { PageHeader } from "@/components/shared/page-header";
import { getDashboardStats } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  try {
    const stats = await getDashboardStats();

    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Dashboard"
          title="Operations overview"
          description="Shipment volume, delivery statuses, and recent activity."
          action={
            <Link
              href="/admin/shipments/new"
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold !text-white transition hover:bg-brand-strong active:scale-[0.98]"
            >
              + New shipment
            </Link>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard icon={Package}      label="Total shipments" tone="slate"  value={stats.totalShipments} />
          <StatsCard icon={Truck}        label="In transit"      tone="blue"   value={stats.inTransit} />
          <StatsCard icon={CheckCircle2} label="Delivered"       tone="green"  value={stats.delivered} />
          <StatsCard icon={Clock3}       label="Pending"         tone="amber"  value={stats.pending} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Recent Activity</p>
              <p className="text-sm font-bold text-foreground">Latest shipments</p>
            </div>
            <Link
              href="/admin/shipments"
              className="text-xs font-semibold text-brand transition hover:text-brand-strong"
            >
              View all →
            </Link>
          </div>
          <ShipmentTable shipments={stats.recentShipments} />
        </div>
      </div>
    );
  } catch {
    return (
      <DatabaseUnavailableState
        actionHref="/admin/login"
        actionLabel="Retry admin access"
        description="The dashboard cannot load because the database is unavailable. Start MongoDB or update MONGODB_URI in .env.local, then refresh."
        title="Dashboard unavailable"
      />
    );
  }
}

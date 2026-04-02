import Link from "next/link";
import { AlertTriangle, ArrowLeft, CalendarDays, MapPin, Package, ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/public/site-header";
import { Card } from "@/components/shared/card";
import { DatabaseUnavailableState } from "@/components/shared/database-unavailable-state";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Timeline } from "@/components/shared/timeline";
import { getShipmentByTrackingNumber } from "@/lib/data";
import { formatDate, formatDateTime, normalizeTrackingNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

type TrackPageProps = {
  params: Promise<{ trackingNumber: string }>;
};

export default async function TrackingPage({ params }: TrackPageProps) {
  const { trackingNumber } = await params;
  let shipment = null;
  let databaseUnavailable = false;

  try {
    shipment = await getShipmentByTrackingNumber(trackingNumber);
  } catch {
    databaseUnavailable = true;
  }

  const normalized = normalizeTrackingNumber(trackingNumber);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tracking
        </Link>

        {databaseUnavailable ? (
          <div className="mt-6">
            <DatabaseUnavailableState
              actionHref="/"
              actionLabel="Back to homepage"
              description="Tracking is temporarily unavailable because the shipment database cannot be reached. Start MongoDB or update MONGODB_URI, then try again."
              title="Tracking temporarily unavailable"
            />
          </div>
        ) : !shipment ? (
          <div className="mt-6">
            <EmptyState
              icon={<AlertTriangle className="h-5 w-5" />}
              title="Tracking number not found"
              description={`No shipment found for ${normalized}. Check the number and try again.`}
              action={
                <Link
                  href="/"
                  className="inline-flex h-9 items-center rounded-lg bg-brand px-4 text-sm font-semibold !text-white transition hover:bg-brand-strong"
                >
                  Try another number
                </Link>
              }
            />
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {/* Status bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface px-5 py-4 shadow-[var(--shadow-sm)]">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={shipment.currentStatus} />
                <span className="text-sm font-bold text-foreground">{shipment.title}</span>
              </div>
              <span className="tracking-num text-sm text-muted">{shipment.trackingNumber}</span>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
              {/* Main info */}
              <div className="space-y-5">
                {/* Current state */}
                <Card className="overflow-hidden">
                  <div className="border-b border-line bg-slate-50/80 px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Current Status</p>
                  </div>
                  <div className="grid gap-px bg-line sm:grid-cols-2">
                    <div className="bg-surface px-5 py-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                        <MapPin className="h-3 w-3 text-brand" />
                        Current Location
                      </div>
                      <p className="mt-2 text-base font-bold text-foreground">{shipment.currentLocation}</p>
                    </div>
                    <div className="bg-surface px-5 py-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                        <CalendarDays className="h-3 w-3 text-brand" />
                        Estimated Delivery
                      </div>
                      <p className="mt-2 text-base font-bold text-foreground">
                        {shipment.estimatedDeliveryDate ? formatDate(shipment.estimatedDeliveryDate) : "Not available"}
                      </p>
                    </div>
                    <div className="bg-surface px-5 py-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                        <Package className="h-3 w-3 text-brand" />
                        Origin
                      </div>
                      <p className="mt-2 text-sm font-semibold text-foreground">{shipment.origin}</p>
                    </div>
                    <div className="bg-surface px-5 py-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                        <ArrowRight className="h-3 w-3 text-brand" />
                        Destination
                      </div>
                      <p className="mt-2 text-sm font-semibold text-foreground">{shipment.destination}</p>
                    </div>
                  </div>
                </Card>

                {/* Timeline */}
                <Timeline items={shipment.history} />
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Shipment summary */}
                <div className="nav-grid rounded-xl border border-white/6 bg-navy p-5 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Shipment Summary</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Sender</p>
                      <p className="mt-1 text-sm font-semibold text-white">{shipment.senderName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Receiver</p>
                      <p className="mt-1 text-sm font-semibold text-white">{shipment.receiverName}</p>
                    </div>
                    <div className="border-t border-white/8 pt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Tracking Number</p>
                      <p className="tracking-num mt-1 text-sm text-white/80">{shipment.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Created</p>
                      <p className="tracking-num mt-1 text-xs text-white/50">{formatDateTime(shipment.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Help */}
                <div className="rounded-xl border border-line bg-surface p-4">
                  <p className="text-xs font-bold text-foreground">Need help?</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    If your shipment hasn&apos;t updated in over 48 hours, contact the sender or your logistics provider with
                    your tracking number.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

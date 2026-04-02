import { notFound } from "next/navigation";

import { CopyButton } from "@/components/shared/copy-button";
import { Card } from "@/components/shared/card";
import { DatabaseUnavailableState } from "@/components/shared/database-unavailable-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Timeline } from "@/components/shared/timeline";
import { ShipmentMetadataForm } from "@/components/forms/shipment-metadata-form";
import { TrackingUpdateForm } from "@/components/forms/tracking-update-form";
import { getShipmentById } from "@/lib/data";
import { formatDate, formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

type ShipmentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ShipmentDetailPage({ params }: ShipmentDetailPageProps) {
  const { id } = await params;
  let shipment = null;

  try {
    shipment = await getShipmentById(id);
  } catch {
    return (
      <DatabaseUnavailableState
        actionHref="/admin/shipments"
        actionLabel="Back to shipments"
        description="Shipment details cannot load because the database is unavailable. Start MongoDB or update MONGODB_URI in .env.local, then refresh."
        title="Shipment detail unavailable"
      />
    );
  }

  if (!shipment) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Shipment Detail"
        title={shipment.title}
        description="Manage metadata, post tracking updates, and review the full event history."
        action={<CopyButton value={shipment.trackingNumber} label={shipment.trackingNumber} className="tracking-num" />}
      />

      {/* Overview card */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-line bg-slate-50/80 px-5 py-3.5">
          <StatusBadge status={shipment.currentStatus} />
          <span className="tracking-num text-sm text-muted">{shipment.trackingNumber}</span>
        </div>
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Sender",             value: shipment.senderName },
            { label: "Receiver",           value: shipment.receiverName },
            { label: "Origin",             value: shipment.origin },
            { label: "Destination",        value: shipment.destination },
            { label: "Current Location",   value: shipment.currentLocation },
            { label: "Est. Delivery",      value: shipment.estimatedDeliveryDate ? formatDate(shipment.estimatedDeliveryDate) : "—" },
            { label: "Created",            value: formatDateTime(shipment.createdAt) },
            { label: "Last Updated",       value: formatDateTime(shipment.updatedAt) },
          ].map((item) => (
            <div key={item.label} className="bg-surface px-4 py-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Forms */}
      <div className="grid gap-5 xl:grid-cols-2">
        <ShipmentMetadataForm shipment={shipment} />
        <TrackingUpdateForm shipment={shipment} />
      </div>

      {/* Timeline */}
      <Timeline items={shipment.history} />
    </div>
  );
}

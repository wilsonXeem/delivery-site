import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CopyButton } from "@/components/shared/copy-button";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDateTime } from "@/lib/utils";
import type { ShipmentRecord } from "@/types";

type ShipmentTableProps = {
  shipments: ShipmentRecord[];
};

export function ShipmentTable({ shipments }: ShipmentTableProps) {
  if (!shipments.length) {
    return (
      <EmptyState
        title="No shipments found"
        description="Create a shipment to start generating live tracking pages for customers."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow)]">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-line bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-muted">Shipment</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-muted">Status</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-muted">Route</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-muted">Receiver</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-muted">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="group transition-colors hover:bg-slate-50/60">
                <td className="px-4 py-3.5">
                  <p className="font-semibold text-foreground">{shipment.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="tracking-num text-muted">{shipment.trackingNumber}</span>
                    <CopyButton value={shipment.trackingNumber} />
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={shipment.currentStatus} />
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm font-medium text-foreground">{shipment.currentLocation}</p>
                  <p className="text-xs text-muted">{shipment.origin} → {shipment.destination}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm font-medium text-foreground">{shipment.receiverName}</p>
                  {shipment.receiverContact ? (
                    <p className="text-xs text-muted">{shipment.receiverContact}</p>
                  ) : null}
                </td>
                <td className="px-4 py-3.5">
                  <span className="tracking-num text-xs text-muted">{formatDateTime(shipment.updatedAt)}</span>
                </td>
                <td className="px-4 py-3.5">
                  <Link
                    href={`/admin/shipments/${shipment.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-white px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand-text"
                  >
                    Manage
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

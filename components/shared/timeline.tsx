import { MapPin } from "lucide-react";
import { Card } from "@/components/shared/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDateTime } from "@/lib/utils";
import type { TrackingEvent } from "@/types";

type TimelineProps = {
  items: TrackingEvent[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <Card className="overflow-hidden">
      {/* header */}
      <div className="border-b border-line bg-slate-50/80 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-brand" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Tracking History</span>
          <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-muted">
            {items.length} event{items.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="divide-y divide-line">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4 px-5 py-4">
            {/* node */}
            <div className="flex flex-col items-center pt-0.5">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                  index === 0
                    ? "border-brand bg-brand text-white"
                    : "border-line-strong bg-white text-subtle"
                }`}
              >
                {index === 0 ? (
                  <MapPin className="h-3 w-3" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                )}
              </div>
              {index < items.length - 1 ? (
                <div className="mt-1 w-px flex-1 bg-line-strong" style={{ minHeight: "1.5rem" }} />
              ) : null}
            </div>

            {/* content */}
            <div className={`flex flex-1 flex-wrap items-start justify-between gap-2 ${index < items.length - 1 ? "pb-2" : ""}`}>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={item.status} />
                  <span className="text-sm font-semibold text-foreground">{item.location}</span>
                </div>
                {item.note ? (
                  <p className="text-xs text-muted">&ldquo;{item.note}&rdquo;</p>
                ) : null}
              </div>
              <p className="tracking-num shrink-0 text-xs text-muted">{formatDateTime(item.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

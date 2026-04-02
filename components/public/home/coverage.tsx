import { Building2, MapPinned, Network, Route } from "lucide-react";

import { Card } from "@/components/shared/card";
import { SectionHeading } from "@/components/public/home/section-heading";

const coveragePoints = [
  "International delivery support across major commercial and trade corridors",
  "Cross-border operations coordinated through structured logistics touchpoints",
  "A connected shipment network designed for clarity from origin through customs and final delivery",
];

export function Coverage() {
  return (
    <section className="border-y border-line bg-[#f7f9fc]">
      <div className="mx-auto w-full max-w-7xl px-6 py-18 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-6">
            <SectionHeading
              description="Cargo Trace System supports international delivery coverage with cross-border execution and connected shipment oversight."
              eyebrow="Coverage"
              title="A logistics network built for broad visibility and dependable movement"
            />

            <div className="space-y-4">
              {coveragePoints.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand" />
                  <p className="text-base leading-7 text-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden bg-white p-6 md:p-8">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Building2, label: "International hubs" },
                  { icon: Route, label: "Cross-border routes" },
                  { icon: MapPinned, label: "Last-mile visibility" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="rounded-2xl border border-line bg-slate-50 p-4 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-foreground">{item.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="relative rounded-3xl border border-line bg-[linear-gradient(180deg,#f8fbff_0%,#eef4f8_100%)] p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(13,27,46,0.06),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(224,123,0,0.08),transparent_26%)]" />
                <div className="relative">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
                      <Network className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Logistics network view</p>
                      <p className="text-sm text-muted">Map placeholder for international and regional routing visibility</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {["Americas", "EMEA", "APAC"].map((region) => (
                      <div key={region} className="rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-xs)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{region}</p>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-success" />
                            <span className="text-sm font-medium text-foreground">International operations active</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-100">
                            <div className="h-1.5 rounded-full bg-brand" style={{ width: "72%" }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

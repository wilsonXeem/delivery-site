import { Boxes, Building2, MapPinned, ShieldCheck } from "lucide-react";

import { Card } from "@/components/shared/card";
import { SectionHeading } from "@/components/public/home/section-heading";

const aboutSignals = [
  "Structured shipment oversight from registration to final delivery",
  "Professional operations built around transparent milestone updates",
  "Dependable tracking visibility for customers, support teams, and business accounts",
];

export function AboutSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-18 md:px-8" id="about">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Card className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fc_100%)] p-8 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(13,27,46,0.07),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(224,123,0,0.08),transparent_22%)]" />
          <div className="relative space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-xs)]">
                <Boxes className="h-5 w-5 text-brand" />
                <p className="mt-4 text-sm font-semibold text-foreground">Registered Shipments</p>
                <p className="mt-1 text-sm leading-6 text-muted">Every package enters a controlled operational workflow.</p>
              </div>
              <div className="rounded-2xl border border-line bg-navy p-5 text-white shadow-[var(--shadow-xs)]">
                <MapPinned className="h-5 w-5 text-brand" />
                <p className="mt-4 text-sm font-semibold">Live Route Visibility</p>
                <p className="mt-1 text-sm leading-6 text-white/65">Cross-border handoffs and last-mile progress remain visible.</p>
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-xs)] sm:grid-cols-3">
              {[
                { icon: Building2, label: "Business accounts" },
                { icon: ShieldCheck, label: "Secure operations" },
                { icon: MapPinned, label: "Coverage network" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="rounded-2xl bg-slate-50 p-4 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <SectionHeading
            description="Cargo Trace System is a logistics and delivery tracking platform designed to give customers and operations teams a shared, reliable view of shipment progress. We prioritize clean communication, accurate milestones, and professional delivery visibility at every stage."
            eyebrow="About"
            title="Who We Are"
          />

          <div className="space-y-4">
            {aboutSignals.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand" />
                <p className="text-base leading-7 text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Activity, CheckCircle2, ShieldCheck, Truck } from "lucide-react";

import { Card } from "@/components/shared/card";
import { TrackingInput } from "@/components/public/home/tracking-input";

const heroHighlights = [
  "Clear delivery milestones from dispatch to drop-off",
  "Operationally accurate updates customers can trust",
  "Reliable shipment visibility for teams and recipients",
];

const signalChips = [
  { icon: Activity, label: "Real-time updates" },
  { icon: ShieldCheck, label: "Trusted operations" },
  { icon: Truck, label: "International delivery" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-line bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)]"
      id="home"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,27,46,0.07),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(224,123,0,0.08),transparent_20%)]" />
      <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(90deg,rgba(255,255,255,0.9),rgba(255,255,255,0.6))]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 py-16 md:px-8 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-2 shadow-[var(--shadow-xs)]">
              <span className="h-2 w-2 rounded-full bg-success" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-text">Enterprise tracking platform</span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Track Every Delivery with Confidence
              </h1>
              <p className="max-w-2xl text-xl leading-8 text-muted">
                Reliable, real-time shipment tracking for businesses and individuals.
              </p>
              <p className="max-w-2xl text-base leading-8 text-muted">
                Cargo Trace System combines transparent tracking, dependable operations, and clean shipment visibility
                so customers and logistics teams can stay aligned from origin to delivery.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex h-12 items-center justify-center rounded-xl bg-navy px-6 text-sm font-semibold !text-white transition hover:bg-navy-mid"
              href="#track-package"
            >
              Track Package
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-xl border border-line-strong bg-white px-6 text-sm font-semibold text-foreground transition hover:border-brand/30 hover:bg-slate-50"
              href="#contact"
            >
              Contact Us
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {signalChips.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-3 rounded-2xl border border-line bg-white/80 px-4 py-3 shadow-[var(--shadow-xs)]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="relative overflow-hidden border-line-strong bg-white p-6 md:p-8" id="track-package">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-brand/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-navy/10 blur-2xl" />

          <div className="relative space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-text">
                Tracking Console
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Track your shipment instantly</h2>
                <p className="text-sm leading-6 text-muted">
                  Enter your tracking number to view the latest delivery status, current location, and full movement
                  history.
                </p>
              </div>
            </div>

            <TrackingInput
              buttonLabel="Track"
              helperText="Track your shipment in real time"
              inputPlaceholder="Enter Tracking Number"
            />

            <div className="rounded-2xl border border-line bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Shipment format</p>
              <p className="tracking-num mt-2 text-sm font-bold text-foreground">CTS-2026-AB12CD34</p>
            </div>

            <div className="space-y-3">
              {heroHighlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <p className="text-sm leading-6 text-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

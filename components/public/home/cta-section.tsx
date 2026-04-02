import Link from "next/link";

export function CTASection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-18 md:px-8">
      <div className="overflow-hidden rounded-[32px] bg-navy px-6 py-12 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">Get Started</p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              Track Your Shipment with Confidence
            </h2>
            <p className="max-w-2xl text-base leading-8 text-white/70">
              Use Cargo Trace System to follow delivery progress in real time or contact support for shipment assistance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold !text-white transition hover:bg-brand-strong"
              href="#track-package"
            >
              Track Package
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold !text-white transition hover:bg-white/10"
              href="#contact"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

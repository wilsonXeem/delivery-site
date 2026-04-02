import { SectionHeading } from "@/components/public/home/section-heading";

const stats = [
  { value: "5,000+", label: "Shipments Tracked" },
  { value: "250+", label: "Business Clients" },
  { value: "36+", label: "Countries Covered" },
  { value: "99%", label: "Reliability" },
];

export function Stats() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-18 md:px-8">
        <SectionHeading
          align="center"
          description="Performance indicators that reflect delivery visibility, operational consistency, and growing client trust."
          eyebrow="Performance"
          title="Tracking metrics that reinforce operational confidence"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-line bg-[#f8fafc] px-6 py-8 text-center">
              <p className="text-4xl font-bold tracking-tight text-navy md:text-5xl">{stat.value}</p>
              <p className="mt-3 text-sm font-medium text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import {
  Clock3,
  FileClock,
  LockKeyhole,
  Radar,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { Card } from "@/components/shared/card";
import { SectionHeading } from "@/components/public/home/section-heading";

const features = [
  {
    title: "Real-Time Visibility",
    description: "Track current movement and operational status without relying on fragmented updates.",
    icon: Radar,
  },
  {
    title: "Reliable Updates",
    description: "Consistent status changes keep customer-facing information dependable and useful.",
    icon: Clock3,
  },
  {
    title: "Secure Tracking",
    description: "Protected admin workflows and controlled shipment records safeguard operational data.",
    icon: LockKeyhole,
  },
  {
    title: "Professional Support",
    description: "A logistics-first operating model supports business teams and shipment recipients clearly.",
    icon: UsersRound,
  },
  {
    title: "Transparent History",
    description: "Every milestone and shipment note is preserved in a clear, readable timeline.",
    icon: FileClock,
  },
  {
    title: "Trusted Operations",
    description: "Corporate-grade delivery visibility helps reduce follow-up friction and support effort.",
    icon: ShieldCheck,
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#f7f9fc]">
      <div className="mx-auto w-full max-w-7xl px-6 py-18 md:px-8">
        <SectionHeading
          description="Built for organizations and individuals that need shipment information to be clear, timely, and trustworthy."
          eyebrow="Why Choose Us"
          title="A tracking experience designed around trust and operational reliability"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title} className="h-full bg-white p-6">
                <div className="space-y-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm leading-7 text-muted">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

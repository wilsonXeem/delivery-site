import { BadgeCheck, ClipboardList, Map, RefreshCcw } from "lucide-react";

import { Card } from "@/components/shared/card";
import { SectionHeading } from "@/components/public/home/section-heading";

const steps = [
  {
    number: "01",
    title: "Shipment Registered",
    description: "Each package is created in the system with a unique tracking number and operational details.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Transit Updates",
    description: "Location and status events are posted as the shipment moves through the delivery network.",
    icon: RefreshCcw,
  },
  {
    number: "03",
    title: "Track in Real Time",
    description: "Customers can view the latest shipment location, current state, and complete timeline instantly.",
    icon: Map,
  },
  {
    number: "04",
    title: "Delivery Confirmation",
    description: "The final status confirms delivery completion and closes the shipment journey with a clear audit trail.",
    icon: BadgeCheck,
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-18 md:px-8">
        <SectionHeading
          description="A structured tracking workflow keeps shipment updates consistent for both customers and operations teams."
          eyebrow="Process"
          title="How It Works"
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card key={step.number} className="h-full p-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold tracking-tight text-navy">{step.number}</span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm leading-7 text-muted">{step.description}</p>
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

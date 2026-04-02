import {
  Boxes,
  Building2,
  MapPinned,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Card } from "@/components/shared/card";
import { SectionHeading } from "@/components/public/home/section-heading";

const services = [
  {
    title: "Parcel Delivery",
    description: "Managed delivery workflows for personal shipments and time-sensitive package movements.",
    icon: PackageCheck,
  },
  {
    title: "Shipment Tracking",
    description: "Customer-facing tracking pages with current location, live status, and timeline history.",
    icon: MapPinned,
  },
  {
    title: "Business Logistics Support",
    description: "Operational visibility tools for businesses coordinating recurring or high-volume shipments.",
    icon: Building2,
  },
  {
    title: "Dispatch Coordination",
    description: "Structured shipment intake and movement updates for field operations and control teams.",
    icon: Boxes,
  },
  {
    title: "International Delivery",
    description: "Cross-border and multi-country distribution coverage supported by connected delivery routes.",
    icon: Truck,
  },
  {
    title: "Secure Handling",
    description: "Controlled shipment records and dependable update practices for sensitive deliveries.",
    icon: ShieldCheck,
  },
];

export function Services() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-18 md:px-8" id="services">
      <SectionHeading
        description="Core services designed to support individual deliveries, business operations, and shipment visibility requirements."
        eyebrow="Services"
        title="Delivery and logistics services built for operational clarity"
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <Card key={service.title} className="h-full p-6">
              <div className="space-y-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm leading-7 text-muted">{service.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

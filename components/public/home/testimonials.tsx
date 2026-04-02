import { Quote } from "lucide-react";

import { Card } from "@/components/shared/card";
import { SectionHeading } from "@/components/public/home/section-heading";

const testimonials = [
  {
    name: "Amara Okoro",
    role: "Operations Lead, MedRoute Supplies",
    quote:
      "Cargo Trace System reduced delivery follow-ups across our support desk because clients could see accurate movement updates without calling in.",
  },
  {
    name: "Daniel Brooks",
    role: "Procurement Manager, Northline Retail",
    quote:
      "The tracking history is clear, professional, and easy to trust. It gives our teams and our customers the same operational picture.",
  },
  {
    name: "Tina Adesanya",
    role: "Independent Customer",
    quote:
      "I could see when my package was registered, when it moved, and when it was out for delivery. The experience felt reliable from start to finish.",
  },
];

const highlights = ["Reduced delivery follow-ups", "Improved customer visibility"];

export function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-18 md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          description="Businesses and individuals use Cargo Trace System to reduce uncertainty and improve shipment transparency."
          eyebrow="Success Stories"
          title="Trusted by Businesses and Individuals"
        />
        <div className="flex flex-wrap gap-3">
          {highlights.map((item) => (
            <div
              key={item}
              className="inline-flex items-center rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-muted shadow-[var(--shadow-xs)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="h-full p-6">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Quote className="h-5 w-5" />
                </div>
                <p className="text-base leading-8 text-muted">&ldquo;{testimonial.quote}&rdquo;</p>
              </div>
              <div className="border-t border-line pt-5">
                <p className="text-base font-semibold text-foreground">{testimonial.name}</p>
                <p className="mt-1 text-sm text-muted">{testimonial.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/shared/card";
import { SectionHeading } from "@/components/public/home/section-heading";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    question: "How do I track my package?",
    answer:
      "Enter your shipment tracking number in the tracking field on the homepage. You will be redirected to a detailed tracking page showing the current status, location, and shipment history.",
  },
  {
    question: "How often is tracking updated?",
    answer:
      "Tracking is updated whenever a new shipment milestone is posted by operations. The system is designed to surface current movement data as soon as those updates are recorded.",
  },
  {
    question: "What if tracking number is not found?",
    answer:
      "If a tracking number is not found, verify the code and try again. If the issue persists, contact support so the shipment record can be reviewed.",
  },
  {
    question: "Can I contact support?",
    answer:
      "Yes. Businesses and individuals can reach support through the contact information provided in the footer for shipment questions and operational assistance.",
  },
  {
    question: "Do you support business logistics?",
    answer:
      "Yes. Cargo Trace System supports business logistics visibility for organizations that need dependable shipment monitoring and delivery status communication.",
  },
];

export function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string>(faqItems[0]?.question ?? "");

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-18 md:px-8">
      <SectionHeading
        align="center"
        description="Answers to common tracking and logistics support questions."
        eyebrow="FAQ"
        title="Frequently asked questions"
      />

      <div className="mx-auto mt-12 max-w-4xl space-y-4">
        {faqItems.map((item) => {
          const isOpen = openQuestion === item.question;

          return (
            <Card key={item.question} className="overflow-hidden">
              <button
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenQuestion((current) => (current === item.question ? "" : item.question))}
                type="button"
              >
                <span className="text-base font-semibold text-foreground">{item.question}</span>
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-muted transition-transform", isOpen && "rotate-180")}
                />
              </button>
              <div className={cn("grid transition-[grid-template-rows] duration-200", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <div className="border-t border-line px-6 py-5 text-sm leading-7 text-muted">{item.answer}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

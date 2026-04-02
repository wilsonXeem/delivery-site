import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#track-package", label: "Track Package" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
];

const serviceLinks = [
  "Parcel Delivery",
  "Shipment Tracking",
  "Business Logistics Support",
  "Dispatch Coordination",
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white" id="contact">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:px-8 xl:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
        <div className="space-y-4">
          <Logo href="#home" size="lg" />
          <p className="max-w-sm text-sm leading-7 text-muted">
            Professional shipment tracking and logistics visibility for businesses and individuals who need clear,
            dependable delivery updates.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Quick Links</p>
          <div className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <Link key={link.label} className="block text-sm text-muted transition hover:text-foreground" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Services</p>
          <div className="mt-4 space-y-3">
            {serviceLinks.map((service) => (
              <p key={service} className="text-sm text-muted">
                {service}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-muted">
              <p>cargotracesystem@gmail.com</p>
              <p>+447898143646</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Cargo Trace System. All rights reserved.</p>
          <p>Corporate delivery tracking and logistics visibility platform.</p>
        </div>
      </div>
    </footer>
  );
}

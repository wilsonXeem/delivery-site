"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#track-package", label: "Track Package" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

const navLinkClassName =
  "text-sm font-medium text-muted transition hover:text-foreground";

const primaryActionClassName =
  "inline-flex h-10 items-center justify-center rounded-xl bg-navy px-4 text-sm font-semibold !text-white transition hover:bg-navy-mid";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 shadow-[var(--shadow-xs)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-8">
        <Logo href="#home" size="sm" />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} className={navLinkClassName} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link className={primaryActionClassName} href="#track-package">
            Track Now
          </Link>
        </div>

        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong bg-white text-foreground transition hover:bg-slate-50 lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-line bg-white transition-[max-height,opacity] duration-200 lg:hidden",
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 md:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={navLinkClassName}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link className={primaryActionClassName} href="#track-package" onClick={() => setIsOpen(false)}>
              Track Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

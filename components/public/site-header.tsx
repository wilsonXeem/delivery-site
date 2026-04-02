import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3.5 md:px-8">
        <Logo href="/" size="sm" />
        <nav className="flex items-center gap-3">
          <Link
            className="text-sm font-medium text-muted transition hover:text-foreground"
            href="/"
          >
            Track Shipment
          </Link>
        </nav>
      </div>
    </header>
  );
}

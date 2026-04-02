"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, PackagePlus, PackageSearch, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";

import { LogoutButton } from "@/components/admin/logout-button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: ReactNode;
  adminName: string;
};

const navItems = [
  { href: "/admin",                label: "Overview",     icon: LayoutDashboard },
  { href: "/admin/shipments",      label: "Shipments",    icon: PackageSearch },
  { href: "/admin/shipments/new",  label: "New Shipment", icon: PackagePlus },
];

export function AdminShell({ children, adminName }: AdminShellProps) {
  const currentPath = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="nav-grid flex w-64 shrink-0 flex-col border-r border-white/6 bg-navy">
        {/* Logo area */}
        <div className="border-b border-white/6 px-5 py-4">
          <Logo href="/admin" size="md" tone="light" />
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 p-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? currentPath === item.href
                : currentPath === item.href || currentPath.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand text-white"
                    : "text-white/50 hover:bg-white/6 hover:text-white/90",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="mt-auto border-t border-white/6 p-4 space-y-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">Operator</p>
            <p className="mt-1 text-sm font-semibold text-white/80 truncate">{adminName}</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-medium text-white/35 transition hover:text-white/70"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Public tracking site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface/95 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">CTS</span>
            <span className="text-subtle">·</span>
            <span className="text-xs font-medium text-muted">Operations Console</span>
          </div>
          <LogoutButton />
        </header>

        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

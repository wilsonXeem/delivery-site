"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, PackagePlus, PackageSearch, ExternalLink, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LogoutButton } from "@/components/admin/logout-button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: ReactNode;
  adminName: string;
};

const navItems = [
  { href: "/admin",               label: "Overview",     icon: LayoutDashboard },
  { href: "/admin/shipments",     label: "Shipments",    icon: PackageSearch },
  { href: "/admin/shipments/new", label: "New Shipment", icon: PackagePlus },
];

function SidebarContent({ adminName, currentPath, onNav }: { adminName: string; currentPath: string; onNav?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/6 px-5 py-4">
        <Logo href="/admin" tone="light" />
      </div>

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
              onClick={onNav}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-brand text-white" : "text-white/50 hover:bg-white/6 hover:text-white/90",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/6 p-4 space-y-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">Operator</p>
          <p className="mt-1 text-sm font-semibold text-white/80 truncate">{adminName}</p>
        </div>
        <Link
          href="/"
          onClick={onNav}
          className="flex items-center gap-2 text-xs font-medium text-white/35 transition hover:text-white/70"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Public tracking site
        </Link>
      </div>
    </div>
  );
}

export function AdminShell({ children, adminName }: AdminShellProps) {
  const currentPath = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="nav-grid hidden w-64 shrink-0 flex-col border-r border-white/6 bg-navy lg:flex">
        <SidebarContent adminName={adminName} currentPath={currentPath} />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "nav-grid fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-white/6 bg-navy transition-transform duration-200 lg:hidden",
          mobileOpen ? "flex translate-x-0" : "-translate-x-full hidden",
        )}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <SidebarContent adminName={adminName} currentPath={currentPath} onNav={() => setMobileOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface/95 px-4 py-3 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-line-strong bg-white text-foreground transition hover:bg-slate-50 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">CTS</span>
              <span className="text-subtle">·</span>
              <span className="hidden text-xs font-medium text-muted sm:block">Operations Console</span>
            </div>
          </div>
          <LogoutButton />
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

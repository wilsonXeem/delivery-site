import { redirect } from "next/navigation";
import Link from "next/link";

import { AdminLoginForm } from "@/components/forms/admin-login-form";
import { Logo } from "@/components/shared/logo";
import { getServerAuthSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getServerAuthSession();
  if (session?.user?.id) redirect("/admin");

  return (
    <div className="flex min-h-screen">
      {/* Left panel — dark navy brand */}
      <div className="nav-grid hidden flex-col justify-between border-r border-white/6 bg-navy p-10 lg:flex lg:w-[480px] lg:shrink-0">
        <Logo href="/" size="lg" tone="light" />

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Operations Console</p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white">
              Manage every shipment from one secure workspace.
            </h1>
            <p className="text-sm leading-7 text-white/45">
              Create shipments, post live location updates, and keep the public tracking timeline accurate — all behind credential-protected access.
            </p>
          </div>

          <div className="space-y-2">
            {[
              "Credential-protected admin access",
              "Real-time customer-facing updates",
              "Full shipment event history",
              "Searchable shipment register",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-white/45">
                <span className="h-1 w-1 shrink-0 rounded-full bg-brand" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/20">Cargo Trace System · Operations Platform</p>
      </div>

      {/* Right panel — login form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-12">
        <div className="mb-8 lg:hidden">
          <Logo href="/" size="md" />
        </div>
        <div className="w-full max-w-sm">
          <AdminLoginForm />
          <div className="mt-4 text-center">
            <Link className="text-sm font-medium text-muted transition hover:text-foreground" href="/">
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

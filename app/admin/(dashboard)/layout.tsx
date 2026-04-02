import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

type AdminDashboardLayoutProps = {
  children: ReactNode;
};

export default async function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const session = await requireAdminSession();
  const adminName = session.user.name || session.user.email || "Admin";

  return <AdminShell adminName={adminName}>{children}</AdminShell>;
}

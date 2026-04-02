"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
    >
      <LogOut className="h-3.5 w-3.5" />
      Sign out
    </button>
  );
}

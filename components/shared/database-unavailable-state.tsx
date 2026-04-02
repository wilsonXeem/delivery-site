import Link from "next/link";
import { DatabaseZap, RefreshCw } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

type DatabaseUnavailableStateProps = {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function DatabaseUnavailableState({
  title = "Service temporarily unavailable",
  description = "The tracking database is currently unavailable. Start MongoDB or update MONGODB_URI in .env.local, then refresh the page.",
  actionHref = "/",
  actionLabel = "Return home",
}: DatabaseUnavailableStateProps) {
  return (
    <EmptyState
      action={
        <Link
          className="inline-flex h-10 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-strong active:scale-[0.98]"
          href={actionHref}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          {actionLabel}
        </Link>
      }
      description={description}
      icon={<DatabaseZap className="h-5 w-5" />}
      title={title}
    />
  );
}

import Link from "next/link";

import { EmptyState } from "@/components/shared/empty-state";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-10">
      <EmptyState
        action={
          <Link
            className="inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong"
            href="/"
          >
            Return home
          </Link>
        }
        description="The page you requested could not be found. Use the home page to start a new tracking search."
        title="Page not found"
      />
    </main>
  );
}

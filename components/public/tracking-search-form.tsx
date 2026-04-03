"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { normalizeTrackingNumber } from "@/lib/utils";
import { trackingLookupSchema } from "@/lib/validation";

type TrackingLookupValues = { trackingNumber: string };

export function TrackingSearchForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm<TrackingLookupValues>({
    resolver: zodResolver(trackingLookupSchema),
    defaultValues: { trackingNumber: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        startTransition(() => {
          router.push(`/track/${encodeURIComponent(normalizeTrackingNumber(values.trackingNumber))}`);
        });
      })}
    >
      <div className="flex overflow-hidden rounded-xl border-2 border-brand bg-white shadow-[0_0_0_4px_rgba(224,123,0,0.08)] transition focus-within:shadow-[0_0_0_4px_rgba(224,123,0,0.15)]">
        <input
          disabled={isPending}
          className="flex-1 bg-transparent px-4 py-3.5 text-sm font-medium text-foreground outline-none placeholder:text-subtle disabled:opacity-60"
          placeholder="Enter tracking number — e.g. CTS-2026-AB12CD34"
          {...register("trackingNumber")}
        />
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-strong active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {isPending ? "Searching…" : "Track"}
        </button>
      </div>
      {errors.trackingNumber ? (
        <p className="mt-2 text-xs text-red-600">{errors.trackingNumber.message}</p>
      ) : null}
    </form>
  );
}

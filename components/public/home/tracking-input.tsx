"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { normalizeTrackingNumber } from "@/lib/utils";
import { trackingLookupSchema } from "@/lib/validation";

type TrackingInputProps = {
  buttonLabel?: string;
  helperText?: string;
  inputPlaceholder?: string;
  compact?: boolean;
};

type TrackingLookupValues = {
  trackingNumber: string;
};

export function TrackingInput({
  buttonLabel = "Track",
  helperText = "Track your shipment in real time",
  inputPlaceholder = "Enter Tracking Number",
  compact = false,
}: TrackingInputProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackingLookupValues>({
    resolver: zodResolver(trackingLookupSchema),
    defaultValues: {
      trackingNumber: "",
    },
  });

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit((values) => {
        startTransition(() => {
          router.push(`/track/${encodeURIComponent(normalizeTrackingNumber(values.trackingNumber))}`);
        });
      })}
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="tracking-number">
          Tracking number
        </label>
        <input
          className={`w-full rounded-xl border border-line-strong bg-white px-4 text-sm text-foreground shadow-[var(--shadow-xs)] outline-none transition placeholder:text-subtle focus:border-brand focus:ring-4 focus:ring-brand/10 ${
            compact ? "h-12" : "h-14"
          }`}
          id="tracking-number"
          placeholder={inputPlaceholder}
          {...register("trackingNumber")}
        />
        <button
          className={`inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 font-semibold !text-white transition hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 active:scale-[0.98] ${
            compact ? "h-12 text-sm" : "h-14 text-base"
          }`}
          type="submit"
        >
          <Search className="h-4 w-4" />
          {isPending ? "Tracking..." : buttonLabel}
        </button>
      </div>

      {errors.trackingNumber ? (
        <p className="text-sm text-danger">{errors.trackingNumber.message}</p>
      ) : (
        <p className="text-sm text-muted">{helperText}</p>
      )}
    </form>
  );
}

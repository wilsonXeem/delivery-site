"use client";

import { Copy, CopyCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
};

export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-surface px-2 py-1 text-xs font-semibold text-muted transition hover:border-brand/40 hover:text-brand active:scale-[0.97]",
        className,
      )}
      onClick={() => {
        startTransition(async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            toast.success("Copied to clipboard.");
            window.setTimeout(() => setCopied(false), 1800);
          } catch {
            toast.error("Unable to copy.");
          }
        });
      }}
    >
      {copied ? <CopyCheck className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {label ?? (copied ? "Copied" : "Copy")}
    </button>
  );
}

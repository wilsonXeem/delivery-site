import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          "h-9 w-full rounded-lg border border-line-strong bg-surface px-3 text-sm text-foreground shadow-[var(--shadow-xs)] outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/10",
          className,
        )}
        {...props}
      />
    );
  },
);

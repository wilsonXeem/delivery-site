import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-9 w-full rounded-lg border border-line-strong bg-surface px-3 text-sm text-foreground shadow-[var(--shadow-xs)] outline-none transition placeholder:text-subtle focus:border-brand/50 focus:ring-2 focus:ring-brand/10",
          className,
        )}
        {...props}
      />
    );
  },
);

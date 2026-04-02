import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-24 w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-sm text-foreground shadow-[var(--shadow-xs)] outline-none transition placeholder:text-subtle focus:border-brand/50 focus:ring-2 focus:ring-brand/10",
          className,
        )}
        {...props}
      />
    );
  },
);

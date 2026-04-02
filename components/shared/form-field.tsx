import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
};

export function FormField({ id, label, error, description, required, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted" htmlFor={id}>
        {label}
        {required ? <span className="text-brand">*</span> : null}
      </label>
      {children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      {!error && description ? <p className="text-xs text-subtle">{description}</p> : null}
    </div>
  );
}

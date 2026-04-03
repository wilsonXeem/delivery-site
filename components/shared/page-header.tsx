import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-0.5">
        {eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
        ) : null}
        <h1 className="truncate text-xl font-bold tracking-tight text-foreground">{title}</h1>
        {description ? <p className="text-sm text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

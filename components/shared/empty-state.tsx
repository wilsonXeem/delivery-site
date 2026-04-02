import type { ReactNode } from "react";
import { Card } from "@/components/shared/card";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
};

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <Card className="cargo-stripe border-dashed py-14 text-center">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
        {icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-brand-soft text-brand">
            {icon}
          </div>
        ) : null}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted">{description}</p>
        </div>
        {action}
      </div>
    </Card>
  );
}

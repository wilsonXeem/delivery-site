import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/shared/card";

type StatsCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  tone?: "blue" | "green" | "amber" | "slate";
};

const toneClasses = {
  blue:  "text-blue-600 bg-blue-50",
  green: "text-emerald-600 bg-emerald-50",
  amber: "text-amber-600 bg-amber-50",
  slate: "text-slate-500 bg-slate-100",
};

export function StatsCard({ label, value, icon: Icon, tone = "blue" }: StatsCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
          <p className="mt-1.5 text-3xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </Card>
  );
}

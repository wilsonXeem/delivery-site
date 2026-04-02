import { STATUS_BADGE_STYLES, type ShipmentStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: ShipmentStatus;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold tracking-wide",
        STATUS_BADGE_STYLES[status],
        className,
      )}
    >
      {status}
    </span>
  );
}

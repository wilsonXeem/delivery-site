export const SHIPMENT_STATUSES = [
  "Pending",
  "Shipment Created",
  "Picked Up",
  "In Transit",
  "Arrived at Facility",
  "Out for Delivery",
  "Delivered",
  "Delayed",
  "Exception",
] as const;

export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export const STATUS_BADGE_STYLES: Record<ShipmentStatus, string> = {
  Pending:              "border-slate-200 bg-slate-50 text-slate-600",
  "Shipment Created":   "border-blue-200 bg-blue-50 text-blue-700",
  "Picked Up":          "border-amber-200 bg-amber-50 text-amber-700",
  "In Transit":         "border-orange-200 bg-orange-50 text-orange-700",
  "Arrived at Facility":"border-violet-200 bg-violet-50 text-violet-700",
  "Out for Delivery":   "border-sky-200 bg-sky-50 text-sky-700",
  Delivered:            "border-emerald-200 bg-emerald-50 text-emerald-700",
  Delayed:              "border-rose-200 bg-rose-50 text-rose-700",
  Exception:            "border-red-300 bg-red-50 text-red-700",
};

export const DEFAULT_STATUS: ShipmentStatus = "Shipment Created";
export const TRACKING_PREFIX = "CTS";
export const DEFAULT_PAGE_SIZE = 10;

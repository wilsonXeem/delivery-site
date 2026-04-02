import type { ShipmentStatus } from "@/lib/constants";

export interface TrackingEvent {
  id: string;
  status: ShipmentStatus;
  location: string;
  note?: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentRecord {
  id: string;
  trackingNumber: string;
  title: string;
  senderName: string;
  senderContact?: string;
  receiverName: string;
  receiverContact?: string;
  origin: string;
  destination: string;
  currentLocation: string;
  currentStatus: ShipmentStatus;
  estimatedDeliveryDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentDetail extends ShipmentRecord {
  history: TrackingEvent[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  query: string;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ShipmentListResult {
  shipments: ShipmentRecord[];
  pagination: PaginationInfo;
}

export interface DashboardStats {
  totalShipments: number;
  inTransit: number;
  delivered: number;
  pending: number;
  recentShipments: ShipmentRecord[];
}

export type FieldErrors = Record<string, string[] | undefined>;

export type ActionResult<T = undefined> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: FieldErrors;
    };

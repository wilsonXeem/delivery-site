import { Types } from "mongoose";

import { DEFAULT_PAGE_SIZE, type ShipmentStatus } from "@/lib/constants";
import { connectToDatabase } from "@/lib/mongodb";
import { normalizeTrackingNumber, trimOptional } from "@/lib/utils";
import Shipment from "@/models/Shipment";
import TrackingHistory from "@/models/TrackingHistory";
import type { DashboardStats, ShipmentDetail, ShipmentListResult, ShipmentRecord, TrackingEvent } from "@/types";

type ShipmentDbRecord = {
  _id: Types.ObjectId;
  trackingNumber: string;
  title: string;
  senderName: string;
  senderContact?: string | null;
  receiverName: string;
  receiverContact?: string | null;
  origin: string;
  destination: string;
  currentLocation: string;
  currentStatus: ShipmentStatus;
  estimatedDeliveryDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type TrackingDbRecord = {
  _id: Types.ObjectId;
  shipmentId: Types.ObjectId;
  status: ShipmentStatus;
  location: string;
  note?: string | null;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function serializeShipment(shipment: ShipmentDbRecord): ShipmentRecord {
  return {
    id: shipment._id.toString(),
    trackingNumber: shipment.trackingNumber,
    title: shipment.title,
    senderName: shipment.senderName,
    senderContact: trimOptional(shipment.senderContact),
    receiverName: shipment.receiverName,
    receiverContact: trimOptional(shipment.receiverContact),
    origin: shipment.origin,
    destination: shipment.destination,
    currentLocation: shipment.currentLocation,
    currentStatus: shipment.currentStatus,
    estimatedDeliveryDate: shipment.estimatedDeliveryDate ? shipment.estimatedDeliveryDate.toISOString() : null,
    createdAt: shipment.createdAt.toISOString(),
    updatedAt: shipment.updatedAt.toISOString(),
  };
}

function serializeTrackingEvent(event: TrackingDbRecord): TrackingEvent {
  return {
    id: event._id.toString(),
    status: event.status,
    location: event.location,
    note: trimOptional(event.note),
    timestamp: event.timestamp.toISOString(),
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
  };
}

export async function getShipmentByTrackingNumber(trackingNumber: string): Promise<ShipmentDetail | null> {
  await connectToDatabase();

  const normalizedTrackingNumber = normalizeTrackingNumber(trackingNumber);

  const shipment = await Shipment.findOne({
    trackingNumber: normalizedTrackingNumber,
  }).lean<ShipmentDbRecord | null>();

  if (!shipment) {
    return null;
  }

  const history = await TrackingHistory.find({
    shipmentId: shipment._id,
  })
    .sort({ timestamp: -1, createdAt: -1 })
    .lean<TrackingDbRecord[]>();

  return {
    ...serializeShipment(shipment),
    history: history.map(serializeTrackingEvent),
  };
}

export async function getShipmentById(id: string): Promise<ShipmentDetail | null> {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  await connectToDatabase();

  const shipment = await Shipment.findById(id).lean<ShipmentDbRecord | null>();

  if (!shipment) {
    return null;
  }

  const history = await TrackingHistory.find({
    shipmentId: shipment._id,
  })
    .sort({ timestamp: -1, createdAt: -1 })
    .lean<TrackingDbRecord[]>();

  return {
    ...serializeShipment(shipment),
    history: history.map(serializeTrackingEvent),
  };
}

export async function getShipments(options?: {
  query?: string;
  page?: number;
  limit?: number;
}): Promise<ShipmentListResult> {
  await connectToDatabase();

  const query = options?.query?.trim() ?? "";
  const page = Math.max(1, options?.page ?? 1);
  const limit = Math.max(1, options?.limit ?? DEFAULT_PAGE_SIZE);
  const skip = (page - 1) * limit;
  const regex = query ? new RegExp(escapeRegExp(query), "i") : undefined;

  const filter = regex
    ? {
        $or: [
          { trackingNumber: regex },
          { title: regex },
          { receiverName: regex },
          { senderName: regex },
        ],
      }
    : {};

  const [total, shipments] = await Promise.all([
    Shipment.countDocuments(filter),
    Shipment.find(filter)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<ShipmentDbRecord[]>(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    shipments: shipments.map(serializeShipment),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      query,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await connectToDatabase();

  const [totalShipments, inTransit, delivered, pending, recentShipments] = await Promise.all([
    Shipment.countDocuments(),
    Shipment.countDocuments({ currentStatus: "In Transit" }),
    Shipment.countDocuments({ currentStatus: "Delivered" }),
    Shipment.countDocuments({ currentStatus: "Pending" }),
    Shipment.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean<ShipmentDbRecord[]>(),
  ]);

  return {
    totalShipments,
    inTransit,
    delivered,
    pending,
    recentShipments: recentShipments.map(serializeShipment),
  };
}

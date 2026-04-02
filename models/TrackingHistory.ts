import { model, models, Schema, Types, type Model } from "mongoose";

import { SHIPMENT_STATUSES, type ShipmentStatus } from "@/lib/constants";

export interface TrackingHistoryDocument {
  shipmentId: Types.ObjectId;
  status: ShipmentStatus;
  location: string;
  note?: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const trackingHistorySchema = new Schema<TrackingHistoryDocument>(
  {
    shipmentId: {
      type: Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: SHIPMENT_STATUSES,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
  },
);

const TrackingHistory =
  (models.TrackingHistory as Model<TrackingHistoryDocument>) ||
  model<TrackingHistoryDocument>("TrackingHistory", trackingHistorySchema);

export default TrackingHistory;

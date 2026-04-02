import { model, models, Schema, type Model } from "mongoose";

import { SHIPMENT_STATUSES, type ShipmentStatus } from "@/lib/constants";

export interface ShipmentDocument {
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
  estimatedDeliveryDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const shipmentSchema = new Schema<ShipmentDocument>(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    senderContact: {
      type: String,
      trim: true,
    },
    receiverName: {
      type: String,
      required: true,
      trim: true,
    },
    receiverContact: {
      type: String,
      trim: true,
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    currentLocation: {
      type: String,
      required: true,
      trim: true,
    },
    currentStatus: {
      type: String,
      required: true,
      enum: SHIPMENT_STATUSES,
      default: "Shipment Created",
    },
    estimatedDeliveryDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Shipment = (models.Shipment as Model<ShipmentDocument>) || model<ShipmentDocument>("Shipment", shipmentSchema);

export default Shipment;

import { z } from "zod";

import { SHIPMENT_STATUSES } from "@/lib/constants";

const optionalContactSchema = z
  .string()
  .trim()
  .max(120, "Keep contact details under 120 characters.")
  .optional()
  .or(z.literal(""));

const optionalNoteSchema = z
  .string()
  .trim()
  .max(240, "Keep notes under 240 characters.")
  .optional()
  .or(z.literal(""));

const optionalDateSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || !Number.isNaN(new Date(value).getTime()), {
    message: "Enter a valid date.",
  });

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const trackingLookupSchema = z.object({
  trackingNumber: z.string().trim().min(3, "Enter a valid tracking number."),
});

export const shipmentStatusSchema = z.enum(SHIPMENT_STATUSES);

export const createShipmentSchema = z.object({
  title: z.string().trim().min(3, "Package title is required.").max(120),
  senderName: z.string().trim().min(2, "Sender name is required.").max(120),
  senderContact: optionalContactSchema,
  receiverName: z.string().trim().min(2, "Receiver name is required.").max(120),
  receiverContact: optionalContactSchema,
  origin: z.string().trim().min(2, "Origin is required.").max(140),
  destination: z.string().trim().min(2, "Destination is required.").max(140),
  currentLocation: z.string().trim().min(2, "Current location is required.").max(140),
  currentStatus: shipmentStatusSchema,
  estimatedDeliveryDate: optionalDateSchema,
});

export const updateTrackingSchema = z.object({
  location: z.string().trim().min(2, "Location is required.").max(140),
  status: shipmentStatusSchema,
  note: optionalNoteSchema,
});

export const updateShipmentSchema = z.object({
  title: z.string().trim().min(3, "Package title is required.").max(120),
  senderName: z.string().trim().min(2, "Sender name is required.").max(120),
  senderContact: optionalContactSchema,
  receiverName: z.string().trim().min(2, "Receiver name is required.").max(120),
  receiverContact: optionalContactSchema,
  origin: z.string().trim().min(2, "Origin is required.").max(140),
  destination: z.string().trim().min(2, "Destination is required.").max(140),
  estimatedDeliveryDate: optionalDateSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateShipmentInput = z.infer<typeof createShipmentSchema>;
export type UpdateTrackingInput = z.infer<typeof updateTrackingSchema>;
export type UpdateShipmentInput = z.infer<typeof updateShipmentSchema>;

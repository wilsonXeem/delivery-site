"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { assertAdminSession } from "@/lib/auth";
import { getErrorMessage, trimOptional } from "@/lib/utils";
import { connectToDatabase } from "@/lib/mongodb";
import { generateTrackingNumber } from "@/lib/tracking-number";
import {
  createShipmentSchema,
  type CreateShipmentInput,
  updateShipmentSchema,
  type UpdateShipmentInput,
  updateTrackingSchema,
  type UpdateTrackingInput,
} from "@/lib/validation";
import Shipment from "@/models/Shipment";
import TrackingHistory from "@/models/TrackingHistory";
import type { ActionResult } from "@/types";

function parseDate(value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function revalidateShipmentViews(shipmentId: string, trackingNumber: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/shipments");
  revalidatePath(`/admin/shipments/${shipmentId}`);
  revalidatePath(`/track/${trackingNumber}`);
}

export async function createShipmentAction(
  values: CreateShipmentInput,
): Promise<ActionResult<{ shipmentId: string; trackingNumber: string }>> {
  try {
    await assertAdminSession();

    const parsed = createShipmentSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        error: "Please correct the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    await connectToDatabase();

    const trackingNumber = await generateTrackingNumber();
    const estimatedDeliveryDate = parseDate(parsed.data.estimatedDeliveryDate);

    const shipment = await Shipment.create({
      trackingNumber,
      title: parsed.data.title.trim(),
      senderName: parsed.data.senderName.trim(),
      senderContact: trimOptional(parsed.data.senderContact),
      receiverName: parsed.data.receiverName.trim(),
      receiverContact: trimOptional(parsed.data.receiverContact),
      origin: parsed.data.origin.trim(),
      destination: parsed.data.destination.trim(),
      currentLocation: parsed.data.currentLocation.trim(),
      currentStatus: parsed.data.currentStatus,
      estimatedDeliveryDate,
    });

    await TrackingHistory.create({
      shipmentId: shipment._id,
      status: parsed.data.currentStatus,
      location: parsed.data.currentLocation.trim(),
      note: "Shipment created in admin dashboard.",
      timestamp: shipment.createdAt,
    });

    revalidateShipmentViews(shipment.id, trackingNumber);

    return {
      success: true,
      data: {
        shipmentId: shipment.id,
        trackingNumber,
      },
      message: "Shipment created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

export async function updateShipmentAction(
  shipmentId: string,
  values: UpdateShipmentInput,
): Promise<ActionResult> {
  try {
    await assertAdminSession();

    if (!Types.ObjectId.isValid(shipmentId)) {
      return {
        success: false,
        error: "Shipment not found.",
      };
    }

    const parsed = updateShipmentSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        error: "Please correct the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    await connectToDatabase();

    const senderContact = trimOptional(parsed.data.senderContact);
    const receiverContact = trimOptional(parsed.data.receiverContact);
    const unsetFields: Record<string, 1> = {};
    const updateSet: Record<string, string | Date | null> = {
      title: parsed.data.title.trim(),
      senderName: parsed.data.senderName.trim(),
      receiverName: parsed.data.receiverName.trim(),
      origin: parsed.data.origin.trim(),
      destination: parsed.data.destination.trim(),
      estimatedDeliveryDate: parseDate(parsed.data.estimatedDeliveryDate),
    };

    if (senderContact) {
      updateSet.senderContact = senderContact;
    } else {
      unsetFields.senderContact = 1;
    }

    if (receiverContact) {
      updateSet.receiverContact = receiverContact;
    } else {
      unsetFields.receiverContact = 1;
    }

    const shipment = await Shipment.findByIdAndUpdate(
      shipmentId,
      {
        $set: updateSet,
        ...(Object.keys(unsetFields).length ? { $unset: unsetFields } : {}),
      },
      {
        new: true,
      },
    );

    if (!shipment) {
      return {
        success: false,
        error: "Shipment not found.",
      };
    }

    revalidateShipmentViews(shipment.id, shipment.trackingNumber);

    return {
      success: true,
      data: undefined,
      message: "Shipment details updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

export async function addTrackingUpdateAction(
  shipmentId: string,
  values: UpdateTrackingInput,
): Promise<ActionResult> {
  try {
    await assertAdminSession();

    if (!Types.ObjectId.isValid(shipmentId)) {
      return {
        success: false,
        error: "Shipment not found.",
      };
    }

    const parsed = updateTrackingSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        error: "Please correct the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    await connectToDatabase();

    const shipment = await Shipment.findById(shipmentId);

    if (!shipment) {
      return {
        success: false,
        error: "Shipment not found.",
      };
    }

    const timestamp = new Date();

    await TrackingHistory.create({
      shipmentId: shipment._id,
      status: parsed.data.status,
      location: parsed.data.location.trim(),
      note: trimOptional(parsed.data.note),
      timestamp,
    });

    shipment.currentLocation = parsed.data.location.trim();
    shipment.currentStatus = parsed.data.status;
    shipment.updatedAt = timestamp;
    await shipment.save();

    revalidateShipmentViews(shipment.id, shipment.trackingNumber);

    return {
      success: true,
      data: undefined,
      message: "Tracking update added successfully.",
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

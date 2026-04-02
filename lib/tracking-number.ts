import { randomBytes } from "node:crypto";

import { TRACKING_PREFIX } from "@/lib/constants";
import { connectToDatabase } from "@/lib/mongodb";
import Shipment from "@/models/Shipment";

export async function generateTrackingNumber() {
  await connectToDatabase();

  const year = new Date().getFullYear();

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = randomBytes(4).toString("hex").toUpperCase();
    const trackingNumber = `${TRACKING_PREFIX}-${year}-${code}`;
    const exists = await Shipment.exists({ trackingNumber });

    if (!exists) {
      return trackingNumber;
    }
  }

  throw new Error("Unable to generate a unique tracking number.");
}

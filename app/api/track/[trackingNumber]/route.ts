import { NextResponse } from "next/server";

import { getShipmentByTrackingNumber } from "@/lib/data";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    trackingNumber: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { trackingNumber } = await context.params;
    const shipment = await getShipmentByTrackingNumber(trackingNumber);

    if (!shipment) {
      return NextResponse.json(
        {
          message: "Tracking number not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(shipment);
  } catch {
    return NextResponse.json(
      {
        message: "Tracking service is temporarily unavailable.",
      },
      {
        status: 503,
      },
    );
  }
}

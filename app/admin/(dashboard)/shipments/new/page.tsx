import { ShipmentForm } from "@/components/forms/shipment-form";
import { PageHeader } from "@/components/shared/page-header";

export default function NewShipmentPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        description="A unique tracking number is generated automatically and the first timeline event is recorded immediately."
        eyebrow="Create"
        title="New shipment"
      />
      <ShipmentForm />
    </div>
  );
}

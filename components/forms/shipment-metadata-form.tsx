"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, type UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/shared/input";
import { updateShipmentAction } from "@/lib/actions/shipment-actions";
import { updateShipmentSchema, type UpdateShipmentInput } from "@/lib/validation";
import type { FieldErrors, ShipmentDetail } from "@/types";

function applyFieldErrors(
  fieldErrors: FieldErrors | undefined,
  setError: UseFormSetError<UpdateShipmentInput>,
) {
  if (!fieldErrors) {
    return;
  }

  Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
    const firstMessage = messages?.[0];

    if (!firstMessage) {
      return;
    }

    setError(fieldName as keyof UpdateShipmentInput, {
      type: "server",
      message: firstMessage,
    });
  });
}

type ShipmentMetadataFormProps = {
  shipment: ShipmentDetail;
};

export function ShipmentMetadataForm({ shipment }: ShipmentMetadataFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateShipmentInput>({
    resolver: zodResolver(updateShipmentSchema),
    defaultValues: {
      title: shipment.title,
      senderName: shipment.senderName,
      senderContact: shipment.senderContact ?? "",
      receiverName: shipment.receiverName,
      receiverContact: shipment.receiverContact ?? "",
      origin: shipment.origin,
      destination: shipment.destination,
      estimatedDeliveryDate: shipment.estimatedDeliveryDate?.slice(0, 10) ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        <div className="border-b border-line pb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Shipment Info</p>
          <h2 className="mt-0.5 text-base font-bold text-foreground">Edit metadata</h2>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit((values) => {
            startTransition(() => {
              void (async () => {
                const result = await updateShipmentAction(shipment.id, values);

                if (!result.success) {
                  applyFieldErrors(result.fieldErrors, setError);
                  toast.error(result.error);
                  return;
                }

                toast.success(result.message ?? "Shipment updated.");
                router.refresh();
              })();
            });
          })}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField error={errors.title?.message} id="metadata-title" label="Package title / description" required>
              <Input id="metadata-title" {...register("title")} />
            </FormField>

            <FormField
              description="Optional"
              error={errors.estimatedDeliveryDate?.message}
              id="metadata-estimatedDeliveryDate"
              label="Estimated delivery date"
            >
              <Input id="metadata-estimatedDeliveryDate" type="date" {...register("estimatedDeliveryDate")} />
            </FormField>

            <FormField error={errors.senderName?.message} id="metadata-senderName" label="Sender name" required>
              <Input id="metadata-senderName" {...register("senderName")} />
            </FormField>

            <FormField
              description="Optional"
              error={errors.senderContact?.message}
              id="metadata-senderContact"
              label="Sender phone or email"
            >
              <Input id="metadata-senderContact" {...register("senderContact")} />
            </FormField>

            <FormField error={errors.receiverName?.message} id="metadata-receiverName" label="Receiver name" required>
              <Input id="metadata-receiverName" {...register("receiverName")} />
            </FormField>

            <FormField
              description="Optional"
              error={errors.receiverContact?.message}
              id="metadata-receiverContact"
              label="Receiver phone or email"
            >
              <Input id="metadata-receiverContact" {...register("receiverContact")} />
            </FormField>

            <FormField error={errors.origin?.message} id="metadata-origin" label="Origin" required>
              <Input id="metadata-origin" {...register("origin")} />
            </FormField>

            <FormField error={errors.destination?.message} id="metadata-destination" label="Destination" required>
              <Input id="metadata-destination" {...register("destination")} />
            </FormField>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              {isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isPending ? "Saving changes..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

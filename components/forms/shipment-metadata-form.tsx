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

function applyFieldErrors(fieldErrors: FieldErrors | undefined, setError: UseFormSetError<UpdateShipmentInput>) {
  if (!fieldErrors) return;
  Object.entries(fieldErrors).forEach(([field, messages]) => {
    const msg = messages?.[0];
    if (msg) setError(field as keyof UpdateShipmentInput, { type: "server", message: msg });
  });
}

type ShipmentMetadataFormProps = { shipment: ShipmentDetail };

export function ShipmentMetadataForm({ shipment }: ShipmentMetadataFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, setError, formState: { errors } } = useForm<UpdateShipmentInput>({
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

  return (
    <Card className="p-5 md:p-6">
      <div className="space-y-5">
        <div className="border-b border-line pb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Shipment Info</p>
          <h2 className="mt-0.5 text-sm font-bold text-foreground">Edit metadata</h2>
        </div>

        <form
          className="space-y-4"
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
          <div className="grid gap-4 md:grid-cols-2">
            <FormField error={errors.title?.message} id="metadata-title" label="Package title" required>
              <Input disabled={isPending} id="metadata-title" {...register("title")} />
            </FormField>
            <FormField description="Optional" error={errors.estimatedDeliveryDate?.message} id="metadata-edd" label="Estimated delivery date">
              <Input disabled={isPending} id="metadata-edd" type="date" {...register("estimatedDeliveryDate")} />
            </FormField>
            <FormField error={errors.senderName?.message} id="metadata-senderName" label="Sender name" required>
              <Input disabled={isPending} id="metadata-senderName" {...register("senderName")} />
            </FormField>
            <FormField description="Optional" error={errors.senderContact?.message} id="metadata-senderContact" label="Sender contact">
              <Input disabled={isPending} id="metadata-senderContact" {...register("senderContact")} />
            </FormField>
            <FormField error={errors.receiverName?.message} id="metadata-receiverName" label="Receiver name" required>
              <Input disabled={isPending} id="metadata-receiverName" {...register("receiverName")} />
            </FormField>
            <FormField description="Optional" error={errors.receiverContact?.message} id="metadata-receiverContact" label="Receiver contact">
              <Input disabled={isPending} id="metadata-receiverContact" {...register("receiverContact")} />
            </FormField>
            <FormField error={errors.origin?.message} id="metadata-origin" label="Origin" required>
              <Input disabled={isPending} id="metadata-origin" {...register("origin")} />
            </FormField>
            <FormField error={errors.destination?.message} id="metadata-destination" label="Destination" required>
              <Input disabled={isPending} id="metadata-destination" {...register("destination")} />
            </FormField>
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            {isPending ? (
              <span className="flex items-center gap-2 text-xs text-muted">
                <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                Saving…
              </span>
            ) : null}
            <Button disabled={isPending} size="md" type="submit">
              {isPending ? <LoaderCircle className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
              {isPending ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

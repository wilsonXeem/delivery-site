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
import { Select } from "@/components/shared/select";
import { DEFAULT_STATUS, SHIPMENT_STATUSES } from "@/lib/constants";
import { createShipmentAction } from "@/lib/actions/shipment-actions";
import { createShipmentSchema, type CreateShipmentInput } from "@/lib/validation";
import type { FieldErrors } from "@/types";

function applyFieldErrors(fieldErrors: FieldErrors | undefined, setError: UseFormSetError<CreateShipmentInput>) {
  if (!fieldErrors) return;
  Object.entries(fieldErrors).forEach(([field, messages]) => {
    const msg = messages?.[0];
    if (msg) setError(field as keyof CreateShipmentInput, { type: "server", message: msg });
  });
}

export function ShipmentForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, setError, formState: { errors } } = useForm<CreateShipmentInput>({
    resolver: zodResolver(createShipmentSchema),
    defaultValues: {
      title: "",
      senderName: "",
      senderContact: "",
      receiverName: "",
      receiverContact: "",
      origin: "",
      destination: "",
      currentLocation: "",
      currentStatus: DEFAULT_STATUS,
      estimatedDeliveryDate: "",
    },
  });

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) => {
        startTransition(() => {
          void (async () => {
            const result = await createShipmentAction(values);
            if (!result.success) {
              applyFieldErrors(result.fieldErrors, setError);
              toast.error(result.error);
              return;
            }
            toast.success(`Shipment ${result.data.trackingNumber} created.`);
            router.push(`/admin/shipments/${result.data.shipmentId}`);
            router.refresh();
          })();
        });
      })}
    >
      {/* General */}
      <Card className="p-5 md:p-6">
        <div className="mb-4 border-b border-line pb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">General</p>
          <p className="mt-0.5 text-sm font-bold text-foreground">Shipment details</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField error={errors.title?.message} id="title" label="Package title / description" required>
            <Input disabled={isPending} id="title" placeholder="Medical supplies — priority carton" {...register("title")} />
          </FormField>
          <FormField description="Optional" error={errors.estimatedDeliveryDate?.message} id="estimatedDeliveryDate" label="Estimated delivery date">
            <Input disabled={isPending} id="estimatedDeliveryDate" type="date" {...register("estimatedDeliveryDate")} />
          </FormField>
        </div>
      </Card>

      {/* Parties */}
      <Card className="p-5 md:p-6">
        <div className="mb-4 border-b border-line pb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Parties</p>
          <p className="mt-0.5 text-sm font-bold text-foreground">Sender and receiver</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField error={errors.senderName?.message} id="senderName" label="Sender name" required>
            <Input disabled={isPending} id="senderName" placeholder="Central Warehouse" {...register("senderName")} />
          </FormField>
          <FormField description="Optional" error={errors.senderContact?.message} id="senderContact" label="Sender phone or email">
            <Input disabled={isPending} id="senderContact" placeholder="+1 555 0100" {...register("senderContact")} />
          </FormField>
          <FormField error={errors.receiverName?.message} id="receiverName" label="Receiver name" required>
            <Input disabled={isPending} id="receiverName" placeholder="Regional Distribution Center" {...register("receiverName")} />
          </FormField>
          <FormField description="Optional" error={errors.receiverContact?.message} id="receiverContact" label="Receiver phone or email">
            <Input disabled={isPending} id="receiverContact" placeholder="+1 555 0199" {...register("receiverContact")} />
          </FormField>
        </div>
      </Card>

      {/* Routing */}
      <Card className="p-5 md:p-6">
        <div className="mb-4 border-b border-line pb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Routing</p>
          <p className="mt-0.5 text-sm font-bold text-foreground">Route and current state</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField error={errors.origin?.message} id="origin" label="Origin" required>
            <Input disabled={isPending} id="origin" placeholder="Houston, TX" {...register("origin")} />
          </FormField>
          <FormField error={errors.destination?.message} id="destination" label="Destination" required>
            <Input disabled={isPending} id="destination" placeholder="Atlanta, GA" {...register("destination")} />
          </FormField>
          <FormField error={errors.currentLocation?.message} id="currentLocation" label="Current location" required>
            <Input disabled={isPending} id="currentLocation" placeholder="Dallas, TX hub" {...register("currentLocation")} />
          </FormField>
          <FormField error={errors.currentStatus?.message} id="currentStatus" label="Current status" required>
            <Select disabled={isPending} id="currentStatus" {...register("currentStatus")}>
              {SHIPMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </FormField>
        </div>
      </Card>

      <div className="flex items-center justify-end gap-3">
        {isPending ? (
          <span className="flex items-center gap-2 text-sm text-muted">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Creating shipment…
          </span>
        ) : null}
        <Button disabled={isPending} size="lg" type="submit">
          {isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isPending ? "Creating…" : "Create shipment"}
        </Button>
      </div>
    </form>
  );
}

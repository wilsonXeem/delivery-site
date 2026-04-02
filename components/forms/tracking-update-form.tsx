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
import { Textarea } from "@/components/shared/textarea";
import { SHIPMENT_STATUSES } from "@/lib/constants";
import { addTrackingUpdateAction } from "@/lib/actions/shipment-actions";
import { updateTrackingSchema, type UpdateTrackingInput } from "@/lib/validation";
import type { FieldErrors, ShipmentDetail } from "@/types";

function applyFieldErrors(
  fieldErrors: FieldErrors | undefined,
  setError: UseFormSetError<UpdateTrackingInput>,
) {
  if (!fieldErrors) {
    return;
  }

  Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
    const firstMessage = messages?.[0];

    if (!firstMessage) {
      return;
    }

    setError(fieldName as keyof UpdateTrackingInput, {
      type: "server",
      message: firstMessage,
    });
  });
}

type TrackingUpdateFormProps = {
  shipment: ShipmentDetail;
};

export function TrackingUpdateForm({ shipment }: TrackingUpdateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateTrackingInput>({
    resolver: zodResolver(updateTrackingSchema),
    defaultValues: {
      location: shipment.currentLocation,
      status: shipment.currentStatus,
      note: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = form;

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        <div className="border-b border-line pb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Tracking Update</p>
          <h2 className="mt-0.5 text-base font-bold text-foreground">Post a new event</h2>
          <p className="mt-1 text-xs text-muted">Updates the customer-facing status and location immediately.</p>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit((values) => {
            startTransition(() => {
              void (async () => {
                const result = await addTrackingUpdateAction(shipment.id, values);

                if (!result.success) {
                  applyFieldErrors(result.fieldErrors, setError);
                  toast.error(result.error);
                  return;
                }

                reset({
                  location: values.location,
                  status: values.status,
                  note: "",
                });
                toast.success(result.message ?? "Tracking updated.");
                router.refresh();
              })();
            });
          })}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField error={errors.location?.message} id="tracking-location" label="Location" required>
              <Input id="tracking-location" placeholder="Transit facility, Frankfurt, Germany" {...register("location")} />
            </FormField>

            <FormField error={errors.status?.message} id="tracking-status" label="Status" required>
              <Select id="tracking-status" {...register("status")}>
                {SHIPMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          <FormField
            description="Optional"
            error={errors.note?.message}
            id="tracking-note"
            label="Operational note"
          >
            <Textarea
              id="tracking-note"
              placeholder="Customs cleared, reassigned to last-mile courier, delivery delayed due to weather..."
              {...register("note")}
            />
          </FormField>

          <div className="flex justify-end">
            <Button type="submit">
              {isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isPending ? "Saving update..." : "Add tracking update"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

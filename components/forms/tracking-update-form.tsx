"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

function applyFieldErrors(fieldErrors: FieldErrors | undefined, setError: UseFormSetError<UpdateTrackingInput>) {
  if (!fieldErrors) return;
  Object.entries(fieldErrors).forEach(([field, messages]) => {
    const msg = messages?.[0];
    if (msg) setError(field as keyof UpdateTrackingInput, { type: "server", message: msg });
  });
}

type TrackingUpdateFormProps = { shipment: ShipmentDetail };

export function TrackingUpdateForm({ shipment }: TrackingUpdateFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<UpdateTrackingInput>({
    resolver: zodResolver(updateTrackingSchema),
    defaultValues: {
      location: shipment.currentLocation,
      status: shipment.currentStatus,
      note: "",
    },
  });

  return (
    <Card className="p-5 md:p-6">
      <div className="space-y-5">
        <div className="border-b border-line pb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Tracking Update</p>
          <h2 className="mt-0.5 text-sm font-bold text-foreground">Post a new event</h2>
          <p className="mt-1 text-xs text-muted">Updates the customer-facing status and location immediately.</p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (values) => {
            setIsLoading(true);
            try {
              const result = await addTrackingUpdateAction(shipment.id, values);
              if (!result.success) {
                applyFieldErrors(result.fieldErrors, setError);
                toast.error(result.error);
                return;
              }
              reset({ location: values.location, status: values.status, note: "" });
              toast.success(result.message ?? "Tracking updated.");
              router.refresh();
            } finally {
              setIsLoading(false);
            }
          })}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField error={errors.location?.message} id="tracking-location" label="Location" required>
              <Input
                disabled={isLoading}
                id="tracking-location"
                placeholder="Transit facility, Frankfurt, Germany"
                {...register("location")}
              />
            </FormField>
            <FormField error={errors.status?.message} id="tracking-status" label="Status" required>
              <Select disabled={isLoading} id="tracking-status" {...register("status")}>
                {SHIPMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </Select>
            </FormField>
          </div>

          <FormField description="Optional" error={errors.note?.message} id="tracking-note" label="Operational note">
            <Textarea
              disabled={isLoading}
              id="tracking-note"
              placeholder="Customs cleared, reassigned to last-mile courier…"
              {...register("note")}
            />
          </FormField>

          <div className="flex justify-end pt-1">
            <Button disabled={isLoading} size="md" type="submit">
              {isLoading ? <LoaderCircle className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
              {isLoading ? "Posting…" : "Add tracking update"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/shared/input";
import { loginSchema, type LoginInput } from "@/lib/validation";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
          <LockKeyhole className="h-4 w-4 text-white" />
        </div>
        <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground">Sign in to your workspace</h2>
        <p className="text-sm text-muted">Enter your admin credentials to continue.</p>
      </div>

      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (values) => {
          const callbackUrl = searchParams.get("callbackUrl") || "/admin";
          setIsLoading(true);
          try {
            const result = await signIn("credentials", {
              email: values.email.trim().toLowerCase(),
              password: values.password,
              callbackUrl,
              redirect: false,
            });

            if (!result || result.error) {
              toast.error("Invalid email or password.");
              return;
            }

            toast.success("Signed in successfully.");
            router.push(result.url ?? callbackUrl);
            router.refresh();
          } finally {
            setIsLoading(false);
          }
        })}
      >
        <FormField error={errors.email?.message} id="email" label="Email address" required>
          <Input
            autoComplete="email"
            disabled={isLoading}
            id="email"
            placeholder="admin@example.com"
            type="email"
            {...register("email")}
          />
        </FormField>

        <FormField error={errors.password?.message} id="password" label="Password" required>
          <Input
            autoComplete="current-password"
            disabled={isLoading}
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("password")}
          />
        </FormField>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-white transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          {isLoading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

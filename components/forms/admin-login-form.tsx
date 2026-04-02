"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/shared/button";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/shared/input";
import { loginSchema, type LoginInput } from "@/lib/validation";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

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
        onSubmit={handleSubmit((values) => {
          const callbackUrl = searchParams.get("callbackUrl") || "/admin";
          startTransition(() => {
            void (async () => {
              const result = await signIn("credentials", {
                email: values.email.trim().toLowerCase(),
                password: values.password,
                callbackUrl,
                redirect: false,
              });

              if (!result) {
                toast.error("Sign in failed. No response was returned.");
                return;
              }

              if (result.error) {
                if (result.error === "CredentialsSignin") {
                  toast.error("Invalid admin email or password.");
                } else {
                  toast.error("Sign in failed. Check the server and auth configuration.");
                  console.error("Admin sign-in error:", result.error);
                }
                return;
              }

              toast.success("Signed in successfully.");
              router.push(result.url ?? callbackUrl);
              router.refresh();
            })();
          });
        })}
      >
        <FormField error={errors.email?.message} id="email" label="Email address" required>
          <Input autoComplete="email" id="email" placeholder="admin@example.com" type="email" {...register("email")} />
        </FormField>

        <FormField error={errors.password?.message} id="password" label="Password" required>
          <Input autoComplete="current-password" id="password" placeholder="••••••••" type="password" {...register("password")} />
        </FormField>

        <Button className="w-full" size="lg" type="submit">
          {isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

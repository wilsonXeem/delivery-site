import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  compact?: boolean;
  href?: string;
  className?: string;
  tone?: "default" | "light";
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "w-[132px]",
  md: "w-[156px]",
  lg: "w-[188px]",
};

export function Logo({
  compact = false,
  href = "/",
  className,
  tone = "default",
  size = "md",
}: LogoProps) {
  const isLight = tone === "light";

  const content = (
    <span className={cn("inline-flex shrink-0", className)}>
      <span
        className={cn(
          "overflow-hidden rounded-xl",
          sizeClasses[compact ? "sm" : size],
          isLight ? "ring-1 ring-white/8" : "shadow-[var(--shadow-sm)] ring-1 ring-black/5",
        )}
      >
        <Image
          alt="Cargo Trace System logo"
          className="h-auto w-full"
          height={520}
          priority={size === "lg"}
          src="/cargo-trace-logo-banner.png"
          width={1040}
        />
      </span>
    </span>
  );

  return <Link href={href}>{content}</Link>;
}

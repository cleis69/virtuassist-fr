import { useId } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** "sombre" = tracé dégradé sur fond clair, "clair" = tracé blanc sur fond bleu nuit */
  tone?: "sombre" | "clair";
  animate?: boolean;
  className?: string;
};

export function LogoMark({ tone = "sombre", animate = false, className }: LogoProps) {
  const id = useId().replace(/:/g, "");
  const gradId = `va-${id}`;

  return (
    <svg
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="VIRTUASSIST"
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="16" y1="60" x2="126" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0B2233" />
          <stop offset="0.55" stopColor="#1B4F6E" />
          <stop offset="1" stopColor="#2C86AF" />
        </linearGradient>
      </defs>
      <path
        d="M16 18 L58 104 L78 60 C 98 16, 126 10, 126 78"
        stroke={tone === "clair" ? "#FFFFFF" : `url(#${gradId})`}
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="miter"
        className={animate ? "trace-logo" : undefined}
      />
    </svg>
  );
}

export function Logotype({ tone = "sombre", className }: Omit<LogoProps, "animate">) {
  return (
    <span
      className={cn(
        "font-display leading-none tracking-tight",
        tone === "clair" ? "text-on-nuit" : "text-nuit",
        className,
      )}
    >
      VIRTU<em className="italic">ASSIST</em>
    </span>
  );
}

export function LogoLockup({
  tone = "sombre",
  animate = false,
  className,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} animate={animate} className="h-7 w-auto" />
      <Logotype tone={tone} className="text-xl sm:text-[1.4rem]" />
    </span>
  );
}

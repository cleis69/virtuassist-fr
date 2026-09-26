import { cn } from "@/lib/utils";

/** Motif de marque : trois barres arrondies décroissantes, la plus courte en turquoise. */
export function Bars({
  tone = "sombre",
  className,
}: {
  tone?: "sombre" | "clair";
  className?: string | undefined;
}) {
  const base = tone === "clair" ? "bg-on-nuit" : "bg-nuit";
  return (
    <span className={cn("flex flex-col gap-1", className)} aria-hidden="true">
      <span className={cn("block h-[3px] w-10 rounded-full", base)} />
      <span className={cn("block h-[3px] w-7 rounded-full opacity-70", base)} />
      <span className="block h-[3px] w-4 rounded-full bg-vague" />
    </span>
  );
}

/** Puce de liste dérivée du motif. */
export function BarBullet({ className }: { className?: string | undefined }) {
  return (
    <span
      aria-hidden="true"
      className={cn("mt-2.5 block h-[3px] w-4 shrink-0 rounded-full bg-vague-profonde", className)}
    />
  );
}

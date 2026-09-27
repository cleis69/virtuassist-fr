import { ChartColumn, FolderOpen, Globe, GraduationCap, Layers, ReceiptText } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONES = {
  facturation: ReceiptText,
  administration: FolderOpen,
  donnees: ChartColumn,
  digital: Globe,
  formation: GraduationCap,
} as const;

/** Pictogramme d'un service, dans sa pastille. */
export function IconeService({
  slug,
  className,
  clair = false,
}: {
  slug: string;
  className?: string | undefined;
  clair?: boolean;
}) {
  const Icone = ICONES[slug as keyof typeof ICONES] ?? Layers;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl",
        clair ? "bg-white/10 text-turquoise" : "bg-turquoise-pale text-turquoise-fonce",
        className,
      )}
    >
      <Icone className="h-[46%] w-[46%]" strokeWidth={2} />
    </span>
  );
}

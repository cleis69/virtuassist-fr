import { Link, type LinkProps } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Rise, TextReveal, type Segment } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

/** En-tête de section : surtitre, titre, introduction. */
export function EnTete({
  surtitre,
  titre,
  segments,
  intro,
  centre = false,
  clair = false,
  className,
  niveau = "h2",
}: {
  surtitre?: string;
  titre?: string;
  segments?: Segment[];
  intro?: ReactNode;
  centre?: boolean;
  /** Sur fond bleu marine. */
  clair?: boolean;
  className?: string | undefined;
  niveau?: "h1" | "h2";
}) {
  return (
    <div className={cn(centre && "mx-auto text-center", "max-w-3xl", className)}>
      {surtitre && (
        <Rise y={10}>
          <p className={cn("surtitre", clair && "text-turquoise", centre && "justify-center")}>
            {surtitre}
          </p>
        </Rise>
      )}
      <TextReveal
        as={niveau}
        {...(segments ? { segments } : { children: titre ?? "" })}
        className={cn(
          "mt-4 font-display font-semibold tracking-[-0.02em]",
          niveau === "h1"
            ? "text-[clamp(2.3rem,4.8vw,3.75rem)] leading-[1.08]"
            : "text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.12]",
          clair && "text-white",
        )}
      />
      {intro && (
        <Rise delay={0.15}>
          <div
            className={cn(
              "mt-5 text-lg leading-relaxed",
              clair ? "text-sur-marine-doux" : "text-ardoise",
            )}
          >
            {intro}
          </div>
        </Rise>
      )}
    </div>
  );
}

/** Liste à coches, pour les avantages et le contenu des formules. */
export function ListeCoches({
  items,
  clair = false,
  className,
}: {
  items: ReactNode[];
  clair?: boolean;
  className?: string | undefined;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((x, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
              clair ? "bg-turquoise/20 text-turquoise" : "bg-turquoise-pale text-turquoise-fonce",
            )}
          >
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <span className={clair ? "text-white" : "text-encre"}>{x}</span>
        </li>
      ))}
    </ul>
  );
}

/** Fil d'Ariane : on sait toujours où l'on est. */
export function FilAriane({
  etapes,
}: {
  etapes: { label: string; to?: NonNullable<LinkProps["to"]> }[];
}) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-[0.95rem]">
      <ol className="flex flex-wrap items-center gap-1.5 text-ardoise">
        <li>
          <Link to="/" className="font-bold text-turquoise-fonce hover:underline">
            Accueil
          </Link>
        </li>
        {etapes.map((e, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            {e.to ? (
              <Link to={e.to} className="font-bold text-turquoise-fonce hover:underline">
                {e.label}
              </Link>
            ) : (
              <span aria-current="page">{e.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Pastille de réassurance. */
export function Pastille({ children, clair = false }: { children: ReactNode; clair?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.95rem] font-bold",
        clair ? "bg-white/10 text-white" : "bg-white text-marine ring-1 ring-ligne",
      )}
    >
      <Check
        className={cn("h-4 w-4", clair ? "text-turquoise" : "text-turquoise-fonce")}
        strokeWidth={3}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

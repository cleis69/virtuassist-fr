import { createLink } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const VARIANTES = {
  /** Action principale, sur fond clair. */
  principal:
    "bg-turquoise-fonce text-white hover:bg-marine shadow-[0_10px_24px_-12px_rgb(14_124_121/70%)]",
  /** Action secondaire, sur fond clair. */
  secondaire: "bg-white text-marine ring-2 ring-inset ring-marine/20 hover:ring-marine",
  /** Action principale, sur fond bleu marine ou photo. */
  clair: "bg-white text-marine hover:bg-turquoise-pale",
  /** Action secondaire, sur fond bleu marine ou photo. */
  "contour-clair": "text-white ring-2 ring-inset ring-white/45 hover:ring-white hover:bg-white/10",
} as const;

const TAILLES = {
  md: "min-h-12 px-6 py-3 text-base",
  lg: "min-h-14 px-7 py-3.5 text-[1.0625rem]",
} as const;

export type BoutonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variante?: keyof typeof VARIANTES;
  taille?: keyof typeof TAILLES;
  fleche?: boolean;
};

/** Bouton au rendu de lien : pour les liens externes (tel:, mailto:). */
export const BoutonA = forwardRef<HTMLAnchorElement, BoutonProps>(function BoutonA(
  { variante = "principal", taille = "md", fleche = true, className, children, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      {...props}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-xl font-display font-medium transition-[background-color,color,box-shadow] duration-300",
        VARIANTES[variante],
        TAILLES[taille],
        className,
      )}
    >
      {children}
      {fleche && (
        <ArrowRight
          aria-hidden="true"
          className="h-5 w-5 shrink-0 transition-transform duration-300 ease-[var(--ease-sortie)] group-hover:translate-x-1"
        />
      )}
    </a>
  );
});

/** Bouton de navigation interne, typé par le routeur. */
export const Bouton = createLink(BoutonA);

import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { scrollToId } from "@/lib/scroll";
import { Magnetic } from "@/components/motion/Magnetic";

export type SectionId = "top" | "services" | "methode" | "offres" | "faq" | "contact";

/**
 * Lien vers une section de l'accueil. Sur l'accueil, défilement doux sans
 * rechargement ; depuis une autre page, navigation classique vers /#section.
 */
export function SectionLink({
  to,
  children,
  className,
  onNavigate,
  ...rest
}: {
  to: SectionId;
  children: ReactNode;
  className?: string | undefined;
  onNavigate?: (() => void) | undefined;
  "aria-current"?: "location" | undefined;
  "aria-label"?: string | undefined;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Link
      to="/"
      {...(to === "top" ? {} : { hash: to })}
      className={className}
      onClick={(e) => {
        onNavigate?.();
        if (pathname === "/") {
          e.preventDefault();
          scrollToId(to);
        }
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Aller à une section depuis du code (menu, formulaires…). */
export function useAllerA() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (id: SectionId) => {
    if (pathname === "/") scrollToId(id);
    else void navigate({ to: "/", ...(id === "top" ? {} : { hash: id }) });
  };
}

const VARIANTES = {
  /** Action principale sur fond clair. */
  plein: "bg-vague-profonde text-white hover:bg-nuit",
  /** Action secondaire sur fond clair. */
  contour: "text-nuit ring-1 ring-inset ring-nuit/20 hover:ring-nuit hover:bg-nuit/[0.04]",
  /** Action principale sur fond bleu nuit. */
  clair: "bg-vague text-nuit-deep hover:bg-on-nuit",
  /** Action secondaire sur fond bleu nuit. */
  "contour-clair":
    "text-on-nuit ring-1 ring-inset ring-on-nuit/25 hover:ring-on-nuit hover:bg-on-nuit/[0.06]",
} as const;

export function Cta({
  to,
  children,
  variante = "plein",
  className,
  fleche = true,
  magnetique = true,
  pleineLargeur = false,
  onClick,
}: {
  to: SectionId;
  children: ReactNode;
  variante?: keyof typeof VARIANTES;
  className?: string | undefined;
  fleche?: boolean;
  magnetique?: boolean;
  /** Pleine largeur sur mobile, largeur naturelle à partir de sm. */
  pleineLargeur?: boolean;
  onClick?: (() => void) | undefined;
}) {
  const lien = (
    <SectionLink
      to={to}
      onNavigate={onClick}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-sm font-semibold transition-[background-color,color,box-shadow] duration-300",
        VARIANTES[variante],
        pleineLargeur && "w-full sm:w-auto",
        className,
      )}
    >
      <span>{children}</span>
      {fleche && (
        <span className="relative inline-flex h-4 w-4 overflow-hidden" aria-hidden="true">
          <ArrowRight className="absolute h-4 w-4 transition-transform duration-500 ease-[var(--ease-sortie)] group-hover:translate-x-5" />
          <ArrowRight className="absolute h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[var(--ease-sortie)] group-hover:translate-x-0" />
        </span>
      )}
    </SectionLink>
  );
  return magnetique ? (
    <Magnetic className={pleineLargeur ? "block sm:inline-block" : "inline-block"}>{lien}</Magnetic>
  ) : (
    lien
  );
}

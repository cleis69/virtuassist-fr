import { useId } from "react";
import { BASELINE, LOGOTYPE, MONOGRAMME, TRANSFORMS } from "@/components/brand/traces";
import { cn } from "@/lib/utils";

/*
 * Logo VIRTUASSIST, conforme à la charte graphique.
 *
 * Rendu en SVG en ligne à partir des tracés officiels : même dessin, mêmes
 * proportions, et un seul dégradé appliqué au monogramme et au logotype
 * d'un seul tenant — jamais deux dégradés séparés.
 *
 *  - fond « clair » : dégradé #0B2233 → #1B4F6E → #2C86AF (version principale)
 *  - fond « sombre » : dégradé #FFFFFF → #9AD7E6 → #14A3A0 (fond bleu nuit)
 *
 * Taille minimale du monogramme : 24 px. Le logo sans baseline mesure donc
 * au moins 28 px de haut. Zone de protection : un tiers de la hauteur du
 * monogramme, tout autour — à respecter dans les mises en page.
 */

type Fond = "clair" | "sombre";

const DEGRADES: Record<Fond, [string, string, string]> = {
  clair: ["#0B2233", "#1B4F6E", "#2C86AF"],
  sombre: ["#FFFFFF", "#9AD7E6", "#14A3A0"],
};

const COULEUR_BASELINE: Record<Fond, string> = { clair: "#445663", sombre: "#9FB2C0" };

export function Logo({
  fond = "clair",
  baseline = false,
  anime = false,
  className,
}: {
  fond?: Fond;
  /** Avec « Votre administratif, notre priorité. » : grands formats seulement. */
  baseline?: boolean;
  /** Le monogramme se trace au chargement, le logotype apparaît ensuite. */
  anime?: boolean;
  className?: string | undefined;
}) {
  const id = `va-${useId().replace(/:/g, "")}`;
  const t = baseline ? TRANSFORMS.avecBaseline : TRANSFORMS.sansBaseline;
  const [a, b, c] = DEGRADES[fond];

  return (
    <svg
      viewBox={t.viewBox}
      role="img"
      aria-label="VIRTUASSIST"
      className={cn("block h-auto", className)}
    >
      <defs>
        <linearGradient id={id} x1="-7.0" y1="0" x2="761.1" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={a} />
          <stop offset=".55" stopColor={b} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
      </defs>
      <g transform="translate(7.0 7.0)">
        <g transform={t.monogramme}>
          <path
            d={MONOGRAMME}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className={anime ? "trace-monogramme" : undefined}
          />
        </g>
        <g transform={t.logotype}>
          <path
            d={LOGOTYPE}
            fill={`url(#${id})`}
            className={anime ? "apparition-logotype" : undefined}
          />
        </g>
        {"baseline" in t && (
          <g transform={t.baseline}>
            <path d={BASELINE} fill={COULEUR_BASELINE[fond]} />
          </g>
        )}
      </g>
    </svg>
  );
}

/** Monogramme seul (icône d'application, très petits formats). */
export function Monogramme({
  version = "degrade",
  className,
}: {
  version?: "degrade" | "bleu-nuit" | "blanc";
  className?: string | undefined;
}) {
  const id = `vm-${useId().replace(/:/g, "")}`;
  const trait = version === "degrade" ? `url(#${id})` : version === "blanc" ? "#FFFFFF" : "#0F2A3D";
  return (
    <svg viewBox="0 0 130 106" role="img" aria-label="VIRTUASSIST" className={className}>
      {version === "degrade" && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="130" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0B2233" />
            <stop offset=".55" stopColor="#1B4F6E" />
            <stop offset="1" stopColor="#2C86AF" />
          </linearGradient>
        </defs>
      )}
      <g transform="translate(-6.0 -8.0)">
        <path
          d={MONOGRAMME}
          fill="none"
          stroke={trait}
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

import { cn } from "@/lib/utils";

/*
 * Logo VirtuAssist.
 *
 * Le symbole : un V qui est aussi une coche. V comme VirtuAssist, coche
 * comme « c'est fait ». Le bras court en turquoise, le bras long en blanc,
 * dans un carré aux angles adoucis qui tient aussi bien en favicon qu'en
 * enseigne.
 */

type Ton = "clair" | "sombre";

export function LogoMark({
  ton = "sombre",
  anime = false,
  className,
}: {
  /** « sombre » : pour fond clair. « clair » : pour fond bleu marine. */
  ton?: Ton;
  anime?: boolean;
  className?: string | undefined;
}) {
  const fond = ton === "sombre" ? "var(--marine)" : "#ffffff";
  const brasLong = ton === "sombre" ? "#ffffff" : "var(--marine)";
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="VirtuAssist">
      <rect width="40" height="40" rx="11" fill={fond} />
      <path
        d="M17.2 27 L29.2 12.8"
        stroke={brasLong}
        strokeWidth="4.4"
        strokeLinecap="round"
        fill="none"
        className={anime ? "trace-logo" : undefined}
      />
      <path
        d="M10.8 20.6 L17.2 27"
        stroke="var(--turquoise)"
        strokeWidth="4.4"
        strokeLinecap="round"
        fill="none"
        className={anime ? "trace-logo" : undefined}
      />
    </svg>
  );
}

export function Logotype({
  ton = "sombre",
  className,
}: {
  ton?: Ton;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "font-display font-semibold leading-none tracking-[-0.025em]",
        ton === "sombre" ? "text-marine" : "text-white",
        className,
      )}
    >
      Virtu
      <span className={ton === "sombre" ? "text-turquoise-fonce" : "text-turquoise"}>Assist</span>
    </span>
  );
}

export function LogoLockup({
  ton = "sombre",
  anime = false,
  descripteur = false,
  className,
}: {
  ton?: Ton;
  anime?: boolean;
  /** Affiche « Assistance administrative » sous le nom. */
  descripteur?: boolean;
  className?: string | undefined;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark ton={ton} anime={anime} className="h-10 w-10 shrink-0" />
      <span className="flex flex-col">
        <Logotype ton={ton} className="text-[1.4rem]" />
        {descripteur && (
          <span
            className={cn(
              "mt-1 hidden text-[0.78rem] font-bold leading-none tracking-wide min-[440px]:block",
              ton === "sombre" ? "text-ardoise" : "text-sur-marine-doux",
            )}
          >
            Assistance administrative
          </span>
        )}
      </span>
    </span>
  );
}

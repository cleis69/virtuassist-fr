import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const heure = (tz: string, d: Date) =>
  new Intl.DateTimeFormat("fr-FR", { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(d);

const jourParis = (d: Date) =>
  new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", weekday: "long" }).format(d);

/**
 * L'heure à Paris et à La Réunion : les deux territoires servis, côte à
 * côte. Rendue après le montage seulement, pour ne pas figer côté serveur
 * une heure qui serait fausse à l'affichage.
 */
export function useMaintenant(intervalle = 20_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), intervalle);
    return () => window.clearInterval(id);
  }, [intervalle]);
  return now;
}

export function Horloges({
  className,
  compact = false,
}: {
  className?: string | undefined;
  compact?: boolean;
}) {
  const now = useMaintenant();
  return (
    <p className={cn("tabular-nums whitespace-nowrap", className)} aria-label="Heure locale">
      <span className="opacity-60">Paris</span>{" "}
      <span>{now ? heure("Europe/Paris", now) : "--:--"}</span>
      <span className="mx-2 opacity-40" aria-hidden="true">
        /
      </span>
      <span className="opacity-60">{compact ? "Réunion" : "La Réunion"}</span>{" "}
      <span>{now ? heure("Indian/Reunion", now) : "--:--"}</span>
    </p>
  );
}

/** Disponibilité du jour : du lundi au samedi. */
export function Disponibilite({ className }: { className?: string | undefined }) {
  const now = useMaintenant(60_000);
  const dimanche = now ? jourParis(now) === "dimanche" : false;
  return (
    <span className={cn("inline-flex items-center gap-2 whitespace-nowrap", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "block h-2 w-2 rounded-full",
          dimanche ? "bg-sur-marine-doux" : "pastille-vivante bg-turquoise",
        )}
      />
      {dimanche ? "De retour lundi" : "Disponible aujourd'hui"}
    </span>
  );
}

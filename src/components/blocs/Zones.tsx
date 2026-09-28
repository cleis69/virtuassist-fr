import { useMaintenant } from "@/components/Horloges";
import { EnTete } from "@/components/ui-va/Blocs";
import { Photo } from "@/components/ui-va/Photo";
import type { PhotoCle } from "@/content/images";

const heure = (tz: string, d: Date) =>
  new Intl.DateTimeFormat("fr-FR", { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(d);

/** France métropolitaine et La Réunion : deux territoires, les mêmes délais. */
export function Zones() {
  const now = useMaintenant();
  const zones: { nom: string; tz: string; photo: PhotoCle; texte: string }[] = [
    {
      nom: "France métropolitaine",
      tz: "Europe/Paris",
      photo: "paris",
      texte: "Du lundi au samedi, selon les délais de votre formule.",
    },
    {
      nom: "La Réunion",
      tz: "Indian/Reunion",
      photo: "reunion",
      texte:
        "2 à 3 heures de décalage selon la saison : les plages de travail se recouvrent largement.",
    },
  ];

  return (
    <section className="bg-ivoire py-20 sm:py-28">
      <div className="conteneur">
        <EnTete
          surtitre="Où nous intervenons"
          titre="France métropolitaine et La Réunion, avec les mêmes délais."
          intro="Les délais de traitement annoncés sont identiques en métropole et à La Réunion."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {zones.map((z) => (
            <li key={z.nom}>
              <Photo cle={z.photo} ratio={16 / 10} sizes="(min-width: 768px) 50vw, 100vw">
                <span className="absolute inset-0 bg-gradient-to-t from-marine/90 via-marine/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-8">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                      {z.nom}
                    </h3>
                    <p className="mt-2 max-w-sm text-sur-marine-doux">{z.texte}</p>
                  </div>
                  <p className="shrink-0 rounded-2xl bg-white/15 px-4 py-2 text-right backdrop-blur">
                    <span className="block text-[0.8rem] text-sur-marine-doux">Il est</span>
                    <span className="font-display text-2xl font-semibold tabular-nums">
                      {now ? heure(z.tz, now) : "--:--"}
                    </span>
                  </p>
                </div>
              </Photo>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

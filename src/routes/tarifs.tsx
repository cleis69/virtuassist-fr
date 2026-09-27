import { createFileRoute } from "@tanstack/react-router";
import { BellRing, CalendarClock, Repeat } from "lucide-react";
import { Gabarit, meta } from "@/components/Gabarit";
import { BandeauDiagnostic } from "@/components/blocs/BandeauDiagnostic";
import { CartesFormules, Comparatif, TableOptions } from "@/components/blocs/Formules";
import { Fondateurs } from "@/components/blocs/Fondateurs";
import { PageHero } from "@/components/blocs/PageHero";
import { Questions } from "@/components/blocs/Questions";
import { Bouton } from "@/components/ui-va/Bouton";
import { EnTete } from "@/components/ui-va/Blocs";
import { FAQ } from "@/content/site";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: meta(
      "Tarifs et formules",
      "Quatre formules d'assistance administrative : Essentiel 250 € HT/mois, Sérénité 460 € HT/mois, Premium 840 € HT/mois, Entreprise dès 1 290 € HT/mois. Sans engagement de durée.",
    ),
  }),
  component: PageTarifs,
});

const REGLES = [
  {
    Icone: BellRing,
    titre: "Vous êtes prévenu à 90 %",
    texte:
      "Dès 90 % du forfait consommé, nous vous prévenons. Vous choisissez : un pack d'heures ou le report d'une partie des travaux. Rien n'est facturé sans votre accord.",
  },
  {
    Icone: Repeat,
    titre: "Les heures non utilisées sont reportées",
    texte:
      "Dans la limite de 20 % du forfait, sur le mois suivant uniquement : 2 h en Essentiel, 4 h en Sérénité, 8 h en Premium.",
  },
  {
    Icone: CalendarClock,
    titre: "Sans engagement de durée",
    texte:
      "Période d'essai de 30 jours, puis préavis de 30 jours pour arrêter. Vos documents vous sont restitués intégralement.",
  },
];

function PageTarifs() {
  const questionsForfait = FAQ.find((t) => t.theme === "Forfait et heures")?.questions ?? [];

  return (
    <Gabarit>
      <PageHero
        ariane={[{ label: "Tarifs" }]}
        titre="Des tarifs clairs, sans engagement de durée."
        intro="Un forfait mensuel, un volume d'heures et un délai de traitement garanti. Tous les prix sont indiqués hors taxes."
        photo="calculatrice"
        actions={
          <Bouton to="/contact" search={{ formule: "indecis" }} taille="lg">
            Je ne sais pas quelle formule choisir
          </Bouton>
        }
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="conteneur">
          <EnTete
            surtitre="Les formules"
            titre="Choisissez votre volume d'heures."
            intro="Chaque trait de la jauge représente une heure de travail par mois : les formules se comparent d'un coup d'œil."
          />
          <div className="mt-12">
            <CartesFormules />
          </div>
          <p className="mt-10 rounded-2xl bg-turquoise-pale p-6 text-lg text-encre">
            <strong className="font-display font-semibold text-marine">Besoin ponctuel ?</strong> La
            prestation ponctuelle, sans abonnement, est facturée <strong>30 € HT de l'heure</strong>
            .{" "}
            <Bouton
              to="/contact"
              search={{ formule: "ponctuelle" }}
              variante="secondaire"
              className="mt-4 sm:mt-0 sm:ml-3"
            >
              Demander une prestation ponctuelle
            </Bouton>
          </p>
        </div>
      </section>

      <section className="bg-gris py-20 sm:py-24">
        <div className="conteneur">
          <EnTete
            surtitre="Comparatif"
            titre="Ce que contient chaque formule."
            intro="La formule Entreprise est construite sur mesure, à partir de l'analyse de vos volumes."
          />
          <div className="mt-10">
            <Comparatif />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="conteneur grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <EnTete
              surtitre="Options"
              titre="Au-delà du forfait."
              intro="Des options à la carte, pour les mois chargés ou les projets ponctuels."
            />
            <div className="mt-8">
              <TableOptions />
            </div>
          </div>
          <div>
            <EnTete surtitre="Les règles du jeu" titre="Pas de mauvaise surprise sur la facture." />
            <ul className="mt-8 space-y-4">
              {REGLES.map((r) => (
                <li key={r.titre} className="flex gap-5 rounded-3xl bg-gris p-6 sm:p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-turquoise-fonce ring-1 ring-ligne">
                    <r.Icone className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{r.titre}</h3>
                    <p className="mt-1.5 text-ardoise">{r.texte}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Fondateurs />

      <section className="bg-gris py-20 sm:py-24">
        <div className="conteneur grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <EnTete surtitre="Questions sur les tarifs" titre="Forfait, heures et facturation." />
          <Questions questions={questionsForfait} ouverte={questionsForfait[0]?.q} />
        </div>
      </section>

      <BandeauDiagnostic titre="Le diagnostic vous indique la formule adaptée à vos volumes." />
    </Gabarit>
  );
}

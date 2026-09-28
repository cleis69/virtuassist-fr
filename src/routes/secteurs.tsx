import { createFileRoute } from "@tanstack/react-router";
import { Gabarit, meta } from "@/components/Gabarit";
import { BandeauDiagnostic } from "@/components/blocs/BandeauDiagnostic";
import { PageHero } from "@/components/blocs/PageHero";
import { GrilleSecteurs } from "@/components/blocs/Secteurs";
import { Bouton } from "@/components/ui-va/Bouton";
import { EnTete, ListeCoches } from "@/components/ui-va/Blocs";
import { Photo } from "@/components/ui-va/Photo";
import { CONSTATS } from "@/content/site";

export const Route = createFileRoute("/secteurs")({
  head: () => ({
    meta: meta(
      "Pour qui : artisans, cabinets, agences, PME",
      "VIRTUASSIST accompagne les structures qui n'ont pas de service administratif : artisans et bâtiment, professions libérales, agences immobilières, consultants, commerçants, indépendants, petites PME.",
    ),
  }),
  component: PageSecteurs,
});

function PageSecteurs() {
  const recruter = CONSTATS[3];
  return (
    <Gabarit>
      <PageHero
        ariane={[{ label: "Pour qui" }]}
        titre="Pour les structures qui n'ont pas de service administratif."
        intro="Vous êtes seul, ou votre équipe est concentrée sur votre métier. L'administratif s'accumule en fin de journée. C'est pour vous que nous existons."
        photo="dirigeante"
        actions={
          <Bouton to="/contact" taille="lg">
            Demander mon diagnostic gratuit
          </Bouton>
        }
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="conteneur">
          <EnTete
            surtitre="Les secteurs que nous accompagnons"
            titre="Votre métier est différent. Votre administratif, beaucoup moins."
            intro="Quelques exemples de tâches que ces professionnels nous confient."
          />
          <div className="mt-12">
            <GrilleSecteurs detail />
          </div>
        </div>
      </section>

      <section className="bg-ivoire py-20 sm:py-28">
        <div className="conteneur grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Photo cle="independants" ratio={4 / 3} sizes="(min-width: 1024px) 45vw, 100vw" />
          <div>
            <EnTete
              surtitre="Plutôt que recruter"
              titre={recruter?.titre ?? "Recruter coûte trop cher"}
              intro={recruter?.texte}
            />
            <ListeCoches
              className="mt-8"
              items={[
                "Un forfait mensuel dimensionné sur vos besoins, dès 10 h par mois",
                "Sans engagement de durée : essai de 30 jours, préavis de 30 jours",
                "Des options pour les mois chargés : heure supplémentaire, packs d'heures",
              ]}
            />
            <div className="mt-9">
              <Bouton to="/tarifs" variante="secondaire">
                Voir les tarifs
              </Bouton>
            </div>
          </div>
        </div>
      </section>

      <BandeauDiagnostic titre="Votre secteur n'est pas dans la liste ? Parlons-en." />
    </Gabarit>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, FolderInput, ShieldCheck, Timer } from "lucide-react";
import { Gabarit, meta } from "@/components/Gabarit";
import { BandeauDiagnostic } from "@/components/blocs/BandeauDiagnostic";
import { EtapesDetail } from "@/components/blocs/Etapes";
import { PageHero } from "@/components/blocs/PageHero";
import { Zones } from "@/components/blocs/Zones";
import { Bouton } from "@/components/ui-va/Bouton";
import { EnTete } from "@/components/ui-va/Blocs";
import { FORMULES } from "@/content/site";

export const Route = createFileRoute("/fonctionnement")({
  head: () => ({
    meta: meta(
      "Comment ça marche",
      "Diagnostic gratuit, plan de délégation, mise en place de votre espace, suivi et reporting : les quatre étapes pour déléguer votre administratif à VirtuAssist.",
    ),
  }),
  component: PageFonctionnement,
});

const PRATIQUE = [
  {
    Icone: FolderInput,
    titre: "Transmettre vos documents",
    texte:
      "Par votre espace VirtuAssist, par email ou via l'outil que vous utilisez déjà (drive partagé, logiciel de facturation). Nous nous adaptons à votre organisation existante.",
  },
  {
    Icone: CalendarDays,
    titre: "Six jours sur sept",
    texte:
      "Nous vous accompagnons du lundi au samedi, selon les horaires de votre formule. Ce n'est pas une permanence en continu : vos demandes sont traitées dans le délai prévu.",
  },
  {
    Icone: Timer,
    titre: "Des délais garantis",
    texte: "",
  },
  {
    Icone: ShieldCheck,
    titre: "Confidentialité",
    texte:
      "Confidentialité stricte sur l'ensemble des informations confiées. Les données personnelles sont traitées conformément au RGPD, pour la seule exécution des prestations.",
  },
];

function PageFonctionnement() {
  return (
    <Gabarit>
      <PageHero
        ariane={[{ label: "Comment ça marche" }]}
        titre="Déléguer votre administratif, en quatre étapes."
        intro="Sans bouleverser votre organisation : nous partons de vos outils et de vos habitudes. La première étape est gratuite."
        photo="visioFemme"
        actions={
          <Bouton to="/contact" taille="lg">
            Commencer par le diagnostic
          </Bouton>
        }
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="conteneur">
          <EtapesDetail />
        </div>
      </section>

      <section className="bg-gris py-20 sm:py-28">
        <div className="conteneur">
          <EnTete surtitre="Au quotidien" titre="Ce qu'il faut savoir pour travailler ensemble." />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {PRATIQUE.map((p) => (
              <li key={p.titre} className="rounded-3xl bg-white p-7 ring-1 ring-ligne sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-turquoise-pale text-turquoise-fonce">
                  <p.Icone className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold">{p.titre}</h3>
                {p.texte ? (
                  <p className="mt-2 text-lg text-ardoise">{p.texte}</p>
                ) : (
                  <dl className="mt-4 divide-y divide-ligne">
                    {FORMULES.map((f) => (
                      <div key={f.cle} className="flex justify-between gap-4 py-2.5 text-lg">
                        <dt className="text-ardoise">{f.nom}</dt>
                        <dd className="font-bold text-marine">{f.delai}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="conteneur">
          <div className="grid gap-8 rounded-[2rem] bg-marine p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="surtitre text-turquoise">Essai de 30 jours</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-semibold leading-tight text-white">
                Testez VirtuAssist pendant 30 jours, sans engagement de durée.
              </h2>
              <p className="mt-4 text-lg text-sur-marine-doux">
                Vous arrêtez quand vous voulez, avec un préavis de 30 jours. Vos documents vous sont
                restitués intégralement.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Bouton to="/contact" variante="clair" taille="lg">
                Demander mon diagnostic gratuit
              </Bouton>
            </div>
          </div>
        </div>
      </section>

      <Zones />
      <BandeauDiagnostic />
    </Gabarit>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { Clock, FolderSearch, ReceiptText, UserRoundX } from "lucide-react";
import { Gabarit } from "@/components/Gabarit";
import { BandeauDiagnostic } from "@/components/blocs/BandeauDiagnostic";
import { BureauRange } from "@/components/blocs/BureauRange";
import { CartesServices } from "@/components/blocs/CartesServices";
import { Chiffres } from "@/components/blocs/Chiffres";
import { EtapesFrise } from "@/components/blocs/Etapes";
import { CartesFormules } from "@/components/blocs/Formules";
import { Fondateurs } from "@/components/blocs/Fondateurs";
import { Questions } from "@/components/blocs/Questions";
import { GrilleSecteurs } from "@/components/blocs/Secteurs";
import { TachesFlottantes } from "@/components/blocs/TachesFlottantes";
import { Zones } from "@/components/blocs/Zones";
import { Rise, TextReveal } from "@/components/motion/TextReveal";
import { EnTete, Pastille } from "@/components/ui-va/Blocs";
import { Bouton } from "@/components/ui-va/Bouton";
import { Photo } from "@/components/ui-va/Photo";
import { CONSTATS, FORMULES, TOUTES_QUESTIONS } from "@/content/site";

const TITRE = "VIRTUASSIST — Assistance administrative externalisée pour TPE et PME";
const DESCRIPTION =
  "Assistance administrative externalisée pour TPE, PME, indépendants et professionnels : facturation, relances, secrétariat, suivi de dossiers. France métropolitaine et La Réunion. Diagnostic gratuit.";

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "VIRTUASSIST",
  slogan: "Votre administratif, notre priorité.",
  description: DESCRIPTION,
  email: "contact@virtuassist.fr",
  telephone: "+33000000000",
  areaServed: ["France métropolitaine", "La Réunion"],
  priceRange: "250 € - 1290 € HT/mois",
  openingHours: "Mo-Sa",
  makesOffer: FORMULES.map((f) => ({
    "@type": "Offer",
    name: f.nom,
    price: String(f.prix),
    priceCurrency: "EUR",
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSONLD) }],
  }),
  component: Accueil,
});

const ICONES_CONSTAT = [Clock, ReceiptText, FolderSearch, UserRoundX];

function Accueil() {
  return (
    <Gabarit>
      <Hero />
      <Chiffres />
      <Constat />

      <section className="bg-ivoire py-20 sm:py-28">
        <div className="conteneur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <EnTete
              surtitre="Nos services"
              titre="Ce que nous prenons en charge à votre place."
              intro="Cinq domaines, un seul interlocuteur. Choisissez ce que vous voulez déléguer : nous nous occupons du reste."
            />
            <Bouton
              to="/services"
              variante="secondaire"
              className="shrink-0 self-start lg:self-end"
            >
              Tous les services
            </Bouton>
          </div>
          <div className="mt-12">
            <CartesServices />
          </div>
        </div>
      </section>

      <BureauRange />

      <section className="bg-ivoire py-20 sm:py-28">
        <div className="conteneur">
          <EnTete
            centre
            surtitre="Comment ça marche"
            titre="Quatre étapes, sans bouleverser votre organisation."
            intro="La première ne vous coûte rien : un diagnostic de 30 minutes."
          />
          <div className="mt-14">
            <EtapesFrise />
          </div>
          <div className="mt-12 flex justify-center">
            <Bouton to="/fonctionnement" variante="secondaire">
              Le détail de chaque étape
            </Bouton>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="conteneur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <EnTete
              surtitre="Tarifs"
              titre="Un forfait mensuel, un volume d'heures, un délai garanti."
              intro="Tarifs hors taxes, sans engagement de durée. Chaque trait de la jauge représente une heure de travail par mois."
            />
            <Bouton to="/tarifs" variante="secondaire" className="shrink-0 self-start lg:self-end">
              Comparer les formules
            </Bouton>
          </div>
          <div className="mt-10">
            <CartesFormules compact />
          </div>
        </div>
      </section>

      <Fondateurs />

      <section className="bg-white pb-20 sm:pb-28">
        <div className="conteneur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <EnTete
              surtitre="Pour qui"
              titre="Des structures qui n'ont pas de service administratif."
              intro="Artisans, cabinets, agences, consultants, commerçants, indépendants, petites PME."
            />
            <Bouton
              to="/secteurs"
              variante="secondaire"
              className="shrink-0 self-start lg:self-end"
            >
              Tous les secteurs
            </Bouton>
          </div>
          <div className="mt-12">
            <GrilleSecteurs limite={6} />
          </div>
        </div>
      </section>

      <Zones />

      <section className="bg-white py-20 sm:py-28">
        <div className="conteneur grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <EnTete surtitre="Questions fréquentes" titre="Les questions que l'on nous pose." />
            <div className="mt-8">
              <Bouton to="/faq" variante="secondaire">
                Toutes les questions
              </Bouton>
            </div>
          </div>
          <Questions questions={TOUTES_QUESTIONS.slice(0, 4)} ouverte={TOUTES_QUESTIONS[0]?.q} />
        </div>
      </section>

      <BandeauDiagnostic />
    </Gabarit>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[42%] rounded-bl-[4rem] bg-ivoire lg:block"
      />
      <div className="conteneur relative grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div>
          <Rise onMount y={10}>
            <p className="surtitre">Assistance administrative externalisée</p>
          </Rise>
          <TextReveal
            as="h1"
            onMount
            delay={0.1}
            className="mt-5 font-display text-[clamp(2.4rem,5.2vw,4.1rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-marine"
            segments={[
              { text: "Vous développez votre entreprise.", br: true },
              { text: "Nous gérons votre administratif.", className: "text-turquoise-fonce" },
            ]}
          />
          <Rise onMount delay={0.45}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ardoise sm:text-xl">
              Devis, factures, relances, courriers, classement : confiez-nous les tâches qui vous
              prennent du temps. Pour les TPE, PME, indépendants et professionnels, en France
              métropolitaine et à La Réunion.
            </p>
          </Rise>
          <Rise onMount delay={0.6}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Bouton to="/contact" taille="lg">
                Demander mon diagnostic gratuit
              </Bouton>
              <Bouton to="/tarifs" variante="secondaire" taille="lg" fleche={false}>
                Voir les tarifs
              </Bouton>
            </div>
          </Rise>
          <Rise onMount delay={0.75}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Pastille>Disponible 6 jours sur 7</Pastille>
              <Pastille>Sans engagement de durée</Pastille>
              <Pastille>Interlocuteur dédié</Pastille>
            </div>
          </Rise>
        </div>

        <Rise onMount delay={0.2} y={40} className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <Photo cle="accueil" ratio={4 / 4.4} priorite sizes="(min-width: 1024px) 45vw, 100vw" />
          <TachesFlottantes />
        </Rise>
      </div>
    </section>
  );
}

function Constat() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="conteneur grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <Photo cle="piles" ratio={4 / 5} sizes="(min-width: 1024px) 45vw, 100vw" />
          <div className="flotte absolute -right-2 -bottom-6 max-w-[16rem] rounded-2xl bg-marine p-5 text-white shadow-[0_24px_48px_-20px_rgb(15_42_61/60%)] sm:-right-6">
            <p className="font-display text-lg font-semibold leading-snug">
              Diriger une entreprise, ce n'est pas passer ses journées dans les devis et les
              relances.
            </p>
          </div>
        </div>
        <div>
          <EnTete
            surtitre="Le constat"
            titre="L'administratif grignote votre temps, et votre trésorerie."
          />
          <ul className="mt-10 grid gap-5">
            {CONSTATS.map((c, i) => {
              const Icone = ICONES_CONSTAT[i] ?? Clock;
              return (
                <motion.li
                  key={c.titre}
                  initial={reduce ? false : { opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                  className="flex gap-5 rounded-2xl bg-ivoire p-5 sm:p-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-turquoise-fonce ring-1 ring-ligne">
                    <Icone className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{c.titre}</h3>
                    <p className="mt-1.5 text-ardoise">{c.texte}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

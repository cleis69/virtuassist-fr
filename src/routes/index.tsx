import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bars, BarBullet } from "@/components/Bars";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";

const TITRE = "VIRTUASSIST — Assistance administrative externalisée pour TPE et PME";
const DESCRIPTION =
  "Assistance administrative externalisée pour TPE, PME, indépendants et professionnels. Facturation, relances, secrétariat, suivi de dossiers. France métropolitaine et La Réunion.";

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "VIRTUASSIST",
  slogan: "Votre administratif, notre priorité.",
  description: DESCRIPTION,
  email: "contact@virtuassist.fr",
  telephone: "+33000000000",
  areaServed: ["France métropolitaine", "La Réunion"],
  priceRange: "250 € - 1290 € HT/mois",
  openingHours: "Mo-Sa",
  makesOffer: [
    { "@type": "Offer", name: "Essentiel", price: "250", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Sérénité", price: "460", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Premium", price: "840", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Entreprise", price: "1290", priceCurrency: "EUR" },
  ],
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
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(JSONLD) },
    ],
  }),
  component: Index,
});

const PRESTATIONS = [
  {
    titre: "Gestion commerciale et facturation",
    points: [
      "Devis et factures",
      "Suivi des règlements",
      "Relances clients",
      "Recouvrement amiable",
    ],
  },
  {
    titre: "Administration quotidienne",
    points: ["Secrétariat externalisé", "Courriers", "Classement", "Suivi des dossiers"],
  },
  {
    titre: "Données et gestion",
    points: ["Saisie et traitement", "Mise à jour", "Tableaux de suivi", "Reporting"],
  },
  {
    titre: "Accompagnement digital",
    points: ["Création de sites internet", "Gestion des contenus", "Maintenance"],
  },
  {
    titre: "Formation",
    points: ["Bureautique", "Organisation administrative", "Gestion"],
  },
];

const ETAPES = [
  { n: "01", t: "Diagnostic administratif gratuit", d: "Nous analysons vos tâches, vos volumes et vos points de blocage." },
  { n: "02", t: "Plan de délégation", d: "Nous définissons ce que nous prenons en charge et selon quels délais." },
  { n: "03", t: "Mise en place de votre espace", d: "Transmission des documents, procédures, accès et interlocuteur dédié." },
  { n: "04", t: "Suivi et reporting réguliers", d: "Vous gardez la visibilité : tableaux de suivi et points planifiés." },
];

const OFFRES = [
  {
    nom: "ESSENTIEL",
    prix: "250 € HT",
    unite: "/mois",
    volume: "10 h/mois",
    phrase: "Pour commencer à déléguer.",
    inclus: ["Devis", "Factures", "Courriers", "Documents", "Saisie", "Mise à jour des dossiers"],
    delai: "48 h ouvrées",
    mise_en_avant: false,
  },
  {
    nom: "SÉRÉNITÉ",
    prix: "460 € HT",
    unite: "/mois",
    volume: "20 h/mois",
    phrase: "Notre formule recommandée.",
    inclus: [
      "Tout Essentiel",
      "Suivi de facturation",
      "Relances clients",
      "Recouvrement amiable",
      "Tableaux de suivi",
      "Reporting mensuel",
      "Interlocuteur dédié",
    ],
    delai: "24 à 48 h ouvrées",
    mise_en_avant: true,
  },
  {
    nom: "PREMIUM",
    prix: "840 € HT",
    unite: "/mois",
    volume: "40 h/mois",
    phrase: "Votre service administratif externalisé.",
    inclus: [
      "Tout Sérénité",
      "Gestion administrative étendue",
      "Tableaux de bord",
      "Traitement prioritaire",
      "Priorité le samedi",
      "Points de suivi réguliers",
    ],
    delai: "24 h ouvrées",
    mise_en_avant: false,
  },
  {
    nom: "ENTREPRISE",
    prix: "à partir de 1 290 € HT",
    unite: "/mois",
    volume: "Volume sur mesure",
    phrase: "Votre back-office externalisé.",
    inclus: [
      "Analyse des volumes",
      "Organisation personnalisée",
      "SLA contractuel",
      "Reporting sur mesure",
    ],
    delai: "Défini au contrat",
    mise_en_avant: false,
  },
];

const OPTIONS = [
  ["Heure supplémentaire", "30 € HT / h"],
  ["Pack 5 heures", "140 € HT"],
  ["Pack 10 heures", "270 € HT"],
  ["Traitement urgent", "+ 25 %"],
  ["Site vitrine", "à partir de 790 € HT"],
  ["Maintenance de site", "à partir de 59 € HT / mois"],
  ["Tableaux de bord, analyse de données, formations", "sur devis"],
];

const SECTEURS = [
  "Artisans et bâtiment",
  "Cabinets et professions libérales",
  "Agences immobilières",
  "Sociétés de services",
  "Consultants",
  "Organismes de formation",
  "Transport",
  "Commerçants",
  "Indépendants",
  "Petites PME",
];

const FAQ = [
  {
    q: "Que signifie exactement « 6 jours sur 7 » ?",
    r: "Nous vous accompagnons du lundi au samedi, selon les horaires et les délais de traitement de votre formule. Ce n'est pas une réponse immédiate à toute heure : vos demandes sont traitées dans le délai contractuel (24 h, 24 à 48 h ou 48 h ouvrées).",
  },
  {
    q: "Que se passe-t-il si je dépasse mon forfait ?",
    r: "Dès 90 % du forfait consommé, nous vous prévenons. Vous choisissez alors entre un pack d'heures complémentaires (5 h à 140 € HT, 10 h à 270 € HT) ou le report d'une partie des travaux sur le mois suivant. Rien n'est facturé sans votre accord.",
  },
  {
    q: "Les heures non utilisées sont-elles reportées ?",
    r: "Oui, dans la limite de 20 % du forfait, et uniquement sur le mois suivant : 2 h en Essentiel, 4 h en Sérénité, 8 h en Premium. Au-delà, les heures sont perdues.",
  },
  {
    q: "Comment vous transmettre mes documents ?",
    r: "Par votre espace VIRTUASSIST, par email ou via l'outil que vous utilisez déjà (drive partagé, logiciel de facturation). Nous nous adaptons à votre organisation existante plutôt que de vous en imposer une.",
  },
  {
    q: "Faites-vous de la comptabilité ?",
    r: "Non. La comptabilité et le conseil juridique relèvent de professions réglementées et ne sont pas inclus. Nous préparons et organisons vos pièces pour votre expert-comptable, ce qui lui fait gagner du temps et vous coûte moins cher.",
  },
  {
    q: "Travaillez-vous avec La Réunion malgré le décalage horaire ?",
    r: "Oui. Le décalage est de 2 à 3 heures selon la saison. Les plages de travail se recouvrent largement et les délais de traitement annoncés sont identiques à ceux de la métropole.",
  },
];

function LabelSection({ children, tone = "sombre" }: { children: string; tone?: "sombre" | "clair" }) {
  return (
    <p className={`label-section ${tone === "clair" ? "text-vague" : "text-vague-profonde"}`}>
      {children}
    </p>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-ivoire">
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border/70">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <Reveal>
              <Bars className="mb-8" />
              <h1 className="font-display text-[2.6rem] leading-[1.05] text-nuit sm:text-6xl lg:text-[4.2rem]">
                Vous développez votre entreprise.{" "}
                <span className="texte-marque">Nous gérons votre administratif.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-ardoise sm:text-lg">
                Assistance administrative externalisée pour les TPE, PME, indépendants et
                professionnels. France métropolitaine et La Réunion.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  hash="contact"
                  className="rounded-md bg-vague-profonde px-6 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-vague"
                >
                  Demander mon diagnostic gratuit
                </Link>
                <Link
                  to="/"
                  hash="offres"
                  className="rounded-md border border-nuit/25 px-6 py-3.5 text-center text-sm font-semibold text-nuit transition-colors hover:border-nuit hover:bg-nuit/5"
                >
                  Voir les offres
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ardoise">
                <li>Disponible 6 jours sur 7</li>
                <li aria-hidden="true" className="text-vague">·</li>
                <li>Sans engagement de durée</li>
                <li aria-hidden="true" className="text-vague">·</li>
                <li>Interlocuteur dédié</li>
              </ul>
            </Reveal>

            <Reveal delay={120} className="hidden lg:block">
              <div className="relative rounded-2xl border border-border bg-card p-10">
                <LogoMark animate className="mx-auto h-40 w-auto" />
                <div className="mt-10 space-y-3">
                  {[100, 76, 52].map((w, i) => (
                    <span
                      key={w}
                      className={`block h-[6px] rounded-full ${i === 2 ? "bg-vague" : "bg-nuit/85"}`}
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
                <p className="mt-8 font-display text-2xl text-nuit">
                  Votre administratif, notre priorité.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* LE PROBLÈME */}
        <section className="bg-nuit text-on-nuit">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <LabelSection tone="clair">Le constat</LabelSection>
              <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
                Diriger une entreprise, ce n'est pas passer ses journées dans les devis et les
                relances.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-on-nuit/15 sm:grid-cols-2">
              {[
                ["Du temps perdu sur l'administratif", "Des heures chaque semaine qui ne produisent ni chiffre d'affaires ni satisfaction client."],
                ["Des factures impayées qui traînent", "Sans relance méthodique, la trésorerie s'érode et les retards deviennent la norme."],
                ["Des dossiers clients mal suivis", "Documents dispersés, échéances oubliées, informations impossibles à retrouver."],
                ["Recruter coûte trop cher", "Un poste à temps plein pour un besoin partiel : la charge fixe est disproportionnée."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={i * 80} className="bg-nuit p-7 sm:p-9">
                  <Bars tone="clair" className="mb-5" />
                  <h3 className="text-lg font-semibold">{t}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-on-nuit-muted">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PRESTATIONS */}
        <section id="services" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <LabelSection>Nos prestations</LabelSection>
              <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight text-nuit sm:text-5xl">
                Ce que nous prenons en charge à votre place.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRESTATIONS.map((p, i) => (
                <Reveal key={p.titre} delay={i * 70} className="h-full">
                  <article className="carte flex h-full flex-col p-7">
                    <Bars className="mb-6" />
                    <h3 className="text-lg font-semibold text-nuit">{p.titre}</h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-ardoise">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <BarBullet />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section id="methode" className="scroll-mt-20 border-y border-border/70 bg-card/60">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <LabelSection>Comment ça marche</LabelSection>
              <h2 className="mt-5 font-display text-3xl leading-tight text-nuit sm:text-5xl">
                Quatre étapes, sans bouleverser votre organisation.
              </h2>
            </Reveal>
            <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {ETAPES.map((e, i) => (
                <Reveal as="li" key={e.n} delay={i * 80}>
                  <span className="font-display text-4xl text-vague-profonde">{e.n}</span>
                  <span className="mt-4 block h-[3px] w-10 rounded-full bg-nuit/20" />
                  <h3 className="mt-5 text-base font-semibold text-nuit">{e.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ardoise">{e.d}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* OFFRES */}
        <section id="offres" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <LabelSection>Les offres</LabelSection>
              <h2 className="mt-5 font-display text-3xl leading-tight text-nuit sm:text-5xl">
                Un forfait mensuel, un volume d'heures, un délai garanti.
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-4">
              {OFFRES.map((o, i) => (
                <Reveal key={o.nom} delay={i * 70} className="h-full">
                  <article
                    className={`carte relative flex h-full flex-col p-7 ${
                      o.mise_en_avant
                        ? "border-vague-profonde lg:-translate-y-4"
                        : ""
                    }`}
                    style={o.mise_en_avant ? { boxShadow: "var(--shadow-carte-forte)" } : undefined}
                  >
                    {o.mise_en_avant && (
                      <span className="label-section absolute -top-3 left-7 rounded-full bg-vague-profonde px-3 py-1.5 text-primary-foreground">
                        Formule recommandée
                      </span>
                    )}
                    <h3 className="label-section text-nuit">{o.nom}</h3>
                    <p className="mt-4 font-display text-3xl text-nuit">
                      {o.prix}
                      <span className="text-base text-ardoise">{o.unite}</span>
                    </p>
                    <p className="mt-1 text-sm font-semibold text-vague-profonde">{o.volume}</p>
                    <p className="mt-3 text-sm text-ardoise">{o.phrase}</p>
                    <ul className="mt-6 space-y-2.5 border-t border-border pt-6 text-sm text-ardoise">
                      {o.inclus.map((x) => (
                        <li key={x} className="flex gap-3">
                          <BarBullet />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 pt-4 text-xs font-semibold text-nuit">
                      Délai de traitement : {o.delai}
                    </p>
                    <Link
                      to="/"
                      hash="contact"
                      className={`mt-5 rounded-md px-5 py-3 text-center text-sm font-semibold transition-colors ${
                        o.mise_en_avant
                          ? "bg-vague-profonde text-primary-foreground hover:bg-vague"
                          : "border border-nuit/25 text-nuit hover:bg-nuit/5"
                      }`}
                    >
                      Choisir {o.nom.charAt(0) + o.nom.slice(1).toLowerCase()}
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14">
              <div className="carte flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
                <div>
                  <p className="font-display text-2xl text-nuit">
                    Vous ne savez pas quelle formule choisir ?
                  </p>
                  <p className="mt-2 text-sm text-ardoise">
                    Nous analysons gratuitement vos besoins. Prestation ponctuelle sans abonnement :
                    30 € HT/heure.
                  </p>
                </div>
                <Link
                  to="/"
                  hash="contact"
                  className="shrink-0 rounded-md bg-vague-profonde px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vague"
                >
                  Analyser mes besoins
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* OPTIONS */}
        <section className="border-y border-border/70 bg-card/60">
          <div className="mx-auto max-w-4xl px-5 py-20 sm:py-24">
            <Reveal>
              <LabelSection>Options</LabelSection>
              <h2 className="mt-5 font-display text-3xl text-nuit sm:text-4xl">
                Au-delà du forfait.
              </h2>
              <dl className="mt-10 divide-y divide-border border-y border-border">
                {OPTIONS.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-sm text-ardoise">{k}</dt>
                    <dd className="text-sm font-semibold text-nuit">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* OFFRE DE LANCEMENT */}
        <section className="bg-nuit text-on-nuit">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
            <Reveal>
              <LabelSection tone="clair">Offre de lancement</LabelSection>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
                <span className="texte-marque-clair">10 Entreprises Fondatrices</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base text-on-nuit-muted sm:text-lg">
                Les dix premières entreprises accompagnées bénéficient de conditions que nous ne
                reproposerons pas.
              </p>
            </Reveal>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Diagnostic de démarrage offert",
                "Installation de l'espace VIRTUASSIST offerte (valeur 150 € HT)",
                "+2 h offertes le premier mois sur Sérénité",
                "+4 h offertes le premier mois sur Premium",
                "Tarif garanti 12 mois",
                "10 places seulement",
              ].map((x, i) => (
                <Reveal as="li" key={x} delay={i * 60}>
                  <div className="h-full rounded-xl border border-on-nuit/20 p-6">
                    <Bars tone="clair" className="mb-5" />
                    <p className="text-sm font-medium">{x}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={120}>
              <Link
                to="/"
                hash="contact"
                className="mt-12 inline-block rounded-md bg-vague px-7 py-4 text-sm font-semibold text-nuit-deep transition-colors hover:bg-on-nuit"
              >
                Réserver ma place
              </Link>
            </Reveal>
          </div>
        </section>

        {/* POUR QUI */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <LabelSection>Pour qui</LabelSection>
              <h2 className="mt-5 font-display text-3xl text-nuit sm:text-5xl">
                Des structures qui n'ont pas de service administratif.
              </h2>
              <ul className="mt-10 flex flex-wrap gap-3">
                {SECTEURS.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-nuit/15 bg-card px-4 py-2 text-sm text-ardoise"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* GARANTIE */}
        <section className="border-y border-border/70 bg-card/60">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center">
            <Reveal>
              <Bars className="mx-auto mb-7 items-center" />
              <h2 className="font-display text-3xl text-nuit sm:text-4xl">
                Testez VIRTUASSIST pendant 30 jours sans engagement de durée.
              </h2>
              <p className="mt-4 text-sm text-ardoise">
                Vous arrêtez quand vous voulez, avec un préavis de 30 jours. Vos documents vous sont
                restitués intégralement.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
            <Reveal>
              <LabelSection>FAQ</LabelSection>
              <h2 className="mt-5 font-display text-3xl text-nuit sm:text-5xl">
                Les questions que l'on nous pose.
              </h2>
            </Reveal>
            <Reveal delay={80} className="mt-10">
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((f, i) => (
                  <AccordionItem key={f.q} value={`q${i}`}>
                    <AccordionTrigger className="text-left text-base font-semibold text-nuit">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-ardoise">
                      {f.r}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="contact" className="scroll-mt-20 border-t border-border/70 bg-card/60">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-24 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <LabelSection>Diagnostic gratuit</LabelSection>
              <h2 className="mt-5 font-display text-3xl leading-tight text-nuit sm:text-5xl">
                Dites-nous ce qui vous prend du temps.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ardoise">
                Nous vous rappelons sous 24 h ouvrées. Le diagnostic dure 30 minutes et débouche sur
                un plan de délégation chiffré. Sans engagement.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-ardoise">
                {["Disponible 6 jours sur 7", "Interlocuteur dédié", "France métropolitaine et La Réunion"].map(
                  (x) => (
                    <li key={x} className="flex gap-3">
                      <BarBullet />
                      <span>{x}</span>
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

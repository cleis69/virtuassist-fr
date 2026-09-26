import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Bars } from "@/components/Bars";

const TITRE = "Mentions légales — VIRTUASSIST";
const DESCRIPTION =
  "Mentions légales de VIRTUASSIST : éditeur du site, hébergement, propriété intellectuelle et traitement des données personnelles.";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MentionsLegales,
});

function Bloc({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="font-display text-2xl text-nuit">{titre}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ardoise">{children}</div>
    </section>
  );
}

function MentionsLegales() {
  return (
    <div className="min-h-screen bg-ivoire">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <Bars className="mb-8" />
        <h1 className="font-display text-4xl text-nuit sm:text-5xl">Mentions légales</h1>
        <p className="mt-4 text-sm text-ardoise">
          Les informations marquées entre crochets doivent être complétées avec les données
          officielles de la société.
        </p>

        <Bloc titre="Éditeur du site">
          <p>
            VIRTUASSIST — [forme juridique] au capital de [montant] €. Siège social : [adresse].
            Immatriculée au RCS de [ville] sous le numéro [SIREN]. Numéro de TVA
            intracommunautaire : [TVA].
          </p>
          <p>
            Directeur de la publication : [nom]. Contact : contact@virtuassist.fr — +33 (0)0 00 00
            00 00.
          </p>
        </Bloc>

        <Bloc titre="Hébergement">
          <p>
            Le site est hébergé par [nom de l'hébergeur], [adresse de l'hébergeur], [contact de
            l'hébergeur].
          </p>
        </Bloc>

        <Bloc titre="Propriété intellectuelle">
          <p>
            L'ensemble des contenus de ce site (textes, identité visuelle, logo, structure) est la
            propriété exclusive de VIRTUASSIST. Toute reproduction ou représentation, totale ou
            partielle, sans autorisation écrite préalable est interdite.
          </p>
        </Bloc>

        <Bloc titre="Données personnelles">
          <p>
            Les informations transmises via le formulaire de contact sont utilisées uniquement pour
            répondre à votre demande et préparer votre diagnostic administratif. Elles ne sont ni
            cédées ni revendues.
          </p>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement,
            de limitation et d'opposition. Adressez votre demande à contact@virtuassist.fr. Vous
            pouvez introduire une réclamation auprès de la CNIL.
          </p>
        </Bloc>

        <Bloc titre="Cookies">
          <p>
            Ce site ne dépose aucun cookie publicitaire ni traceur tiers. Seuls des cookies
            strictement nécessaires au fonctionnement du site peuvent être utilisés.
          </p>
        </Bloc>

        <Bloc titre="Responsabilité">
          <p>
            VIRTUASSIST s'efforce d'assurer l'exactitude des informations publiées. Les tarifs
            indiqués sont hors taxes et susceptibles d'évolution. Seule l'offre commerciale signée
            fait foi.
          </p>
        </Bloc>

        <p className="mt-10 text-sm">
          <Link className="font-semibold text-vague-profonde underline underline-offset-4" to="/">
            Retour à l'accueil
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

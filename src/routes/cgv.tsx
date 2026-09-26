import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Bars } from "@/components/Bars";

const TITRE = "Conditions générales de vente — VIRTUASSIST";
const DESCRIPTION =
  "CGV VIRTUASSIST : forfaits, délais de traitement, report d'heures, dépassements, facturation, durée et résiliation des prestations d'assistance administrative.";

export const Route = createFileRoute("/cgv")({
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
  component: Cgv,
});

function Article({ n, titre, children }: { n: string; titre: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-8">
      <p className="label-section text-vague-profonde">Article {n}</p>
      <h2 className="mt-2 font-display text-2xl text-nuit">{titre}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ardoise">{children}</div>
    </section>
  );
}

function Cgv() {
  return (
    <div className="min-h-screen bg-ivoire">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <Bars className="mb-8" />
        <h1 className="font-display text-4xl text-nuit sm:text-5xl">
          Conditions générales de vente
        </h1>
        <p className="mt-4 text-sm text-ardoise">
          Version applicable aux prestations d'assistance administrative externalisée VIRTUASSIST.
          Les éléments entre crochets sont à compléter avant publication.
        </p>

        <Article n="1" titre="Objet">
          <p>
            Les présentes conditions régissent les prestations d'assistance administrative fournies
            par VIRTUASSIST à ses clients professionnels : gestion commerciale et facturation,
            administration quotidienne, traitement de données, accompagnement digital et formation.
          </p>
        </Article>

        <Article n="2" titre="Formules et volumes d'heures">
          <p>
            Essentiel : 250 € HT/mois pour 10 h. Sérénité : 460 € HT/mois pour 20 h. Premium :
            840 € HT/mois pour 40 h. Entreprise : à partir de 1 290 € HT/mois, volume défini au
            contrat. Prestation ponctuelle sans abonnement : 30 € HT/heure.
          </p>
        </Article>

        <Article n="3" titre="Délais de traitement">
          <p>
            Les demandes sont traitées sous 48 h ouvrées (Essentiel), 24 à 48 h ouvrées (Sérénité),
            24 h ouvrées (Premium). L'accompagnement est assuré du lundi au samedi selon les
            horaires de la formule. Il ne s'agit pas d'une permanence en continu.
          </p>
        </Article>

        <Article n="4" titre="Dépassement de forfait">
          <p>
            Dès 90 % du forfait consommé, le client est informé. Aucun dépassement n'est facturé
            sans accord écrit préalable. Heure supplémentaire : 30 € HT. Pack 5 h : 140 € HT.
            Pack 10 h : 270 € HT. Traitement urgent : majoration de 25 %.
          </p>
        </Article>

        <Article n="5" titre="Report des heures non utilisées">
          <p>
            Les heures non consommées sont reportables dans la limite de 20 % du forfait et
            uniquement sur le mois suivant : 2 h en Essentiel, 4 h en Sérénité, 8 h en Premium.
            Au-delà de ce délai, elles sont perdues.
          </p>
        </Article>

        <Article n="6" titre="Prestations exclues">
          <p>
            VIRTUASSIST n'exerce ni activité comptable ni conseil juridique, ces professions étant
            réglementées. Le recouvrement effectué reste strictement amiable, à l'exclusion de toute
            procédure contentieuse ou judiciaire.
          </p>
        </Article>

        <Article n="7" titre="Obligations du client">
          <p>
            Le client transmet en temps utile les documents, accès et informations nécessaires. Il
            garantit leur exactitude. VIRTUASSIST ne peut être tenue responsable des conséquences
            d'informations erronées, incomplètes ou transmises tardivement.
          </p>
        </Article>

        <Article n="8" titre="Facturation et paiement">
          <p>
            Les forfaits sont facturés mensuellement à terme à échoir, payables à réception par
            virement ou prélèvement. Tout retard entraîne des pénalités au taux légal en vigueur et
            une indemnité forfaitaire de 40 € pour frais de recouvrement.
          </p>
        </Article>

        <Article n="9" titre="Durée, essai et résiliation">
          <p>
            Les prestations sont souscrites sans engagement de durée, avec une période d'essai de
            30 jours. Chaque partie peut résilier par écrit avec un préavis de 30 jours. Les
            documents du client lui sont restitués intégralement à la fin du contrat.
          </p>
        </Article>

        <Article n="10" titre="Confidentialité et données">
          <p>
            VIRTUASSIST s'engage à une confidentialité stricte sur l'ensemble des informations
            confiées. Les traitements de données personnelles sont réalisés conformément au RGPD,
            pour la seule exécution des prestations.
          </p>
        </Article>

        <Article n="11" titre="Responsabilité">
          <p>
            VIRTUASSIST est tenue d'une obligation de moyens. Sa responsabilité éventuelle est
            limitée au montant des sommes facturées au titre des trois derniers mois de prestation.
          </p>
        </Article>

        <Article n="12" titre="Droit applicable et litiges">
          <p>
            Les présentes conditions sont soumises au droit français. À défaut de résolution
            amiable, tout litige relève de la compétence du tribunal de commerce de [ville].
          </p>
        </Article>

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

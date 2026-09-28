import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { Gabarit, meta } from "@/components/Gabarit";
import { BandeauDiagnostic } from "@/components/blocs/BandeauDiagnostic";
import { PageHero } from "@/components/blocs/PageHero";
import { Questions } from "@/components/blocs/Questions";
import { BoutonA } from "@/components/ui-va/Bouton";
import { ENTREPRISE, FAQ, TOUTES_QUESTIONS } from "@/content/site";

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: TOUTES_QUESTIONS.map((q) => ({
    "@type": "Question",
    name: q.q,
    acceptedAnswer: { "@type": "Answer", text: q.r },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: meta(
      "Questions fréquentes",
      "Délais, forfait et heures, report, engagement, documents, comptabilité, La Réunion : les réponses aux questions que l'on nous pose sur l'assistance administrative VIRTUASSIST.",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSONLD) }],
  }),
  component: PageFaq,
});

const ancre = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-");

function PageFaq() {
  return (
    <Gabarit>
      <PageHero
        ariane={[{ label: "Questions fréquentes" }]}
        titre="Les questions que l'on nous pose."
        intro="Fonctionnement, forfait, heures, engagement, périmètre : les réponses claires, avant même de nous écrire."
        photo="duo"
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="conteneur grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="Thèmes">
              <p className="font-display text-lg font-semibold text-marine">Thèmes</p>
              <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col">
                {FAQ.map((t) => (
                  <li key={t.theme}>
                    <a
                      href={`#${ancre(t.theme)}`}
                      className="inline-flex min-h-12 items-center rounded-xl bg-ivoire px-4 font-display font-medium text-marine transition-colors hover:bg-turquoise-pale"
                    >
                      {t.theme}
                      <span className="ml-2 text-ardoise">({t.questions.length})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 rounded-3xl bg-ivoire p-6">
              <p className="font-display text-lg font-semibold text-marine">
                Vous ne trouvez pas votre réponse ?
              </p>
              <p className="mt-2 text-ardoise">{ENTREPRISE.jours}, nous vous répondons.</p>
              <div className="mt-5 grid gap-3">
                <BoutonA href={`tel:${ENTREPRISE.telephone}`} variante="secondaire" fleche={false}>
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Appeler
                </BoutonA>
                <BoutonA href={`mailto:${ENTREPRISE.email}`} variante="secondaire" fleche={false}>
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  Écrire un email
                </BoutonA>
              </div>
            </div>
          </aside>

          <div className="space-y-16">
            {FAQ.map((t) => (
              <section key={t.theme} id={ancre(t.theme)} className="scroll-mt-28">
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold">
                  {t.theme}
                </h2>
                <div className="mt-6">
                  <Questions questions={t.questions} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <BandeauDiagnostic />
    </Gabarit>
  );
}

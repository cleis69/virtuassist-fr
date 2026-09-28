import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { Send, Timer, ClipboardList } from "lucide-react";
import { Gabarit, meta } from "@/components/Gabarit";
import { BandeauDiagnostic } from "@/components/blocs/BandeauDiagnostic";
import { CartesServices } from "@/components/blocs/CartesServices";
import { PageHero } from "@/components/blocs/PageHero";
import { Bouton } from "@/components/ui-va/Bouton";
import { EnTete } from "@/components/ui-va/Blocs";
import { IconeService } from "@/components/ui-va/IconeService";
import { Photo } from "@/components/ui-va/Photo";
import { serviceParSlug } from "@/content/site";
import { estCleObjet } from "@/lib/formule";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceParSlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? meta(
          loaderData.service.nom,
          `${loaderData.service.description} Assistance administrative externalisée, France métropolitaine et La Réunion.`,
        )
      : [],
  }),
  component: PageService,
});

const DEROULE = [
  {
    Icone: Send,
    titre: "Vous transmettez",
    texte: "Par votre espace VIRTUASSIST, par email ou via vos outils habituels.",
  },
  {
    Icone: Timer,
    titre: "Nous traitons",
    texte: "Dans le délai de votre formule : 24 h, 24 à 48 h ou 48 h ouvrées.",
  },
  {
    Icone: ClipboardList,
    titre: "Vous suivez",
    texte: "Tableaux de suivi et points planifiés : vous gardez la visibilité.",
  },
];

function PageService() {
  const { service: s } = Route.useLoaderData();
  const reduce = useReducedMotion();
  const objet = estCleObjet(s.slug) ? s.slug : undefined;

  return (
    <Gabarit>
      <PageHero
        ariane={[{ label: "Services", to: "/services" }, { label: s.court }]}
        titre={s.nom}
        intro={s.description}
        photo={s.photo}
        actions={
          <>
            <Bouton to="/contact" search={objet ? { objet } : {}} taille="lg">
              Déléguer ce service
            </Bouton>
            <Bouton to="/tarifs" variante="secondaire" taille="lg" fleche={false}>
              Voir les tarifs
            </Bouton>
          </>
        }
        encart={
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-18px_rgb(15_42_61/45%)] ring-1 ring-ligne">
            <IconeService slug={s.slug} className="h-12 w-12" />
            <p className="font-display font-semibold leading-snug text-marine">{s.accroche}</p>
          </div>
        }
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="conteneur">
          <EnTete
            surtitre="Ce que nous faisons"
            titre="Concrètement, voici ce que nous prenons en charge."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {s.taches.map((t, i) => (
              <motion.li
                key={t.titre}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
                className="rounded-3xl bg-ivoire p-7 sm:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marine font-display text-lg font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold">{t.titre}</h3>
                <p className="mt-2 text-lg text-ardoise">{t.texte}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivoire py-20 sm:py-28">
        <div className="conteneur grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Photo cle={s.photo2} ratio={4 / 3} sizes="(min-width: 1024px) 45vw, 100vw" />
          <div>
            <EnTete surtitre="Comment ça se passe" titre="Simple, et sans changer vos habitudes." />
            <ol className="mt-10 space-y-6">
              {DEROULE.map((d) => (
                <li key={d.titre} className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-turquoise-fonce ring-1 ring-ligne">
                    <d.Icone className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{d.titre}</h3>
                    <p className="mt-1 text-lg text-ardoise">{d.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="conteneur">
          <EnTete
            surtitre="Dans quelle formule ?"
            titre="Où trouver ce service dans nos offres."
            intro="Le diagnostic gratuit vous indique la formule adaptée à vos volumes."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.formules.map((f) => (
              <li key={f.nom} className="rounded-3xl p-7 ring-1 ring-ligne">
                <p className="font-display text-2xl font-semibold text-marine">{f.nom}</p>
                <p className="mt-2 text-lg text-ardoise">{f.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Bouton to="/tarifs" variante="secondaire">
              Comparer toutes les formules
            </Bouton>
          </div>
        </div>
      </section>

      <section className="bg-ivoire py-20 sm:py-28">
        <div className="conteneur">
          <EnTete surtitre="Nos autres services" titre="Vous pouvez aussi nous confier…" />
          <div className="mt-12">
            <CartesServices exclure={s.slug} />
          </div>
        </div>
      </section>

      <BandeauDiagnostic />
    </Gabarit>
  );
}

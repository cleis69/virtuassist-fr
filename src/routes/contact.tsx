import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Gabarit, meta } from "@/components/Gabarit";
import { Horloges } from "@/components/Horloges";
import { Rise, TextReveal } from "@/components/motion/TextReveal";
import { FilAriane } from "@/components/ui-va/Blocs";
import { Photo } from "@/components/ui-va/Photo";
import { ENTREPRISE } from "@/content/site";
import { estCleFormule, estCleObjet, OBJETS, type CleFormule, type CleObjet } from "@/lib/formule";

type Recherche = { formule?: CleFormule; objet?: CleObjet };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): Recherche => ({
    ...(estCleFormule(s["formule"]) ? { formule: s["formule"] } : {}),
    ...(estCleObjet(s["objet"]) ? { objet: s["objet"] } : {}),
  }),
  head: () => ({
    meta: meta(
      "Contact et diagnostic gratuit",
      "Demandez votre diagnostic administratif gratuit : nous vous rappelons sous 24 h ouvrées. 30 minutes, un plan de délégation chiffré, sans engagement.",
    ),
  }),
  component: PageContact,
});

const SUITE = [
  { titre: "Nous vous rappelons", texte: "Sous 24 h ouvrées, pour fixer votre diagnostic." },
  {
    titre: "30 minutes d'échange",
    texte: "Nous analysons vos tâches, vos volumes et vos points de blocage.",
  },
  {
    titre: "Un plan chiffré",
    texte: "Vous recevez un plan de délégation chiffré. Sans engagement.",
  },
];

function PageContact() {
  const { formule, objet } = Route.useSearch();
  const reduce = useReducedMotion();

  return (
    <Gabarit>
      <section className="bg-gris">
        <div className="conteneur grid gap-12 py-10 sm:py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-16">
          <div>
            <Rise onMount y={10}>
              <FilAriane etapes={[{ label: "Contact" }]} />
            </Rise>
            <TextReveal
              as="h1"
              onMount
              delay={0.1}
              className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
              segments={[
                { text: "Dites-nous ce qui vous prend" },
                { text: "du temps.", className: "text-turquoise-fonce" },
              ]}
            />
            <Rise onMount delay={0.3}>
              <p className="mt-5 text-lg leading-relaxed text-ardoise sm:text-xl">
                Remplissez le formulaire : nous vous rappelons pour fixer votre diagnostic
                administratif gratuit.
              </p>
            </Rise>

            <ol className="mt-10 space-y-5">
              {SUITE.map((s, i) => (
                <motion.li
                  key={s.titre}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 + i * 0.1 }}
                  className="flex gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-marine font-display text-lg font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold text-marine">{s.titre}</p>
                    <p className="text-ardoise">{s.texte}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <div className="mt-10 hidden lg:block">
              <Photo cle="telephone" ratio={16 / 10} sizes="40vw" />
            </div>
          </div>

          <div id="formulaire">
            <ContactForm
              formuleInitiale={formule ?? "indecis"}
              messageInitial={objet ? OBJETS[objet] : ""}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="conteneur grid gap-5 md:grid-cols-3">
          <a
            href={`tel:${ENTREPRISE.telephone}`}
            className="group rounded-3xl p-7 ring-1 ring-ligne transition-shadow hover:shadow-[0_24px_48px_-28px_rgb(15_42_61/45%)]"
          >
            <Phone className="h-7 w-7 text-turquoise-fonce" aria-hidden="true" />
            <p className="mt-4 font-display text-xl font-semibold text-marine">Par téléphone</p>
            <p className="mt-1 text-lg font-bold text-encre group-hover:underline">
              {ENTREPRISE.telephoneAffiche}
            </p>
            <p className="mt-1 text-ardoise">{ENTREPRISE.jours}</p>
          </a>
          <a
            href={`mailto:${ENTREPRISE.email}`}
            className="group rounded-3xl p-7 ring-1 ring-ligne transition-shadow hover:shadow-[0_24px_48px_-28px_rgb(15_42_61/45%)]"
          >
            <Mail className="h-7 w-7 text-turquoise-fonce" aria-hidden="true" />
            <p className="mt-4 font-display text-xl font-semibold text-marine">Par email</p>
            <p className="mt-1 text-lg font-bold text-encre group-hover:underline">
              {ENTREPRISE.email}
            </p>
            <p className="mt-1 text-ardoise">{ENTREPRISE.jours}</p>
          </a>
          <div className="rounded-3xl bg-gris p-7">
            <p className="font-display text-xl font-semibold text-marine">
              Deux fuseaux, mêmes délais
            </p>
            <Horloges className="mt-3 text-lg text-encre" />
            <p className="mt-2 text-ardoise">{ENTREPRISE.zones}</p>
          </div>
        </div>
      </section>
    </Gabarit>
  );
}

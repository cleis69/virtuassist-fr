import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Ban } from "lucide-react";
import { Gabarit, meta } from "@/components/Gabarit";
import { BandeauDiagnostic } from "@/components/blocs/BandeauDiagnostic";
import { PageHero } from "@/components/blocs/PageHero";
import { Bouton } from "@/components/ui-va/Bouton";
import { EnTete, ListeCoches } from "@/components/ui-va/Blocs";
import { IconeService } from "@/components/ui-va/IconeService";
import { Photo } from "@/components/ui-va/Photo";
import { SERVICES } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: meta(
      "Nos services d'assistance administrative",
      "Facturation et relances, administration quotidienne, données et tableaux de suivi, accompagnement digital, formation : tout ce que VIRTUASSIST prend en charge pour les TPE et PME.",
    ),
  }),
  component: PageServices,
});

function PageServices() {
  return (
    <Gabarit>
      <PageHero
        ariane={[{ label: "Services" }]}
        titre="Ce que nous prenons en charge à votre place."
        intro="Cinq domaines de l'administratif d'une petite entreprise. Vous choisissez ce que vous déléguez, nous le traitons dans le délai de votre formule."
        photo="ecrans"
        actions={
          <>
            <Bouton to="/contact" taille="lg">
              Demander mon diagnostic gratuit
            </Bouton>
            <Bouton to="/tarifs" variante="secondaire" taille="lg" fleche={false}>
              Voir les tarifs
            </Bouton>
          </>
        }
      />

      {/* Sommaire : on voit d'un coup d'œil les cinq services */}
      <nav aria-label="Sommaire des services" className="border-b border-ligne bg-white">
        <ul className="conteneur flex gap-2 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SERVICES.map((s) => (
            <li key={s.slug} className="shrink-0">
              <a
                href={`#${s.slug}`}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-ivoire px-4 py-2 font-display font-medium text-marine transition-colors hover:bg-turquoise-pale"
              >
                <IconeService slug={s.slug} className="h-8 w-8 bg-white" />
                {s.court}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-white py-20 sm:py-28">
        <div className="conteneur space-y-24 sm:space-y-32">
          {SERVICES.map((s, i) => (
            <section
              key={s.slug}
              id={s.slug}
              className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={cn("relative", i % 2 === 1 && "lg:order-2")}>
                <Photo cle={s.photo} ratio={4 / 3} sizes="(min-width: 1024px) 45vw, 100vw" />
                <div className="absolute -bottom-6 left-6 hidden w-40 sm:block">
                  <Photo
                    cle={s.photo2}
                    ratio={1}
                    parallaxe={false}
                    className="rounded-2xl ring-4 ring-white"
                    sizes="160px"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <IconeService slug={s.slug} className="h-14 w-14" />
                <h2 className="mt-5 font-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.015em]">
                  {s.nom}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ardoise">{s.description}</p>
                <ListeCoches className="mt-7" items={s.taches.map((t) => t.titre)} />
                <div className="mt-9">
                  <Bouton to="/services/$slug" params={{ slug: s.slug }}>
                    En savoir plus sur ce service
                  </Bouton>
                </div>
              </motion.div>
            </section>
          ))}
        </div>
      </div>

      <section className="bg-ivoire py-20 sm:py-24">
        <div className="conteneur grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <EnTete
            surtitre="Pour être clair"
            titre="Ce que nous ne faisons pas."
            intro="La comptabilité et le conseil juridique relèvent de professions réglementées. Nous ne les exerçons pas."
          />
          <div className="rounded-3xl bg-white p-7 ring-1 ring-ligne sm:p-9">
            <ul className="space-y-5">
              {[
                [
                  "Comptabilité",
                  "Nous préparons et organisons vos pièces pour votre expert-comptable : il gagne du temps, vous payez moins.",
                ],
                [
                  "Conseil juridique",
                  "Le conseil juridique n'est pas inclus : il relève d'une profession réglementée.",
                ],
                [
                  "Recouvrement judiciaire",
                  "Le recouvrement que nous menons reste strictement amiable, sans procédure contentieuse.",
                ],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivoire text-ardoise">
                    <Ban className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-marine">{t}</p>
                    <p className="mt-1 text-ardoise">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <BandeauDiagnostic titre="Vous hésitez entre plusieurs services ? Le diagnostic est fait pour ça." />
    </Gabarit>
  );
}

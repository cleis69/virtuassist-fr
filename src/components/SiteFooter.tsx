import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { LogoMark } from "./Logo";
import { Horloges } from "./Horloges";
import { SectionLink } from "./SectionLink";

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // Le logotype monte à mesure que la page se termine.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["45%", "0%"]);

  return (
    <footer
      ref={ref}
      className="grain relative overflow-hidden bg-nuit-deep text-on-nuit pb-[calc(var(--bottom-nav)+env(safe-area-inset-bottom))] lg:pb-0"
    >
      <div className="mx-auto max-w-[1320px] px-5 pt-20 sm:px-8 sm:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <LogoMark tone="clair" className="h-10 w-auto" />
            <p className="mt-6 font-display text-3xl leading-tight text-on-nuit">
              Votre administratif,
              <br />
              <span className="texte-marque-clair italic">notre priorité.</span>
            </p>
            <p className="mt-4 text-sm text-on-nuit-muted">France métropolitaine · La Réunion</p>
          </div>

          <div>
            <p className="label-section text-vague">Le site</p>
            <ul className="mt-5 space-y-3 text-sm text-on-nuit-muted">
              {(
                [
                  ["services", "Nos prestations"],
                  ["methode", "Comment ça marche"],
                  ["offres", "Les offres"],
                  ["faq", "FAQ"],
                ] as const
              ).map(([id, label]) => (
                <li key={id}>
                  <SectionLink to={id} className="transition-colors hover:text-on-nuit">
                    {label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-section text-vague">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-on-nuit-muted">
              <li>
                <a
                  className="transition-colors hover:text-on-nuit"
                  href="mailto:contact@virtuassist.fr"
                >
                  contact@virtuassist.fr
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-on-nuit" href="tel:+33000000000">
                  +33 (0)0 00 00 00 00
                </a>
              </li>
              <li>Du lundi au samedi</li>
            </ul>
          </div>

          <div>
            <p className="label-section text-vague">Informations</p>
            <ul className="mt-5 space-y-3 text-sm text-on-nuit-muted">
              <li>
                <Link className="transition-colors hover:text-on-nuit" to="/mentions-legales">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-on-nuit" to="/cgv">
                  CGV
                </Link>
              </li>
            </ul>
            <Horloges className="mt-6 text-on-nuit-muted" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-on-nuit/12 pt-6 text-xs text-on-nuit-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VIRTUASSIST. Tous droits réservés.</p>
          <p>Tarifs indiqués hors taxes.</p>
        </div>
      </div>

      {/* Le logotype, à la largeur de la page */}
      <div aria-hidden="true" className="mt-6 overflow-hidden px-3 sm:px-5">
        <motion.p
          style={{ y }}
          className="select-none whitespace-nowrap text-center font-display text-[18.5vw] leading-[0.78] tracking-[-0.03em] text-on-nuit/95"
        >
          VIRTU<em className="texte-marque-clair pr-[0.04em]">ASSIST</em>
        </motion.p>
      </div>
    </footer>
  );
}

import { motion, useReducedMotion } from "motion/react";
import { CountUp } from "@/components/motion/CountUp";

const CHIFFRES: { avant?: string; valeur: number; apres: string; texte: string }[] = [
  { avant: "dès", valeur: 250, apres: "€ HT", texte: "par mois, pour 10 h de travail délégué" },
  { valeur: 24, apres: "h", texte: "ouvrées de délai de traitement en Premium" },
  { valeur: 6, apres: "j / 7", texte: "du lundi au samedi, selon votre formule" },
  { valeur: 30, apres: "jours", texte: "d'essai, sans engagement de durée" },
];

/** Les engagements chiffrés, tirés des conditions générales. */
export function Chiffres() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="Nos engagements en chiffres" className="border-y border-ligne bg-white">
      <ul className="conteneur grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
        {CHIFFRES.map((c, i) => (
          <motion.li
            key={c.texte}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            className="lg:border-l lg:border-ligne lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <p className="font-display text-marine">
              {c.avant && (
                <span className="mr-1.5 text-lg font-medium text-ardoise">{c.avant}</span>
              )}
              <CountUp
                to={c.valeur}
                className="text-4xl font-semibold tracking-tight sm:text-5xl"
              />
              <span className="ml-1.5 text-xl font-medium text-turquoise-fonce">{c.apres}</span>
            </p>
            <p className="mt-2 text-[0.95rem] leading-snug text-ardoise sm:text-base">{c.texte}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

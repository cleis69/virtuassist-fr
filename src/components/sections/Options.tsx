import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const OPTIONS: [string, string][] = [
  ["Heure supplémentaire", "30 € HT / h"],
  ["Pack 5 heures", "140 € HT"],
  ["Pack 10 heures", "270 € HT"],
  ["Traitement urgent", "+ 25 %"],
  ["Site vitrine", "à partir de 790 € HT"],
  ["Maintenance de site", "à partir de 59 € HT / mois"],
  ["Tableaux de bord, analyse de données, formations", "sur devis"],
];

/**
 * Les options, présentées comme ce qu'elles sont : un barème. La feuille se
 * pose sur le bureau à mesure qu'on arrive dessus.
 */
export function Options() {
  const feuille = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: feuille, offset: ["start end", "start 0.3"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [34, 0]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-4, -0.6]);

  return (
    <section aria-labelledby="titre-options" className="regle relative overflow-hidden bg-ivoire-2">
      <div className="mx-auto max-w-[1320px] px-5 py-28 sm:px-8 sm:py-36 [perspective:1600px]">
        <motion.div
          ref={feuille}
          style={{ rotateX, y, rotateZ, transformOrigin: "50% 0%" }}
          className="feuille relative mx-auto max-w-3xl rounded-[6px] px-6 py-10 sm:px-14 sm:py-14"
        >
          <div className="flex flex-col gap-6 border-b-2 border-nuit pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-section text-vague-profonde">Options</p>
              <h2 id="titre-options" className="mt-4 font-display text-4xl text-nuit sm:text-6xl">
                Au-delà du forfait.
              </h2>
            </div>
            <p className="font-mono text-xs text-ardoise sm:text-right">
              Barème
              <br />
              Tarifs hors taxes
            </p>
          </div>

          <dl className="mt-2">
            {OPTIONS.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={reduce ? false : { opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.06 }}
                className="flex items-baseline gap-3 border-b border-nuit/10 py-4 sm:py-5"
              >
                <dt className="text-[0.95rem] text-nuit sm:text-base">{k}</dt>
                <span
                  aria-hidden="true"
                  className="min-w-6 flex-1 -translate-y-1 border-b border-dotted border-nuit/30"
                />
                <dd className="shrink-0 text-right font-mono text-[0.8rem] font-medium text-nuit sm:text-sm">
                  {v}
                </dd>
              </motion.div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-sm leading-relaxed text-ardoise">
              Dès 90 % du forfait consommé, nous vous prévenons. Rien n'est facturé sans votre
              accord.
            </p>
            <span
              aria-hidden="true"
              className="inline-flex w-fit -rotate-6 rounded-md border-2 border-vague-profonde/70 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-vague-profonde/80"
            >
              Sur accord
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

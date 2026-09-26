import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ScrubText } from "@/components/motion/ScrubText";

const CONSTATS = [
  {
    theme: "Temps",
    titre: "Du temps perdu sur l'administratif",
    texte:
      "Des heures chaque semaine qui ne produisent ni chiffre d'affaires ni satisfaction client.",
  },
  {
    theme: "Trésorerie",
    titre: "Des factures impayées qui traînent",
    texte: "Sans relance méthodique, la trésorerie s'érode et les retards deviennent la norme.",
  },
  {
    theme: "Suivi",
    titre: "Des dossiers clients mal suivis",
    texte: "Documents dispersés, échéances oubliées, informations impossibles à retrouver.",
  },
  {
    theme: "Coût",
    titre: "Recruter coûte trop cher",
    texte: "Un poste à temps plein pour un besoin partiel : la charge fixe est disproportionnée.",
  },
];

export function Constat() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Le mot de fond glisse à contre-sens de la lecture.
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-38%"]);

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-nuit text-on-nuit">
      <motion.p
        aria-hidden="true"
        style={{ x }}
        className="contour pointer-events-none absolute top-10 left-0 whitespace-nowrap font-display text-[22vw] leading-none text-on-nuit/[0.07] select-none"
      >
        Administratif · Relances · Devis
      </motion.p>

      <div className="relative mx-auto max-w-[1320px] px-5 py-28 sm:px-8 sm:py-36">
        <p className="label-section text-vague">Le constat</p>
        <ScrubText
          as="h2"
          text="Diriger une entreprise, ce n'est pas passer ses journées dans les devis et les relances."
          className="mt-8 max-w-[22ch] font-display text-[clamp(2.3rem,5.4vw,5rem)] leading-[1.02] tracking-[-0.015em]"
        />

        <ul className="mt-20 grid gap-4 [perspective:1400px] sm:grid-cols-2 lg:mt-28 lg:gap-5">
          {CONSTATS.map((c, i) => (
            <motion.li
              key={c.titre}
              initial={reduce ? false : { opacity: 0, rotateX: 38, y: 90, z: -60 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.12 }}
              style={{ transformOrigin: "50% 100%" }}
              className="group relative overflow-hidden rounded-3xl bg-on-nuit/[0.04] p-7 ring-1 ring-on-nuit/12 transition-colors duration-500 hover:bg-on-nuit/[0.07] sm:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="label-section text-on-nuit-muted">{c.theme}</span>
                <span aria-hidden="true" className="flex flex-col items-end gap-1">
                  <span className="block h-[3px] w-8 rounded-full bg-on-nuit/60 transition-all duration-500 group-hover:w-10" />
                  <span className="block h-[3px] w-5 rounded-full bg-on-nuit/40 transition-all duration-500 group-hover:w-7" />
                  <span className="block h-[3px] w-3 rounded-full bg-vague transition-all duration-500 group-hover:w-4" />
                </span>
              </div>
              <h3 className="mt-10 font-display text-3xl leading-tight sm:text-[2.35rem]">
                {c.titre}
              </h3>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-on-nuit-muted">
                {c.texte}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

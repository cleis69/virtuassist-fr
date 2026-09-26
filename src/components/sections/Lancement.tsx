import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check } from "lucide-react";
import { useRef } from "react";
import { Cta } from "@/components/SectionLink";
import { TextReveal } from "@/components/motion/TextReveal";

const AVANTAGES = [
  "Diagnostic de démarrage offert",
  "Installation de l'espace VIRTUASSIST offerte (valeur 150 € HT)",
  "+2 h offertes le premier mois sur Sérénité",
  "+4 h offertes le premier mois sur Premium",
  "Tarif garanti 12 mois",
  "10 places seulement",
];

export function Lancement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Le chiffre pivote dans l'espace pendant qu'on passe devant.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["16%", "-16%"]);
  const rotateY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-28, 22]);
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [10, -8]);

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-nuit-deep text-on-nuit">
      <div className="mx-auto grid max-w-[1320px] items-center gap-6 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex justify-center [perspective:1100px] lg:justify-start">
          <motion.p
            aria-hidden="true"
            style={{ y, rotateY, rotateX }}
            className="texte-marque-clair select-none font-display text-[52vw] leading-[0.78] tracking-[-0.06em] sm:text-[40vw] lg:text-[28rem]"
          >
            10
          </motion.p>
        </div>

        <div>
          <p className="label-section text-vague">Offre de lancement</p>
          <TextReveal
            className="mt-6 font-display text-[clamp(2.6rem,5.2vw,4.8rem)] leading-[0.98] tracking-[-0.015em]"
            segments={[
              { text: "10 Entreprises", br: true },
              { text: "Fondatrices", className: "italic texte-marque-clair" },
            ]}
          />
          <p className="mt-6 max-w-lg text-on-nuit-muted sm:text-lg">
            Les dix premières entreprises accompagnées bénéficient de conditions que nous ne
            reproposerons pas.
          </p>

          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {AVANTAGES.map((a, i) => (
              <motion.li
                key={a}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                className="flex gap-3 border-t border-on-nuit/12 py-4 text-[0.95rem]"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-vague"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span>{a}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10">
            <Cta to="contact" variante="clair">
              Réserver ma place
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}

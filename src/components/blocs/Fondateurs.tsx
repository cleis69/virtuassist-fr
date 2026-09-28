import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Bouton } from "@/components/ui-va/Bouton";
import { ListeCoches } from "@/components/ui-va/Blocs";
import { Photo } from "@/components/ui-va/Photo";
import { TextReveal } from "@/components/motion/TextReveal";
import { FONDATEURS } from "@/content/site";

/** L'offre de lancement : 10 entreprises fondatrices. */
export function Fondateurs() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-22, 18]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["12%", "-12%"]);

  return (
    <section ref={ref} className="bg-white py-16 sm:py-24">
      <div className="conteneur">
        <div className="relative grid overflow-hidden rounded-[2rem] bg-ivoire-fonce lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative">
            <Photo
              cle="accord"
              ratio={1}
              className="h-full rounded-none lg:aspect-auto!"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center [perspective:900px]">
              <motion.p
                aria-hidden="true"
                style={{ rotateY, y }}
                className="font-display text-[9rem] font-bold leading-none tracking-[-0.06em] text-white drop-shadow-[0_20px_40px_rgb(15_42_61/50%)] sm:text-[12rem]"
              >
                10
              </motion.p>
            </div>
          </div>
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="surtitre">Offre de lancement</p>
            <TextReveal className="mt-4 font-display text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
              10 entreprises fondatrices
            </TextReveal>
            <p className="mt-4 text-lg text-ardoise">
              Les dix premières entreprises accompagnées bénéficient de conditions que nous ne
              reproposerons pas.
            </p>
            <ListeCoches className="mt-7" items={FONDATEURS} />
            <div className="mt-9">
              <Bouton to="/contact" search={{ objet: "fondateurs" }} taille="lg">
                Réserver ma place
              </Bouton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Photo } from "@/components/ui-va/Photo";
import { ETAPES } from "@/content/site";
import { cn } from "@/lib/utils";

/** Les quatre étapes, en ligne : une frise qui se remplit au défilement. */
export function EtapesFrise() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  const progres = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-1 rounded-full bg-marine/10 lg:block"
      >
        <motion.div
          style={{ scaleX: reduce ? 1 : progres }}
          className="h-full origin-left rounded-full bg-turquoise"
        />
      </div>
      <ol ref={ref} className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {ETAPES.map((e, i) => (
          <motion.li
            key={e.titre}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
            className="flex gap-5 lg:flex-col lg:items-center lg:text-center"
          >
            <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-marine font-display text-xl font-semibold text-white ring-8 ring-white">
              {i + 1}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold leading-snug lg:mt-5">{e.titre}</h3>
              <p className="mt-2 text-ardoise">{e.texte}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/** Les quatre étapes en détail, chacune avec sa photo, en alternance. */
export function EtapesDetail() {
  return (
    <ol className="space-y-20 sm:space-y-28">
      {ETAPES.map((e, i) => (
        <li key={e.titre} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <Photo
            cle={e.photo}
            ratio={4 / 3}
            className={cn(i % 2 === 1 && "lg:order-2")}
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-marine font-display text-xl font-semibold text-white">
                {i + 1}
              </span>
              <span className="font-display text-lg font-medium text-turquoise-fonce">
                Étape {i + 1} sur {ETAPES.length}
              </span>
            </p>
            <h2 className="mt-6 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.015em]">
              {e.titre}
            </h2>
            <p className="mt-4 text-lg font-bold text-encre">{e.texte}</p>
            <p className="mt-3 text-lg leading-relaxed text-ardoise">{e.detail}</p>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}

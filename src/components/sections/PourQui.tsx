import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Fragment, useRef } from "react";
import { Marquee } from "@/components/motion/Marquee";
import { TextReveal } from "@/components/motion/TextReveal";

const SECTEURS = [
  "Artisans et bâtiment",
  "Cabinets et professions libérales",
  "Agences immobilières",
  "Sociétés de services",
  "Consultants",
  "Organismes de formation",
  "Transport",
  "Commerçants",
  "Indépendants",
  "Petites PME",
];

function Rangee({ items, italique = false }: { items: string[]; italique?: boolean }) {
  return (
    <>
      {items.map((s) => (
        <Fragment key={s}>
          <span
            className={
              italique
                ? "px-6 font-display text-5xl italic text-vague-profonde sm:px-10 sm:text-7xl lg:text-8xl"
                : "px-6 font-display text-5xl text-nuit sm:px-10 sm:text-7xl lg:text-8xl"
            }
          >
            {s}
          </span>
          <span className="flex items-center" aria-hidden="true">
            <span className="block h-2 w-8 rounded-full bg-vague sm:h-2.5 sm:w-12" />
          </span>
        </Fragment>
      ))}
    </>
  );
}

export function PourQui() {
  return (
    <section
      aria-labelledby="titre-pour-qui"
      className="relative overflow-hidden bg-ivoire py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <p className="label-section text-vague-profonde">Pour qui</p>
        <TextReveal
          className="mt-6 max-w-[16ch] font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1] tracking-[-0.015em] text-nuit"
          segments={[
            { text: "Des structures qui n'ont pas" },
            { text: "de service administratif.", className: "italic text-vague-profonde" },
          ]}
        />
        <span id="titre-pour-qui" className="sr-only">
          Pour qui
        </span>
      </div>

      <ul className="sr-only">
        {SECTEURS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div className="mt-16 space-y-2 sm:mt-20 sm:space-y-4">
        <Marquee speed={2.4} className="overflow-hidden py-2">
          <Rangee items={SECTEURS.slice(0, 5)} />
        </Marquee>
        <Marquee speed={1.9} reverse className="overflow-hidden py-2">
          <Rangee items={SECTEURS.slice(5)} italique />
        </Marquee>
      </div>
    </section>
  );
}

/** Le sceau « sans engagement » tourne au rythme du défilement. */
export function Garantie() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-90, 200]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [40, 0, -30]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-papier">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 py-28 sm:px-8 sm:py-32 lg:grid-cols-[1fr_auto] lg:gap-24">
        <div>
          <p className="label-section text-vague-profonde">Sans engagement de durée</p>
          <TextReveal
            className="mt-6 max-w-[20ch] font-display text-[clamp(2.2rem,4.2vw,4rem)] leading-[1.02] tracking-[-0.015em] text-nuit"
            segments={[
              { text: "Testez VIRTUASSIST pendant" },
              { text: "30 jours", className: "italic text-vague-profonde" },
              { text: "sans engagement de durée." },
            ]}
          />
          <p className="mt-6 max-w-lg text-ardoise sm:text-lg">
            Vous arrêtez quand vous voulez, avec un préavis de 30 jours. Vos documents vous sont
            restitués intégralement.
          </p>
        </div>

        <div className="justify-self-center [perspective:900px]">
          <motion.div style={{ rotateX }} className="relative h-56 w-56 sm:h-72 sm:w-72">
            <motion.svg
              style={{ rotate }}
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="cercle-sceau"
                  d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                />
              </defs>
              <circle
                cx="100"
                cy="100"
                r="96"
                fill="none"
                stroke="var(--nuit)"
                strokeOpacity="0.12"
              />
              <text className="fill-nuit font-mono text-[10px] uppercase">
                <textPath href="#cercle-sceau" textLength="486" lengthAdjust="spacing">
                  Sans engagement de durée · Préavis 30 jours · Documents restitués ·
                </textPath>
              </text>
            </motion.svg>
            <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-nuit text-on-nuit">
              <span className="font-display text-5xl leading-none sm:text-6xl">30</span>
              <span className="label-section mt-1 text-vague">jours</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

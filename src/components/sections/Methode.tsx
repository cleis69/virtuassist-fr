import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Cta } from "@/components/SectionLink";
import { TextReveal } from "@/components/motion/TextReveal";

const ETAPES = [
  {
    n: "01",
    t: "Diagnostic administratif gratuit",
    d: "Nous analysons vos tâches, vos volumes et vos points de blocage.",
  },
  {
    n: "02",
    t: "Plan de délégation",
    d: "Nous définissons ce que nous prenons en charge et selon quels délais.",
  },
  {
    n: "03",
    t: "Mise en place de votre espace",
    d: "Transmission des documents, procédures, accès et interlocuteur dédié.",
  },
  {
    n: "04",
    t: "Suivi et reporting réguliers",
    d: "Vous gardez la visibilité : tableaux de suivi et points planifiés.",
  },
];

/*
 * Le tracé du logo, prolongé en vague verticale : il passe par chaque étape
 * et se dessine au rythme de la lecture. Les croisements avec l'axe (y = 0,
 * 250, 500, 750) tombent en haut de chaque étape, d'égale hauteur.
 */
const VAGUE =
  "M30 0 C 56 62, 56 188, 30 250 C 4 312, 4 438, 30 500 C 56 562, 56 688, 30 750 C 4 812, 4 938, 30 1000";

export function Methode() {
  const liste = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: liste, offset: ["start 0.72", "end 0.55"] });
  const trace = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="methode" className="relative bg-papier">
      <div className="mx-auto grid max-w-[1320px] gap-16 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="label-section text-vague-profonde">Comment ça marche</p>
          <TextReveal
            className="mt-6 max-w-[13ch] font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1] tracking-[-0.015em] text-nuit"
            segments={[
              { text: "Quatre étapes," },
              {
                text: "sans bouleverser votre organisation.",
                className: "italic text-vague-profonde",
              },
            ]}
          />
          <p className="mt-8 max-w-sm text-ardoise">
            La première ne vous coûte rien : trente minutes d'échange, et un plan de délégation
            chiffré à la clé.
          </p>
          <div className="mt-10">
            <Cta to="contact">Commencer par le diagnostic</Cta>
          </div>
        </div>

        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 60 1000"
            preserveAspectRatio="none"
            className="absolute top-0 left-0 h-full w-12 overflow-visible sm:w-16"
          >
            <path
              d={VAGUE}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-nuit/10"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="trace-methode" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--nuit)" />
                <stop offset="0.55" stopColor="var(--bleu-clair)" />
                <stop offset="1" stopColor="var(--vague)" />
              </linearGradient>
            </defs>
            <motion.path
              d={VAGUE}
              fill="none"
              stroke="url(#trace-methode)"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: trace }}
            />
          </svg>

          <ol ref={liste} className="grid auto-rows-fr">
            {ETAPES.map((e, i) => (
              <Etape key={e.n} e={e} i={i} progress={trace} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Etape({
  e,
  i,
  progress,
}: {
  e: (typeof ETAPES)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const seuil = i / ETAPES.length;
  const allume = useTransform(progress, [seuil - 0.02, seuil + 0.05], [0, 1]);
  const opacity = useTransform(allume, [0, 1], [0.32, 1]);
  const x = useTransform(allume, [0, 1], [18, 0]);
  const scale = useTransform(allume, [0, 1], [0.4, 1]);

  return (
    <li className="relative min-h-[15rem] pb-14 pl-20 sm:min-h-[17rem] sm:pl-28">
      {/* Nœud posé sur le tracé */}
      <span aria-hidden="true" className="absolute top-0 left-6 -translate-x-1/2 sm:left-8">
        <span className="block h-4 w-4 rounded-full bg-papier ring-2 ring-nuit/15" />
        <motion.span
          style={{ scale }}
          className="absolute inset-0 rounded-full bg-vague ring-4 ring-vague/25"
        />
      </span>

      <motion.div style={{ opacity, x }} className="-mt-3">
        <p className="flex items-baseline gap-4">
          <span className="font-display text-6xl leading-none text-vague-profonde sm:text-7xl">
            {e.n}
          </span>
          <span className="label-section text-ardoise">Étape</span>
        </p>
        <h3 className="mt-5 text-xl font-semibold text-nuit sm:text-2xl">{e.t}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-ardoise">{e.d}</p>
      </motion.div>
    </li>
  );
}

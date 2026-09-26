import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState, type CSSProperties } from "react";
import { BarBullet } from "@/components/Bars";
import { TextReveal } from "@/components/motion/TextReveal";
import { scrollToY } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const PRESTATIONS = [
  {
    onglet: "Facturation",
    titre: "Gestion commerciale et facturation",
    points: [
      "Devis et factures",
      "Suivi des règlements",
      "Relances clients",
      "Recouvrement amiable",
    ],
    fond: "bg-papier",
    texte: "text-nuit",
  },
  {
    onglet: "Administration",
    titre: "Administration quotidienne",
    points: ["Secrétariat externalisé", "Courriers", "Classement", "Suivi des dossiers"],
    fond: "bg-[oklch(0.95_0.018_225)]",
    texte: "text-nuit",
  },
  {
    onglet: "Données",
    titre: "Données et gestion",
    points: ["Saisie et traitement", "Mise à jour", "Tableaux de suivi", "Reporting"],
    fond: "bg-vague-clair",
    texte: "text-nuit",
  },
  {
    onglet: "Digital",
    titre: "Accompagnement digital",
    points: ["Création de sites internet", "Gestion des contenus", "Maintenance"],
    fond: "bg-ivoire-2",
    texte: "text-nuit",
  },
  {
    onglet: "Formation",
    titre: "Formation",
    points: ["Bureautique", "Organisation administrative", "Gestion"],
    fond: "bg-nuit",
    texte: "text-on-nuit",
  },
];

const N = PRESTATIONS.length;

function Entete({ className }: { className?: string | undefined }) {
  return (
    <div className={className}>
      <p className="label-section text-vague-profonde">Nos prestations</p>
      <TextReveal
        className="mt-6 max-w-[14ch] font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1] tracking-[-0.015em] text-nuit"
        segments={[
          { text: "Ce que nous prenons en charge" },
          { text: "à votre place.", className: "italic text-vague-profonde" },
        ]}
      />
    </div>
  );
}

/**
 * Les prestations rangées comme des dossiers suspendus : on feuillette le
 * tiroir en descendant. Chaque onglet reste visible, on sait toujours ce
 * qui vient.
 */
export function Classeur() {
  const piste = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: piste, offset: ["start start", "end end"] });
  const q = useTransform(scrollYProgress, [0.04, 0.96], [0, N - 1], { clamp: true });
  const [actif, setActif] = useState(0);
  // Le dossier qui bascule s'efface vite : le suivant devient actif un peu avant la moitié.
  useMotionValueEvent(q, "change", (v) => setActif(Math.min(N - 1, Math.round(v + 0.15))));

  const allerA = (i: number) => {
    const el = piste.current;
    if (!el) return;
    const debut = el.getBoundingClientRect().top + window.scrollY;
    const course = el.offsetHeight - window.innerHeight;
    scrollToY(debut + course * (0.04 + (i / (N - 1)) * 0.92) + 2);
  };

  return (
    <section id="services" className="relative bg-ivoire">
      <Entete className="mx-auto max-w-[1320px] px-5 pt-28 sm:px-8 lg:hidden" />

      <div ref={piste} className="relative h-[330vh] lg:h-[400vh] motion-reduce:h-auto!">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden motion-reduce:static! motion-reduce:h-auto! motion-reduce:overflow-visible! motion-reduce:py-16">
          <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-5 pt-16 pb-28 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-0">
            <div className="hidden lg:block">
              <Entete />
              <ol className="mt-12 border-t border-nuit/10 motion-reduce:hidden">
                {PRESTATIONS.map((p, i) => (
                  <li key={p.onglet} className="border-b border-nuit/10">
                    <button
                      type="button"
                      onClick={() => allerA(i)}
                      aria-current={actif === i ? "step" : undefined}
                      className={cn(
                        "group flex w-full items-center justify-between py-3.5 text-left transition-colors duration-500",
                        actif === i ? "text-nuit" : "text-ardoise/55 hover:text-nuit",
                      )}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "block h-[3px] rounded-full bg-vague-profonde transition-all duration-500",
                            actif === i ? "w-8" : "w-0",
                          )}
                        />
                        <span className="text-lg font-semibold">{p.onglet}</span>
                      </span>
                      <span className="font-mono text-xs">{p.points.length} tâches</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Repère mobile */}
            <div
              className="flex items-center justify-between lg:hidden motion-reduce:hidden"
              aria-hidden="true"
            >
              <span className="font-display text-2xl text-nuit">{PRESTATIONS[actif]?.onglet}</span>
              <span className="flex gap-1.5">
                {PRESTATIONS.map((p, i) => (
                  <span
                    key={p.onglet}
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-500",
                      i === actif ? "w-6 bg-vague-profonde" : "w-1.5 bg-nuit/20",
                    )}
                  />
                ))}
              </span>
            </div>

            <div className="relative [perspective:1800px] motion-reduce:[perspective:none]">
              <div
                className="relative mx-auto mt-16 aspect-[1/1.18] w-full max-w-[40rem] [transform-style:preserve-3d] sm:aspect-[1.25/1] lg:mt-24 motion-reduce:mt-0! motion-reduce:aspect-auto! motion-reduce:space-y-6"
                style={{ transform: "rotateX(8deg)" }}
              >
                {PRESTATIONS.map((p, i) => (
                  <Dossier key={p.onglet} p={p} i={i} q={q} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dossier({
  p,
  i,
  q,
}: {
  p: (typeof PRESTATIONS)[number];
  i: number;
  q: MotionValue<number>;
}) {
  const transform = useTransform(q, (v) => {
    const d = i - v;
    if (d >= 0) {
      // Dans le tiroir : les suivants reculent et dépassent par le haut.
      return `translate3d(0, ${-d * 10}%, ${-d * 80}px) scale(${1 - d * 0.035})`;
    }
    // Sorti du tiroir : le dossier bascule vers nous autour de son bord
    // bas, comme une chemise suspendue qu'on rabat pour voir la suivante.
    const e = Math.min(1, -d);
    return `translate3d(0, ${e * 14}%, ${e * 60}px) rotateX(${-e * 88}deg)`;
  });
  const opacity = useTransform(q, (v) => {
    const d = i - v;
    if (d >= 0) return Math.max(0, Math.min(1, 4 - d));
    return Math.max(0, 1 - Math.min(1, -d) * 1.8);
  });

  return (
    <motion.article
      style={{ transform, opacity, transformOrigin: "50% 100%" }}
      className="absolute inset-0 will-change-transform motion-reduce:relative! motion-reduce:transform-none! motion-reduce:opacity-100!"
    >
      {/* Onglet du dossier */}
      <div
        className={cn(
          "absolute -top-9 left-[calc(var(--i)_*_(100%_-_var(--onglet))_/_4)] flex h-10 w-[var(--onglet)] items-center rounded-t-xl px-3 [--onglet:36%] sm:-top-10 sm:h-11 sm:px-4 sm:[--onglet:28%]",
          p.fond,
          p.texte,
        )}
        style={{ "--i": i } as CSSProperties}
      >
        <span className="truncate font-mono text-[0.62rem] font-medium uppercase tracking-[0.06em] sm:text-[0.7rem] sm:tracking-[0.12em]">
          {p.onglet}
        </span>
      </div>

      <div
        className={cn(
          "relative flex h-full flex-col rounded-2xl p-6 shadow-[0_2px_2px_oklch(0.27_0.05_242/6%),0_40px_70px_-40px_oklch(0.27_0.05_242/55%)] ring-1 ring-nuit/[0.06] sm:p-10",
          p.fond,
          p.texte,
        )}
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "label-section",
              p.fond === "bg-nuit" ? "text-vague" : "text-vague-profonde",
            )}
          >
            Dossier {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs opacity-60">
            {p.points.length} tâches<span className="hidden sm:inline"> prises en charge</span>
          </span>
        </div>

        <h3 className="mt-4 max-w-[16ch] font-display text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1.02] sm:mt-6">
          {p.titre}
        </h3>

        <ul className="mt-auto grid gap-x-8 gap-y-2 pt-6 text-[0.9rem] sm:grid-cols-2 sm:gap-y-3 sm:pt-8 sm:text-base">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-3 border-t border-current/10 pt-2 sm:pt-3">
              <BarBullet className={p.fond === "bg-nuit" ? "bg-vague" : undefined} />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

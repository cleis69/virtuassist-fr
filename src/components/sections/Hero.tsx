import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTime,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { Bars } from "@/components/Bars";
import { Cta } from "@/components/SectionLink";
import { Rise, TextReveal } from "@/components/motion/TextReveal";
import { useFinePointer, useMedia } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

/* ───────────────────────── outils d'interpolation ───────────────────────── */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const segment = (p: number, from: number, to: number) => clamp01((p - from) / (to - from));

/* ───────────────────────── la pile de documents ─────────────────────────
 * Chaque pièce part d'une position éparse (x et y en % de sa propre taille,
 * z en px, rotations en degrés) et rejoint la pile rangée. Le défilement
 * pilote tout : on descend, le bureau se range.
 */

type Doc = {
  kind: "suivi" | "courrier" | "devis" | "dossier" | "relance" | "facture" | "postit";
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  /** Position finale dans la pile. */
  fx: number;
  fy: number;
  frz: number;
};

const DOCS: Doc[] = [
  { kind: "suivi", x: -6, y: -6, z: -150, rx: 6, ry: -10, rz: -5, fx: 0, fy: 0, frz: 2 },
  { kind: "courrier", x: 56, y: -40, z: -70, rx: -8, ry: 18, rz: 9, fx: 0, fy: -0.8, frz: -1.5 },
  { kind: "devis", x: -58, y: -34, z: -20, rx: 10, ry: -16, rz: -11, fx: 0, fy: -1.6, frz: 1 },
  { kind: "dossier", x: 52, y: 40, z: 30, rx: -10, ry: -14, rz: 7, fx: 0, fy: -2.4, frz: -2 },
  { kind: "relance", x: -54, y: 44, z: 70, rx: 8, ry: 14, rz: -8, fx: 0, fy: -3.2, frz: 1.5 },
  { kind: "facture", x: 4, y: 4, z: 130, rx: -4, ry: 8, rz: 3, fx: 0, fy: -4, frz: -0.5 },
  { kind: "postit", x: 88, y: -18, z: 200, rx: 0, ry: -12, rz: 12, fx: 58, fy: -52, frz: -7 },
];

const N = DOCS.length;
const docWindow = (i: number) => {
  const start = 0.05 + i * 0.045;
  return [start, start + 0.3] as const;
};
const DERNIER_RANGE = docWindow(N - 1)[1];

/* ───────────────────────── section ───────────────────────── */

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const piste = useRef<HTMLDivElement>(null);
  const desktop = useMedia("(min-width: 1024px)");
  const reduce = useReducedMotion();

  // Sur grand écran, toute la section est épinglée. Sur mobile, le titre
  // défile normalement et seule la scène a sa propre piste.
  const { scrollYProgress: pSection } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: pPiste } = useScroll({
    target: piste,
    offset: ["start start", "end end"],
  });
  // -1 tant que le client ne sait pas encore sur quel écran il tourne :
  // la scène reste éparse, sans éclair de l'état rangé.
  const mode = useMotionValue(-1);
  useEffect(() => {
    mode.set(reduce ? 2 : desktop ? 1 : 0);
  }, [desktop, reduce, mode]);
  const progress = useTransform([pSection, pPiste, mode], ([a = 0, b = 0, m = -1]: number[]) =>
    m === -1 ? 0 : m === 2 ? 1 : m === 1 ? a : b,
  );

  const indice = useTransform(progress, [0, 0.08], [1, 0]);

  return (
    <section
      id="top"
      ref={section}
      className="relative bg-ivoire lg:h-[240vh] motion-reduce:h-auto!"
      aria-labelledby="titre-accueil"
    >
      <div className="relative lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden motion-reduce:static! motion-reduce:h-auto!">
        {/* Papier réglé et grand motif de marque en filigrane */}
        <div aria-hidden="true" className="regle pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-16 hidden flex-col items-end gap-8 opacity-[0.035] lg:flex"
        >
          <span className="block h-10 w-[46rem] rounded-full bg-nuit" />
          <span className="block h-10 w-[32rem] rounded-full bg-nuit" />
          <span className="block h-10 w-[18rem] rounded-full bg-vague" />
        </div>

        <div className="relative mx-auto grid max-w-[1320px] px-5 sm:px-8 lg:h-full lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-6 motion-reduce:lg:py-40">
          <HeroCopy />

          <div
            ref={piste}
            className="relative h-[190vh] overflow-x-clip lg:h-full lg:overflow-visible motion-reduce:h-auto!"
          >
            <div className="sticky top-0 flex h-svh items-center justify-center pt-20 pb-28 lg:static lg:h-full lg:py-0 motion-reduce:static! motion-reduce:h-[34rem]!">
              <Scene progress={progress} />
            </div>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ opacity: indice }}
          className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        >
          <span className="label-section text-ardoise">Faites défiler, on range</span>
          <span className="block h-10 w-px overflow-hidden bg-nuit/15">
            <span className="block h-4 w-px bg-vague-profonde [animation:indice_1.8s_ease-in-out_infinite]" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <div className="relative z-10 pt-32 pb-4 sm:pt-36 lg:py-0">
      <Rise onMount delay={0.05} y={14}>
        <div className="flex items-center gap-4">
          <Bars />
          <span className="label-section text-vague-profonde">
            Assistance administrative externalisée
          </span>
        </div>
      </Rise>

      <TextReveal
        as="h1"
        onMount
        delay={0.18}
        className="mt-7 max-w-[15ch] font-display text-[clamp(2.75rem,5vw,5rem)] leading-[0.98] tracking-[-0.02em] text-nuit"
        segments={[
          { text: "Vous développez votre entreprise.", br: true },
          { text: "Nous gérons votre administratif.", className: "texte-marque italic" },
        ]}
      />
      <span id="titre-accueil" className="sr-only">
        Vous développez votre entreprise. Nous gérons votre administratif.
      </span>

      <Rise onMount delay={0.75}>
        <p className="mt-7 max-w-md text-base leading-relaxed text-ardoise sm:text-lg">
          Pour les TPE, PME, indépendants et professionnels, en France métropolitaine et à La
          Réunion.
        </p>
      </Rise>

      <Rise onMount delay={0.9}>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Cta to="contact" pleineLargeur>
            Demander mon diagnostic gratuit
          </Cta>
          <Cta to="offres" variante="contour" fleche={false} pleineLargeur>
            Voir les offres
          </Cta>
        </div>
      </Rise>

      <Rise onMount delay={1.05}>
        <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2.5 font-mono text-[0.78rem] text-ardoise">
          {["Disponible 6 jours sur 7", "Sans engagement de durée", "Interlocuteur dédié"].map(
            (x) => (
              <li key={x} className="inline-flex items-center gap-2">
                <Check
                  className="h-3.5 w-3.5 text-vague-profonde"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                {x}
              </li>
            ),
          )}
        </ul>
      </Rise>
    </div>
  );
}

/* ───────────────────────── scène 3D ───────────────────────── */

function Scene({ progress }: { progress: MotionValue<number> }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const time = useTime();
  const mx = useSpring(0, { stiffness: 60, damping: 18 });
  const my = useSpring(0, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (!fine || reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduce, mx, my]);

  // Le bureau : face à nous tant que tout est épars, puis couché pour
  // montrer la pile rangée, vue de trois quarts.
  const bureau = useTransform([progress, mx, my], ([p = 0, x = 0, y = 0]: number[]) => {
    const t = easeInOut(segment(p, 0.36, 0.72));
    const rx = lerp(0, 52, t) - y * 10 * (1 - t * 0.6);
    const ry = x * 16 * (1 - t * 0.6);
    const rz = lerp(0, -18, t);
    const ty = lerp(0, 6, t);
    const s = lerp(1, 1.18, t);
    return `translate3d(0, ${ty}%, 0) scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
  });

  const aTraiter = useTransform(progress, (p) => {
    const ranges = DOCS.filter((_, i) => p >= docWindow(i)[1] - 0.01).length;
    return String(N - ranges).padStart(2, "0");
  });
  const traites = useTransform(aTraiter, (v) => String(N - Number(v)).padStart(2, "0"));
  const jauge = useTransform(progress, [0.05, DERNIER_RANGE], [0, 1]);
  const legende = useTransform(progress, [0.82, 0.92], [0, 1]);
  const legendeY = useTransform(progress, [0.82, 0.92], [16, 0]);

  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full max-w-[40rem] flex-col items-center justify-center"
    >
      {/* Compteur : la preuve chiffrée que le bureau se vide */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-end justify-between gap-6 lg:top-[12%]">
        <Compteur label="À traiter" valeur={aTraiter} />
        <div className="mb-3 h-px flex-1 bg-nuit/12">
          <motion.span
            style={{ scaleX: jauge }}
            className="block h-px origin-left bg-vague-profonde"
          />
        </div>
        <Compteur label="Traités" valeur={traites} alignement="droite" accent />
      </div>

      <div className="relative flex h-full w-full items-center justify-center [perspective:1700px]">
        <motion.div
          style={{ transform: reduce ? undefined : bureau, transformStyle: "preserve-3d" }}
          className="relative aspect-[1/1.32] w-[clamp(9.5rem,40vw,15.5rem)] lg:w-[clamp(12rem,16.5vw,16.5rem)]"
        >
          {DOCS.map((d, i) => (
            <Feuille key={d.kind} doc={d} i={i} progress={progress} time={time} />
          ))}
          <Tampon progress={progress} />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: legende, y: legendeY }}
        className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-4 lg:bottom-[10%]"
      >
        <Bars />
        <p className="font-display text-2xl text-nuit sm:text-[1.75rem]">
          Votre administratif, notre priorité.
        </p>
      </motion.div>
    </div>
  );
}

function Compteur({
  label,
  valeur,
  alignement = "gauche",
  accent = false,
}: {
  label: string;
  valeur: MotionValue<string>;
  alignement?: "gauche" | "droite";
  accent?: boolean;
}) {
  return (
    <div className={cn("flex flex-col", alignement === "droite" && "items-end")}>
      <span className="label-section text-ardoise">{label}</span>
      <motion.span
        className={cn(
          "font-display text-5xl leading-none tabular-nums sm:text-6xl",
          accent ? "text-vague-profonde" : "text-nuit",
        )}
      >
        {valeur}
      </motion.span>
    </div>
  );
}

function Feuille({
  doc,
  i,
  progress,
  time,
}: {
  doc: Doc;
  i: number;
  progress: MotionValue<number>;
  time: MotionValue<number>;
}) {
  const [debut, fin] = docWindow(i);
  const transform = useTransform([progress, time], ([p = 0, t = 0]: number[]) => {
    const k = easeInOut(segment(p, debut, fin));
    // Flottement léger tant que la pièce n'est pas rangée.
    const flotte = (1 - k) * Math.sin((t / 1000) * 0.85 + i * 1.7) * 7;
    const x = lerp(doc.x, doc.fx, k);
    const y = lerp(doc.y, doc.fy, k);
    const z = lerp(doc.z, i * 2.4, k);
    const rx = lerp(doc.rx, 0, k);
    const ry = lerp(doc.ry, 0, k);
    const rz = lerp(doc.rz, doc.frz, k);
    return `translate3d(${x}%, calc(${y}% + ${flotte}px), ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
  });

  const postit = doc.kind === "postit";
  return (
    <motion.div
      style={{ transform, transformStyle: "preserve-3d" }}
      className={cn(
        "absolute will-change-transform",
        postit ? "left-[20%] top-[26%] h-[48%] w-[62%]" : "inset-0",
      )}
    >
      <div
        className={cn(
          "@container flex h-full w-full flex-col overflow-hidden rounded-[4px] p-[8%] font-mono text-nuit [backface-visibility:hidden]",
          postit ? "bg-vague-clair shadow-[0_18px_30px_-18px_oklch(0.27_0.05_242/45%)]" : "feuille",
        )}
      >
        <Contenu kind={doc.kind} />
      </div>
    </motion.div>
  );
}

function Tampon({ progress }: { progress: MotionValue<number> }) {
  const transform = useTransform(progress, (p) => {
    const t = segment(p, 0.74, 0.8);
    const s = t === 0 ? 2.4 : lerp(2.4, 1, easeOutBack(t));
    return `translate3d(-50%, -50%, ${N * 2.4 + 6}px) rotate(-13deg) scale(${s})`;
  });
  const opacity = useTransform(progress, [0.74, 0.77], [0, 1]);

  return (
    <motion.div
      style={{ transform, opacity }}
      className="absolute left-1/2 top-[58%] rounded-md border-[3px] border-vague-profonde px-4 py-1.5 font-mono text-lg font-semibold uppercase tracking-[0.2em] text-vague-profonde mix-blend-multiply sm:text-xl"
    >
      Traité
    </motion.div>
  );
}

/* ───────────────────────── contenu des pièces ───────────────────────── */

function Ligne({ w, className }: { w: string; className?: string }) {
  return (
    <span
      className={cn("block h-[1.6cqw] rounded-full bg-nuit/10", className)}
      style={{ width: w }}
    />
  );
}

function Entete({ titre, numero }: { titre: string; numero: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <p className="font-display text-[9cqw] leading-none">{titre}</p>
      <p className="pt-[1cqw] text-[3.6cqw] text-ardoise">{numero}</p>
    </div>
  );
}

function Contenu({ kind }: { kind: Doc["kind"] }): ReactNode {
  switch (kind) {
    case "facture":
      return (
        <>
          <Entete titre="Facture" numero="N° 2026-0412" />
          <p className="mt-[6cqw] text-[3.4cqw] leading-snug text-ardoise">
            Client
            <br />
            <span className="text-nuit">Martin Rénovation</span>
          </p>
          <div className="mt-[6cqw] space-y-[2.6cqw] border-t border-nuit/10 pt-[4cqw] text-[3.4cqw]">
            <p className="flex justify-between">
              <span className="text-ardoise">Main-d'œuvre</span>
              <span>820,00</span>
            </p>
            <p className="flex justify-between">
              <span className="text-ardoise">Fournitures</span>
              <span>420,00</span>
            </p>
          </div>
          <div className="mt-auto flex items-end justify-between border-t border-nuit pt-[3cqw]">
            <span className="text-[3.4cqw] font-medium">Total HT</span>
            <span className="font-display text-[7.5cqw] leading-none">1 240,00 €</span>
          </div>
          <p className="mt-[2.4cqw] text-[3cqw] text-ardoise">Échéance 30/10</p>
        </>
      );
    case "devis":
      return (
        <>
          <Entete titre="Devis" numero="D-0188" />
          <p className="mt-[5cqw] text-[3.6cqw]">Rénovation salle de bain</p>
          <div className="mt-[5cqw] space-y-[2.6cqw]">
            <Ligne w="92%" />
            <Ligne w="78%" />
            <Ligne w="85%" />
            <Ligne w="60%" />
          </div>
          <div className="mt-auto rounded-[1.5cqw] border border-dashed border-nuit/30 p-[4cqw] text-[3.2cqw] text-ardoise">
            Bon pour accord
            <span className="mt-[4cqw] block h-px bg-nuit/20" />
          </div>
        </>
      );
    case "relance":
      return (
        <>
          <Entete titre="Relance" numero="2e envoi" />
          <p className="mt-[5cqw] inline-flex w-fit rounded-full bg-vague-clair px-[3cqw] py-[1cqw] text-[3.2cqw] text-vague-profonde">
            Échéance dépassée · 12 j
          </p>
          <p className="mt-[5cqw] text-[3.4cqw] text-ardoise">Facture 2026-0398</p>
          <p className="font-display text-[8cqw] leading-tight">680,00 €</p>
          <div className="mt-auto space-y-[2.6cqw]">
            <Ligne w="88%" />
            <Ligne w="70%" />
          </div>
        </>
      );
    case "courrier":
      return (
        <>
          <div className="ml-auto w-[45%] space-y-[2cqw]">
            <Ligne w="100%" />
            <Ligne w="80%" />
            <Ligne w="65%" />
          </div>
          <p className="mt-[8cqw] text-[3.4cqw]">Objet : renouvellement du contrat</p>
          <p className="mt-[3cqw] text-[3.2cqw] text-ardoise">Madame, Monsieur,</p>
          <div className="mt-[4cqw] space-y-[2.4cqw]">
            <Ligne w="100%" />
            <Ligne w="94%" />
            <Ligne w="97%" />
            <Ligne w="72%" />
          </div>
          <svg viewBox="0 0 120 30" className="mt-auto w-[40%] text-nuit/70" fill="none">
            <path
              d="M4 22c10-14 18-16 20-8s-6 12-2 6 14-16 18-10-2 12 4 6 12-10 18-6 10 4 16-2 14-6 34-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </>
      );
    case "suivi":
      return (
        <>
          <Entete titre="Suivi" numero="Septembre" />
          <div className="mt-[6cqw] flex h-[34%] items-end gap-[3cqw] border-b border-nuit/15 pb-[1cqw]">
            {[46, 62, 38, 74, 58, 88].map((h, k) => (
              <span
                key={k}
                className={cn("flex-1 rounded-t-[1cqw]", k === 5 ? "bg-vague" : "bg-nuit/80")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-auto space-y-[2.2cqw] text-[3.3cqw]">
            {[
              ["Devis envoyés", "14"],
              ["Factures émises", "22"],
              ["Relances", "6"],
            ].map(([k, v]) => (
              <p key={k} className="flex justify-between">
                <span className="text-ardoise">{k}</span>
                <span>{v}</span>
              </p>
            ))}
          </div>
        </>
      );
    case "dossier":
      return (
        <>
          <Entete titre="Dossier" numero="Client" />
          <p className="mt-[5cqw] text-[3.6cqw]">Cabinet Leroy</p>
          <ul className="mt-[6cqw] space-y-[3.4cqw] text-[3.4cqw]">
            {[
              ["Extrait Kbis", true],
              ["RIB", true],
              ["Contrat signé", true],
              ["Attestation", false],
            ].map(([k, ok]) => (
              <li key={String(k)} className="flex items-center gap-[2.6cqw]">
                <span
                  className={cn(
                    "flex h-[5cqw] w-[5cqw] items-center justify-center rounded-[1cqw] border",
                    ok ? "border-vague-profonde bg-vague-profonde text-white" : "border-nuit/30",
                  )}
                >
                  {ok ? <Check className="h-[70%] w-[70%]" strokeWidth={3} /> : null}
                </span>
                <span className={ok ? "text-nuit" : "text-ardoise"}>{String(k)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-[2cqw]">
            <span className="h-[2cqw] w-[30%] rounded-full bg-nuit" />
            <span className="h-[2cqw] w-[20%] rounded-full bg-nuit/60" />
            <span className="h-[2cqw] w-[10%] rounded-full bg-vague" />
          </div>
        </>
      );
    case "postit":
      return (
        <p className="font-display text-[11cqw] italic leading-[1.1] text-nuit">
          Rappeler le comptable avant vendredi
        </p>
      );
  }
}

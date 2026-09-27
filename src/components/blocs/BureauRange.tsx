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
import { EnTete, ListeCoches } from "@/components/ui-va/Blocs";
import { Bouton } from "@/components/ui-va/Bouton";
import { useFinePointer } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

/*
 * « Votre bureau, rangé » : sept pièces éparses (facture, devis, relance,
 * courrier, suivi, dossier client, post-it) se rangent en pile à mesure que
 * la section traverse l'écran. Rien n'est épinglé : on continue de défiler
 * normalement, l'animation suit.
 */

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

export function BureauRange() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.4"] });
  const progress = useTransform(scrollYProgress, (p) => (reduce ? 1 : p));

  return (
    <section ref={ref} className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="conteneur grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <EnTete
            surtitre="Concrètement"
            titre="Vous nous transmettez vos pièces. Nous les traitons."
            intro="Par votre espace VirtuAssist, par email ou via l'outil que vous utilisez déjà : drive partagé, logiciel de facturation. Nous nous adaptons à votre organisation plutôt que de vous en imposer une."
          />
          <ListeCoches
            className="mt-8"
            items={[
              "Traitement dans le délai de votre formule : 24 h, 24 à 48 h ou 48 h ouvrées",
              "Dès 90 % du forfait consommé, nous vous prévenons",
              "Rien n'est facturé sans votre accord",
            ]}
          />
          <div className="mt-9">
            <Bouton to="/fonctionnement" variante="secondaire">
              Voir comment ça marche
            </Bouton>
          </div>
        </div>
        <div className="relative h-[27rem] sm:h-[32rem] lg:h-[36rem]">
          <Scene progress={progress} />
        </div>
      </div>
    </section>
  );
}

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
      <div className="absolute inset-x-0 top-0 z-20 flex items-end justify-between gap-6">
        <Compteur label="À traiter" valeur={aTraiter} />
        <div className="mb-3 h-px flex-1 bg-marine/12">
          <motion.span
            style={{ scaleX: jauge }}
            className="block h-px origin-left bg-turquoise-fonce"
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
        className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-3"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-turquoise text-white">
          <Check className="h-5 w-5" strokeWidth={3} />
        </span>
        <p className="font-display text-xl font-medium text-marine sm:text-2xl">
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
      <span className="text-[0.95rem] font-bold text-ardoise">{label}</span>
      <motion.span
        className={cn(
          "font-display text-5xl font-semibold leading-none tabular-nums sm:text-6xl",
          accent ? "text-turquoise-fonce" : "text-marine",
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
          "@container flex h-full w-full flex-col overflow-hidden rounded-[4px] p-[8%] font-mono text-marine [backface-visibility:hidden]",
          postit
            ? "bg-turquoise-pale shadow-[0_18px_30px_-18px_rgb(15_42_61/45%)]"
            : "shadow-[0_1px_1px_rgb(15_42_61/8%),0_6px_14px_-6px_rgb(15_42_61/18%),0_30px_60px_-30px_rgb(15_42_61/40%)] bg-white",
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
      className="absolute left-1/2 top-[58%] rounded-md border-[3px] border-turquoise-fonce px-4 py-1.5 font-mono text-lg font-semibold uppercase tracking-[0.2em] text-turquoise-fonce mix-blend-multiply sm:text-xl"
    >
      Traité
    </motion.div>
  );
}

/* ───────────────────────── contenu des pièces ───────────────────────── */

function Ligne({ w, className }: { w: string; className?: string }) {
  return (
    <span
      className={cn("block h-[1.6cqw] rounded-full bg-marine/10", className)}
      style={{ width: w }}
    />
  );
}

function Entete({ titre, numero }: { titre: string; numero: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <p className="font-display text-[8.5cqw] font-semibold leading-none">{titre}</p>
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
            <span className="text-marine">Martin Rénovation</span>
          </p>
          <div className="mt-[6cqw] space-y-[2.6cqw] border-t border-marine/10 pt-[4cqw] text-[3.4cqw]">
            <p className="flex justify-between">
              <span className="text-ardoise">Main-d'œuvre</span>
              <span>820,00</span>
            </p>
            <p className="flex justify-between">
              <span className="text-ardoise">Fournitures</span>
              <span>420,00</span>
            </p>
          </div>
          <div className="mt-auto flex items-end justify-between border-t border-marine pt-[3cqw]">
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
          <div className="mt-auto rounded-[1.5cqw] border border-dashed border-marine/30 p-[4cqw] text-[3.2cqw] text-ardoise">
            Bon pour accord
            <span className="mt-[4cqw] block h-px bg-marine/20" />
          </div>
        </>
      );
    case "relance":
      return (
        <>
          <Entete titre="Relance" numero="2e envoi" />
          <p className="mt-[5cqw] inline-flex w-fit rounded-full bg-turquoise-pale px-[3cqw] py-[1cqw] text-[3.2cqw] text-turquoise-fonce">
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
          <svg viewBox="0 0 120 30" className="mt-auto w-[40%] text-marine/70" fill="none">
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
          <div className="mt-[6cqw] flex h-[34%] items-end gap-[3cqw] border-b border-marine/15 pb-[1cqw]">
            {[46, 62, 38, 74, 58, 88].map((h, k) => (
              <span
                key={k}
                className={cn("flex-1 rounded-t-[1cqw]", k === 5 ? "bg-turquoise" : "bg-marine/80")}
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
                    ok
                      ? "border-turquoise-fonce bg-turquoise-fonce text-white"
                      : "border-marine/30",
                  )}
                >
                  {ok ? <Check className="h-[70%] w-[70%]" strokeWidth={3} /> : null}
                </span>
                <span className={ok ? "text-marine" : "text-ardoise"}>{String(k)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-[2cqw]">
            <span className="h-[2cqw] w-[30%] rounded-full bg-marine" />
            <span className="h-[2cqw] w-[20%] rounded-full bg-marine/60" />
            <span className="h-[2cqw] w-[10%] rounded-full bg-turquoise" />
          </div>
        </>
      );
    case "postit":
      return (
        <p className="font-display text-[10cqw] font-medium leading-[1.15] text-marine">
          Rappeler le comptable avant vendredi
        </p>
      );
  }
}

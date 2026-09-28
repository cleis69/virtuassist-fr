import { motion, useReducedMotion } from "motion/react";
import { Check, Clock3, Minus } from "lucide-react";
import { Fragment, useState } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { Tilt } from "@/components/motion/Tilt";
import { Bouton } from "@/components/ui-va/Bouton";
import { COMPARATIF, FORMULES, OPTIONS, type Formule } from "@/content/site";
import { cn } from "@/lib/utils";

const ECHELLE = 40;

/** Les quatre formules, côte à côte (défilement horizontal sur mobile). */
export function CartesFormules({ compact = false }: { compact?: boolean }) {
  const [visible, setVisible] = useState(0);
  return (
    <>
      <div
        onScroll={(e) => {
          const el = e.currentTarget;
          const carte = el.firstElementChild as HTMLElement | null;
          if (carte) setVisible(Math.round(el.scrollLeft / (carte.offsetWidth + 16)));
        }}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-5 pb-6 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {FORMULES.map((f, i) => (
          <div key={f.cle} className="w-[86%] shrink-0 snap-center sm:w-[46%] lg:w-auto">
            <CarteFormule f={f} i={i} compact={compact} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center justify-center gap-2 lg:hidden" aria-hidden="true">
        {FORMULES.map((f, i) => (
          <span
            key={f.cle}
            className={cn(
              "block h-2 rounded-full transition-all duration-500",
              i === visible ? "w-7 bg-turquoise-fonce" : "w-2 bg-marine/20",
            )}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-[0.95rem] text-ardoise lg:hidden">
        Faites glisser pour voir les autres formules.
      </p>
    </>
  );
}

function CarteFormule({ f, i, compact }: { f: Formule; i: number; compact: boolean }) {
  const reduce = useReducedMotion();
  const sombre = !!f.recommandee;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
      className="h-full"
    >
      <Tilt
        max={3}
        className={cn(
          "group relative flex h-full flex-col rounded-3xl p-7",
          sombre
            ? "bg-marine text-white shadow-[0_40px_80px_-40px_rgb(15_42_61/80%)] ring-2 ring-turquoise"
            : "bg-white text-encre ring-1 ring-ligne",
        )}
      >
        {sombre && (
          <span className="absolute -top-3.5 left-7 rounded-full bg-turquoise px-3.5 py-1 font-display text-sm font-semibold text-marine-profond">
            Formule recommandée
          </span>
        )}
        <h3
          className={cn(
            "font-display text-2xl font-semibold",
            sombre ? "text-white" : "text-marine",
          )}
        >
          {f.nom}
        </h3>
        <p className={cn("mt-1", sombre ? "text-sur-marine-doux" : "text-ardoise")}>{f.phrase}</p>

        <p className="mt-6 font-display">
          {f.apartir && (
            <span
              className={cn(
                "block text-[0.95rem]",
                sombre ? "text-sur-marine-doux" : "text-ardoise",
              )}
            >
              à partir de
            </span>
          )}
          <span className="flex items-baseline gap-2 whitespace-nowrap">
            <CountUp to={f.prix} className="text-5xl font-semibold tracking-tight" />
            <span className="text-xl font-medium">€ HT</span>
          </span>
          <span
            className={cn("block text-[0.95rem]", sombre ? "text-sur-marine-doux" : "text-ardoise")}
          >
            par mois
          </span>
        </p>

        <Jauge heures={f.heures} volume={f.volume} sombre={sombre} />

        {!compact && (
          <ul className="mt-6 space-y-2.5">
            {f.inclus.map((x) => (
              <li key={x} className="flex gap-2.5">
                <Check
                  className={cn(
                    "mt-1 h-4 w-4 shrink-0",
                    sombre ? "text-turquoise" : "text-turquoise-fonce",
                  )}
                  strokeWidth={3}
                  aria-hidden="true"
                />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-7">
          <p
            className={cn(
              "flex items-center gap-2 border-t pt-5 text-[0.95rem]",
              sombre ? "border-white/15" : "border-ligne",
            )}
          >
            <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Délai de traitement : <strong>{f.delai}</strong>
            </span>
          </p>
          <Bouton
            to="/contact"
            search={{ formule: f.cle }}
            variante={sombre ? "clair" : "secondaire"}
            className="mt-5 w-full"
          >
            Choisir {f.nom}
          </Bouton>
        </div>
      </Tilt>
    </motion.div>
  );
}

/** Le volume d'heures sur une échelle commune de 40 h : 1 trait = 1 heure. */
function Jauge({
  heures,
  volume,
  sombre,
}: {
  heures: number | null;
  volume: string;
  sombre: boolean;
}) {
  const pleines = heures ?? ECHELLE;
  return (
    <div className="mt-6">
      <p
        className={cn(
          "font-display font-semibold",
          sombre ? "text-turquoise" : "text-turquoise-fonce",
        )}
      >
        {volume}
      </p>
      <motion.div
        aria-hidden="true"
        className="mt-2 flex h-6 items-end gap-[2px]"
        initial="off"
        whileInView="on"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {Array.from({ length: ECHELLE }, (_, k) => (
          <motion.span
            key={k}
            className={cn(
              "block h-full flex-1 origin-bottom rounded-[2px]",
              k < pleines
                ? heures === null
                  ? "bg-[repeating-linear-gradient(135deg,var(--turquoise)_0_2px,transparent_2px_4px)]"
                  : sombre
                    ? "bg-turquoise"
                    : "bg-turquoise-fonce"
                : sombre
                  ? "bg-white/15"
                  : "bg-marine/10",
            )}
            variants={{
              off: { scaleY: 0.25 },
              on: {
                scaleY: 1,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 + k * 0.015 },
              },
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/** Tableau comparatif des trois formules standard. */
export function Comparatif() {
  const noms = FORMULES.slice(0, 3);
  return (
    <div className="overflow-x-auto rounded-3xl ring-1 ring-ligne" data-lenis-prevent>
      <table className="w-full min-w-[40rem] border-collapse bg-white text-left">
        <caption className="sr-only">
          Comparaison des formules Essentiel, Sérénité et Premium
        </caption>
        <thead>
          <tr className="bg-ivoire">
            <th scope="col" className="w-[40%] p-5 font-display text-lg font-semibold text-marine">
              Ce qui est inclus
            </th>
            {noms.map((f) => (
              <th
                key={f.cle}
                scope="col"
                className={cn(
                  "p-5 text-center font-display text-lg font-semibold",
                  f.recommandee ? "bg-marine text-white" : "text-marine",
                )}
              >
                {f.nom}
                <span
                  className={cn(
                    "block text-[0.95rem] font-normal",
                    f.recommandee ? "text-sur-marine-doux" : "text-ardoise",
                  )}
                >
                  {f.prix} € HT / mois
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARATIF.map((l) => (
            <tr key={l.ligne} className="border-t border-ligne">
              <th scope="row" className="p-5 font-normal text-encre">
                {l.ligne}
              </th>
              {l.valeurs.map((v, k) => (
                <td key={k} className={cn("p-5 text-center", k === 1 && "bg-turquoise-pale/60")}>
                  {v === true ? (
                    <>
                      <Check
                        className="mx-auto h-6 w-6 text-turquoise-fonce"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      <span className="sr-only">Inclus</span>
                    </>
                  ) : v === false ? (
                    <>
                      <Minus className="mx-auto h-5 w-5 text-marine/25" aria-hidden="true" />
                      <span className="sr-only">Non inclus</span>
                    </>
                  ) : (
                    <span className="font-bold text-marine">{v}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Les options, en barème. */
export function TableOptions() {
  const reduce = useReducedMotion();
  return (
    <dl className="rounded-3xl bg-white p-6 ring-1 ring-ligne sm:p-8">
      {OPTIONS.map(([k, v], i) => (
        <Fragment key={k}>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            className="flex items-baseline gap-3 border-b border-ligne py-4 last:border-b-0"
          >
            <dt className="text-encre">{k}</dt>
            <span
              aria-hidden="true"
              className="min-w-6 flex-1 -translate-y-1 border-b-2 border-dotted border-marine/20"
            />
            <dd className="shrink-0 text-right font-display font-semibold text-marine">{v}</dd>
          </motion.div>
        </Fragment>
      ))}
    </dl>
  );
}

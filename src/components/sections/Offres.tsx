import { motion, useReducedMotion } from "motion/react";
import { Clock3 } from "lucide-react";
import { useRef, useState } from "react";
import { BarBullet } from "@/components/Bars";
import { Cta } from "@/components/SectionLink";
import { CountUp } from "@/components/motion/CountUp";
import { TextReveal } from "@/components/motion/TextReveal";
import { Tilt } from "@/components/motion/Tilt";
import { choisirFormule, type Formule } from "@/lib/formule";
import { cn } from "@/lib/utils";

type Offre = {
  nom: string;
  prix: number;
  apartir?: boolean;
  heures: number | null;
  volume: string;
  phrase: string;
  inclus: string[];
  delai: string;
  recommandee?: boolean;
  formule: Formule;
};

const OFFRES: Offre[] = [
  {
    nom: "Essentiel",
    prix: 250,
    heures: 10,
    volume: "10 h/mois",
    phrase: "Pour commencer à déléguer.",
    inclus: ["Devis", "Factures", "Courriers", "Documents", "Saisie", "Mise à jour des dossiers"],
    delai: "48 h ouvrées",
    formule: "Essentiel — 250 € HT/mois",
  },
  {
    nom: "Sérénité",
    prix: 460,
    heures: 20,
    volume: "20 h/mois",
    phrase: "Notre formule recommandée.",
    inclus: [
      "Tout Essentiel",
      "Suivi de facturation",
      "Relances clients",
      "Recouvrement amiable",
      "Tableaux de suivi",
      "Reporting mensuel",
      "Interlocuteur dédié",
    ],
    delai: "24 à 48 h ouvrées",
    recommandee: true,
    formule: "Sérénité — 460 € HT/mois",
  },
  {
    nom: "Premium",
    prix: 840,
    heures: 40,
    volume: "40 h/mois",
    phrase: "Votre service administratif externalisé.",
    inclus: [
      "Tout Sérénité",
      "Gestion administrative étendue",
      "Tableaux de bord",
      "Traitement prioritaire",
      "Priorité le samedi",
      "Points de suivi réguliers",
    ],
    delai: "24 h ouvrées",
    formule: "Premium — 840 € HT/mois",
  },
  {
    nom: "Entreprise",
    prix: 1290,
    apartir: true,
    heures: null,
    volume: "Volume sur mesure",
    phrase: "Votre back-office externalisé.",
    inclus: [
      "Analyse des volumes",
      "Organisation personnalisée",
      "SLA contractuel",
      "Reporting sur mesure",
    ],
    delai: "Défini au contrat",
    formule: "Entreprise — sur mesure",
  },
];

const ECHELLE = 40;

export function Offres() {
  const rail = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);

  return (
    <section id="offres" className="relative bg-ivoire">
      <div className="mx-auto max-w-[1320px] px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="label-section text-vague-profonde">Les offres</p>
            <TextReveal
              className="mt-6 max-w-[18ch] font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1] tracking-[-0.015em] text-nuit"
              segments={[
                { text: "Un forfait mensuel, un volume d'heures," },
                { text: "un délai garanti.", className: "italic text-vague-profonde" },
              ]}
            />
          </div>
          <p className="max-w-sm font-mono text-[0.8rem] leading-relaxed text-ardoise lg:justify-self-end">
            Tarifs hors taxes. Sans engagement de durée.
            <br />1 trait = 1 heure de travail par mois.
          </p>
        </div>

        <div
          ref={rail}
          onScroll={(e) => {
            const el = e.currentTarget;
            const carte = el.firstElementChild as HTMLElement | null;
            if (!carte) return;
            setVisible(Math.round(el.scrollLeft / (carte.offsetWidth + 16)));
          }}
          className="-mx-5 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-6 pb-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-20 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {OFFRES.map((o, i) => (
            <div
              key={o.nom}
              className={cn(
                "w-[84%] shrink-0 snap-center sm:w-[46%] lg:w-auto",
                o.recommandee && "lg:-translate-y-6",
              )}
            >
              <Carte o={o} i={i} />
            </div>
          ))}
        </div>

        {/* Repère de défilement, mobile */}
        <div className="mt-2 flex justify-center gap-1.5 lg:hidden" aria-hidden="true">
          {OFFRES.map((o, i) => (
            <span
              key={o.nom}
              className={cn(
                "block h-1.5 rounded-full transition-all duration-500",
                i === visible ? "w-6 bg-vague-profonde" : "w-1.5 bg-nuit/20",
              )}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-start justify-between gap-8 rounded-3xl bg-vague-clair p-8 sm:p-12 lg:flex-row lg:items-center"
        >
          <div>
            <p className="font-display text-3xl text-nuit sm:text-4xl">
              Vous ne savez pas quelle formule choisir ?
            </p>
            <p className="mt-3 max-w-xl text-ardoise">
              Nous analysons gratuitement vos besoins. Prestation ponctuelle sans abonnement :{" "}
              <span className="font-mono text-nuit">30 € HT/heure</span>.
            </p>
          </div>
          <Cta
            to="contact"
            onClick={() => choisirFormule("Je ne sais pas encore")}
            className="shrink-0"
          >
            Analyser mes besoins
          </Cta>
        </motion.div>
      </div>
    </section>
  );
}

function Carte({ o, i }: { o: Offre; i: number }) {
  const reduce = useReducedMotion();
  const sombre = !!o.recommandee;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
      className="h-full"
    >
      <Tilt
        className={cn(
          "group relative flex h-full flex-col rounded-3xl p-7 transition-shadow duration-500 sm:p-8",
          sombre
            ? "bg-nuit text-on-nuit shadow-[0_40px_80px_-40px_oklch(0.2429_0.0436_243.37/80%)] ring-2 ring-vague"
            : "bg-papier text-nuit ring-1 ring-nuit/[0.08] hover:shadow-[0_40px_70px_-45px_oklch(0.2742_0.0482_242.12/55%)]",
        )}
      >
        {sombre && (
          <span className="label-section absolute -top-3 left-7 rounded-full bg-vague px-3 py-1.5 text-nuit-deep">
            Formule recommandée
          </span>
        )}

        <h3 className={cn("label-section", sombre ? "text-vague" : "text-vague-profonde")}>
          {o.nom}
        </h3>

        <p className="mt-6">
          {o.apartir && (
            <span
              className={cn(
                "block font-mono text-xs",
                sombre ? "text-on-nuit-muted" : "text-ardoise",
              )}
            >
              à partir de
            </span>
          )}
          <span className="font-display text-6xl leading-none tracking-[-0.02em]">
            <CountUp to={o.prix} />
          </span>
          <span
            className={cn("ml-2 font-mono text-xs", sombre ? "text-on-nuit-muted" : "text-ardoise")}
          >
            € HT/mois
          </span>
        </p>
        <p className={cn("mt-3 text-sm", sombre ? "text-on-nuit-muted" : "text-ardoise")}>
          {o.phrase}
        </p>

        <Heures heures={o.heures} volume={o.volume} sombre={sombre} />

        <ul className={cn("mt-7 space-y-2.5 text-sm", sombre ? "text-on-nuit" : "text-ardoise")}>
          {o.inclus.map((x) => (
            <li key={x} className="flex gap-3">
              <BarBullet className={sombre ? "bg-vague" : undefined} />
              <span>{x}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <p
            className={cn(
              "flex items-center gap-2 border-t pt-5 font-mono text-[0.72rem]",
              sombre ? "border-on-nuit/15 text-on-nuit" : "border-nuit/10 text-nuit",
            )}
          >
            <Clock3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Délai de traitement : {o.delai}
          </p>
        </div>

        <Cta
          to="contact"
          onClick={() => choisirFormule(o.formule)}
          variante={sombre ? "clair" : "contour"}
          magnetique={false}
          className="mt-5 w-full"
        >
          Choisir {o.nom}
        </Cta>
      </Tilt>
    </motion.div>
  );
}

/** Le volume d'heures, dessiné sur une échelle commune : les formules se comparent d'un coup d'œil. */
function Heures({
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
    <div className="mt-7">
      <p
        className={cn(
          "font-mono text-xs font-medium",
          sombre ? "text-vague" : "text-vague-profonde",
        )}
      >
        {volume}
      </p>
      <motion.div
        aria-hidden="true"
        className="mt-2.5 flex h-6 items-end gap-[2px]"
        initial="off"
        whileInView="on"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {Array.from({ length: ECHELLE }, (_, k) => (
          <motion.span
            key={k}
            className={cn(
              "block h-full flex-1 origin-bottom rounded-[1.5px]",
              k < pleines
                ? heures === null
                  ? "bg-[repeating-linear-gradient(135deg,var(--vague)_0_2px,transparent_2px_4px)]"
                  : sombre
                    ? "bg-vague"
                    : "bg-vague-profonde"
                : sombre
                  ? "bg-on-nuit/12"
                  : "bg-nuit/[0.08]",
            )}
            variants={{
              off: { scaleY: 0.25 },
              on: {
                scaleY: 1,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 + k * 0.016 },
              },
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

import { motion, useReducedMotion } from "motion/react";
import { Check, FileText, Mail, ReceiptText } from "lucide-react";

const TACHES = [
  { Icone: ReceiptText, titre: "Facture n° 2026-0412", etat: "Envoyée au client" },
  { Icone: Mail, titre: "Relance de paiement", etat: "Programmée pour lundi" },
  { Icone: FileText, titre: "Dossier client", etat: "Classé et à jour" },
];

/**
 * Trois tâches qui se cochent l'une après l'autre sur la photo d'accueil :
 * ce que fait VIRTUASSIST, montré plutôt que raconté. Illustration.
 */
export function TachesFlottantes() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {TACHES.map((t, i) => (
        <motion.div
          key={t.titre}
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 + i * 0.45 }}
          className={[
            "absolute",
            i === 0 && "left-3 top-[8%] sm:-left-8 lg:-left-12",
            i === 1 && "right-3 top-[40%] sm:-right-6 lg:-right-10",
            i === 2 && "bottom-[7%] left-6 sm:-left-4 lg:left-8",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className="flotte flex items-center gap-3 rounded-2xl bg-white/95 py-3 pr-4 pl-3 shadow-[0_20px_40px_-18px_rgb(15_42_61/45%)] ring-1 ring-ligne backdrop-blur"
            style={{ animationDelay: `${i * 1.3}s` }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise-pale text-turquoise-fonce">
              <t.Icone className="h-5 w-5" />
            </span>
            <span className="pr-2">
              <span className="block text-[0.95rem] font-bold leading-tight text-marine">
                {t.titre}
              </span>
              <span className="block text-[0.85rem] leading-tight text-ardoise">{t.etat}</span>
            </span>
            <motion.span
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 16, delay: 1.5 + i * 0.45 }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-turquoise text-white"
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

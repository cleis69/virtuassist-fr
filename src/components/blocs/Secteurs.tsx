import { motion, useReducedMotion } from "motion/react";
import { PHOTOS, srcSetPhoto, urlPhoto } from "@/content/images";
import { SECTEURS } from "@/content/site";
import { cn } from "@/lib/utils";

/** Les secteurs accompagnés, en photos, avec des exemples de tâches confiées. */
export function GrilleSecteurs({ limite, detail = false }: { limite?: number; detail?: boolean }) {
  const reduce = useReducedMotion();
  const liste = limite ? SECTEURS.slice(0, limite) : SECTEURS;

  return (
    <ul
      className={cn(
        "grid gap-4 sm:gap-5",
        detail ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-3",
      )}
    >
      {liste.map((s, i) => {
        const p = PHOTOS[s.photo];
        return (
          <motion.li
            key={s.nom}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-3xl bg-marine"
          >
            <div
              className={cn(
                "relative overflow-hidden",
                detail ? "aspect-[4/3]" : "aspect-[4/5] sm:aspect-[4/3]",
              )}
            >
              <img
                src={urlPhoto(p.id, 800, 4 / 3)}
                srcSet={srcSetPhoto(p.id, 4 / 3)}
                sizes="(min-width: 1024px) 30vw, 50vw"
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-sortie)] group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-marine via-marine/35 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-4 font-display text-lg font-semibold leading-tight text-white sm:p-6 sm:text-xl">
                {s.nom}
              </p>
            </div>
            {detail && (
              <div className="bg-white p-6 ring-1 ring-ligne ring-inset">
                <p className="text-[0.95rem] font-bold text-ardoise">Exemples de tâches confiées</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.exemples.map((x) => (
                    <li
                      key={x}
                      className="rounded-full bg-turquoise-pale px-3 py-1 text-[0.95rem] font-bold text-turquoise-fonce"
                    >
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}

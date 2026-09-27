import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Tilt } from "@/components/motion/Tilt";
import { IconeService } from "@/components/ui-va/IconeService";
import { PHOTOS, srcSetPhoto, urlPhoto } from "@/content/images";
import { SERVICES } from "@/content/site";
import { cn } from "@/lib/utils";

/** Les cinq services, chacun avec sa photo et un lien vers sa page. */
export function CartesServices({ exclure }: { exclure?: string }) {
  const reduce = useReducedMotion();
  const liste = SERVICES.filter((s) => s.slug !== exclure);

  return (
    <ul
      className={cn(
        "grid gap-6 sm:grid-cols-2",
        liste.length === 5 ? "lg:grid-cols-6" : "lg:grid-cols-4",
      )}
    >
      {liste.map((s, i) => {
        const p = PHOTOS[s.photo];
        // 5 cartes : deux grandes en haut, trois en dessous.
        const large = liste.length === 5 && i < 2;
        return (
          <motion.li
            key={s.slug}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
            className={cn(liste.length === 5 ? (large ? "lg:col-span-3" : "lg:col-span-2") : "")}
          >
            <Tilt max={3} className="group relative h-full">
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ligne transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(15_42_61/40%)]"
              >
                <div
                  className={cn(
                    "relative overflow-hidden",
                    large ? "aspect-[16/9]" : "aspect-[4/3]",
                  )}
                >
                  <img
                    src={urlPhoto(p.id, 900, large ? 16 / 9 : 4 / 3)}
                    srcSet={srcSetPhoto(p.id, large ? 16 / 9 : 4 / 3)}
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-sortie)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <IconeService slug={s.slug} className="h-11 w-11" />
                    <h3 className="font-display text-xl font-semibold leading-tight sm:text-[1.35rem]">
                      {s.nom}
                    </h3>
                  </div>
                  <p className="mt-4 text-ardoise">{s.accroche}</p>
                  <p className="mt-2 text-[0.95rem] text-ardoise">
                    {s.taches.map((t) => t.titre).join(" · ")}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-bold text-turquoise-fonce">
                    Découvrir ce service
                    <ArrowRight
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Tilt>
          </motion.li>
        );
      })}
    </ul>
  );
}

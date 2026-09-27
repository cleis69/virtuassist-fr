import { Link, type LinkProps } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Mail, Phone } from "lucide-react";
import { useRef } from "react";
import { LogoLockup } from "./Logo";
import { Horloges } from "./Horloges";
import { ENTREPRISE, SERVICES } from "@/content/site";

const DECOUVRIR: { to: NonNullable<LinkProps["to"]>; label: string }[] = [
  { to: "/tarifs", label: "Tarifs" },
  { to: "/fonctionnement", label: "Comment ça marche" },
  { to: "/secteurs", label: "Pour qui" },
  { to: "/faq", label: "Questions fréquentes" },
  { to: "/contact", label: "Contact et diagnostic" },
];

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["40%", "0%"]);

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-marine-profond text-sur-marine-doux pb-[calc(var(--bottom-nav)+env(safe-area-inset-bottom))] lg:pb-0"
    >
      <div className="conteneur pt-16 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div className="max-w-sm">
            <LogoLockup ton="clair" descripteur />
            <p className="mt-6 font-display text-2xl font-medium leading-snug text-white">
              {ENTREPRISE.slogan}
            </p>
            <p className="mt-3">{ENTREPRISE.zones}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-white">Nos services</h2>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="transition-colors hover:text-white hover:underline"
                  >
                    {s.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-white">Découvrir</h2>
            <ul className="mt-5 space-y-3">
              {DECOUVRIR.map((p) => (
                <li key={p.label}>
                  <Link to={p.to} className="transition-colors hover:text-white hover:underline">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-white">Nous joindre</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`tel:${ENTREPRISE.telephone}`}
                  className="inline-flex items-center gap-2 font-bold text-white hover:underline"
                >
                  <Phone className="h-4 w-4 text-turquoise" aria-hidden="true" />
                  {ENTREPRISE.telephoneAffiche}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ENTREPRISE.email}`}
                  className="inline-flex items-center gap-2 hover:text-white hover:underline"
                >
                  <Mail className="h-4 w-4 text-turquoise" aria-hidden="true" />
                  {ENTREPRISE.email}
                </a>
              </li>
              <li>{ENTREPRISE.jours}</li>
              <li>
                <Horloges className="text-sur-marine-doux" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/12 py-6 text-[0.95rem] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VirtuAssist. Tarifs indiqués hors taxes.</p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/mentions-legales" className="hover:text-white hover:underline">
              Mentions légales
            </Link>
            <Link to="/cgv" className="hover:text-white hover:underline">
              Conditions générales de vente
            </Link>
            <span>Photographies : Unsplash</span>
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="overflow-hidden px-3 sm:px-5">
        <motion.p
          style={{ y }}
          className="select-none whitespace-nowrap text-center font-display text-[15.5vw] font-semibold leading-[0.8] tracking-[-0.05em] text-white/[0.06]"
        >
          VirtuAssist
        </motion.p>
      </div>
    </footer>
  );
}

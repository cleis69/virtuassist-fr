import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  PHOTOS,
  srcSetPhoto,
  urlPhoto,
  type Photo as TPhoto,
  type PhotoCle,
} from "@/content/images";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const CACHE = "inset(0 0 100% 0)";
const VISIBLE = "inset(0 0 0% 0)";

/**
 * Photographie du site : recadrée au bon ratio, chargée à la bonne taille,
 * révélée en rideau à l'entrée dans l'écran, avec une légère parallaxe.
 *
 * On observe le cadre, jamais l'image découpée : un élément entièrement
 * masqué par clip-path n'est pas vu par l'IntersectionObserver, et le
 * rideau ne se lèverait pas après un saut d'ancre.
 */
export function Photo({
  cle,
  photo,
  ratio = 4 / 3,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priorite = false,
  parallaxe = true,
  revele = true,
  children,
}: {
  cle?: PhotoCle;
  photo?: TPhoto;
  /** Largeur / hauteur. */
  ratio?: number;
  className?: string | undefined;
  sizes?: string;
  /** Photo principale de la page : chargée tout de suite, sans rideau. */
  priorite?: boolean;
  parallaxe?: boolean;
  revele?: boolean;
  children?: React.ReactNode;
}) {
  const p: TPhoto = photo ?? (cle ? PHOTOS[cle] : PHOTOS.accueil);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const vu = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallaxe && !reduce ? ["-6%", "6%"] : ["0%", "0%"],
  );
  const rideau = revele && !priorite && !reduce;

  return (
    <div
      ref={ref}
      className={cn("relative isolate overflow-hidden rounded-3xl", className)}
      style={{ aspectRatio: String(ratio) }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[inherit] bg-ivoire-fonce"
        initial={rideau ? { clipPath: CACHE } : false}
        animate={rideau ? { clipPath: vu ? VISIBLE : CACHE } : {}}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <motion.img
          src={urlPhoto(p.id, 1080, ratio)}
          srcSet={srcSetPhoto(p.id, ratio)}
          sizes={sizes}
          alt={p.alt}
          loading={priorite ? "eager" : "lazy"}
          decoding="async"
          {...(priorite ? { fetchPriority: "high" as const } : {})}
          className="absolute inset-0 h-[112%] w-full -translate-y-[6%] object-cover"
          style={{ y, objectPosition: p.focus ?? "50% 50%" }}
          initial={rideau ? { scale: 1.15 } : false}
          animate={rideau ? { scale: vu ? 1 : 1.15 } : {}}
          transition={{ duration: 1.4, ease: EASE }}
        />
        {children}
      </motion.div>
    </div>
  );
}

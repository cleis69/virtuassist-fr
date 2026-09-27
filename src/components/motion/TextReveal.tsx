import { motion, useReducedMotion } from "motion/react";
import { Fragment, type ElementType } from "react";
import { cn } from "@/lib/utils";

export type Segment = { text: string; className?: string; br?: boolean };

type Props = {
  /** Texte simple, ou segments pour styler certains mots (dégradé, italique…). */
  children?: string;
  segments?: Segment[];
  as?: ElementType;
  className?: string;
  /** Délai avant le premier mot, en secondes. */
  delay?: number;
  /** Écart entre deux mots, en secondes. */
  stagger?: number;
  /** Joue l'animation au montage plutôt qu'à l'entrée dans l'écran (hero). */
  onMount?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Titre dont les mots montent un à un derrière un masque.
 * Le texte complet reste lisible par les lecteurs d'écran (sr-only) ; la
 * version découpée, purement visuelle, leur est masquée.
 */
export function TextReveal({
  children,
  segments,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.035,
  onMount = false,
}: Props) {
  const reduce = useReducedMotion();
  const parts: Segment[] = segments ?? [{ text: children ?? "" }];
  const plain = parts
    .map((p) => p.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  let index = 0;
  const trigger = onMount
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag className={className}>
      <span className="sr-only">{plain}</span>
      <motion.span
        aria-hidden="true"
        initial={reduce ? "shown" : "hidden"}
        {...trigger}
        className="block"
      >
        {parts.map((part, pi) => {
          const words = part.text.split(/\s+/).filter(Boolean);
          return (
            <Fragment key={pi}>
              {words.map((word, wi) => {
                const i = index++;
                return (
                  <Fragment key={`${pi}-${wi}`}>
                    <span className="inline-block overflow-x-visible overflow-y-clip pb-[0.14em] -mb-[0.14em] pr-[0.04em] align-bottom">
                      <motion.span
                        className={cn("inline-block will-change-transform", part.className)}
                        variants={{
                          hidden: { y: "105%" },
                          shown: {
                            y: "0%",
                            transition: { duration: 0.8, ease: EASE, delay: delay + i * stagger },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>{" "}
                  </Fragment>
                );
              })}
              {part.br && <br className="hidden sm:block" />}
            </Fragment>
          );
        })}
      </motion.span>
    </Tag>
  );
}

/** Bloc qui apparaît en montant, sans découpage. */
export function Rise({
  children,
  className,
  delay = 0,
  y = 28,
  onMount = false,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  onMount?: boolean;
  as?: "div" | "li" | "p" | "span" | "section";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const trigger = onMount
    ? { animate: { opacity: 1, y: 0, filter: "blur(0px)" } }
    : {
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: { once: true, margin: "0px 0px -10% 0px" },
      };
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      {...trigger}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

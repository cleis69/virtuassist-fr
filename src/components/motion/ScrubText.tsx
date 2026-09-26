import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Phrase qui s'allume mot à mot au rythme du défilement : on lit à la
 * vitesse où l'on descend.
 */
export function ScrubText({
  text,
  as: Tag = "p",
  className,
  dim = 0.16,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Opacité d'un mot pas encore atteint. */
  dim?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {words.map((w, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            dim={reduce ? 1 : dim}
          >
            {w}
          </Word>
        ))}
      </span>
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  const y = useTransform(progress, range, [dim === 1 ? 0 : 6, 0]);
  return (
    <>
      <motion.span style={{ opacity, y }} className={cn("inline-block")}>
        {children}
      </motion.span>{" "}
    </>
  );
}

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const format = (n: number) =>
  Math.round(n)
    .toLocaleString("fr-FR")
    .replace(/[\u202f\u00a0]/g, " ");

/** Chiffre qui compte jusqu'à sa valeur à l'entrée dans l'écran. */
export function CountUp({
  to,
  className,
  duration = 1.4,
}: {
  to: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  // La valeur finale est rendue côté serveur : sans JavaScript, le prix reste juste.
  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}

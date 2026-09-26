import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * Bandeau qui défile en continu, accélère avec la vitesse de défilement et
 * change de sens quand on remonte.
 */
export function Marquee({
  children,
  speed = 2.2,
  reverse = false,
  className,
}: {
  children: ReactNode;
  /** Vitesse de base, en % de la largeur d'une copie par seconde. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1200, 0, 1200], [-4, 0, 4], { clamp: false });
  const direction = useRef(reverse ? -1 : 1);
  // Quatre copies : on défile sur une copie (25 %), puis on revient à zéro.
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) direction.current = reverse ? 1 : -1;
    else if (f > 0) direction.current = reverse ? -1 : 1;
    const move = direction.current * -(speed / 4) * (delta / 1000) * (1 + Math.abs(f));
    base.set(base.get() + move);
  });

  return (
    <div className={className} aria-hidden="true">
      <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x }}>
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="flex shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

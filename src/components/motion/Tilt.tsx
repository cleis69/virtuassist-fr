import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { useFinePointer } from "@/hooks/use-media";

/**
 * Carte qui s'incline vers le pointeur, avec un reflet qui le suit.
 * Inerte au doigt et quand le mouvement est réduit.
 */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const active = fine && !reduce;

  const spring = { stiffness: 180, damping: 18, mass: 0.5 };
  const rx = useSpring(useMotionValue(0), spring);
  const ry = useSpring(useMotionValue(0), spring);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(600px circle at ${gx}% ${gy}%, oklch(1 0 0 / 14%), transparent 45%)`;

  return (
    <div className="h-full [perspective:1100px]">
      <motion.div
        ref={ref}
        className={className ?? ""}
        style={active ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" } : {}}
        onPointerMove={(e) => {
          if (!active || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * 2 * max);
          rx.set(-(py - 0.5) * 2 * max);
          gx.set(px * 100);
          gy.set(py * 100);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        {children}
        {active && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glare }}
          />
        )}
      </motion.div>
    </div>
  );
}

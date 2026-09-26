import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/**
 * Section de l'accueil actuellement lue : celle qui traverse une fine bande
 * au milieu de l'écran. Hors accueil, aucune section n'est active.
 */
export function useActiveSection(ids: readonly string[]) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [active, setActive] = useState<string | null>(null);
  const cle = ids.join("|");

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    const visibles = new Set<string>();
    const ordre = cle.split("|");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visibles.add(e.target.id);
          else visibles.delete(e.target.id);
        }
        const courant = ordre.filter((id) => visibles.has(id)).pop();
        if (courant) setActive(courant);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ordre) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    setActive(window.scrollY < 80 ? "top" : null);
    return () => io.disconnect();
  }, [pathname, cle]);

  return active;
}

/**
 * Défilement vers une section de la page d'accueil.
 *
 * Passe par Lenis quand il est actif (souris, mouvement autorisé), sinon par
 * le défilement natif. Le hash est mis à jour sans relancer le routeur, pour
 * qu'un lien partagé ouvre toujours la bonne section.
 */

type LenisLike = {
  scrollTo: (
    target: number | HTMLElement,
    options?: { offset?: number; duration?: number },
  ) => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

export function reduceMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollToY(y: number) {
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: reduceMotion() ? "auto" : "smooth" });
}

export function scrollToId(id: string) {
  if (id === "top") {
    scrollToY(0);
    history.replaceState(null, "", window.location.pathname);
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(el, { duration: 1.3 });
  else el.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

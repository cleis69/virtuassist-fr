import { useEffect, useState } from "react";

/** Media query sûre au rendu serveur : `false` tant que le client n'a pas répondu. */
export function useMedia(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Souris ou trackpad : les effets au survol n'ont de sens qu'ici. */
export function useFinePointer() {
  return useMedia("(hover: hover) and (pointer: fine)");
}

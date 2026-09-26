/**
 * Choisir une formule depuis les cartes d'offre pré-remplit le formulaire de
 * diagnostic : le visiteur n'a pas à répéter ce qu'il vient de dire.
 */

export const FORMULES = [
  "Je ne sais pas encore",
  "Essentiel — 250 € HT/mois",
  "Sérénité — 460 € HT/mois",
  "Premium — 840 € HT/mois",
  "Entreprise — sur mesure",
  "Prestation ponctuelle — 30 € HT/h",
] as const;

export type Formule = (typeof FORMULES)[number];

const EVENEMENT = "va:formule";

export function choisirFormule(f: Formule) {
  window.dispatchEvent(new CustomEvent<Formule>(EVENEMENT, { detail: f }));
}

export function ecouterFormule(cb: (f: Formule) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<Formule>).detail);
  window.addEventListener(EVENEMENT, handler);
  return () => window.removeEventListener(EVENEMENT, handler);
}

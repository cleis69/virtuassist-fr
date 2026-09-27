/**
 * Formules proposées dans le formulaire de diagnostic.
 *
 * Choisir une formule sur la page Tarifs ouvre le formulaire avec cette
 * formule déjà cochée (paramètre ?formule= dans l'adresse) : le visiteur
 * n'a pas à répéter ce qu'il vient de dire.
 */

export const CHOIX_FORMULES = {
  indecis: "Je ne sais pas encore",
  essentiel: "Essentiel — 250 € HT/mois",
  serenite: "Sérénité — 460 € HT/mois",
  premium: "Premium — 840 € HT/mois",
  entreprise: "Entreprise — sur mesure",
  ponctuelle: "Prestation ponctuelle — 30 € HT/h",
} as const;

export type CleFormule = keyof typeof CHOIX_FORMULES;

export const estCleFormule = (v: unknown): v is CleFormule =>
  typeof v === "string" && v in CHOIX_FORMULES;

/** Messages pré-remplis selon d'où vient le visiteur. */
export const OBJETS = {
  fondateurs: "Je souhaite réserver une place parmi les 10 entreprises fondatrices.",
  facturation: "Je souhaite déléguer la gestion commerciale et la facturation.",
  administration: "Je souhaite déléguer l'administration quotidienne.",
  donnees: "Je souhaite déléguer la saisie et le suivi de mes données.",
  digital: "Je souhaite un accompagnement digital (site internet).",
  formation: "Je souhaite une formation.",
} as const;

export type CleObjet = keyof typeof OBJETS;

export const estCleObjet = (v: unknown): v is CleObjet => typeof v === "string" && v in OBJETS;

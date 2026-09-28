import type { PhotoCle } from "./images";

/**
 * Contenu du site — source unique.
 *
 * Les chiffres (tarifs, heures, délais, reports, préavis) reprennent
 * exactement les conditions générales de vente. Toute modification
 * commerciale se fait ici et se répercute sur toutes les pages.
 */

export const ENTREPRISE = {
  nom: "VIRTUASSIST",
  slogan: "Votre administratif, notre priorité.",
  email: "contact@virtuassist.fr",
  telephone: "+33000000000",
  telephoneAffiche: "+33 (0)0 00 00 00 00",
  jours: "Du lundi au samedi",
  zones: "France métropolitaine et La Réunion",
};

/* ───────────────────────── services ───────────────────────── */

export type Tache = { titre: string; texte: string };

export type Service = {
  slug: string;
  nom: string;
  /** Nom court, pour les menus. */
  court: string;
  accroche: string;
  description: string;
  photo: PhotoCle;
  photo2: PhotoCle;
  taches: Tache[];
  /** Où trouver ce service dans les formules. */
  formules: { nom: string; detail: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "facturation",
    nom: "Gestion commerciale et facturation",
    court: "Facturation",
    accroche: "Des devis envoyés à temps, des factures suivies, des retards relancés.",
    description:
      "Vos devis et vos factures partent à temps, les règlements sont suivis et les retards de paiement relancés avec méthode. Votre trésorerie ne dépend plus du temps qu'il vous reste le soir.",
    photo: "tablette",
    photo2: "facture",
    taches: [
      {
        titre: "Devis et factures",
        texte:
          "Nous préparons vos devis et vos factures à partir de vos informations et de vos modèles.",
      },
      {
        titre: "Suivi des règlements",
        texte:
          "Nous pointons les paiements reçus et tenons à jour la liste des factures en attente.",
      },
      {
        titre: "Relances clients",
        texte:
          "Les factures échues sont relancées avec méthode, selon les règles convenues avec vous.",
      },
      {
        titre: "Recouvrement amiable",
        texte:
          "Quand un retard s'installe, nous menons les démarches de recouvrement, strictement amiables.",
      },
    ],
    formules: [
      { nom: "Essentiel", detail: "Devis et factures" },
      { nom: "Sérénité", detail: "Suivi de facturation, relances clients, recouvrement amiable" },
    ],
  },
  {
    slug: "administration",
    nom: "Administration quotidienne",
    court: "Administration",
    accroche: "Le secrétariat, le courrier et le classement, sans y penser.",
    description:
      "Le secrétariat, le courrier, le classement et le suivi de vos dossiers sont pris en charge. Vous retrouvez un document en quelques secondes et plus aucune échéance ne vous échappe.",
    photo: "assistante",
    photo2: "courrier",
    taches: [
      {
        titre: "Secrétariat externalisé",
        texte:
          "Un secrétariat à distance, dimensionné sur vos besoins réels plutôt qu'un poste à temps plein.",
      },
      {
        titre: "Courriers",
        texte: "Rédaction, mise en forme et envoi de vos courriers administratifs et commerciaux.",
      },
      {
        titre: "Classement",
        texte:
          "Vos documents sont classés selon une organisation claire, que vous pouvez consulter.",
      },
      {
        titre: "Suivi des dossiers",
        texte: "Les échéances et les pièces manquantes sont suivies, dossier par dossier.",
      },
    ],
    formules: [
      { nom: "Essentiel", detail: "Courriers, documents, mise à jour des dossiers" },
      { nom: "Premium", detail: "Gestion administrative étendue" },
    ],
  },
  {
    slug: "donnees",
    nom: "Données et gestion",
    court: "Données et gestion",
    accroche: "Des chiffres à jour et des tableaux de suivi lisibles.",
    description:
      "Vos informations sont saisies, mises à jour et rassemblées dans des tableaux de suivi. Vous savez où vous en êtes sans ouvrir dix fichiers.",
    photo: "tableauBord",
    photo2: "graphiques",
    taches: [
      {
        titre: "Saisie et traitement",
        texte: "Saisie de vos données, contrôle et mise en forme dans vos outils.",
      },
      {
        titre: "Mise à jour",
        texte: "Vos fichiers clients, fournisseurs et dossiers restent à jour.",
      },
      {
        titre: "Tableaux de suivi",
        texte: "Des tableaux clairs pour suivre votre activité, vos devis et vos factures.",
      },
      {
        titre: "Reporting",
        texte: "Un point régulier sur les tâches réalisées et les chiffres qui comptent.",
      },
    ],
    formules: [
      { nom: "Essentiel", detail: "Saisie et mise à jour des dossiers" },
      { nom: "Sérénité", detail: "Tableaux de suivi et reporting mensuel" },
      { nom: "Premium", detail: "Tableaux de bord" },
    ],
  },
  {
    slug: "digital",
    nom: "Accompagnement digital",
    court: "Digital",
    accroche: "Un site internet à votre image, tenu à jour.",
    description:
      "Nous créons votre site vitrine, gérons ses contenus et assurons sa maintenance. Votre présence en ligne reste à jour sans que vous ayez à vous en occuper.",
    photo: "siteWeb",
    photo2: "siteWebMain",
    taches: [
      {
        titre: "Création de sites internet",
        texte: "Un site vitrine clair, qui présente votre activité et permet de vous contacter.",
      },
      {
        titre: "Gestion des contenus",
        texte: "Mise à jour de vos textes, de vos photos et de vos informations pratiques.",
      },
      {
        titre: "Maintenance",
        texte: "Votre site reste en ligne, à jour et fonctionnel.",
      },
    ],
    formules: [
      { nom: "Site vitrine", detail: "À partir de 790 € HT" },
      { nom: "Maintenance de site", detail: "À partir de 59 € HT / mois" },
    ],
  },
  {
    slug: "formation",
    nom: "Formation",
    court: "Formation",
    accroche: "Gagner en autonomie sur la bureautique et l'organisation.",
    description:
      "Nous formons vos équipes, ou vous-même, aux outils de bureautique et aux bonnes pratiques d'organisation administrative et de gestion.",
    photo: "formation",
    photo2: "formationEquipe",
    taches: [
      {
        titre: "Bureautique",
        texte:
          "Prendre en main les outils du quotidien : traitement de texte, tableur, messagerie.",
      },
      {
        titre: "Organisation administrative",
        texte: "Mettre en place un classement et des routines qui tiennent dans la durée.",
      },
      {
        titre: "Gestion",
        texte: "Comprendre et suivre les indicateurs essentiels de votre activité.",
      },
    ],
    formules: [{ nom: "Formations", detail: "Sur devis" }],
  },
];

export const serviceParSlug = (slug: string) => SERVICES.find((s) => s.slug === slug);

/* ───────────────────────── formules ───────────────────────── */

export type Formule = {
  cle: "essentiel" | "serenite" | "premium" | "entreprise";
  nom: string;
  prix: number;
  apartir?: boolean;
  heures: number | null;
  volume: string;
  phrase: string;
  inclus: string[];
  delai: string;
  report?: string;
  recommandee?: boolean;
};

export const FORMULES: Formule[] = [
  {
    cle: "essentiel",
    nom: "Essentiel",
    prix: 250,
    heures: 10,
    volume: "10 h par mois",
    phrase: "Pour commencer à déléguer.",
    inclus: ["Devis", "Factures", "Courriers", "Documents", "Saisie", "Mise à jour des dossiers"],
    delai: "48 h ouvrées",
    report: "2 h",
  },
  {
    cle: "serenite",
    nom: "Sérénité",
    prix: 460,
    heures: 20,
    volume: "20 h par mois",
    phrase: "Notre formule recommandée.",
    inclus: [
      "Tout Essentiel",
      "Suivi de facturation",
      "Relances clients",
      "Recouvrement amiable",
      "Tableaux de suivi",
      "Reporting mensuel",
      "Interlocuteur dédié",
    ],
    delai: "24 à 48 h ouvrées",
    report: "4 h",
    recommandee: true,
  },
  {
    cle: "premium",
    nom: "Premium",
    prix: 840,
    heures: 40,
    volume: "40 h par mois",
    phrase: "Votre service administratif externalisé.",
    inclus: [
      "Tout Sérénité",
      "Gestion administrative étendue",
      "Tableaux de bord",
      "Traitement prioritaire",
      "Priorité le samedi",
      "Points de suivi réguliers",
    ],
    delai: "24 h ouvrées",
    report: "8 h",
  },
  {
    cle: "entreprise",
    nom: "Entreprise",
    prix: 1290,
    apartir: true,
    heures: null,
    volume: "Volume sur mesure",
    phrase: "Votre back-office externalisé.",
    inclus: [
      "Analyse des volumes",
      "Organisation personnalisée",
      "SLA contractuel",
      "Reporting sur mesure",
    ],
    delai: "Défini au contrat",
  },
];

/** Tableau comparatif des trois formules standard. */
export const COMPARATIF: {
  ligne: string;
  valeurs: [string | boolean, string | boolean, string | boolean];
}[] = [
  { ligne: "Heures incluses chaque mois", valeurs: ["10 h", "20 h", "40 h"] },
  { ligne: "Délai de traitement", valeurs: ["48 h ouvrées", "24 à 48 h ouvrées", "24 h ouvrées"] },
  { ligne: "Devis, factures, courriers, documents", valeurs: [true, true, true] },
  { ligne: "Saisie et mise à jour des dossiers", valeurs: [true, true, true] },
  { ligne: "Suivi de facturation", valeurs: [false, true, true] },
  { ligne: "Relances clients et recouvrement amiable", valeurs: [false, true, true] },
  { ligne: "Tableaux de suivi et reporting mensuel", valeurs: [false, true, true] },
  { ligne: "Gestion administrative étendue", valeurs: [false, false, true] },
  { ligne: "Tableaux de bord", valeurs: [false, false, true] },
  { ligne: "Traitement prioritaire et priorité le samedi", valeurs: [false, false, true] },
  { ligne: "Points de suivi réguliers", valeurs: [false, false, true] },
  { ligne: "Heures non utilisées reportables", valeurs: ["2 h", "4 h", "8 h"] },
];

export const OPTIONS: [string, string][] = [
  ["Heure supplémentaire", "30 € HT / h"],
  ["Pack 5 heures", "140 € HT"],
  ["Pack 10 heures", "270 € HT"],
  ["Traitement urgent", "+ 25 %"],
  ["Site vitrine", "à partir de 790 € HT"],
  ["Maintenance de site", "à partir de 59 € HT / mois"],
  ["Tableaux de bord, analyse de données, formations", "sur devis"],
];

export const FONDATEURS = [
  "Diagnostic de démarrage offert",
  "Installation de l'espace VIRTUASSIST offerte (valeur 150 € HT)",
  "+2 h offertes le premier mois sur Sérénité",
  "+4 h offertes le premier mois sur Premium",
  "Tarif garanti 12 mois",
  "10 places seulement",
];

/* ───────────────────────── démarche ───────────────────────── */

export const ETAPES: { titre: string; texte: string; detail: string; photo: PhotoCle }[] = [
  {
    titre: "Diagnostic administratif gratuit",
    texte: "Nous analysons vos tâches, vos volumes et vos points de blocage.",
    detail:
      "Nous vous rappelons sous 24 h ouvrées pour fixer un échange de 30 minutes. Vous repartez avec une vision claire de ce qui peut être délégué, sans engagement.",
    photo: "appel",
  },
  {
    titre: "Plan de délégation",
    texte: "Nous définissons ce que nous prenons en charge et selon quels délais.",
    detail:
      "Le diagnostic débouche sur un plan de délégation chiffré : les tâches confiées, la formule adaptée et les délais de traitement.",
    photo: "accord",
  },
  {
    titre: "Mise en place de votre espace",
    texte: "Transmission des documents, procédures, accès et interlocuteur dédié.",
    detail:
      "Nous nous adaptons à votre organisation existante : vos outils, vos modèles, vos habitudes. Vous n'avez rien à réapprendre.",
    photo: "visio",
  },
  {
    titre: "Suivi et reporting réguliers",
    texte: "Vous gardez la visibilité : tableaux de suivi et points planifiés.",
    detail:
      "Tableaux de suivi et points planifiés : vous savez ce qui a été fait et ce qui est en cours. Dès 90 % du forfait consommé, nous vous prévenons.",
    photo: "tableauBord",
  },
];

/* ───────────────────────── pour qui ───────────────────────── */

export const SECTEURS: { nom: string; photo: PhotoCle; exemples: string[] }[] = [
  {
    nom: "Artisans et bâtiment",
    photo: "artisans",
    exemples: ["Devis et factures", "Relances clients", "Suivi des règlements"],
  },
  {
    nom: "Cabinets et professions libérales",
    photo: "cabinets",
    exemples: ["Secrétariat externalisé", "Courriers", "Classement"],
  },
  {
    nom: "Agences immobilières",
    photo: "immobilier",
    exemples: ["Suivi des dossiers", "Courriers", "Mise à jour"],
  },
  {
    nom: "Sociétés de services",
    photo: "societesServices",
    exemples: ["Facturation", "Tableaux de suivi", "Reporting"],
  },
  {
    nom: "Consultants",
    photo: "consultants",
    exemples: ["Devis et factures", "Relances clients", "Organisation administrative"],
  },
  {
    nom: "Organismes de formation",
    photo: "formationEquipe",
    exemples: ["Suivi des dossiers", "Saisie et traitement", "Classement"],
  },
  {
    nom: "Transport",
    photo: "transport",
    exemples: ["Factures", "Suivi des règlements", "Recouvrement amiable"],
  },
  { nom: "Commerçants", photo: "commercants", exemples: ["Factures", "Courriers", "Site vitrine"] },
  {
    nom: "Indépendants",
    photo: "independants",
    exemples: ["Devis et factures", "Courriers", "Classement"],
  },
  {
    nom: "Petites PME",
    photo: "pme",
    exemples: ["Secrétariat externalisé", "Tableaux de bord", "Reporting"],
  },
];

export const CONSTATS = [
  {
    titre: "Du temps perdu sur l'administratif",
    texte:
      "Des heures chaque semaine qui ne produisent ni chiffre d'affaires ni satisfaction client.",
  },
  {
    titre: "Des factures impayées qui traînent",
    texte: "Sans relance méthodique, la trésorerie s'érode et les retards deviennent la norme.",
  },
  {
    titre: "Des dossiers clients mal suivis",
    texte: "Documents dispersés, échéances oubliées, informations impossibles à retrouver.",
  },
  {
    titre: "Recruter coûte trop cher",
    texte: "Un poste à temps plein pour un besoin partiel : la charge fixe est disproportionnée.",
  },
];

/* ───────────────────────── questions ───────────────────────── */

export type Question = { q: string; r: string };

export const FAQ: { theme: string; questions: Question[] }[] = [
  {
    theme: "Fonctionnement",
    questions: [
      {
        q: "Que signifie exactement « 6 jours sur 7 » ?",
        r: "Nous vous accompagnons du lundi au samedi, selon les horaires et les délais de traitement de votre formule. Ce n'est pas une réponse immédiate à toute heure : vos demandes sont traitées dans le délai contractuel (24 h, 24 à 48 h ou 48 h ouvrées).",
      },
      {
        q: "Comment vous transmettre mes documents ?",
        r: "Par votre espace VIRTUASSIST, par email ou via l'outil que vous utilisez déjà (drive partagé, logiciel de facturation). Nous nous adaptons à votre organisation existante plutôt que de vous en imposer une.",
      },
      {
        q: "Travaillez-vous avec La Réunion malgré le décalage horaire ?",
        r: "Oui. Le décalage est de 2 à 3 heures selon la saison. Les plages de travail se recouvrent largement et les délais de traitement annoncés sont identiques à ceux de la métropole.",
      },
    ],
  },
  {
    theme: "Forfait et heures",
    questions: [
      {
        q: "Que se passe-t-il si je dépasse mon forfait ?",
        r: "Dès 90 % du forfait consommé, nous vous prévenons. Vous choisissez alors entre un pack d'heures complémentaires (5 h à 140 € HT, 10 h à 270 € HT) ou le report d'une partie des travaux sur le mois suivant. Rien n'est facturé sans votre accord.",
      },
      {
        q: "Les heures non utilisées sont-elles reportées ?",
        r: "Oui, dans la limite de 20 % du forfait, et uniquement sur le mois suivant : 2 h en Essentiel, 4 h en Sérénité, 8 h en Premium. Au-delà, les heures sont perdues.",
      },
      {
        q: "Suis-je engagé sur une durée ?",
        r: "Non. Les prestations sont souscrites sans engagement de durée, avec une période d'essai de 30 jours. Vous pouvez arrêter avec un préavis de 30 jours, et vos documents vous sont restitués intégralement.",
      },
      {
        q: "Comment se passe la facturation ?",
        r: "Les forfaits sont facturés chaque mois, en début de mois, et payables à réception par virement ou prélèvement.",
      },
    ],
  },
  {
    theme: "Périmètre",
    questions: [
      {
        q: "Faites-vous de la comptabilité ?",
        r: "Non. La comptabilité et le conseil juridique relèvent de professions réglementées et ne sont pas inclus. Nous préparons et organisons vos pièces pour votre expert-comptable, ce qui lui fait gagner du temps et vous coûte moins cher.",
      },
      {
        q: "Jusqu'où va le recouvrement ?",
        r: "Le recouvrement que nous menons reste strictement amiable. Il n'inclut aucune procédure contentieuse ou judiciaire.",
      },
      {
        q: "Mes informations restent-elles confidentielles ?",
        r: "Oui. Nous nous engageons à une confidentialité stricte sur l'ensemble des informations confiées, et les données personnelles sont traitées conformément au RGPD, pour la seule exécution des prestations.",
      },
    ],
  },
];

export const TOUTES_QUESTIONS = FAQ.flatMap((t) => t.questions);

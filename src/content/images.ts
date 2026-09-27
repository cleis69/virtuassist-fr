/**
 * Photographies du site.
 *
 * Toutes proviennent d'Unsplash (licence Unsplash : usage commercial libre,
 * sans attribution obligatoire) et sont servies par leur CDN, qui recadre et
 * compresse à la demande. Pour remplacer une photo par une image de
 * l'entreprise, il suffit de changer son identifiant ici — ou de passer à
 * `src` une URL locale (dossier public/).
 */

export type Photo = {
  /** Identifiant Unsplash (photo-…) ou chemin local commençant par « / ». */
  id: string;
  alt: string;
  /** Point focal pour le recadrage CSS (object-position). */
  focus?: string;
};

export const PHOTOS = {
  accueil: {
    id: "photo-1688646583123-16844c80e78a",
    alt: "Une femme travaille sur son ordinateur portable dans un bureau lumineux",
    focus: "60% 40%",
  },
  dirigeante: {
    id: "photo-1742844019094-cefa1969b331",
    alt: "Une dirigeante travaille à son bureau, ses dossiers à portée de main",
  },
  assistante: {
    id: "photo-1713946598698-0fe798465d4f",
    alt: "Une assistante sourit en travaillant sur son ordinateur portable",
  },
  ecrans: {
    id: "photo-1573496528641-1ea45c3ba70e",
    alt: "Une femme en tailleur travaille face à deux écrans",
  },
  duo: {
    id: "photo-1713947504838-2b0b92a65fd2",
    alt: "Deux collègues échangent devant un ordinateur portable",
  },
  tablette: {
    id: "photo-1628348068343-c6a848d2b6dd",
    alt: "Un professionnel vérifie des chiffres sur une tablette, calculatrice et documents sur le bureau",
  },
  calculatrice: {
    id: "photo-1626266061368-46a8f578ddd6",
    alt: "Une personne fait ses comptes à la calculatrice, à côté de son ordinateur",
  },
  bureauDessus: {
    id: "photo-1664575602276-acd073f104c1",
    alt: "Vue de dessus d'un bureau : ordinateur portable, calculatrice et documents",
  },
  facture: {
    id: "photo-1554224155-6726b3ff858f",
    alt: "Une main tient une facture à côté d'une calculatrice et d'un stylo",
  },
  piles: {
    id: "photo-1583521214690-73421a1829a9",
    alt: "Des piles de dossiers et de documents papier s'accumulent dans un bureau",
  },
  bureauBois: {
    id: "photo-1589884629000-60c572c6ba7a",
    alt: "Un bureau en bois avec un ordinateur portable et des documents",
  },
  classeur: {
    id: "photo-1544377193-33dcf4d68fb5",
    alt: "Un classeur de suivi budgétaire, un stylo et des trombones",
  },
  courrier: {
    id: "photo-1559057287-ce0f595679a8",
    alt: "Des enveloppes et du courrier ouvert sur un bureau",
  },
  tableauBord: {
    id: "photo-1599658880436-c61792e70672",
    alt: "Un tableau de bord affiché sur un ordinateur portable, une tasse à côté",
  },
  graphiques: {
    id: "photo-1608222351212-18fe0ec7b13b",
    alt: "Des graphiques de suivi affichés sur un ordinateur portable",
  },
  analyse: {
    id: "photo-1542744173-05336fcc7ad4",
    alt: "Une personne consulte un graphique sur son ordinateur portable",
  },
  siteWeb: {
    id: "photo-1487014679447-9f8336841d58",
    alt: "Un site internet affiché sur un ordinateur portable posé sur un bureau",
  },
  siteWebMain: {
    id: "photo-1542744095-291d1f67b221",
    alt: "Une personne parcourt un site internet sur son ordinateur portable",
  },
  formation: {
    id: "photo-1560264357-8d9202250f21",
    alt: "Des collaborateurs travaillent ensemble sur leurs ordinateurs dans un bureau lumineux",
  },
  formationEquipe: {
    id: "photo-1560264418-c4445382edbc",
    alt: "Une équipe au travail sur des postes informatiques",
  },
  appel: {
    id: "photo-1537511446984-935f663eb1f4",
    alt: "Un homme sourit au téléphone, installé à son bureau",
    focus: "50% 35%",
  },
  telephone: {
    id: "photo-1758599543146-f263d3b3321e",
    alt: "Une femme à lunettes parle au téléphone devant un immeuble de bureaux",
    focus: "40% 35%",
  },
  visio: {
    id: "photo-1616587226960-4a03badbe8bf",
    alt: "Un homme échange en visioconférence depuis son ordinateur portable",
  },
  visioFemme: {
    id: "photo-1616587226157-48e49175ee20",
    alt: "Une femme échange en visioconférence depuis son ordinateur portable",
  },
  accord: {
    id: "photo-1686771416282-3888ddaf249b",
    alt: "Deux personnes se serrent la main devant un ordinateur portable",
  },
  poigneeMain: {
    id: "photo-1672380135241-c024f7fbfa13",
    alt: "Poignée de main au-dessus d'un bureau",
  },
  reunion: {
    id: "photo-1665422276005-18116a1e6225",
    alt: "Le littoral de Sainte-Rose, à La Réunion",
  },
  mafate: {
    id: "photo-1556942769-8905a2d7ef28",
    alt: "Les montagnes du cirque de Mafate, à La Réunion",
  },
  paris: {
    id: "photo-1587172653333-4d85727afdc3",
    alt: "Les toits de Paris au coucher du soleil",
  },
  parisRue: {
    id: "photo-1673364631720-7cbafd53316d",
    alt: "Une rue bordée d'immeubles haussmanniens, à Paris",
  },
  artisans: {
    id: "photo-1646324554833-f0b6a479fa5d",
    alt: "Un artisan casqué travaille sur une charpente en bois",
  },
  cabinets: {
    id: "photo-1758518731462-d091b0b4ed0d",
    alt: "Rendez-vous dans un cabinet : signature d'un document autour d'une table",
  },
  immobilier: {
    id: "photo-1722487631997-cf1e0f92c2c4",
    alt: "Une main tend un trousseau de clés",
  },
  societesServices: {
    id: "photo-1551434678-e076c223a692",
    alt: "Deux collaborateurs travaillent sur ordinateur dans un bureau",
  },
  consultants: {
    id: "photo-1714974528737-3e6c7e4d11af",
    alt: "Une réunion de travail autour d'une table",
  },
  transport: {
    id: "photo-1670509295484-df0c2512fec4",
    alt: "Un poids lourd sur la route",
  },
  commercants: {
    id: "photo-1753351054581-783229e920fa",
    alt: "Deux commerçants souriants derrière leur comptoir",
  },
  independants: {
    id: "photo-1546514714-df0ccc50d7bf",
    alt: "Une indépendante travaille à son bureau, face à son écran",
  },
  pme: {
    id: "photo-1560264280-88b68371db39",
    alt: "Un plateau de bureaux où travaille une petite équipe",
  },
} satisfies Record<string, Photo>;

export type PhotoCle = keyof typeof PHOTOS;

/** URL recadrée et compressée par le CDN d'Unsplash. */
export function urlPhoto(id: string, largeur: number, ratio?: number) {
  if (id.startsWith("/")) return id;
  const h = ratio ? `&h=${Math.round(largeur / ratio)}` : "";
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${largeur}${h}&q=72`;
}

export function srcSetPhoto(id: string, ratio?: number) {
  if (id.startsWith("/")) return undefined;
  return [480, 768, 1080, 1440, 1920].map((w) => `${urlPhoto(id, w, ratio)} ${w}w`).join(", ");
}

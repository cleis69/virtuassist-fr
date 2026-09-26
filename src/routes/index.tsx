import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Constat } from "@/components/sections/Constat";
import { Classeur } from "@/components/sections/Classeur";
import { Methode } from "@/components/sections/Methode";
import { Offres } from "@/components/sections/Offres";
import { Options } from "@/components/sections/Options";
import { Lancement } from "@/components/sections/Lancement";
import { Garantie, PourQui } from "@/components/sections/PourQui";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

const TITRE = "VIRTUASSIST — Assistance administrative externalisée pour TPE et PME";
const DESCRIPTION =
  "Assistance administrative externalisée pour TPE, PME, indépendants et professionnels. Facturation, relances, secrétariat, suivi de dossiers. France métropolitaine et La Réunion.";

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "VIRTUASSIST",
  slogan: "Votre administratif, notre priorité.",
  description: DESCRIPTION,
  email: "contact@virtuassist.fr",
  telephone: "+33000000000",
  areaServed: ["France métropolitaine", "La Réunion"],
  priceRange: "250 € - 1290 € HT/mois",
  openingHours: "Mo-Sa",
  makesOffer: [
    { "@type": "Offer", name: "Essentiel", price: "250", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Sérénité", price: "460", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Premium", price: "840", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Entreprise", price: "1290", priceCurrency: "EUR" },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSONLD) }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-ivoire">
      <SiteHeader />
      <main>
        <Hero />
        <Constat />
        <Classeur />
        <Methode />
        <Offres />
        <Options />
        <Lancement />
        <PourQui />
        <Garantie />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}

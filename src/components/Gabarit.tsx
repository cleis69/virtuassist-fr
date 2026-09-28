import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

/** Gabarit commun à toutes les pages : en-tête, contenu, pied de page. */
export function Gabarit({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader />
      <main id="contenu" tabIndex={-1} className="overflow-x-clip outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

/** Titre et description d'une page, pour les moteurs et le partage. */
export function meta(titre: string, description: string) {
  const t = `${titre} | VIRTUASSIST`;
  return [
    { title: t },
    { name: "description", content: description },
    { property: "og:title", content: t },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

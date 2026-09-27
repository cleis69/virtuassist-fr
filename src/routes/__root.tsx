import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import { Gabarit } from "@/components/Gabarit";
import { Bouton } from "@/components/ui-va/Bouton";
import { Photo } from "@/components/ui-va/Photo";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <Gabarit>
      <section className="bg-gris">
        <div className="conteneur grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="surtitre">Erreur 404</p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold leading-tight">
              Cette page est introuvable.
            </h1>
            <p className="mt-5 text-lg text-ardoise">
              Elle a peut-être été déplacée, ou l'adresse contient une faute de frappe. Voici où
              aller ensuite :
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Bouton to="/" taille="lg">
                Revenir à l'accueil
              </Bouton>
              <Bouton to="/services" variante="secondaire" taille="lg" fleche={false}>
                Nos services
              </Bouton>
              <Bouton to="/contact" variante="secondaire" taille="lg" fleche={false}>
                Nous contacter
              </Bouton>
            </div>
          </div>
          <Photo cle="piles" ratio={4 / 3} priorite />
        </div>
      </section>
    </Gabarit>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gris px-5">
      <div className="max-w-md text-center">
        <p className="surtitre">Erreur</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-marine">
          La page ne s'est pas chargée.
        </h1>
        <p className="mt-4 text-ardoise">
          Un problème est survenu de notre côté. Réessayez, ou revenez à l'accueil.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-turquoise-fonce px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-marine"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-marine ring-1 ring-inset ring-marine/20 transition-colors hover:ring-marine"
          >
            Revenir à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0F2A3D" },
      { title: "VIRTUASSIST — Votre administratif, notre priorité." },
      {
        name: "description",
        content:
          "Assistance administrative externalisée pour TPE, PME, indépendants et professionnels. France métropolitaine et La Réunion.",
      },
      { name: "author", content: "VIRTUASSIST" },
      { property: "og:title", content: "VIRTUASSIST — Votre administratif, notre priorité." },
      {
        property: "og:description",
        content:
          "Assistance administrative externalisée pour TPE, PME, indépendants et professionnels. France métropolitaine et La Réunion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:ital,wght@0,400;0,500;0,700;1,400&family=Lexend:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Défilement adouci à la molette, sur ordinateur seulement : au doigt, le
 * défilement natif du téléphone reste le plus juste. Désactivé quand le
 * visiteur demande moins de mouvement.
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

function useDefilementDoux() {
  useEffect(() => {
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const souris = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduit || !souris) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, wheelMultiplier: 0.95 });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useDefilementDoux();

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </MotionConfig>
    </QueryClientProvider>
  );
}

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

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="regle flex min-h-screen items-center justify-center bg-ivoire px-5">
      <div className="max-w-md text-center">
        <p className="label-section text-vague-profonde">Erreur 404</p>
        <h1 className="mt-5 font-display text-6xl text-nuit">Page introuvable.</h1>
        <p className="mt-4 text-ardoise">
          Ce document n'est pas dans nos dossiers. Il a peut-être été déplacé, ou l'adresse contient
          une faute de frappe.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-vague-profonde px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-nuit"
          >
            Revenir à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivoire px-5">
      <div className="max-w-md text-center">
        <p className="label-section text-vague-profonde">Erreur</p>
        <h1 className="mt-5 font-display text-5xl text-nuit">La page ne s'est pas chargée.</h1>
        <p className="mt-4 text-ardoise">
          Un problème est survenu de notre côté. Réessayez, ou revenez à l'accueil.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-vague-profonde px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-nuit"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-nuit ring-1 ring-inset ring-nuit/20 transition-colors hover:ring-nuit"
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
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
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

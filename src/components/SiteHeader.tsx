import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { LogoLockup } from "./Logo";

const NAV = [
  { hash: "services", label: "Services" },
  { hash: "offres", label: "Nos offres" },
  { hash: "methode", label: "Comment ça marche" },
  { hash: "faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-nuit text-on-nuit">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem]">
        <Link to="/" aria-label="VIRTUASSIST — accueil" onClick={() => setOpen(false)}>
          <LogoLockup tone="clair" animate />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className="text-sm font-medium text-on-nuit-muted transition-colors hover:text-on-nuit focus-visible:text-on-nuit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vague focus-visible:ring-offset-2 focus-visible:ring-offset-nuit"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="contact"
            className="rounded-md bg-vague px-4 py-2.5 text-sm font-semibold text-nuit-deep transition-colors hover:bg-on-nuit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-nuit focus-visible:ring-offset-2 focus-visible:ring-offset-nuit"
          >
            Diagnostic gratuit
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-on-nuit/25 text-on-nuit md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="menu-mobile" className="border-t border-on-nuit/15 bg-nuit md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3" aria-label="Navigation mobile">
            {NAV.map((item) => (
              <Link
                key={item.hash}
                to="/"
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="border-b border-on-nuit/10 py-3.5 text-sm font-medium text-on-nuit-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="contact"
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 rounded-md bg-vague px-4 py-3 text-center text-sm font-semibold text-nuit-deep"
            >
              Diagnostic gratuit
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

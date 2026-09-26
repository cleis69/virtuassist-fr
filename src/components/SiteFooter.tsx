import { Link } from "@tanstack/react-router";
import { LogoMark, Logotype } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-nuit text-on-nuit">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark tone="clair" className="h-9 w-auto" />
              <Logotype tone="clair" className="text-2xl" />
            </div>
            <p className="mt-4 font-display text-xl text-on-nuit">
              Votre administratif, notre priorité.
            </p>
            <p className="mt-3 text-sm text-on-nuit-muted">
              France métropolitaine · La Réunion
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <p className="label-section text-vague">Contact</p>
              <ul className="mt-4 space-y-2 text-on-nuit-muted">
                <li>
                  <a className="hover:text-on-nuit" href="mailto:contact@virtuassist.fr">
                    contact@virtuassist.fr
                  </a>
                </li>
                <li>
                  <a className="hover:text-on-nuit" href="tel:+33000000000">
                    +33 (0)0 00 00 00 00
                  </a>
                </li>
                <li>Du lundi au samedi</li>
              </ul>
            </div>
            <div>
              <p className="label-section text-vague">Informations</p>
              <ul className="mt-4 space-y-2 text-on-nuit-muted">
                <li>
                  <Link className="hover:text-on-nuit" to="/mentions-legales">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-on-nuit" to="/cgv">
                    CGV
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-on-nuit" to="/" hash="faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-on-nuit/15 pt-6 text-xs text-on-nuit-muted">
          © {new Date().getFullYear()} VIRTUASSIST. Tous droits réservés. Tarifs indiqués hors
          taxes.
        </p>
      </div>
    </footer>
  );
}

import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import {
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  House,
  Layers,
  Mail,
  Menu,
  MessageCircleQuestion,
  Phone,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Disponibilite } from "@/components/Horloges";
import { LogoLockup } from "@/components/Logo";
import { Bouton } from "@/components/ui-va/Bouton";
import { Photo } from "@/components/ui-va/Photo";
import { IconeService } from "@/components/ui-va/IconeService";
import { ENTREPRISE, SERVICES } from "@/content/site";
import { cn } from "@/lib/utils";

const PAGES: { to: NonNullable<LinkProps["to"]>; label: string }[] = [
  { to: "/tarifs", label: "Tarifs" },
  { to: "/fonctionnement", label: "Comment ça marche" },
  { to: "/secteurs", label: "Pour qui" },
  { to: "/faq", label: "FAQ" },
];

function useChemin() {
  return useRouterState({ select: (s) => s.location.pathname });
}

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[60] rounded-lg bg-marine px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Aller au contenu
      </a>
      <BarreInfos />
      <BarrePrincipale onMenu={() => setMenu(true)} />
      <NavBas />
      <MenuMobile ouvert={menu} onChange={setMenu} />
    </>
  );
}

/* ───────────────────────── bandeau d'informations ───────────────────────── */

function BarreInfos() {
  return (
    <div className="hidden bg-marine text-[0.95rem] text-sur-marine-doux lg:block">
      <div className="conteneur flex h-11 items-center justify-between gap-6">
        <p className="flex items-center gap-3 whitespace-nowrap">
          <Disponibilite className="text-white" />
          <span aria-hidden="true">·</span>
          <span>{ENTREPRISE.jours}</span>
          <span aria-hidden="true">·</span>
          <span>{ENTREPRISE.zones}</span>
        </p>
        <div className="flex items-center gap-6 whitespace-nowrap">
          <a
            href={`tel:${ENTREPRISE.telephone}`}
            className="inline-flex items-center gap-2 font-bold text-white hover:underline"
          >
            <Phone className="h-4 w-4 text-turquoise" aria-hidden="true" />
            {ENTREPRISE.telephoneAffiche}
          </a>
          <a
            href={`mailto:${ENTREPRISE.email}`}
            className="inline-flex items-center gap-2 hover:text-white hover:underline"
          >
            <Mail className="h-4 w-4 text-turquoise" aria-hidden="true" />
            {ENTREPRISE.email}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── barre principale ───────────────────────── */

function BarrePrincipale({ onMenu }: { onMenu: () => void }) {
  const chemin = useChemin();
  const { scrollY } = useScroll();
  const [decollee, setDecollee] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setDecollee(y > 48));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300",
        decollee ? "shadow-[0_10px_30px_-18px_rgb(15_42_61/35%)]" : "shadow-[0_1px_0_var(--ligne)]",
      )}
    >
      <div className="conteneur flex h-[4.5rem] items-center justify-between gap-3 lg:h-20">
        <Link to="/" aria-label="VirtuAssist — accueil" className="shrink-0 rounded-lg">
          <LogoLockup anime descripteur />
        </Link>

        <LayoutGroup id="nav-haut">
          <nav aria-label="Navigation principale" className="hidden items-center gap-0.5 lg:flex">
            <MenuServices actif={chemin.startsWith("/services")} />
            {PAGES.map((p) => {
              const on = chemin.startsWith(String(p.to));
              return (
                <Link
                  key={p.label}
                  to={p.to}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3 py-2.5 font-display text-[1rem] font-medium transition-colors hover:bg-gris xl:px-4",
                    on ? "text-turquoise-fonce" : "text-marine",
                  )}
                >
                  {p.label}
                  {on && <Souligne />}
                </Link>
              );
            })}
          </nav>
        </LayoutGroup>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/contact"
            className="hidden rounded-lg px-3 py-2.5 font-display font-medium text-marine hover:bg-gris xl:inline-flex"
          >
            Contact
          </Link>
          <Bouton to="/contact" className="hidden lg:inline-flex">
            Diagnostic gratuit
          </Bouton>

          <a
            href={`tel:${ENTREPRISE.telephone}`}
            className="inline-flex h-12 min-w-12 shrink-0 items-center justify-center gap-2 rounded-xl px-3 font-display font-medium text-marine ring-2 ring-inset ring-marine/15 lg:hidden"
            aria-label={`Appeler le ${ENTREPRISE.telephoneAffiche}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span className="hidden sm:inline">Appeler</span>
          </a>
          <button
            type="button"
            onClick={onMenu}
            aria-haspopup="dialog"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-marine px-3.5 font-display font-medium text-white lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}

function Souligne() {
  return (
    <motion.span
      layoutId="souligne-nav"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-turquoise xl:inset-x-4"
    />
  );
}

/* ───────────────────────── menu déroulant « Services » ───────────────────────── */

function MenuServices({ actif }: { actif: boolean }) {
  const [ouvert, setOuvert] = useState(false);
  const chemin = useChemin();
  const zone = useRef<HTMLDivElement>(null);
  const bouton = useRef<HTMLButtonElement>(null);
  const minuteur = useRef<number | undefined>(undefined);
  const reduce = useReducedMotion();

  useEffect(() => setOuvert(false), [chemin]);

  useEffect(() => {
    if (!ouvert) return;
    const surClic = (e: MouseEvent) => {
      if (zone.current && !zone.current.contains(e.target as Node)) setOuvert(false);
    };
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOuvert(false);
        bouton.current?.focus();
      }
    };
    document.addEventListener("mousedown", surClic);
    document.addEventListener("keydown", surTouche);
    return () => {
      document.removeEventListener("mousedown", surClic);
      document.removeEventListener("keydown", surTouche);
    };
  }, [ouvert]);

  // Ouverture au survol à la souris, avec un léger délai pour ne pas
  // s'ouvrir quand on ne fait que passer.
  const survol = (v: boolean) => {
    window.clearTimeout(minuteur.current);
    minuteur.current = window.setTimeout(() => setOuvert(v), v ? 90 : 240);
  };

  return (
    <div
      ref={zone}
      onPointerEnter={(e) => e.pointerType === "mouse" && survol(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && survol(false)}
    >
      <button
        ref={bouton}
        type="button"
        aria-expanded={ouvert}
        aria-controls="panneau-services"
        onClick={() => setOuvert((v) => !v)}
        className={cn(
          "relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 font-display text-[1rem] font-medium transition-colors hover:bg-gris xl:px-4",
          actif ? "text-turquoise-fonce" : "text-marine",
        )}
      >
        Services
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-300", ouvert && "rotate-180")}
          aria-hidden="true"
        />
        {actif && <Souligne />}
      </button>

      <AnimatePresence>
        {ouvert && (
          <motion.div
            id="panneau-services"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full border-t border-ligne bg-white shadow-[0_30px_60px_-30px_rgb(15_42_61/40%)]"
          >
            <div className="conteneur grid gap-8 py-8 lg:grid-cols-[1fr_1fr_0.85fr]">
              <ul className="grid gap-1 lg:col-span-2 lg:grid-cols-2">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group flex gap-4 rounded-2xl p-4 transition-colors hover:bg-gris"
                    >
                      <IconeService
                        slug={s.slug}
                        className="h-12 w-12 transition-colors group-hover:bg-turquoise-fonce group-hover:text-white"
                      />
                      <span>
                        <span className="block font-display text-lg font-semibold text-marine">
                          {s.nom}
                        </span>
                        <span className="mt-1 block text-[0.95rem] leading-snug text-ardoise">
                          {s.accroche}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services"
                    className="flex h-full items-center gap-2 rounded-2xl p-4 font-bold text-turquoise-fonce hover:bg-gris"
                  >
                    Voir tous les services
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
              <Link to="/contact" className="group relative block overflow-hidden rounded-2xl">
                <Photo
                  cle="appel"
                  ratio={4 / 3}
                  revele={false}
                  parallaxe={false}
                  sizes="400px"
                  className="rounded-2xl"
                />
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-t from-marine via-marine/40 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="block font-display text-xl font-semibold">
                    Diagnostic gratuit
                  </span>
                  <span className="mt-1 block text-[0.95rem] text-sur-marine-doux">
                    30 minutes pour savoir ce qui peut être délégué. Sans engagement.
                  </span>
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── barre du bas (mobile) ───────────────────────── */

const BAS: {
  to: NonNullable<LinkProps["to"]>;
  label: string;
  Icone: typeof House;
  exact?: boolean;
}[] = [
  { to: "/", label: "Accueil", Icone: House, exact: true },
  { to: "/services", label: "Services", Icone: Layers },
  { to: "/tarifs", label: "Tarifs", Icone: Tag },
  { to: "/faq", label: "FAQ", Icone: MessageCircleQuestion },
];

function NavBas() {
  const chemin = useChemin();
  const reduce = useReducedMotion();
  const estActif = (to: string, exact?: boolean) => (exact ? chemin === to : chemin.startsWith(to));

  return (
    <motion.nav
      aria-label="Navigation rapide"
      initial={reduce ? false : { y: "150%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ligne bg-white/97 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-20px_rgb(15_42_61/40%)] backdrop-blur-md lg:hidden"
    >
      <LayoutGroup id="nav-bas">
        <ul className="mx-auto grid h-[4.5rem] max-w-lg grid-cols-5 items-stretch gap-1 px-2 py-1.5">
          {BAS.map(({ to, label, Icone, exact }) => {
            const on = estActif(String(to), exact);
            return (
              <li key={label}>
                <Link
                  to={to}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "relative flex h-full flex-col items-center justify-center gap-1 rounded-xl text-[0.8rem] font-bold transition-colors",
                    on ? "text-turquoise-fonce" : "text-ardoise",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="pastille-bas"
                      className="absolute inset-0 rounded-xl bg-turquoise-pale"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icone
                    className="relative h-6 w-6"
                    strokeWidth={on ? 2.3 : 1.9}
                    aria-hidden="true"
                  />
                  <span className="relative">{label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              to="/contact"
              aria-current={chemin === "/contact" ? "page" : undefined}
              className="flex h-full flex-col items-center justify-center gap-1 rounded-xl bg-turquoise-fonce text-[0.8rem] font-bold text-white"
            >
              <ClipboardCheck className="h-6 w-6" strokeWidth={2.2} aria-hidden="true" />
              <span>Diagnostic</span>
            </Link>
          </li>
        </ul>
      </LayoutGroup>
    </motion.nav>
  );
}

/* ───────────────────────── menu complet (mobile) ───────────────────────── */

const DECOUVRIR: { to: NonNullable<LinkProps["to"]>; label: string }[] = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Tous les services" },
  ...PAGES,
  { to: "/contact", label: "Contact" },
];

function MenuMobile({ ouvert, onChange }: { ouvert: boolean; onChange: (v: boolean) => void }) {
  const chemin = useChemin();
  useEffect(() => onChange(false), [chemin, onChange]);
  const fermer = () => onChange(false);

  return (
    <Drawer open={ouvert} onOpenChange={onChange} shouldScaleBackground={false}>
      <DrawerContent className="max-h-[92svh] border-0 bg-white">
        <DrawerTitle className="sr-only">Menu</DrawerTitle>
        <div className="flex items-center justify-between px-5 pt-3">
          <LogoLockup descripteur />
          <DrawerClose className="inline-flex h-12 items-center gap-2 rounded-xl bg-gris px-4 font-display font-medium text-marine">
            <X className="h-5 w-5" aria-hidden="true" />
            Fermer
          </DrawerClose>
        </div>

        <nav aria-label="Menu" className="overflow-y-auto px-5 pt-5" data-lenis-prevent>
          <p className="text-[0.95rem] font-bold text-ardoise">Nos services</p>
          <ul className="mt-2 grid gap-1">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  onClick={fermer}
                  className="flex items-center gap-3 rounded-xl px-2 py-2.5 font-display text-[1.05rem] font-medium text-marine active:bg-gris"
                >
                  <IconeService slug={s.slug} className="h-10 w-10" />
                  {s.nom}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[0.95rem] font-bold text-ardoise">Découvrir</p>
          <ul className="mt-2 divide-y divide-ligne border-y border-ligne">
            {DECOUVRIR.map((p) => (
              <li key={p.label}>
                <Link
                  to={p.to}
                  onClick={fermer}
                  className="flex items-center justify-between py-3.5 font-display text-lg font-medium text-marine"
                >
                  {p.label}
                  <ChevronRight className="h-5 w-5 text-ardoise" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-3 border-t border-ligne px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <Bouton to="/contact" taille="lg" onClick={fermer} className="w-full">
            Demander mon diagnostic gratuit
          </Bouton>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${ENTREPRISE.telephone}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl font-display font-medium text-marine ring-2 ring-inset ring-marine/15"
            >
              <Phone className="h-5 w-5" aria-hidden="true" /> Appeler
            </a>
            <a
              href={`mailto:${ENTREPRISE.email}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl font-display font-medium text-marine ring-2 ring-inset ring-marine/15"
            >
              <Mail className="h-5 w-5" aria-hidden="true" /> Écrire
            </a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import {
  ClipboardCheck,
  FolderOpen,
  House,
  Mail,
  Menu,
  MessageCircleQuestion,
  Phone,
  ReceiptText,
  X,
} from "lucide-react";
import { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Cta, SectionLink, useAllerA, type SectionId } from "@/components/SectionLink";
import { Disponibilite, Horloges } from "@/components/Horloges";
import { LogoLockup } from "@/components/Logo";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const NAV: { id: SectionId; label: string }[] = [
  { id: "services", label: "Services" },
  { id: "methode", label: "Méthode" },
  { id: "offres", label: "Offres" },
  { id: "faq", label: "FAQ" },
];

const BAS: { id: SectionId; label: string; Icone: typeof House }[] = [
  { id: "top", label: "Accueil", Icone: House },
  { id: "services", label: "Services", Icone: FolderOpen },
  { id: "offres", label: "Offres", Icone: ReceiptText },
  { id: "faq", label: "FAQ", Icone: MessageCircleQuestion },
];

const SECTIONS = ["top", "services", "methode", "offres", "faq", "contact"] as const;

export function SiteHeader() {
  const active = useActiveSection(SECTIONS);
  const [menu, setMenu] = useState(false);

  return (
    <>
      <AppBar active={active} onMenu={() => setMenu(true)} menuOuvert={menu} />
      <BottomNav active={active} />
      <MenuMobile ouvert={menu} onChange={setMenu} />
    </>
  );
}

/* ───────────────────────── barre du haut ───────────────────────── */

function AppBar({
  active,
  onMenu,
  menuOuvert,
}: {
  active: string | null;
  onMenu: () => void;
  menuOuvert: boolean;
}) {
  const { scrollY, scrollYProgress } = useScroll();
  const [cachee, setCachee] = useState(false);
  const [decollee, setDecollee] = useState(false);
  const reduce = useReducedMotion();

  // Se retire quand on descend pour lire, revient dès qu'on remonte.
  useMotionValueEvent(scrollY, "change", (y) => {
    const avant = scrollY.getPrevious() ?? 0;
    setDecollee(y > 24);
    if (Math.abs(y - avant) < 4) return;
    setCachee(y > avant && y > 360 && !menuOuvert);
  });

  return (
    <motion.header
      initial={reduce ? false : { y: -140 }}
      animate={{ y: cachee ? -140 : 0, opacity: cachee ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setCachee(false)}
      className="fixed inset-x-3 top-3 z-50 sm:inset-x-5 sm:top-4"
    >
      <div
        className={cn(
          "relative mx-auto flex h-14 max-w-[1320px] items-center justify-between gap-4 overflow-hidden rounded-2xl pl-4 pr-2 text-on-nuit ring-1 ring-on-nuit/10 backdrop-blur-xl transition-[background-color,box-shadow] duration-500 sm:h-16 sm:pl-5",
          decollee
            ? "bg-nuit/88 shadow-[0_20px_40px_-24px_oklch(0.2429_0.0436_243.37/70%)]"
            : "bg-nuit",
        )}
      >
        <SectionLink to="top" aria-label="VIRTUASSIST — accueil" className="shrink-0 rounded-md">
          <LogoLockup tone="clair" animate />
        </SectionLink>

        <LayoutGroup id="nav-haut">
          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const on = active === item.id;
              return (
                <SectionLink
                  key={item.id}
                  to={item.id}
                  aria-current={on ? "location" : undefined}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300",
                    on ? "text-on-nuit" : "text-on-nuit-muted hover:text-on-nuit",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="pastille-nav"
                      className="absolute inset-0 rounded-lg bg-on-nuit/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </SectionLink>
              );
            })}
          </nav>
        </LayoutGroup>

        <div className="flex items-center gap-4">
          <Horloges className="hidden text-on-nuit xl:block" compact />
          <Disponibilite className="hidden text-on-nuit-muted sm:inline-flex lg:hidden" />
          <div className="hidden lg:block">
            <Cta to="contact" variante="clair" className="min-h-11 px-5 py-2.5" magnetique={false}>
              Diagnostic gratuit
            </Cta>
          </div>
          <button
            type="button"
            onClick={onMenu}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOuvert}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-on-nuit/10 text-on-nuit transition-colors hover:bg-on-nuit/20 sm:h-11 sm:w-11 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Progression de lecture */}
        <motion.span
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-vague"
        />
      </div>
    </motion.header>
  );
}

/* ───────────────────────── barre du bas (mobile) ───────────────────────── */

function BottomNav({ active }: { active: string | null }) {
  const reduce = useReducedMotion();
  return (
    <motion.nav
      aria-label="Navigation rapide"
      initial={reduce ? false : { y: "160%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      className="fixed inset-x-3 z-50 lg:hidden"
      style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <LayoutGroup id="nav-bas">
        <ul className="mx-auto grid h-[4.25rem] max-w-md grid-cols-5 items-stretch gap-1 rounded-2xl bg-nuit/92 p-1.5 text-on-nuit shadow-[0_24px_48px_-20px_oklch(0.2429_0.0436_243.37/75%)] ring-1 ring-on-nuit/10 backdrop-blur-xl">
          {BAS.map(({ id, label, Icone }) => {
            const on = active === id;
            return (
              <li key={id} className="relative">
                <SectionLink
                  to={id}
                  aria-current={on ? "location" : undefined}
                  className={cn(
                    "relative flex h-full flex-col items-center justify-center gap-1 rounded-xl text-[0.65rem] font-semibold transition-colors",
                    on ? "text-on-nuit" : "text-on-nuit-muted",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="pastille-bas"
                      className="absolute inset-0 rounded-xl bg-on-nuit/10"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icone
                    className="relative h-5 w-5"
                    strokeWidth={on ? 2.2 : 1.8}
                    aria-hidden="true"
                  />
                  <span className="relative">{label}</span>
                </SectionLink>
              </li>
            );
          })}
          <li>
            <SectionLink
              to="contact"
              aria-current={active === "contact" ? "location" : undefined}
              className="flex h-full flex-col items-center justify-center gap-1 rounded-xl bg-vague text-[0.65rem] font-bold text-nuit-deep transition-colors active:bg-on-nuit"
            >
              <ClipboardCheck className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              <span>Diagnostic</span>
            </SectionLink>
          </li>
        </ul>
      </LayoutGroup>
    </motion.nav>
  );
}

/* ───────────────────────── menu complet (mobile) ───────────────────────── */

function MenuMobile({ ouvert, onChange }: { ouvert: boolean; onChange: (v: boolean) => void }) {
  const allerA = useAllerA();
  const aller = (id: SectionId) => {
    onChange(false);
    // Le tiroir libère le défilement à la fin de sa fermeture.
    window.setTimeout(() => allerA(id), 380);
  };
  const liens: { id: SectionId; label: string }[] = [
    { id: "top", label: "Accueil" },
    { id: "services", label: "Nos prestations" },
    { id: "methode", label: "Comment ça marche" },
    { id: "offres", label: "Les offres" },
    { id: "faq", label: "Questions fréquentes" },
  ];

  return (
    <Drawer open={ouvert} onOpenChange={onChange} shouldScaleBackground={false}>
      <DrawerContent className="border-0 bg-nuit text-on-nuit">
        <DrawerTitle className="sr-only">Menu</DrawerTitle>
        <div className="flex items-center justify-between px-6 pt-4">
          <Disponibilite className="text-on-nuit-muted" />
          <DrawerClose
            aria-label="Fermer le menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-on-nuit/10"
          >
            <X className="h-5 w-5" />
          </DrawerClose>
        </div>
        <nav aria-label="Menu" className="px-6 pt-4">
          <AnimatePresence>
            {ouvert && (
              <motion.ul
                initial="h"
                animate="v"
                variants={{ v: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              >
                {liens.map((l) => (
                  <motion.li
                    key={l.id}
                    variants={{ h: { opacity: 0, y: 18 }, v: { opacity: 1, y: 0 } }}
                    className="border-b border-on-nuit/10"
                  >
                    <button
                      type="button"
                      onClick={() => aller(l.id)}
                      className="flex w-full items-center justify-between py-4 text-left font-display text-3xl"
                    >
                      {l.label}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
        <div className="grid gap-3 px-6 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => aller("contact")}
            className="min-h-12 rounded-xl bg-vague px-6 py-3.5 text-sm font-semibold text-nuit-deep"
          >
            Demander mon diagnostic gratuit
          </button>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <a
              href="mailto:contact@virtuassist.fr"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl ring-1 ring-on-nuit/20"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> Email
            </a>
            <a
              href="tel:+33000000000"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl ring-1 ring-on-nuit/20"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> Appeler
            </a>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <Horloges className="text-on-nuit-muted" compact />
            <div className="flex gap-4 text-xs text-on-nuit-muted">
              <Link to="/mentions-legales" onClick={() => onChange(false)}>
                Mentions légales
              </Link>
              <Link to="/cgv" onClick={() => onChange(false)}>
                CGV
              </Link>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

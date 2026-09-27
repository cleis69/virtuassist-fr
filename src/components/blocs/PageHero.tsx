import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { Segment } from "@/components/motion/TextReveal";
import { Rise, TextReveal } from "@/components/motion/TextReveal";
import { FilAriane } from "@/components/ui-va/Blocs";
import { Photo } from "@/components/ui-va/Photo";
import type { PhotoCle } from "@/content/images";

/** En-tête des pages intérieures : où l'on est, de quoi parle la page, une photo. */
export function PageHero({
  ariane,
  titre,
  segments,
  intro,
  photo,
  actions,
  encart,
}: {
  ariane: { label: string; to?: NonNullable<LinkProps["to"]> }[];
  titre?: string;
  segments?: Segment[];
  intro: ReactNode;
  photo: PhotoCle;
  actions?: ReactNode;
  /** Petit encart posé sur la photo. */
  encart?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gris">
      <div className="conteneur grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div>
          <Rise onMount y={10}>
            <FilAriane etapes={ariane} />
          </Rise>
          <TextReveal
            as="h1"
            onMount
            delay={0.1}
            {...(segments ? { segments } : { children: titre ?? "" })}
            className="mt-6 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-marine"
          />
          <Rise onMount delay={0.35}>
            <div className="mt-6 max-w-xl text-lg leading-relaxed text-ardoise sm:text-xl">
              {intro}
            </div>
          </Rise>
          {actions && (
            <Rise onMount delay={0.5}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>
            </Rise>
          )}
        </div>
        <Rise onMount delay={0.15} y={30} className="relative">
          <Photo cle={photo} ratio={5 / 4} priorite sizes="(min-width: 1024px) 45vw, 100vw" />
          {encart && (
            <div className="flotte absolute -bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xs">
              {encart}
            </div>
          )}
        </Rise>
      </div>
    </section>
  );
}

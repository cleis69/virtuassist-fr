import { Check } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Horloges } from "@/components/Horloges";
import { Rise, TextReveal } from "@/components/motion/TextReveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="grain relative z-10 -mt-12 overflow-hidden rounded-t-[2.5rem] bg-nuit text-on-nuit sm:rounded-t-[3.5rem]"
    >
      {/* Sur mobile : le titre, puis tout de suite le formulaire, puis les
          garanties. Sur grand écran : deux colonnes. */}
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="label-section text-vague">Diagnostic gratuit</p>
          <TextReveal
            className="mt-6 max-w-[13ch] font-display text-[clamp(2.5rem,4.8vw,4.6rem)] leading-[1] tracking-[-0.015em]"
            segments={[
              { text: "Dites-nous ce qui vous prend" },
              { text: "du temps.", className: "italic texte-marque-clair" },
            ]}
          />
          <Rise>
            <p className="mt-7 max-w-md leading-relaxed text-on-nuit-muted">
              Nous vous rappelons sous 24 h ouvrées. Le diagnostic dure 30 minutes et débouche sur
              un plan de délégation chiffré. Sans engagement.
            </p>
          </Rise>
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <ul className="space-y-3.5 lg:mt-9">
            {[
              "Disponible 6 jours sur 7",
              "Interlocuteur dédié",
              "France métropolitaine et La Réunion",
            ].map((x, i) => (
              <Rise as="li" key={x} delay={0.1 + i * 0.07} y={12}>
                <span className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vague/15">
                    <Check
                      className="h-3.5 w-3.5 text-vague"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                  {x}
                </span>
              </Rise>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl p-6 ring-1 ring-on-nuit/12">
            <p className="label-section text-on-nuit-muted">Deux fuseaux, mêmes délais</p>
            <Horloges className="mt-3 text-base text-on-nuit sm:text-lg" />
            <p className="mt-3 text-sm text-on-nuit-muted">
              Les délais de traitement annoncés sont identiques en métropole et à La Réunion.
            </p>
          </div>
        </div>

        <Rise
          delay={0.1}
          y={40}
          className="-order-1 row-start-2 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <ContactForm />
        </Rise>
      </div>
    </section>
  );
}

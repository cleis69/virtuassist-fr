import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { TextReveal } from "@/components/motion/TextReveal";

const FAQ = [
  {
    q: "Que signifie exactement « 6 jours sur 7 » ?",
    r: "Nous vous accompagnons du lundi au samedi, selon les horaires et les délais de traitement de votre formule. Ce n'est pas une réponse immédiate à toute heure : vos demandes sont traitées dans le délai contractuel (24 h, 24 à 48 h ou 48 h ouvrées).",
  },
  {
    q: "Que se passe-t-il si je dépasse mon forfait ?",
    r: "Dès 90 % du forfait consommé, nous vous prévenons. Vous choisissez alors entre un pack d'heures complémentaires (5 h à 140 € HT, 10 h à 270 € HT) ou le report d'une partie des travaux sur le mois suivant. Rien n'est facturé sans votre accord.",
  },
  {
    q: "Les heures non utilisées sont-elles reportées ?",
    r: "Oui, dans la limite de 20 % du forfait, et uniquement sur le mois suivant : 2 h en Essentiel, 4 h en Sérénité, 8 h en Premium. Au-delà, les heures sont perdues.",
  },
  {
    q: "Comment vous transmettre mes documents ?",
    r: "Par votre espace VIRTUASSIST, par email ou via l'outil que vous utilisez déjà (drive partagé, logiciel de facturation). Nous nous adaptons à votre organisation existante plutôt que de vous en imposer une.",
  },
  {
    q: "Faites-vous de la comptabilité ?",
    r: "Non. La comptabilité et le conseil juridique relèvent de professions réglementées et ne sont pas inclus. Nous préparons et organisons vos pièces pour votre expert-comptable, ce qui lui fait gagner du temps et vous coûte moins cher.",
  },
  {
    q: "Travaillez-vous avec La Réunion malgré le décalage horaire ?",
    r: "Oui. Le décalage est de 2 à 3 heures selon la saison. Les plages de travail se recouvrent largement et les délais de traitement annoncés sont identiques à ceux de la métropole.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative bg-ivoire">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 pt-28 pb-40 sm:px-8 sm:pt-36 sm:pb-48 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="label-section text-vague-profonde">FAQ</p>
          <TextReveal
            className="mt-6 max-w-[12ch] font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1] tracking-[-0.015em] text-nuit"
            segments={[
              { text: "Les questions que" },
              { text: "l'on nous pose.", className: "italic text-vague-profonde" },
            ]}
          />
          <p className="mt-8 max-w-xs text-ardoise">
            Une autre question ?{" "}
            <a
              href="mailto:contact@virtuassist.fr"
              className="font-semibold text-nuit underline decoration-vague decoration-2 underline-offset-4"
            >
              contact@virtuassist.fr
            </a>
          </p>
        </div>

        <AccordionPrimitive.Root
          type="single"
          collapsible
          defaultValue="q0"
          className="border-t border-nuit/15"
        >
          {FAQ.map((f, i) => (
            <AccordionPrimitive.Item
              key={f.q}
              value={`q${i}`}
              className="group/item border-b border-nuit/15"
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-nuit transition-colors hover:text-vague-profonde sm:py-7 sm:text-xl">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ring-nuit/15 transition-[background-color,box-shadow] duration-300 group-data-[state=open]/item:bg-nuit group-data-[state=open]/item:ring-nuit"
                  >
                    <span className="absolute h-[2px] w-3.5 rounded-full bg-nuit transition-colors group-data-[state=open]/item:bg-on-nuit" />
                    <span className="absolute h-3.5 w-[2px] rounded-full bg-nuit transition-[transform,background-color] duration-300 group-data-[state=open]/item:rotate-90 group-data-[state=open]/item:bg-on-nuit" />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="max-w-2xl pr-12 pb-7 leading-relaxed text-ardoise">{f.r}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}

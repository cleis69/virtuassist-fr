import { Phone } from "lucide-react";
import { BoutonA, Bouton } from "@/components/ui-va/Bouton";
import { ListeCoches } from "@/components/ui-va/Blocs";
import { Photo } from "@/components/ui-va/Photo";
import { Rise, TextReveal } from "@/components/motion/TextReveal";
import { ENTREPRISE } from "@/content/site";

/** Appel à l'action de fin de page : toujours le même, toujours au même endroit. */
export function BandeauDiagnostic({
  titre = "Dites-nous ce qui vous prend du temps.",
}: {
  titre?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="conteneur">
        <div className="grid overflow-hidden rounded-[2rem] bg-marine text-white lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="surtitre text-turquoise">Diagnostic gratuit</p>
            <TextReveal className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
              {titre}
            </TextReveal>
            <Rise delay={0.1}>
              <p className="mt-5 max-w-lg text-lg text-sur-marine-doux">
                Nous vous rappelons sous 24 h ouvrées. Le diagnostic dure 30 minutes et débouche sur
                un plan de délégation chiffré.
              </p>
            </Rise>
            <Rise delay={0.2}>
              <ListeCoches
                clair
                className="mt-7"
                items={["Gratuit et sans engagement", "Un interlocuteur dédié", ENTREPRISE.zones]}
              />
            </Rise>
            <Rise delay={0.3}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Bouton to="/contact" variante="clair" taille="lg">
                  Demander mon diagnostic gratuit
                </Bouton>
                <BoutonA
                  href={`tel:${ENTREPRISE.telephone}`}
                  variante="contour-clair"
                  taille="lg"
                  fleche={false}
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {ENTREPRISE.telephoneAffiche}
                </BoutonA>
              </div>
            </Rise>
          </div>
          <Photo
            cle="telephone"
            ratio={1}
            className="h-full min-h-[18rem] rounded-none lg:aspect-auto!"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}

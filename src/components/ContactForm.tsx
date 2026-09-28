import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { CHOIX_FORMULES, type CleFormule } from "@/lib/formule";
import { cn } from "@/lib/utils";

type Fields = {
  nom: string;
  societe: string;
  email: string;
  telephone: string;
  secteur: string;
  formule: CleFormule;
  message: string;
};

const VIDE: Fields = {
  nom: "",
  societe: "",
  email: "",
  telephone: "",
  secteur: "",
  formule: "indecis",
  message: "",
};

const champ =
  "mt-2 w-full rounded-xl border-2 border-input bg-white px-4 py-3.5 text-[1.0625rem] text-encre transition-[border-color,box-shadow] duration-200 placeholder:text-ardoise/70 hover:border-marine/40 focus:border-turquoise-fonce focus:outline-none focus:ring-4 focus:ring-turquoise/25 aria-[invalid=true]:border-destructive";
const etiquette = "block font-display text-[1.0625rem] font-medium text-marine";

function valider(v: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (v.nom.trim().length < 2) e.nom = "Indiquez votre nom et votre prénom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Indiquez une adresse email valide, par exemple nom@entreprise.fr.";
  if (v.telephone.trim() && !/^[+0-9 ().-]{6,}$/.test(v.telephone.trim()))
    e.telephone = "Indiquez un numéro de téléphone valide.";
  if (v.message.trim().length < 10) e.message = "Décrivez votre besoin en quelques mots.";
  return e;
}

function Erreur({ id, children }: { id: string; children: string | undefined }) {
  return (
    <AnimatePresence initial={false}>
      {children && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 font-bold text-destructive"
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const court = (c: CleFormule) =>
  c === "indecis" ? "Je ne sais pas encore" : CHOIX_FORMULES[c].split(" — ")[0];

export function ContactForm({
  formuleInitiale = "indecis",
  messageInitial = "",
}: {
  formuleInitiale?: CleFormule;
  messageInitial?: string;
}) {
  const [values, setValues] = useState<Fields>({
    ...VIDE,
    formule: formuleInitiale,
    message: messageInitial,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  // L'adresse peut changer sans recharger la page (autre formule choisie).
  useEffect(() => {
    setValues((v) => ({ ...v, formule: formuleInitiale }));
  }, [formuleInitiale]);
  useEffect(() => {
    if (messageInitial) setValues((v) => (v.message ? v : { ...v, message: messageInitial }));
  }, [messageInitial]);

  const set = (k: Exclude<keyof Fields, "formule">) => (ev: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: ev.target.value }));

  function envoyer(ev: FormEvent) {
    ev.preventDefault();
    const e = valider(values);
    setErrors(e);
    const premier = Object.keys(e)[0];
    if (premier) {
      form.current?.querySelector<HTMLElement>(`[name="${premier}"]`)?.focus();
      return;
    }
    // Aucun backend : la demande est préparée pour un envoi ultérieur.
    console.info("Demande de diagnostic VIRTUASSIST", {
      ...values,
      formule: CHOIX_FORMULES[values.formule],
    });
    setSent(true);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-ligne shadow-[0_40px_80px_-50px_rgb(15_42_61/50%)]">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="ok"
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[30rem] flex-col items-start justify-center gap-5 p-8 sm:p-12"
          >
            <motion.span
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-turquoise-fonce text-white"
            >
              <Check className="h-8 w-8" strokeWidth={3} />
            </motion.span>
            <h2 className="font-display text-3xl font-semibold">Demande enregistrée.</h2>
            <p className="max-w-md text-lg text-ardoise">
              Merci {values.nom.split(" ")[0]}. Nous vous rappelons sous 24 h ouvrées pour fixer
              votre diagnostic administratif gratuit.
            </p>
            <button
              type="button"
              onClick={() => {
                setValues(VIDE);
                setSent(false);
              }}
              className="lien"
            >
              Envoyer une autre demande
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={form}
            onSubmit={envoyer}
            noValidate
            exit={{ opacity: 0, y: -12 }}
            className="p-6 sm:p-10"
          >
            <h2 className="font-display text-2xl font-semibold">Votre demande de diagnostic</h2>
            <p className="mt-2 text-ardoise">
              Les champs marqués d'un astérisque <span aria-hidden="true">(*)</span> sont
              obligatoires.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className={etiquette} htmlFor="nom">
                  Nom et prénom <span aria-hidden="true">*</span>
                </label>
                <input
                  id="nom"
                  name="nom"
                  className={champ}
                  value={values.nom}
                  onChange={set("nom")}
                  required
                  aria-invalid={!!errors.nom}
                  aria-describedby={errors.nom ? "err-nom" : undefined}
                  autoComplete="name"
                />
                <Erreur id="err-nom">{errors.nom}</Erreur>
              </div>

              <div>
                <label className={etiquette} htmlFor="societe">
                  Société
                </label>
                <input
                  id="societe"
                  name="societe"
                  className={champ}
                  value={values.societe}
                  onChange={set("societe")}
                  autoComplete="organization"
                />
              </div>

              <div>
                <label className={etiquette} htmlFor="email">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  className={champ}
                  value={values.email}
                  onChange={set("email")}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                  autoComplete="email"
                />
                <Erreur id="err-email">{errors.email}</Erreur>
              </div>

              <div>
                <label className={etiquette} htmlFor="telephone">
                  Téléphone
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  inputMode="tel"
                  className={champ}
                  value={values.telephone}
                  onChange={set("telephone")}
                  aria-invalid={!!errors.telephone}
                  aria-describedby={errors.telephone ? "err-tel" : "aide-tel"}
                  autoComplete="tel"
                />
                <p id="aide-tel" className="mt-2 text-[0.95rem] text-ardoise">
                  Pour que nous puissions vous rappeler.
                </p>
                <Erreur id="err-tel">{errors.telephone}</Erreur>
              </div>

              <div className="sm:col-span-2">
                <label className={etiquette} htmlFor="secteur">
                  Secteur d'activité
                </label>
                <input
                  id="secteur"
                  name="secteur"
                  className={champ}
                  value={values.secteur}
                  onChange={set("secteur")}
                  placeholder="Bâtiment, cabinet, immobilier…"
                />
              </div>

              <fieldset className="sm:col-span-2">
                <legend className={etiquette}>Formule envisagée</legend>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {(Object.keys(CHOIX_FORMULES) as CleFormule[]).map((c) => {
                    const on = values.formule === c;
                    return (
                      <label
                        key={c}
                        className={cn(
                          "inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 font-bold transition-colors duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-turquoise/30",
                          on
                            ? "bg-marine text-white"
                            : "bg-ivoire text-marine ring-2 ring-inset ring-transparent hover:ring-marine/25",
                        )}
                      >
                        <input
                          type="radio"
                          name="formule"
                          value={c}
                          checked={on}
                          onChange={() => setValues((v) => ({ ...v, formule: c }))}
                          className="sr-only"
                        />
                        {on && (
                          <Check
                            className="h-4 w-4 text-turquoise"
                            strokeWidth={3}
                            aria-hidden="true"
                          />
                        )}
                        {court(c)}
                      </label>
                    );
                  })}
                </div>
                {values.formule !== "indecis" && (
                  <p className="mt-2 text-[0.95rem] text-ardoise">
                    {CHOIX_FORMULES[values.formule]}
                  </p>
                )}
              </fieldset>

              <div className="sm:col-span-2">
                <label className={etiquette} htmlFor="message">
                  Votre besoin <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={cn(champ, "resize-y")}
                  value={values.message}
                  onChange={set("message")}
                  required
                  placeholder="Par exemple : relances de factures, devis à mettre en forme, courriers…"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-message" : undefined}
                />
                <Erreur id="err-message">{errors.message}</Erreur>
              </div>
            </div>

            <button
              type="submit"
              className="group mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-turquoise-fonce px-6 py-4 font-display text-lg font-medium text-white transition-colors duration-300 hover:bg-marine"
            >
              Envoyer ma demande
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <p className="mt-4 text-center text-ardoise">
              Réponse sous 24 h ouvrées. Aucune obligation d'engagement.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

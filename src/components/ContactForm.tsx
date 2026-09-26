import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { ecouterFormule, FORMULES, type Formule } from "@/lib/formule";
import { cn } from "@/lib/utils";

type Fields = {
  nom: string;
  societe: string;
  email: string;
  telephone: string;
  secteur: string;
  formule: Formule;
  message: string;
};

const EMPTY: Fields = {
  nom: "",
  societe: "",
  email: "",
  telephone: "",
  secteur: "",
  formule: "Je ne sais pas encore",
  message: "",
};

const champ =
  "w-full rounded-xl border border-nuit/15 bg-ivoire/60 px-4 py-3 text-[0.95rem] text-nuit transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-ardoise/60 hover:border-nuit/30 focus:border-vague-profonde focus:bg-papier focus:outline-none focus:ring-4 focus:ring-vague/20 aria-[invalid=true]:border-destructive";
const etiquette = "block text-sm font-semibold text-nuit";

function validate(v: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (v.nom.trim().length < 2) e.nom = "Indiquez votre nom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Indiquez une adresse email valide.";
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
          className="mt-1.5 text-xs font-medium text-destructive"
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const court = (f: Formule) =>
  f === "Je ne sais pas encore" ? "Je ne sais pas encore" : f.split(" — ")[0];

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);
  const [signal, setSignal] = useState(0);
  const form = useRef<HTMLFormElement>(null);

  // Une formule choisie plus haut dans la page arrive ici pré-sélectionnée.
  useEffect(
    () =>
      ecouterFormule((f) => {
        setValues((v) => ({ ...v, formule: f }));
        setSignal((s) => s + 1);
      }),
    [],
  );

  const set = (k: Exclude<keyof Fields, "formule">) => (ev: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: ev.target.value }));

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    const premier = Object.keys(e)[0];
    if (premier) {
      form.current?.querySelector<HTMLElement>(`[name="${premier}"]`)?.focus();
      return;
    }
    // Aucun backend : la demande est préparée pour un envoi ultérieur.
    console.info("Demande de diagnostic VIRTUASSIST", values);
    setSent(true);
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-papier text-nuit shadow-[0_50px_100px_-50px_oklch(0_0_0/70%)]">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="ok"
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[32rem] flex-col items-start justify-center gap-5 p-8 sm:p-12"
          >
            <motion.span
              initial={{ scale: 0.4, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-vague text-nuit-deep"
            >
              <Check className="h-6 w-6" strokeWidth={2.5} />
            </motion.span>
            <h3 className="font-display text-4xl text-nuit">Demande enregistrée.</h3>
            <p className="max-w-md text-ardoise">
              Merci {values.nom.split(" ")[0]}. Nous revenons vers vous sous 24 h ouvrées pour fixer
              votre diagnostic administratif gratuit.
            </p>
            <button
              type="button"
              onClick={() => {
                setValues(EMPTY);
                setSent(false);
              }}
              className="text-sm font-semibold text-vague-profonde underline decoration-2 underline-offset-4"
            >
              Envoyer une autre demande
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={form}
            onSubmit={onSubmit}
            noValidate
            exit={{ opacity: 0, y: -12 }}
            className="p-6 sm:p-10"
          >
            <div className="flex items-center justify-between border-b border-nuit/10 pb-5">
              <p className="font-display text-2xl">Votre demande</p>
              <p className="font-mono text-[0.7rem] text-ardoise">Réponse sous 24 h ouvrées</p>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={etiquette} htmlFor="nom">
                  Nom et prénom
                </label>
                <input
                  id="nom"
                  name="nom"
                  className={`${champ} mt-2`}
                  value={values.nom}
                  onChange={set("nom")}
                  aria-invalid={!!errors.nom}
                  aria-describedby={errors.nom ? "err-nom" : undefined}
                  autoComplete="name"
                />
                <Erreur id="err-nom">{errors.nom}</Erreur>
              </div>

              <div>
                <label className={etiquette} htmlFor="societe">
                  Société <span className="font-normal text-ardoise">(facultatif)</span>
                </label>
                <input
                  id="societe"
                  name="societe"
                  className={`${champ} mt-2`}
                  value={values.societe}
                  onChange={set("societe")}
                  autoComplete="organization"
                />
              </div>

              <div>
                <label className={etiquette} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  className={`${champ} mt-2`}
                  value={values.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                  autoComplete="email"
                />
                <Erreur id="err-email">{errors.email}</Erreur>
              </div>

              <div>
                <label className={etiquette} htmlFor="telephone">
                  Téléphone <span className="font-normal text-ardoise">(facultatif)</span>
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  inputMode="tel"
                  className={`${champ} mt-2`}
                  value={values.telephone}
                  onChange={set("telephone")}
                  aria-invalid={!!errors.telephone}
                  aria-describedby={errors.telephone ? "err-tel" : undefined}
                  autoComplete="tel"
                />
                <Erreur id="err-tel">{errors.telephone}</Erreur>
              </div>

              <div className="sm:col-span-2">
                <label className={etiquette} htmlFor="secteur">
                  Secteur d'activité <span className="font-normal text-ardoise">(facultatif)</span>
                </label>
                <input
                  id="secteur"
                  name="secteur"
                  className={`${champ} mt-2`}
                  value={values.secteur}
                  onChange={set("secteur")}
                  placeholder="Bâtiment, cabinet, immobilier…"
                />
              </div>

              <fieldset className="sm:col-span-2">
                <legend className={etiquette}>Formule envisagée</legend>
                <motion.div
                  key={signal}
                  initial={signal ? { scale: 0.985 } : false}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {FORMULES.map((f) => {
                    const on = values.formule === f;
                    return (
                      <label
                        key={f}
                        className={cn(
                          "relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-vague/30",
                          on
                            ? "bg-nuit text-on-nuit"
                            : "bg-ivoire text-nuit ring-1 ring-inset ring-nuit/15 hover:ring-nuit/40",
                        )}
                        title={f}
                      >
                        <input
                          type="radio"
                          name="formule"
                          value={f}
                          checked={on}
                          onChange={() => setValues((v) => ({ ...v, formule: f }))}
                          className="sr-only"
                        />
                        {court(f)}
                      </label>
                    );
                  })}
                </motion.div>
                {values.formule !== court(values.formule) && (
                  <p className="mt-2 font-mono text-[0.7rem] text-ardoise">{values.formule}</p>
                )}
              </fieldset>

              <div className="sm:col-span-2">
                <label className={etiquette} htmlFor="message">
                  Votre besoin
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`${champ} mt-2 resize-y`}
                  value={values.message}
                  onChange={set("message")}
                  placeholder="Ex. : relances de factures, devis à mettre en forme, courriers…"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-message" : undefined}
                />
                <Erreur id="err-message">{errors.message}</Erreur>
              </div>
            </div>

            <button
              type="submit"
              className="group mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-vague-profonde px-6 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-nuit focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-vague/40"
            >
              Demander mon diagnostic gratuit
              <ArrowRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <p className="mt-3 text-center text-xs text-ardoise">
              Réponse sous 24 h ouvrées. Aucune obligation d'engagement.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

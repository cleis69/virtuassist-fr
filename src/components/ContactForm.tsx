import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

type Fields = {
  nom: string;
  societe: string;
  email: string;
  telephone: string;
  secteur: string;
  formule: string;
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
  "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-vague-profonde focus:outline-none focus:ring-2 focus:ring-vague-profonde/30";
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

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (ev: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: ev.target.value }));

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    // Aucun backend : la demande est préparée pour un envoi ultérieur.
    console.info("Demande de diagnostic VIRTUASSIST", values);
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="carte flex flex-col items-start gap-4 p-8 sm:p-10"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-vague/15 text-vague-profonde">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="font-display text-2xl text-nuit">Demande enregistrée.</h3>
        <p className="text-sm text-ardoise">
          Merci {values.nom.split(" ")[0]}. Nous revenons vers vous sous 24 h ouvrées pour fixer
          votre diagnostic administratif gratuit.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setSent(false);
          }}
          className="text-sm font-semibold text-vague-profonde underline underline-offset-4"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="carte p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
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
          {errors.nom && (
            <p id="err-nom" className="mt-1.5 text-xs text-destructive">
              {errors.nom}
            </p>
          )}
        </div>

        <div>
          <label className={etiquette} htmlFor="societe">
            Société
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
            className={`${champ} mt-2`}
            value={values.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="err-email" className="mt-1.5 text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className={etiquette} htmlFor="telephone">
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            className={`${champ} mt-2`}
            value={values.telephone}
            onChange={set("telephone")}
            aria-invalid={!!errors.telephone}
            aria-describedby={errors.telephone ? "err-tel" : undefined}
            autoComplete="tel"
          />
          {errors.telephone && (
            <p id="err-tel" className="mt-1.5 text-xs text-destructive">
              {errors.telephone}
            </p>
          )}
        </div>

        <div>
          <label className={etiquette} htmlFor="secteur">
            Secteur d'activité
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

        <div>
          <label className={etiquette} htmlFor="formule">
            Formule envisagée
          </label>
          <select
            id="formule"
            name="formule"
            className={`${champ} mt-2`}
            value={values.formule}
            onChange={set("formule")}
          >
            <option>Je ne sais pas encore</option>
            <option>Essentiel — 250 € HT/mois</option>
            <option>Sérénité — 460 € HT/mois</option>
            <option>Premium — 840 € HT/mois</option>
            <option>Entreprise — sur mesure</option>
            <option>Prestation ponctuelle — 30 € HT/h</option>
          </select>
        </div>

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
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "err-message" : undefined}
          />
          {errors.message && (
            <p id="err-message" className="mt-1.5 text-xs text-destructive">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-vague-profonde px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vague focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vague-profonde focus-visible:ring-offset-2 sm:w-auto"
      >
        Demander mon diagnostic gratuit
      </button>
      <p className="mt-3 text-xs text-ardoise">
        Réponse sous 24 h ouvrées. Aucune obligation d'engagement.
      </p>
    </form>
  );
}

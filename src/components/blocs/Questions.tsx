import * as Accordeon from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { Question } from "@/content/site";

/** Questions en accordéon : grandes zones cliquables, réponse lisible. */
export function Questions({
  questions,
  ouverte,
}: {
  questions: Question[];
  ouverte?: string | undefined;
}) {
  return (
    <Accordeon.Root
      type="single"
      collapsible
      {...(ouverte ? { defaultValue: ouverte } : {})}
      className="divide-y divide-ligne rounded-3xl bg-white ring-1 ring-ligne"
    >
      {questions.map((f) => (
        <Accordeon.Item key={f.q} value={f.q} className="group/q">
          <Accordeon.Header>
            <Accordeon.Trigger className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-6 text-left font-display text-lg font-semibold text-marine transition-colors hover:text-turquoise-fonce sm:px-8 sm:text-xl">
              <span>{f.q}</span>
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-turquoise-pale text-turquoise-fonce transition-[background-color,color,transform] duration-300 group-data-[state=open]/q:rotate-45 group-data-[state=open]/q:bg-turquoise-fonce group-data-[state=open]/q:text-white"
              >
                <Plus className="h-5 w-5" strokeWidth={2.5} />
              </span>
            </Accordeon.Trigger>
          </Accordeon.Header>
          <Accordeon.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="max-w-3xl px-6 pb-7 text-lg leading-relaxed text-ardoise sm:px-8">
              {f.r}
            </p>
          </Accordeon.Content>
        </Accordeon.Item>
      ))}
    </Accordeon.Root>
  );
}

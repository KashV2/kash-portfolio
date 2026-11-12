import type { ReactNode } from "react";
import Reveal from "./ui/Reveal";

interface Props {
  id: string;
  index: string;
  title: string;
  kicker?: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Section wrapper: oversized editorial title, compact technical label, deliberate negative space. */
export default function Section({ id, index, title, kicker, intro, children, className = "" }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`relative mx-auto max-w-page px-5 py-24 sm:px-8 md:py-32 ${className}`}>
      <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[auto_1fr] md:items-end md:gap-12">
        <Reveal kind="glitch">
          <p className="label mb-3 flex items-center gap-3 text-acid">
            <span className="font-display text-base font-bold">{index}</span>
            <span className="h-px w-10 bg-acid" aria-hidden="true" />
            {kicker ?? title}
          </p>
          <h2 id={`${id}-heading`} className="font-display text-[clamp(3rem,9vw,7rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-ink">
            {title}
          </h2>
        </Reveal>
        {intro && <div className="max-w-md text-mute md:justify-self-end md:pb-2">{intro}</div>}
      </header>
      {children}
    </section>
  );
}

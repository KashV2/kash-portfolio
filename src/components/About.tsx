import { about, profile } from "../data/portfolio";
import { asset } from "../lib/motion";
import Section from "./Section";
import Reveal from "./ui/Reveal";

export default function About() {
  const [lead, ...rest] = about.story;
  const h = profile.headshot;
  return (
    <Section id="about" index="01" title="About" kicker="profile">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* portrait */}
        <Reveal kind="iris" className="mx-auto w-full max-w-[22rem] lg:col-span-4 lg:mx-0 lg:max-w-none">
          <figure className="relative">
            <div className="relative">
            <span aria-hidden="true" className="cut-br absolute inset-0 translate-x-3 translate-y-3 bg-acid" />
            <div className="cut-br relative overflow-hidden border border-line bg-char">
              <img
                src={asset(h.src)}
                alt={h.alt}
                width={h.w}
                height={h.h}
                loading="lazy"
                decoding="async"
                className="block aspect-square w-full object-cover"
              />
              <span aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 opacity-40" />
            </div>
            </div>
            <figcaption className="mt-6 flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mute">
              <span className="text-ink">{profile.fullName}</span>
              <span>Purdue · DS ’28</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal kind="rise" className="lg:col-span-8">
          <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">{lead}</p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-mute">
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal kind="tiles" as="ul" className="mt-16 grid gap-px border-y border-line bg-line md:grid-cols-3" aria-label="Strengths">
        {about.strengths.map((s, i) => (
          <li key={s.title} className="group bg-void py-6 md:px-6 md:first:pl-0">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-acid">0{i + 1} / strength</p>
            <h3 className="mt-2 font-display text-xl font-semibold uppercase leading-tight text-ink transition-colors group-hover:text-acid">
              {s.title}
            </h3>
            <p className="mt-2 text-[0.97rem] leading-relaxed text-mute">{s.body}</p>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}

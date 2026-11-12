import { education, skills } from "../data/portfolio";
import Section from "./Section";
import Reveal from "./ui/Reveal";

export function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      title="Toolkit"
      kicker="skills"
      intro={<p>Grouped by what I use them for. No proficiency bars; the work above is the evidence.</p>}
    >
      <Reveal kind="tiles" as="div" className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <div key={g.group} className="border-t-2 border-ink/80 pt-4">
            <h3 className="flex items-baseline justify-between font-display text-lg font-semibold uppercase tracking-wide text-ink">
              {g.group}
              <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {g.items.map((s) => (
                <li key={s} className="font-mono text-[0.85rem] text-mute before:mr-1.5 before:text-acid before:content-['/']">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="mx-auto max-w-page px-5 pb-8 sm:px-8">
      <Reveal kind="wipe-right" className="cut-br grid gap-8 border border-line bg-char/90 p-6 sm:p-10 md:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="label text-acid">06 — education</p>
          <h2 id="education-heading" className="mt-3 font-display text-3xl font-bold uppercase leading-none text-ink sm:text-4xl">
            {education.school}
          </h2>
          <p className="mt-2 text-mute">{education.degree}</p>
          <p className="mt-3 font-mono text-sm text-cyan">
            {education.when} · {education.where}
          </p>
          <ul className="mt-4 space-y-1">
            {education.honors.map((h) => (
              <li key={h} className="text-ink">
                <span className="mr-2 text-acid" aria-hidden="true">
                  ◆
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="label mb-3 text-dim">Selected coursework</h3>
          <ul className="flex flex-wrap gap-1.5">
            {education.coursework.map((c) => (
              <li key={c} className="tag">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

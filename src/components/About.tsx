import { about } from "../data/portfolio";
import Section from "./Section";
import Reveal from "./ui/Reveal";

export default function About() {
  const [lead, ...rest] = about.story;
  return (
    <Section id="about" index="01" title="About" kicker="profile">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal kind="rise" className="lg:col-span-7">
          <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">{lead}</p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-mute lg:pl-16">
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal kind="tiles" as="ul" className="space-y-0 border-t border-line lg:col-span-4 lg:col-start-9" aria-label="Strengths">
          {about.strengths.map((s, i) => (
            <li key={s.title} className="group border-b border-line py-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-acid">0{i + 1} / strength</p>
              <h3 className="mt-2 font-display text-xl font-semibold uppercase leading-tight text-ink transition-colors group-hover:text-acid">
                {s.title}
              </h3>
              <p className="mt-2 text-[0.97rem] leading-relaxed text-mute">{s.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

import { profile } from "../data/portfolio";
import Reveal from "./ui/Reveal";

export default function Contact() {
  const rows = [
    { k: "Email", label: profile.email, href: `mailto:${profile.email}` },
    { k: "LinkedIn", label: "Kashyap Vallur", href: profile.links.linkedin, ext: true },
    { k: "GitHub", label: "github.com/KashV2", href: profile.links.github, ext: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative mx-auto max-w-page px-5 py-24 sm:px-8 md:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal kind="glitch" className="lg:col-span-7">
          <p className="label flex items-center gap-3 text-acid">
            <span className="font-display text-base font-bold">07</span>
            <span className="h-px w-10 bg-acid" aria-hidden="true" /> contact
          </p>
          <h2 id="contact-heading" className="mt-3 font-display text-[clamp(3.5rem,11vw,9rem)] font-bold uppercase leading-[0.82] tracking-[-0.02em]">
            Let&apos;s
            <br />
            <span className="text-acid">talk.</span>
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-mute">
            I&apos;m looking for internships in machine learning, data science, and software engineering. I&apos;m also happy to talk
            about signal processing, LLM systems, or a good hackathon idea. Email is the fastest way to reach me.
          </p>
        </Reveal>

        <Reveal kind="wipe-left" className="self-end lg:col-span-5">
          <ul className="border-t border-line">
            {rows.map((r) => (
              <li key={r.k} className="border-b border-line">
                <a
                  href={r.href}
                  {...(r.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 py-5 transition-[padding] hover:pl-3"
                >
                  <span className="min-w-0">
                    <span className="label block text-dim">{r.k}</span>
                    <span className="block truncate font-display text-xl font-medium text-ink transition-colors group-hover:text-acid sm:text-2xl">
                      {r.label}
                    </span>
                    {r.ext && <span className="sr-only"> (opens in a new tab)</span>}
                  </span>
                  <span className="font-mono text-xl text-acid" aria-hidden="true">
                    {r.ext ? "↗" : "→"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {profile.resumeFile && (
            <a href={`./${profile.resumeFile}`} download className="btn-acid mt-8">
              Download résumé (PDF) ↓
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}

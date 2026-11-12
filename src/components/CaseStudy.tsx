import { useState } from "react";
import { profile, type Project } from "../data/portfolio";
import DocViewer from "./ui/DocViewer";
import Gallery from "./ui/Gallery";
import { PlayMark, providerName, YouTubePlayer, YouTubeThumb, youtubeUrl } from "./ui/YouTube";

/** Expanded case study (rendered inside the shared modal). */
export default function CaseStudy({ project: p }: { project: Project }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="px-5 pb-12 pt-6 sm:px-8">
      <header className="grid gap-4 border-b border-line pb-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="label text-acid">
            {p.kind} <span className="text-dim">· {p.when}</span>
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl">{p.title}</h2>
          {p.org && <p className="mt-2 font-mono text-sm text-cyan">{p.org}</p>}
        </div>
        <p className="max-w-md text-mute md:text-right">{p.tagline}</p>
      </header>

      {/* Media first */}
      <div className="mt-8">
        {p.video &&
          (playing ? (
            <YouTubePlayer video={p.video} />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group relative block w-full overflow-hidden"
              aria-label={`Play ${p.video.title} here`}
            >
              <YouTubeThumb video={p.video} className="transition-transform duration-500 group-hover:scale-[1.03]" />
              <span className="absolute inset-0 grid place-items-center bg-void/30">
                <PlayMark />
              </span>
            </button>
          ))}
        {p.video?.uploader && (
          <p className="mt-2 font-mono text-xs text-dim">Video uploaded by teammate {p.video.uploader}.</p>
        )}
        {p.documents && (
          <div className="mx-auto max-w-3xl">
            <p className="label mb-3 text-dim">Original document</p>
            <DocViewer project={p} />
          </div>
        )}
        {p.gallery && (
          <div className={p.documents ? "mt-10" : ""}>
            {p.documents && <p className="label mb-3 text-dim">Figures &amp; plots</p>}
            <Gallery images={p.gallery} title={`${p.title} figures`} />
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section>
            <h3 className="label mb-2 text-dim">The problem</h3>
            <p className="text-lg leading-relaxed text-ink">{p.problem}</p>
          </section>
          <section>
            <h3 className="label mb-3 text-dim">{p.kind === "Mentorship" ? "My role" : "What I built"}</h3>
            <ol className="space-y-4">
              {p.contribution.map((c, k) => (
                <li key={c} className="grid grid-cols-[2.25rem_1fr] gap-2 leading-relaxed text-mute">
                  <span className="font-mono text-sm text-acid">{String(k + 1).padStart(2, "0")}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-8">
          {p.outcome && (
            <section className="border-l-2 border-acid pl-5">
              <h3 className="label mb-2 text-acid">Result</h3>
              <p className="font-display text-xl leading-snug text-ink">{p.outcome}</p>
            </section>
          )}
          {p.pipeline && (
            <section>
              <h3 className="label mb-3 text-dim">Pipeline</h3>
              <ol className="space-y-2">
                {p.pipeline.map((s, k) => (
                  <li key={s.step} className="flex items-baseline gap-3 border-b border-line pb-2">
                    <span className="font-mono text-xs text-cyan">{k + 1}</span>
                    <span className="font-display text-lg text-ink">{s.step}</span>
                    <span className="ml-auto text-right font-mono text-xs text-mute">{s.detail}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
          <section>
            <h3 className="label mb-3 text-dim">Stack</h3>
            <ul className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="label mb-3 text-dim">Links</h3>
            <ul className="space-y-2 font-mono text-sm">
              {p.video && (
                <li>
                  <a className="link" href={youtubeUrl(p.video)} target="_blank" rel="noreferrer">
                    Watch {p.video.title} on {providerName(p.video)}<span className="sr-only"> (opens in a new tab)</span> ↗
                  </a>
                </li>
              )}
              {p.links
                ?.filter((l) => !p.video || !l.href.includes(p.video.id))
                .map((l) => (
                  <li key={l.href}>
                    <a className="link" href={l.href} target="_blank" rel="noreferrer">
                      {l.label}
                      <span className="sr-only"> (opens in a new tab)</span> ↗
                    </a>
                  </li>
                ))}
              {p.repo && (
                <li>
                  <a className="link" href={p.repo} target="_blank" rel="noreferrer">
                    View the {p.title} code on GitHub<span className="sr-only"> (opens in a new tab)</span> ↗
                  </a>
                </li>
              )}
              <li>
                <a className="link" href={profile.links.github} target="_blank" rel="noreferrer">
                  More code on my GitHub profile<span className="sr-only"> (opens in a new tab)</span> ↗
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </article>
  );
}

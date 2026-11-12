import { useId, useRef, useState } from "react";
import { experience, featuredProjects, type Role } from "../data/portfolio";
import { asset, useInView, useOnScreen } from "../lib/motion";
import ChapterScene, { THEME_ENTRANCE } from "./ChapterScene";
import Section from "./Section";
import DocViewer from "./ui/DocViewer";
import OrgLogo from "./ui/OrgLogo";
import { useOverlay } from "./ui/Overlay";
import Reveal from "./ui/Reveal";

const research = experience.filter((r) => r.category === "research");

function Study({ r, k }: { r: Role; k: number }) {
  const ref = useRef<HTMLElement>(null);
  const [seenRef, seen] = useInView<HTMLDivElement>(0.2);
  const live = useOnScreen(ref);
  const [open, setOpen] = useState(false);
  const id = useId();
  const { openCase, openGallery } = useOverlay();
  const p = featuredProjects.find((x) => x.id === r.projectId);
  if (!p) return null;
  const figs = p.gallery ?? [];
  const accent = r.theme === "ski" ? "cyan" : "acid";

  return (
    <article ref={ref} aria-labelledby={`${p.id}-rt`} className="relative isolate border-t border-line pb-24 pt-10 last:pb-0">
      <ChapterScene theme={r.theme} active={seen} live={live} />
      <div ref={seenRef}>
        {/* header: who / where / when */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 [text-shadow:0_1px_10px_#09090b]">
          <div className="flex items-center gap-5">
            <span className="font-display text-6xl font-bold leading-none text-transparent [-webkit-text-stroke:1px_theme(colors.line-bright)] sm:text-7xl">
              R{k + 1}
            </span>
            <OrgLogo role={r} size="lg" />
            <div className="min-w-0">
              <p className="font-display text-xl font-bold uppercase leading-tight sm:text-2xl">{r.role}</p>
              <p className="mt-1 font-mono text-sm text-cyan">
                {r.org}
                {r.current && <span className="ml-2 bg-red px-1.5 py-px text-[0.65rem] uppercase tracking-[0.14em] text-void">now</span>}
              </p>
            </div>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-mute">
            {r.when}
            <span className="block text-dim">{r.where}</span>
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* 1. the original documents, first */}
          <Reveal kind={THEME_ENTRANCE[r.theme]} className="hud min-w-0 self-start">
            <p className="label mb-3 text-dim">
              <span className={accent === "cyan" ? "text-cyan" : "text-acid"}>▍</span> Original document
            </p>
            <DocViewer project={p} accent={accent} />
          </Reveal>

          {/* 2. the story, then the extracted figures */}
          <div className="min-w-0 [text-shadow:0_1px_10px_#09090b]">
            <h3 id={`${p.id}-rt`} className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold uppercase leading-[0.9] tracking-tight">
              {p.title}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink">{p.tagline}</p>
            <p className="mt-3 leading-relaxed text-mute">{r.summary}</p>

            {p.pipeline && (
              <ol className="mt-6 flex flex-wrap border-y border-line" aria-label="Pipeline stages">
                {p.pipeline.map((s, i) => (
                  <li key={s.step} className="min-w-[5.5rem] flex-1 border-l border-line py-3 pl-2.5 first:border-l-0 first:pl-0">
                    <span className="block font-mono text-[0.65rem] text-cyan">0{i + 1}</span>
                    <span className="block font-display text-base font-semibold leading-tight">{s.step}</span>
                  </li>
                ))}
              </ol>
            )}
            {p.outcome && <p className="mt-6 border-l-2 border-acid pl-4 leading-relaxed text-ink">{p.outcome}</p>}

            {figs.length > 0 && (
              <div className="mt-8">
                <p className="label mb-3 text-dim">Figures &amp; plots · {figs.length}</p>
                <ul className="grid grid-cols-4 gap-2">
                  {figs.slice(0, 4).map((m, i) => (
                    <li key={m.src}>
                      <button
                        type="button"
                        onClick={(e) => openGallery(figs, i, `${p.title} — figures`, e.currentTarget)}
                        aria-label={`Open figure ${i + 1}: ${m.caption}`}
                        className="group relative block aspect-[4/3] w-full overflow-hidden border border-line bg-[#f2f2ee]"
                      >
                        <img src={asset(m.src)} alt="" width={m.w} height={m.h} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        {i === 3 && figs.length > 4 && (
                          <span className="absolute inset-0 grid place-items-center bg-void/75 font-mono text-sm text-ink">+{figs.length - 4}</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" className="btn-acid" onClick={(e) => openCase(p.id, e.currentTarget.closest("article"))}>
                Open case study<span className="sr-only">: {p.title}</span> <span aria-hidden="true">⤢</span>
              </button>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${id}-d`}
                onClick={() => setOpen((o) => !o)}
                className="btn-text"
              >
                {open ? "Hide details" : "What I did"} <span aria-hidden="true">{open ? "▴" : "▾"}</span>
              </button>
            </div>
            <div id={`${id}-d`} hidden={!open}>
              <ul className="mt-5 space-y-3">
                {p.contribution.map((c) => (
                  <li key={c} className="flex gap-3 leading-relaxed text-mute">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-acid" aria-hidden="true" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${p.title} technologies`}>
                {p.stack.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Research() {
  return (
    <Section
      id="research"
      index="03"
      title="Research"
      kicker="research"
      className="overflow-x-clip"
      intro={<p>Sports-engineering research at RESEC and two corporate projects with The Data Mine. Each one opens with the original deck or poster, followed by the figures.</p>}
    >
      <div>
        {research.map((r, k) => (
          <Study key={r.role + r.org} r={r} k={k} />
        ))}
      </div>
    </Section>
  );
}

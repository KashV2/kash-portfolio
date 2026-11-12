import { experience, featuredProjects, moreProjects, profile, type Project, type ProjectKind } from "../data/portfolio";
import Section from "./Section";
import Img from "./ui/Img";
import { useOverlay } from "./ui/Overlay";
import Reveal from "./ui/Reveal";
import { PlayMark, YouTubeThumb } from "./ui/YouTube";

const KIND: Record<ProjectKind, string> = {
  Research: "bg-cyan text-void",
  Professional: "bg-cyan text-void",
  "Hackathon · Team": "bg-acid text-void",
  "Team Research": "border border-ink/60 text-ink",
  Mentorship: "bg-red text-void",
  Personal: "border border-line-bright text-mute",
  Academic: "border border-line-bright text-mute",
};

function Kind({ p }: { p: Project }) {
  return (
    <p className="flex flex-wrap items-center gap-3">
      <span className={`px-2 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] ${KIND[p.kind]}`}>{p.kind}</span>
      <span className="font-mono text-xs text-mute">{p.when}</span>
    </p>
  );
}

function CaseButton({ p, tone = "line" }: { p: Project; tone?: "line" | "acid" }) {
  const { openCase } = useOverlay();
  return (
    <button type="button" onClick={(e) => openCase(p.id, e.currentTarget.closest("article"))} className={tone === "acid" ? "btn-acid" : "btn-line"}>
      Open case study<span className="sr-only">: {p.title}</span> <span aria-hidden="true">⤢</span>
    </button>
  );
}

function Stack({ p }: { p: Project }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={`${p.title} technologies`}>
      {p.stack.map((s) => (
        <li key={s} className="tag">
          {s}
        </li>
      ))}
    </ul>
  );
}

/* ── 2. Video-led hackathon builds ── */
function VideoShowcase({ p, n, flip }: { p: Project; n: number; flip: boolean }) {
  const { openVideo } = useOverlay();
  if (!p.video) return null;
  return (
    <article aria-labelledby={`${p.id}-t`} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal kind={flip ? "wipe-left" : "wipe-right"} className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <button
          type="button"
          onClick={(e) => openVideo(p.video!, e.currentTarget)}
          className="hud group relative block w-full overflow-hidden text-left"
          aria-label={`Watch ${p.video.title}`}
        >
          <span className="block overflow-hidden border border-line">
            <YouTubeThumb video={p.video} className="transition-transform duration-700 group-hover:scale-[1.04]" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-void/20" aria-hidden="true" />
          <span className="absolute inset-0 grid place-items-center">
            <PlayMark />
          </span>
          <span className="absolute bottom-0 left-0 flex items-center gap-3 bg-acid px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-void">
            ▶ Watch demo
          </span>
        </button>
        {p.video.uploader && <p className="mt-2 font-mono text-xs text-dim">Video on teammate {p.video.uploader}&apos;s Vimeo.</p>}
      </Reveal>

      <Reveal kind="rise" className={`min-w-0 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="font-display text-sm font-bold text-acid">W.{String(n).padStart(2, "0")}</p>
        <div className="mt-3">
          <Kind p={p} />
        </div>
        <h3 id={`${p.id}-t`} className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] font-bold uppercase leading-[0.88] tracking-tight">
          {p.title}
        </h3>
        {p.org && <p className="mt-2 font-mono text-sm text-cyan">{p.org}</p>}
        <p className="mt-5 text-lg leading-relaxed text-ink">{p.tagline}</p>
        <dl className="mt-6 space-y-4 text-[0.97rem]">
          <div>
            <dt className="label text-dim">Problem</dt>
            <dd className="mt-1 leading-relaxed text-mute">{p.problem}</dd>
          </div>
          <div>
            <dt className="label text-dim">What I built</dt>
            <dd className="mt-1 leading-relaxed text-mute">{p.contribution[0]}</dd>
          </div>
          {p.outcome && (
            <div>
              <dt className="label text-acid">Result</dt>
              <dd className="mt-1 font-display text-xl leading-snug text-ink">{p.outcome}</dd>
            </div>
          )}
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <CaseButton p={p} />
        </div>
        <div className="mt-6">
          <Stack p={p} />
        </div>
      </Reveal>
    </article>
  );
}

/* ── 3. Poster-led team research: evidence mosaic ── */
function PosterShowcase({ p, n }: { p: Project; n: number }) {
  const { openGallery } = useOverlay();
  const g = p.gallery ?? [];
  const title = `${p.title} — poster figures`;
  const tiles = g.slice(0, 3);
  const poster = g.find((m) => m.src.includes("poster"));
  return (
    <article aria-labelledby={`${p.id}-t`} className="grid gap-8 border-t border-line pt-10 lg:grid-cols-[22rem_1fr] lg:gap-12">
      <Reveal kind="rise" className="min-w-0">
        <p className="font-display text-sm font-bold text-ink/70">W.{String(n).padStart(2, "0")}</p>
        <div className="mt-3">
          <Kind p={p} />
        </div>
        <h3 id={`${p.id}-t`} className="mt-4 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-bold uppercase leading-[0.9] tracking-tight">
          {p.title}
        </h3>
        {p.org && <p className="mt-2 font-mono text-[0.8rem] text-cyan">{p.org}</p>}
        <p className="mt-5 leading-relaxed text-ink">{p.tagline}</p>
        {p.outcome && <p className="mt-4 border-l-2 border-acid pl-3 text-[0.97rem] leading-relaxed text-mute">{p.outcome}</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <CaseButton p={p} />
          {poster && (
            <button type="button" className="btn-text" onClick={(e) => openGallery(g, g.indexOf(poster), title, e.currentTarget)}>
              Full poster ⤢
            </button>
          )}
        </div>
      </Reveal>

      <Reveal kind="tiles" as="ul" className="grid min-w-0 grid-cols-2 gap-3" aria-label={`${p.title} figures`}>
        {tiles.map((m, k) => (
          <li key={m.src} className={k === 0 ? "col-span-2" : ""}>
            <button
              type="button"
              onClick={(e) => openGallery(g, k, title, e.currentTarget)}
              className="hud group block w-full text-left [--hud:theme(colors.ink)]"
            >
              <span className={`block overflow-hidden border border-line ${m.src.includes("ui") ? "bg-black" : "bg-[#f2f2ee]"}`}>
                <Img
                  image={m}
                  fit="contain"
                  ratio={k === 0 ? undefined : "4 / 3"}
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-2 block text-sm leading-snug text-mute group-hover:text-ink">
                <span className="mr-1.5 font-mono text-[0.7rem] text-acid">FIG.{k + 1}</span>
                {m.caption}
              </span>
            </button>
          </li>
        ))}
      </Reveal>
    </article>
  );
}

export default function Projects() {
  // Research (Shredshox, Data Mine) and the TA project live in their own sections now.
  const linked = new Set(experience.map((r) => r.projectId).filter(Boolean));
  const own = featuredProjects.filter((p) => !linked.has(p.id));
  const videos = own.filter((p) => p.layout === "video");
  const independent = own.filter((p) => p.layout === "poster");
  let n = 1;
  return (
    <Section
      id="projects"
      index="04"
      title="Projects"
      kicker="builds"
      intro={<p>Hackathon builds and personal projects. Demos play right here, and each one opens into a full case study.</p>}
    >
      <div className="space-y-28">
        {videos.map((p, k) => (
          <VideoShowcase key={p.id} p={p} n={n++} flip={k % 2 === 1} />
        ))}
      </div>

      {independent.length > 0 && (
        <div className="mt-28">
          <p className="label mb-8 flex items-center gap-3 text-dim">
            <span className="h-px w-8 bg-ink/60" aria-hidden="true" /> Independent analysis
          </p>
          <div className="space-y-16">
            {independent.map((p) => (
              <PosterShowcase key={p.id} p={p} n={n++} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-24">
        <h3 className="label mb-5 text-dim">More builds</h3>
        <Reveal kind="tiles" as="ul" className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((p) => (
            <li key={p.id} className="bg-void p-6">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-dim">{p.kind}</p>
              <h4 className="mt-1 font-display text-xl font-semibold uppercase text-ink">{p.title}</h4>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{p.tagline}</p>
              <p className="mt-4 font-mono text-xs text-cyan">{p.stack.join(" · ")}</p>
            </li>
          ))}
        </Reveal>
        <p className="mt-6 text-mute">
          Code lives on{" "}
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="link">
            my GitHub profile<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </div>
    </Section>
  );
}

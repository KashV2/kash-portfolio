import { useEffect, useId, useRef, useState } from "react";
import { experience, featuredProjects, type Role } from "../data/portfolio";
import { asset, useInView, useOnScreen } from "../lib/motion";
import ChapterScene, { THEME_ENTRANCE } from "./ChapterScene";
import Section from "./Section";
import Img from "./ui/Img";
import OrgLogo from "./ui/OrgLogo";
import { useOverlay } from "./ui/Overlay";
import Reveal from "./ui/Reveal";

function Chapter({ r, k }: { r: Role; k: number }) {
  const [open, setOpen] = useState(false);
  const [ref, seen] = useInView<HTMLLIElement>(0.35);
  const live = useOnScreen(ref);
  const { openCase, openGallery } = useOverlay();
  const id = useId();
  const mediaRight = k % 2 === 0;

  return (
    <li ref={ref} className="relative isolate grid grid-cols-[2.5rem_1fr] gap-4 pb-20 last:pb-0 md:grid-cols-[4rem_1fr] md:gap-8">
      <ChapterScene theme={r.theme} active={seen} live={live} />
      {/* rail node */}
      <span
        aria-hidden="true"
        className={`relative z-[1] mt-2 h-4 w-4 justify-self-center border-2 transition-[background-color,border-color,box-shadow] duration-500 ${
          seen ? "border-acid bg-acid shadow-acid" : "border-line-bright bg-void"
        }`}
      />

      <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={`min-w-0 [text-shadow:0_1px_10px_#09090b,0_0_2px_#09090b] ${mediaRight ? "" : "lg:order-2"}`}>
          <p className="flex items-baseline gap-4">
            <span className="font-display text-5xl font-bold leading-none text-transparent [-webkit-text-stroke:1px_theme(colors.line-bright)] sm:text-6xl">
              {String(k + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-mute">
              {r.when}
              <span className="block text-dim">{r.where}</span>
            </span>
          </p>
          <div className="mt-4 flex items-center gap-4">
            <OrgLogo role={r} />
            <div className="min-w-0">
              <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">{r.role}</h3>
              <p className="mt-1 font-mono text-sm text-cyan">
                {r.org}
                {r.current && <span className="ml-2 bg-red px-1.5 py-px text-[0.65rem] uppercase tracking-[0.14em] text-void">now</span>}
              </p>
            </div>
          </div>
          <p className="mt-5 text-lg leading-relaxed text-ink">{r.summary}</p>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={`${id}-d`}
            onClick={() => setOpen((o) => !o)}
            className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-acid hover:text-acid-soft"
          >
            <span aria-hidden="true" className={`inline-block transition-transform ${open ? "rotate-90" : ""}`}>
              ▸
            </span>
            {open ? "Hide details" : "Show details"}
            <span className="sr-only"> for {r.role} at {r.org}</span>
          </button>
          <div
            id={`${id}-d`}
            className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            hidden={!open}
          >
            <ul className="mt-4 space-y-3 overflow-hidden">
              {r.points.map((pt) => (
                <li key={pt} className="flex gap-3 leading-relaxed text-mute">
                  <span className="mt-[0.7em] h-px w-3 shrink-0 bg-acid" aria-hidden="true" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal kind={THEME_ENTRANCE[r.theme]} className={`min-w-0 self-start ${mediaRight ? "" : "lg:order-1"}`}>
          {r.photos?.length ? (
            <div>
              <button
                type="button"
                onClick={(e) => openGallery(r.photos!, 0, `${r.org} — photos`, e.currentTarget)}
                className="hud group block w-full text-left"
                aria-label={`Open: ${r.photos[0].caption}`}
              >
                <span className="block overflow-hidden border border-line bg-[#f2f2ee]">
                  <Img image={r.photos[0]} ratio={r.photos[0].src.includes("poster") ? undefined : "4 / 3"} fit={r.photos[0].src.includes("poster") ? "contain" : "cover"} className="transition-transform duration-700 group-hover:scale-[1.03]" />
                </span>
              </button>
              <p className="mt-2 text-sm text-mute">{r.photos[0].caption}</p>
              <ul className="mt-3 grid grid-cols-4 gap-2" aria-label={`More ${r.org} photos`}>
                {r.photos.slice(1).map((m, i) => (
                  <li key={m.src}>
                    <button
                      type="button"
                      onClick={(e) => openGallery(r.photos!, i + 1, `${r.org} — photos`, e.currentTarget)}
                      aria-label={`Open photo: ${m.caption}`}
                      className="group block aspect-[4/3] w-full overflow-hidden border border-line"
                    >
                      <img src={asset(m.src)} alt="" width={m.w} height={m.h} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </button>
                  </li>
                ))}
              </ul>
              {r.projectId && (
                <button
                  type="button"
                  onClick={(e) => openCase(r.projectId!, e.currentTarget.closest("li"))}
                  className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-acid hover:text-acid-soft"
                >
                  Open the {featuredProjects.find((p) => p.id === r.projectId)?.title} case study ⤢
                </button>
              )}
            </div>
          ) : r.media ? (
            <button
              type="button"
              onClick={(e) => r.projectId && openCase(r.projectId, e.currentTarget)}
              className="hud group block w-full text-left"
              aria-label={`Open the ${r.org} case study`}
            >
              <span className={`block overflow-hidden border border-line ${r.media.src.includes("ui") ? "bg-black" : "bg-[#f2f2ee]"}`}>
                <Img image={r.media} ratio="16 / 9" fit={r.media.src.includes("ui") ? "cover" : "contain"} className="transition-transform duration-500 group-hover:scale-[1.03]" />
              </span>
              <span className="mt-2 flex items-start justify-between gap-4 text-sm text-mute group-hover:text-ink">
                <span>{r.media.caption}</span>
                <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-acid">case study ⤢</span>
              </span>
            </button>
          ) : r.keyFigure ? (
            <div className="cut-br border border-line bg-char/55 p-8 backdrop-blur-[2px]">
              <p className="font-display text-[clamp(3.5rem,8vw,6rem)] font-bold leading-none text-acid">{r.keyFigure.value}</p>
              <p className="mt-3 max-w-xs text-mute">{r.keyFigure.label}</p>
              <p className="label mt-6 text-dim">{r.org} · documented impact</p>
            </div>
          ) : null}
        </Reveal>
      </div>
    </li>
  );
}

const work = experience.filter((r) => r.category === "work");

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  // the rail fills as you scroll through the chapters
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = listRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      setProgress(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Section
      id="experience"
      className="overflow-x-clip"
      index="02"
      title="Experience"
      kicker="internships & teaching"
      intro={<p>Internships and teaching: shipping ML and backend systems at startups, and mentoring a corporate data-science team.</p>}
    >
      <div className="relative">
        <span aria-hidden="true" className="absolute bottom-0 left-[1.25rem] top-2 w-px -translate-x-1/2 bg-line md:left-8" />
        <span
          aria-hidden="true"
          className="absolute left-[1.25rem] top-2 w-[2px] origin-top -translate-x-1/2 bg-acid md:left-8"
          style={{ height: `calc(${progress * 100}% - 0.5rem)` }}
        />
        <ol ref={listRef} className="relative">
          {work.map((r, k) => (
            <Chapter key={r.role + r.org} r={r} k={k} />
          ))}
        </ol>
      </div>
    </Section>
  );
}
